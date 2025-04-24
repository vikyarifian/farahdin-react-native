import { v } from "convex/values"
import { mutation } from "./_generated/server"

export const createUser = mutation({
    args:{
        username: v.string(),
        fullname: v.string(),
        email: v.string(),
        clerkId: v.string(),
    },

    handler: async(ctx, args) => {

        const existingUser = await ctx.db.query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first()

        if (existingUser) return

        // const existingEmail = await ctx.db.query("users")
        //     .withIndex("by_email", (q) => q.eq("email", args.email))
        //     .first()

        // if (existingEmail) return

        await ctx.db.insert("users", {
            username: args.username,
            fullname: args.fullname,
            email: args.email,
            clerkId: args.clerkId
        })
    }
});