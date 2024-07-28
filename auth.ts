import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import prisma from "./lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, SessionStrategy } from "next-auth";
import { Adapter } from "next-auth/adapters";

export const NEXT_AUTH: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  session: { strategy: "jwt" as SessionStrategy },

  callbacks: {
    async redirect({ url, baseUrl }: any) {
      return baseUrl + "/dashboard";
    },
    // async signIn({ user, account }: any) {
    //   // console.log(user, account);

    //   if (account.provider === "google") {
    //     const { name, email, image, id } = user;
    //     const isExisting = await prisma.user.findFirst({
    //       where: { email: email },
    //     });

    //     if (isExisting) {
    //       return true;
    //     }

    //     const res = await prisma.user.create({
    //       data: {
    //         name,
    //         email,
    //         avatar: image,
    //         google_id: id,
    //       },
    //     });
    //     if (res) {
    //       return true;
    //     }
    //     return false;
    //   }
    //   if (account.provider === "github") {
    //     const { name, email, image, id } = user;
    //     const isExisting = await prisma.user.findFirst({
    //       where: { email: email },
    //     });

    //     if (isExisting) {
    //       return true;
    //     }

    //     const res = await prisma.user.create({
    //       data: {
    //         name,
    //         email,
    //         avatar: image,
    //         google_id: id,
    //       },
    //     });
    //     if (res) {
    //       return true;
    //     }
    //     return false;
    //   }
    //   return true;
    // },
    async signIn({ user, account }) {
      const { email } = user;
      const existingUser = await prisma.user.findFirst({
        where: { email: email as string },
      });

      if (existingUser) {
        // Link the new provider to the existing user
        if (account?.provider === "google" && !existingUser.google_id) {
          await prisma.user.update({
            where: { email: email as string },
            data: { google_id: account?.id as string },
          });
        } else if (account?.provider === "github" && !existingUser.github_id) {
          await prisma.user.update({
            where: { email: email as string },
            data: { github_id: account.id as string },
          });
        }
        return true;
      } else {
        // Create new user if it doesn't exist
        const newUser = await prisma.user.create({
          data: {
            name: user.name as string,
            email: user.email as string,
            image: user.image as string,
            emailVerified: false,
            google_id:
              account?.provider === "google"
                ? (account.id as string)
                : undefined,
            github_id:
              account?.provider === "github"
                ? (account.id as string)
                : undefined,
          },
        });

        return !!newUser;
      }
    },
    jwt: ({ token, user }: any) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    session: ({ session, token }: any) => {
      session.id = token.sub;
      session.name = token.name;
      session.email = token.email;
      return session;
    },
  },

  pages: {
    signIn: "auth/login",
  },
};
