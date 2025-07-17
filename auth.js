import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./libs/mongodb";

const config = {
    providers: [
        Resend({
            apiKey: process.env.RESEND_API_KEY,
            from: "noreply@resend.adriansticea.com",
            name: "Email",
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);