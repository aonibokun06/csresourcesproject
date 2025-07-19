import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  topics: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    icon: v.string(),
    color: v.string(),
    featured: v.boolean(),
    order: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_featured", ["featured"]),

  resources: defineTable({
    title: v.string(),
    url: v.string(),
    description: v.string(),
    type: v.string(), // "video", "article", "course", "book", "tool", "practice"
    topicId: v.id("topics"),
    difficulty: v.string(), // "beginner", "intermediate", "advanced"
    tags: v.array(v.string()),
    featured: v.boolean(),
    submittedBy: v.optional(v.string()), // Clerk user ID
    approved: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_topic", ["topicId"])
    .index("by_type", ["type"])
    .index("by_featured", ["featured"]),

  userResources: defineTable({
    userId: v.string(), // Clerk user ID
    resourceId: v.id("resources"),
    saved: v.boolean(),
    completed: v.boolean(),
    notes: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_resource", ["resourceId"]),

  learningRoadmaps: defineTable({
    topicId: v.id("topics"),
    title: v.string(),
    description: v.string(),
    steps: v.array(v.object({
      id: v.string(),
      title: v.string(),
      description: v.string(),
      resourceIds: v.array(v.id("resources")),
      order: v.number(),
    })),
    createdAt: v.number(),
  }).index("by_topic", ["topicId"]),

  userProgress: defineTable({
    userId: v.string(), // Clerk user ID
    roadmapId: v.id("learningRoadmaps"),
    completedSteps: v.array(v.string()), // Array of step IDs
    currentStep: v.string(),
    startedAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_roadmap", ["roadmapId"]),

  submissions: defineTable({
    title: v.string(),
    url: v.string(),
    description: v.string(),
    type: v.string(),
    topicId: v.id("topics"),
    difficulty: v.string(),
    tags: v.array(v.string()),
    submittedBy: v.string(), // Clerk user ID
    status: v.string(), // "pending", "approved", "rejected"
    createdAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_user", ["submittedBy"]),
});
