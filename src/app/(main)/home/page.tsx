import React, { Suspense } from 'react'
import MainSlider from 'src/app/_Component/MainSlider/MainSlider'
import ProductCard from 'src/app/_Component/ProductCard/ProductCard'
import { Iproduct, ProductData } from 'src/types/product.type'
import LoadingHome from './_LoadingHome/LoadingHome'
import { getAllProducts } from 'src/service/product.service'

export default async function page() {

  const resData:ProductData =  await getAllProducts()
  const ProductList: Iproduct[] = resData.data

  return (
    <div>

      <MainSlider />
      <h1>Home</h1>
      <Suspense fallback={<LoadingHome/>}>


        <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 my-5 gap-4'>
          {ProductList.map((product) => {

            return <ProductCard product={product} key={product._id} />
          })}

        </div>
      </Suspense>
    </div>
  )
}
