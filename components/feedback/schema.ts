import { z } from "zod";

export const blockFeedback = z.object({
  url: z.string(),
  blockId: z.string(),
  message: z.string().trim().min(1, "Feedback を入力してください。"),
  blockBody: z.string().trim().optional(),
});

export const pageFeedback = z.object({
  opinion: z.enum(["good", "bad"]),
  url: z.string(),
  message: z.string().trim().default(""),
});

export const pageFeedbackRequest = pageFeedback.extend({
  kind: z.literal("page"),
  title: z.string(),
  path: z.string(),
});

export const blockFeedbackRequest = blockFeedback.extend({
  kind: z.literal("block"),
});

export const feedbackRequest = z.discriminatedUnion("kind", [
  pageFeedbackRequest,
  blockFeedbackRequest,
]);

export const actionResponse = z.object({
  githubUrl: z.string().url().optional(),
});

export type BlockFeedback = z.infer<typeof blockFeedback>;
export type PageFeedback = z.infer<typeof pageFeedback>;
export type BlockFeedbackRequest = z.infer<typeof blockFeedbackRequest>;
export type PageFeedbackRequest = z.infer<typeof pageFeedbackRequest>;
export type FeedbackRequest = z.infer<typeof feedbackRequest>;
export type ActionResponse = z.infer<typeof actionResponse>;
