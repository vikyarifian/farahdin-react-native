import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUser } from "@/utils/User";

export const getInboxes = query({
    handler: async (ctx) => {
        const currentUser = await getAuthUser(ctx);

        const inboxes = await ctx.db.query("inboxes").withIndex("by_user_id", (q) => q.eq("userId", currentUser._id)).order("desc").collect();
        
        return inboxes;
    }
})

export const createInbox = mutation({
    args:{
        userId: v.id("users"),
        categoryId: v.id("categories"),
        messageEn: v.string(),
        messageId: v.string(),
        date: v.string(),
    },

    handler: async(ctx, args) => {

        const currentUser = await getAuthUser(ctx)

        const inboxId = await ctx.db.insert("inboxes", {
            userId: currentUser._id,
            categoryId: args.categoryId,
            messageEN: args.messageEn,
            messageID: args.messageId,
            date: new Date().toLocaleDateString()
        })

        return inboxId
    }
})