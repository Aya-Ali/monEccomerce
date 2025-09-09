import React from 'react'
import ProductDetailsCard from 'src/app/_Component/ProductDetailsCard/ProductDetailsCard'
import { getDetailsProduct } from 'src/service/product.service'
import { ProductD, ProductDetails } from 'src/types/productDetails.type'

export default async function page({ params }: { params: { id: string } }) {
    let { id } = await params

    const data: ProductDetails = await getDetailsProduct(id)
    let product: ProductD = data.data

    return (
        <div>


            <ProductDetailsCard product={product} />
        </div>
    )
}
