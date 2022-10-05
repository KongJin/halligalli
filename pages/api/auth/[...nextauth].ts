import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import FacebookProvider from "next-auth/providers/facebook";
import prisma from "@libs/prisma";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],

  secret: process.env.SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      const { name, email, image } = user as { [key: string]: string };

      const existMember = await prisma.users.findUnique({ where: { email } });
      if (!existMember) {
        await prisma.users.create({
          data: {
            email,
            img: image,
            nickName: name,
          },
        });
      }
      return true;
    },
  },
  // jwt: {
  //   secret: process.env.SECRET,
  //   maxAge: 60 * 60 * 2,
  // },

  // callbacks: {
  //   async jwt({ token, user, account, profile, isNewUser }) {
  //     if (user) {
  //       //@ts-ignore
  //       token.email = user.email;
  //       //@ts-ignore
  //       token.name = user.name;
  //     }
  //     return token;
  //   },
  // },
});
