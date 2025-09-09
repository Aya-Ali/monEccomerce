'use server'
import { getUserToken } from "./GetUserToken";
export async function getCartData() {
    const token: any = await getUserToken()
    if (token) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
            headers: {
                token: token
            }
        })
        const data = await res.json()
        return data
    }
}
export async function AddProductToCart(id: string) {
    const token: any = await getUserToken()
    if (token) {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
            method: "post",
            body: JSON.stringify({
                "productId": id
            }),
            headers: {
                token: token,
                'content-type': "application/json"
            }
        })
        const data = await res.json()

        return data

    }else{
        throw new Error("token Required")
    }

}
export async function removeProductToCart(id: string) {
    const token: any = await getUserToken()
    if (token) {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`, {
            method: "delete",
            headers: {
                token: token,
                'content-type': "application/json"
            }
        })
        const data = await res.json()

        return data

    }

}
export async function clearCart() {
    const token: any = await getUserToken()
    if (token) {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
            method: "delete",
            headers: {
                token: token,
                'content-type': "application/json"
            }
        })
        const data = await res.json()

        return data

    }

}

export async function updateCartCount(id: string, count: number) {
    const token: any = await getUserToken()
    if (token) {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`, {
            method: "put",
            body: JSON.stringify({
                count: count
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