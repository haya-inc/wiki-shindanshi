import type { InferPageType } from "fumadocs-core/source";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import {
  convertToModelMessages,
  generateText,
  InvalidToolInputError,
  stepCountIs,
  streamText,
  tool,
  type ToolCallRepairFunction,
  type UIMessage,
} from "ai";
import { z } from "zod";
import { docsPagesByUrl, docsSearch } from "@/lib/docs-search";
import { getLLMText } from "@/lib/get-llm-text";
import { source } from "@/lib/source";

const openrouter = createOpenRouter();
const chatModelId = "qwen/qwen3.5-9b";
const chatModel = openrouter(chatModelId);
const searchToolContentLimit = 6000;
const searchToolHitLimit = 40;
const searchToolHitMultiplier = 5;

type SourcePage = InferPageType<typeof source>;
type SearchToolOutput = {
  url: string;
  title: string;
  description: string;
  content: string;
};

const systemPrompt = [
  "あなたは shindanshi の学習 wiki 専用アシスタントです。",
  "回答は日本語で簡潔に行ってください。",
  "試験学習や docs の内容について答えるときは、必要に応じて `search` ツールで根拠を確認してください。",
  "`search` ツールを呼ぶときは、`query` に検索語またはユーザーの質問文を必ず入れてください。",
  "参照したページがある場合は、Markdown リンクで出典を付けてください。",
  "検索結果に十分な情報がない場合は、分からないと伝えたうえで、より良い検索語を提案してください。",
].join("\n");

function getSearchHitLimit(limit: number) {
  return Math.min(limit * searchToolHitMultiplier, searchToolHitLimit);
}

function truncateSearchContent(text: string) {
  if (text.length <= searchToolContentLimit) {
    return text;
  }

  return `${text.slice(0, searchToolContentLimit)}\n\n...`;
}

function pickSearchPages(urls: string[]) {
  return urls
    .map((url) => docsPagesByUrl.get(url))
    .filter((page): page is SourcePage => page !== undefined);
}

async function buildSearchToolOutput(page: SourcePage): Promise<SearchToolOutput> {
  const text = await getLLMText(page);

  return {
    url: page.url,
    title: page.data.title,
    description: page.data.description ?? "",
    content: truncateSearchContent(text),
  };
}

async function searchWikiPages(query: string, limit: number) {
  const hits = await docsSearch.search(query, {
    limit: getSearchHitLimit(limit),
  });
  const urls = [...new Set(hits.map((hit) => hit.url))].slice(0, limit);
  const pages = pickSearchPages(urls);

  return Promise.all(pages.map(buildSearchToolOutput));
}

const searchTool = tool({
  description: "学習 wiki から関連ページを探し、AI が読める Markdown を返します。",
  inputSchema: z.object({
    query: z.string().min(1),
    limit: z.number().int().min(1).max(8).default(4),
  }),
  async execute({ query, limit }) {
    return searchWikiPages(query, limit);
  },
});

const chatTools = {
  search: searchTool,
};

export const maxDuration = 30;

function missingOpenRouterApiKeyResponse() {
  return Response.json(
    {
      error: "OPENROUTER_API_KEY が設定されていません。",
    },
    { status: 500 },
  );
}

async function streamChatResponse(messages: UIMessage[]) {
  return streamText({
    model: chatModel,
    system: systemPrompt,
    stopWhen: stepCountIs(5),
    toolChoice: "auto",
    experimental_repairToolCall: repairSearchToolCall,
    tools: chatTools,
    messages: await convertToModelMessages(messages),
  });
}

export async function POST(req: Request) {
  if (!process.env.OPENROUTER_API_KEY) {
    return missingOpenRouterApiKeyResponse();
  }

  const { messages = [] }: { messages?: UIMessage[] } = await req.json();
  const result = await streamChatResponse(messages);

  return result.toUIMessageStreamResponse();
}

const repairSearchToolCall: ToolCallRepairFunction<{
  search: typeof searchTool;
}> = async ({ error, messages, system, toolCall }) => {
  if (toolCall.toolName !== "search" || !InvalidToolInputError.isInstance(error)) {
    return null;
  }

  // search の入力不足は、直近の会話を残したまま query の補完だけ再要求します。
  const result = await generateText({
    model: chatModel,
    system,
    messages: [
      ...messages,
      {
        role: "assistant",
        content: [
          {
            type: "tool-call",
            toolCallId: toolCall.toolCallId,
            toolName: toolCall.toolName,
            input: toolCall.input,
          },
        ],
      },
      {
        role: "tool",
        content: [
          {
            type: "tool-result",
            toolCallId: toolCall.toolCallId,
            toolName: toolCall.toolName,
            output: {
              type: "error-text",
              value: [
                "前の search 呼び出しは無効でした。",
                `エラー: ${error.message}`,
                "直近のユーザー質問をもとに query を補って、search をもう一度呼び出してください。",
                "limit は必要なときだけ指定してください。",
              ].join("\n"),
            },
          },
        ],
      },
    ],
    toolChoice: { type: "tool", toolName: "search" },
    tools: chatTools,
  });

  const repairedToolCall = result.toolCalls.find((candidate) => candidate.toolName === "search");

  if (repairedToolCall == null) {
    return null;
  }

  return {
    type: "tool-call",
    toolCallId: toolCall.toolCallId,
    toolName: repairedToolCall.toolName,
    input: JSON.stringify(repairedToolCall.input),
  };
};
