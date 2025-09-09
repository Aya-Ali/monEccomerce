
import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { Button } from 'src/components/ui/button'
import { Iproduct } from 'src/types/product.type'
import Link from 'next/link'
import ProductBtn from '../ProductBtn/ProductBtn'
export default function ProductCard({ product }: { product: Iproduct }) {

    const { _id, category: { name }, title, imageCover, price, ratingsAverage } = product
    return (
        <Card>
            <Link href={'/home/' + _id}>

                <CardHeader>

                    <Image src={imageCover} className='w-full' alt={title} width={200} height={200} />

                </CardHeader>
                <CardContent>
                    <CardDescription className='text-main'>{name}</CardDescription>
                    <CardTitle className=''>{title.split(" ").slice(0, 2).join(" ")}</CardTitle>
                    <div className='flex justify-between my-5 items-center'>
                        <span>{price} EGP</span>
                        <span>{ratingsAverage}<i className='fa-solid fa-star rating-color'></i></span>
                    </div>
                </CardContent>

            </Link>
            <CardFooter>
                <ProductBtn id={_id} />
            </CardFooter>
        </Card>
    )
}
