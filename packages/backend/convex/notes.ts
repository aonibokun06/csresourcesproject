import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "./utils";

// Topics
export const getTopics = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("topics").order("asc").collect();
  },
});

export const getFeaturedTopics = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("topics")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .order("asc")
      .collect();
  },
});

export const getTopicBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const topic = await ctx.db
      .query("topics")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    return topic;
  },
});

// Resources
export const getResourcesByTopic = query({
  args: { topicId: v.id("topics") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("resources")
      .withIndex("by_topic", (q) => q.eq("topicId", args.topicId))
      .filter((q) => q.eq(q.field("approved"), true))
      .order("desc")
      .collect();
  },
});

export const getFeaturedResources = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("resources")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .filter((q) => q.eq(q.field("approved"), true))
      .order("desc")
      .collect();
  },
});

export const getResourcesByType = query({
  args: { type: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("resources")
      .withIndex("by_type", (q) => q.eq("type", args.type))
      .filter((q) => q.eq(q.field("approved"), true))
      .order("desc")
      .collect();
  },
});

// User Resources
export const getUserResources = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const userResources = await ctx.db
      .query("userResources")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const resources = await Promise.all(
      userResources.map(async (ur) => {
        const resource = await ctx.db.get(ur.resourceId);
        return { ...resource, userResource: ur };
      })
    );

    return resources.filter(Boolean);
  },
});

export const isResourceSaved = query({
  args: { resourceId: v.id("resources") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return false;

    const userResource = await ctx.db
      .query("userResources")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("resourceId"), args.resourceId))
      .first();

    return userResource?.saved || false;
  },
});

export const isResourceCompleted = query({
  args: { resourceId: v.id("resources") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return false;

    const userResource = await ctx.db
      .query("userResources")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("resourceId"), args.resourceId))
      .first();

    return userResource?.completed || false;
  },
});

export const saveResource = mutation({
  args: { resourceId: v.id("resources") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("userResources")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("resourceId"), args.resourceId))
      .first();

    if (existing) {
      return await ctx.db.patch(existing._id, { saved: !existing.saved });
    }

    return await ctx.db.insert("userResources", {
      userId,
      resourceId: args.resourceId,
      saved: true,
      completed: false,
      createdAt: Date.now(),
    });
  },
});

export const markResourceCompleted = mutation({
  args: { resourceId: v.id("resources") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("userResources")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("resourceId"), args.resourceId))
      .first();

    if (existing) {
      return await ctx.db.patch(existing._id, { completed: !existing.completed });
    }

    return await ctx.db.insert("userResources", {
      userId,
      resourceId: args.resourceId,
      saved: false,
      completed: true,
      createdAt: Date.now(),
    });
  },
});

// Submissions
export const submitResource = mutation({
  args: {
    title: v.string(),
    url: v.string(),
    description: v.string(),
    type: v.string(),
    topicId: v.id("topics"),
    difficulty: v.string(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db.insert("submissions", {
      ...args,
      submittedBy: userId,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

export const getUserSubmissions = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    return await ctx.db
      .query("submissions")
      .withIndex("by_user", (q) => q.eq("submittedBy", userId))
      .order("desc")
      .collect();
  },
});
