import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/sign-in',
    },
    
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,  
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "yosrsaad367@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials.");
                }

                const existingUser = await db.user.findUnique({
                    where: { email: credentials?.email },
                });
                if (!existingUser) {
                    return null;
                }
                const passwordMatch = await compare(credentials.password, existingUser.password);

                if (!passwordMatch) {
                    return null;
                }
                return {
                    id: `${existingUser.id}`,
                    username: existingUser.username,
                    email: existingUser.email
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            console.log(token, user);
            if (user) {
                return {
                    ...token,
                    username: user.username,
                };
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user, 
                    username: token.username, 
                },
            };
        },
    },
};
