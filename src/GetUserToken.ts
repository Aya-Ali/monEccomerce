'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
export async function getUserToken() {

    const cookiesData = await cookies()
    const decodedToken = cookiesData.get('next-auth.session-token')?.value

    const data = await decode({ token: decodedToken, secret: process.env.NEXTAUTH_SECRET! })
    return data?.accessToken
}


// jsx ,tsx  page /component