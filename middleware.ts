export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/notes/:path*",
    "/placements/:path*",
    "/anonymous/:path*",
    "/profile/:path*",
    "/settings/:path*",
  ],
};
