'use server'

import { getUserToken } from "./GetUserToken"


export async function checkoutPayment(cartid: string, shippingData: { details: string, phone: string, city: string }) {
    const token: any = await getUserToken()
    if (token) {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartid}?url=${process.env.NEXT_PUBLIC_URL}`, {
            method: "post",
            body: JSON.stringify({
                "shippingAddress": shippingData
            }),
            headers: {
                'content-type': "application/json",
                token: token
            }
        })
        const data = await res.json()

        return data
    }
}
export async function checkoutCash(cartid: string, shippingData: { details: string, phone: string, city: string }) {
    const token: any = await getUserToken()
    if (token) {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/${cartid}`, {
            method: "post",
            body: JSON.stringify({
                "shippingAddress": shippingData
            }),
            headers: {
                'content-type': "application/json",
                token: token
            }
        })
        const data = await res.json()

        return data
    }
}