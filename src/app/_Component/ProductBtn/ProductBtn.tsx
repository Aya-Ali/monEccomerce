'use client'
import React, { useContext } from 'react'
import { toast } from 'sonner'
import { AddProductToCart } from 'src/CartAction'
import { Button } from 'src/components/ui/button'
import { CountContext } from 'src/CountContext'
import { ProductElement } from 'src/types/cartData'

export default function ProductBtn({ id }: { id: string }) {

    const countData = useContext(CountContext)
    async function addProduct(id: string) {
        try {
            const data = await AddProductToCart(id)
            if (data.status == 'success') {
                toast.success(data.message, { position: "top-center" })
                let sum = data.data.products.reduce((total: number, el:ProductElement) => {
                    return total += el.count
                }, 0)
                countData?.setCount(sum)
            } else {
                toast.error("id Notcorrect", { position: "top-center" })
            }

        } catch (err) {

            toast.error("can't add product to cart without login", { position: "top-center" })
        }
    }
    return (
        <Button onClick={() => addProduct(id)} className='w-full bg-main cursor-pointer'>Add To Cart </Button>
    )
}
