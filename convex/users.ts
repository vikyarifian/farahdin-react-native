import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { getAuthUser } from "@/utils/User";

export const getUser = query({
    handler: async (ctx) => {
        const currentUser = await getAuthUser(ctx);
        return currentUser
    }
})


export const updateUser = mutation({
    args: {
        username: v.string(),
        email: v.string(),
        fullname: v.string(),
        gender: v.string(),
        birthday: v.string(),
        birthplace: v.string(),
        zodiac: v.string(),
    },
    handler: async (ctx, args) => {
        const currentUser = await getAuthUser(ctx);
        if (currentUser) {
            await ctx.db.patch(currentUser._id, {
                username: args.username,
                email: args.email,
                fullname: args.fullname,
                gender: args.gender,
                birthday: args.birthday,
                birthplace: args.birthplace,
                zodiac: args.zodiac
            })
        }
        return
    }
})

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

        const existingEmail = await ctx.db.query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first()

        if (existingEmail) {
            await ctx.db.patch(existingEmail._id, {
                username: args.username,
                fullname: args.fullname,
                clerkId: args.clerkId,
            })
            return
        }

        await ctx.db.insert("users", {
            username: args.username,
            fullname: args.fullname,
            gender: '',
            email: args.email,
            birthday: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`,
            zodiac: '',
            birthplace: '',
            clerkId: args.clerkId
        })
    }
});