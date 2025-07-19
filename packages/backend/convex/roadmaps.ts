import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "./utils";

// Get roadmap for a topic
export const getRoadmapByTopic = query({
  args: { topicId: v.id("topics") },
  handler: async (ctx, args) => {
    const roadmap = await ctx.db
      .query("learningRoadmaps")
      .withIndex("by_topic", (q) => q.eq("topicId", args.topicId))
      .first();
    return roadmap;
  },
});

// Get user progress for a roadmap
export const getUserProgress = query({
  args: { roadmapId: v.id("learningRoadmaps") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const progress = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("roadmapId"), args.roadmapId))
      .first();

    return progress;
  },
});

// Start a roadmap
export const startRoadmap = mutation({
  args: { roadmapId: v.id("learningRoadmaps") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("roadmapId"), args.roadmapId))
      .first();

    if (existing) {
      return existing._id;
    }

    const roadmap = await ctx.db.get(args.roadmapId);
    if (!roadmap) throw new Error("Roadmap not found");

    return await ctx.db.insert("userProgress", {
      userId,
      roadmapId: args.roadmapId,
      completedSteps: [],
      currentStep: roadmap.steps[0]?.id || "",
      startedAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Complete a step
export const completeStep = mutation({
  args: { 
    roadmapId: v.id("learningRoadmaps"),
    stepId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const progress = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("roadmapId"), args.roadmapId))
      .first();

    if (!progress) throw new Error("Progress not found");

    const roadmap = await ctx.db.get(args.roadmapId);
    if (!roadmap) throw new Error("Roadmap not found");

    const currentStepIndex = roadmap.steps.findIndex(step => step.id === progress.currentStep);
    const nextStep = roadmap.steps[currentStepIndex + 1];

    const updatedCompletedSteps = progress.completedSteps.includes(args.stepId)
      ? progress.completedSteps
      : [...progress.completedSteps, args.stepId];

    return await ctx.db.patch(progress._id, {
      completedSteps: updatedCompletedSteps,
      currentStep: nextStep?.id || progress.currentStep,
      updatedAt: Date.now(),
    });
  },
});

// Get all user roadmaps
export const getUserRoadmaps = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const userProgress = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const roadmaps = await Promise.all(
      userProgress.map(async (progress) => {
        const roadmap = await ctx.db.get(progress.roadmapId);
        return { ...roadmap, progress };
      })
    );

    return roadmaps.filter(Boolean);
  },
}); 