import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

export const config = {
    matcher: ["/dashboard((?!.*\\..*|_next).*)", "/dashboard", "/(api|trpc)(.*)"],
};