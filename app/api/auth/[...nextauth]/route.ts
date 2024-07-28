import NextAuth from "next-auth/next";
import { NEXT_AUTH } from "@/auth";
// import handlers from "next-auth";
const handlers = NextAuth(NEXT_AUTH);

export { handlers as GET, handlers as POST };
