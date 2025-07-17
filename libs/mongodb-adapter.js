import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./mongodb";

// Create the MongoDB adapter for NextAuth
const adapter = MongoDBAdapter(clientPromise, {
    // Optional: Customize collection names
    collections: {
        Users: "users",
        Accounts: "accounts",
        Sessions: "sessions",
        VerificationTokens: "verification_tokens",
    },
    // Optional: Customize database name
    databaseName: process.env.MONGODB_DB || "adrian-site",
});

export default adapter;
