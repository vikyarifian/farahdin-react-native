import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    users: defineTable({
        username: v.string(),
        fullname: v.string(),
        email: v.string(),
        clerkId: v.string()
    }).index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

    categories: defineTable({
        id: v.int64(),
        name: v.string()
    }).index("by_category_id", ["id"]),

    inboxes: defineTable({
        userId: v.id("users"),
        categoryId: v.id("categories"),
        messageEn: v.string(),
        messageId: v.string(),
        date: v.string(),
    }).index("by_inbox_date", ["date"])
})