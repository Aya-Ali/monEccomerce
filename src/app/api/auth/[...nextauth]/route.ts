import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"


export const nextAuthOptions: NextAuthOptions = {
    pages: {
        signIn: "/login"
    },
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
                    method: "post",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: {
                        'content-type': "application/json"
                    }
                })
                const data = await res.json()
                console.log(data);
                if (data.message == 'success') {
                    return {
                        id: "",
                        user: data.user,
                        token: data.token
                    }
                } else {
                    throw new Error(data.message)
                }


            }
        })
    ],
    callbacks: {
        // encrypt data cookies
        async jwt({ token, user }) {
            if (user) {
                token.userData = user.user
                token.accessToken = user.token
            }
            return token
        },
        // user share Application
        async session({ session, token }) {
            session.user = token.userData
            return session
        }
    }
}






const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }


