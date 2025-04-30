import { MutationCtx, QueryCtx } from "@/convex/_generated/server";

export async function getAuthUser(ctx: QueryCtx | MutationCtx) {
    const identity = await ctx.auth.getUserIdentity();
    console.log(identity?.subject)
    if (!identity) throw new Error("Unauthorized")

    const currentUser = await ctx.db.query("users").withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject)).first();
    
    if (!currentUser) throw new Error("User not found")

    return currentUser
    
}
