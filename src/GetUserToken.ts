'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
export async function getUserToken() {
    const TokenName = (process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token')
    const cookiesData = await cookies()
    const decodedToken = cookiesData.get(TokenName)?.value

    const data = await decode({ token: decodedToken, secret: process.env.NEXTAUTH_SECRET! })
    return data?.accessToken
}


// jsx ,tsx  page /component