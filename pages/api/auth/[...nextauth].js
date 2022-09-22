import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../lib/prisma";
import * as argon2 from "argon2";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) return null;
        const pwMatch = await argon2.verify(user.password, password);
        if (!pwMatch) return null;
        return user;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

export default NextAuth(authOptions);
