import { v } from "convex/values";
import { mutation } from "./_generated/server";


export const createInbox = mutation({
    args:{
        userId: v.id("users"),
        categoryId: v.id("categories"),
        messageEn: v.string(),
        messageId: v.string(),
        date: v.string(),
    },

    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized")
        
        const currentUser = await ctx.db.query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
            .first()

        if (!currentUser) throw new Error("User not found")

        const inboxId = await ctx.db.insert("inboxes", {
            userId: currentUser._id,
            categoryId: args.categoryId,
            messageEn: args.messageEn,
            messageId: args.messageId,
            date: new Date().toLocaleDateString()
        })

        // await ctx.db.patch(currentUser._id,
        //     inboxes: currentUser.
        // )

        return inboxId
    }
})