import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    users: defineTable({
        username: v.string(),
        fullname: v.string(),
        email: v.string(),
        birthday: v.optional(v.string()),
        birthplace: v.optional(v.string()),
        gender: v.optional(v.string()),
        clerkId: v.string()
    }).index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

    categories: defineTable({
        code: v.string(),
        nameID: v.string(),
        nameEN: v.string(),
    }).index("by_code", ["code"]),

    inboxes: defineTable({
        userId: v.id("users"),
        categoryId: v.id("categories"),
        messageEN: v.string(),
        messageID: v.string(),
        date: v.string(),
    }).index("by_inbox_date", ["date"])
    .index("by_user_id", ["userId"])
})