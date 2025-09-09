import { ProductData } from "src/types/product.type"
import { ProductDetails } from "src/types/productDetails.type"
// isr ic
export async function getAllProducts() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`,{
        // cache:'force-cache'
        next:{
            revalidate:60
        }
    })
    const resData: ProductData = await res.json()
    return resData
}

export async function getDetailsProduct(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`)
    const resData: ProductDetails = await res.json()
    return resData
}