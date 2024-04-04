import NextAuth from "next-auth";
import authConfig from "@/server/auth.config";

const { auth: middleware } = NextAuth(authConfig);

const authRoutes = [
    "/login",
    "/register",
    "/auth/error",
    "/forgot-password",
    "/reset-password",
];

export default middleware((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
    const isPrivateRoute =
        nextUrl.pathname.startsWith("/app") ||
        nextUrl.pathname.startsWith("/billing");
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return;
    } else if (isLoggedIn && isAuthRoute) {
        return Response.redirect(new URL("/app", nextUrl), 302);
    } else if (!isLoggedIn && isPrivateRoute) {
        const callbackUrl = nextUrl.pathname;

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        return Response.redirect(
            new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
            302,
        );
    }
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
