import NextAuth from "next-auth";
import jwt from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiClient } from "../../../utils/apiClient";
import { hashPassword } from "../../../utils/encryption";
import _ from 'lodash';

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: {
					label: "Username",
					type: "text",
					placeholder: "Username",
					required: true,
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "Username",
					required: true,
				},
			},
			async authorize(credentials, req) {
				let old = await apiClient().post('/user/find',{username:credentials.username});
				let salt = old?.data[0]?.salt;
				let result = await apiClient().post('/user/login', {username:credentials.username, password: hashPassword(credentials.password, salt)}).catch(e => console.log(e))
				if (result?.status==200 && _.size(result?.data)>0) {
					await apiClient().put('/user/attempt', {username: credentials.username, attempt: 0})
					return {
						username: result.data[0].username
					};
				} else {
					await apiClient().put('/user/attempt', {username: credentials.username, attempt: +old?.data[0].fail_attempt+1})
					return null
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 30 * 60, // 30 min
		updateAge: 30 * 60, // 30 min
	},
	jwt: {
		maxAge: 30 * 60, // 30 min
		async encode({ token, secret, maxAge }) {
			return jwt.sign(token, secret);
		},
		async decode({ token, secret }) {
			return jwt.verify(token, secret);
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		// async signIn(user, account, profile) {
		// 	console.log(user, account, profile)
		// 	return true;
		// },
		async jwt({ token, user, account, profile, isNewUser }) {
			if (account?.provider == "credentials" && user.username) {
				token.username = user.username;
				token.user = user.username;
			}
			// console.log('jwt', token);
			return token;
		},
		async session({ session, user, token }) {
			if (token?.username) {
				session.user.username = token.username;
				session.user.user = token.username;
			}
			// console.log('session', session, token)
			return session;
		},
		// async redirect({ url, baseUrl }) {
		// 	console.log(url, baseUrl)
		// 	return baseUrl
		// }
	},
	pages: {
		signIn: "/auth/login",
		signOut: "/auth/logout",
		error: "/auth/error",
	},
};

export default NextAuth(authOptions);
