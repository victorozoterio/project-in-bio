import { FirestoreAdapter } from "@auth/firebase-adapter";
import { credential } from "firebase-admin";
import NextAuth from "next-auth";
import { firebaseCert } from "./firebase";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: FirestoreAdapter({ credential: firebaseCert }),
	providers: [Google],
});
