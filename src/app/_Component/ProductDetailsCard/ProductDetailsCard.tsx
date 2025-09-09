import Image from 'next/image'
import React from 'react'
import { Button } from 'src/components/ui/button'
import { ProductD } from 'src/types/productDetails.type'
import ProductImageSlider from '../ProductImageSlider/ProductImageSlider'
import ProductBtn from '../ProductBtn/ProductBtn'

export default function ProductDetailsCard({ product }: { product: ProductD }) {
    const { category: { name }, title, description, images, price, ratingsAverage,_id } = product
    return (
        <div className='grid grid-cols-12 items-center justify-between gap-2.5'>
            <div className='col-span-3'>
                <ProductImageSlider images={images} />
            </div>
            <div className='col-span-8'>

                <h1>{title}</h1>
                <p className='text-zinc-400'>{description}</p>
                <h2 className='text-main my-7'>{name}</h2>
                <div className='flex justify-between my-5 items-center'>
                    <span>{price} EGP</span>
                    <span>{ratingsAverage}<i className='fa-solid fa-star rating-color'></i></span>
                </div>
                <ProductBtn id={_id} />
            </div>
        </div>
    )
}
