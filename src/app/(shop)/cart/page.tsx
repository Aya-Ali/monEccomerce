'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { clearCart, getCartData, removeProductToCart, updateCartCount } from 'src/CartAction'
import { Button } from 'src/components/ui/button'
import { CountContext } from 'src/CountContext'
import { CartData, cartItem, ProductElement } from 'src/types/cartData'
import Checkoutsession from '../checkoutsession/[cartid]/page'

export default function Cart() {

  const [CartData, setCart] = useState<cartItem>()
  const [loading, setLoading] = useState(true)
  const [countLoading, setcountLoading] = useState(false)
  const [disable, setdisable] = useState(false)
  const [currentID, setcurrentID] = useState('')

  const countData = useContext(CountContext)
  useEffect(() => { getAllCart() }, [])

  async function getAllCart() {
    setLoading(true)
    const data: CartData = await getCartData()

    setCart(data.data)
    setLoading(false)
  }


  async function deleteProduct(id: string) {
    const data = await removeProductToCart(id)
    console.log(data);
    if (data.status == 'success') {
      toast.success("product Deleted", { position: "top-center" })
      setCart(data.data)
      let sum = data.data.products.reduce((total: number, el:ProductElement) => {
        return total += el.count
      }, 0)
      countData?.setCount(sum)
    }

  }
  async function clearCartData() {
    const data = await clearCart()
    if (data.message == 'success') {
      toast.success("cart Deleted", { position: "top-center" })
      getAllCart()
      countData?.setCount(0)
    }

  }

  async function updateProduct(id: string, count: number) {


    setcurrentID(id)
    setdisable(true)
    setcountLoading(true)
    const data = await updateCartCount(id, count)
    if (data.status == 'success') {
      toast.success("cart Update", { position: "top-center" })
      setCart(data.data)
      let sum = data.data.products.reduce((total: number, el:ProductElement) => {
        return total += el.count
      }, 0)
      countData?.setCount(sum)
    }
    setcountLoading(false)
    setdisable(false)

  }
  return (
    <>
      {loading ? <h1 className='text-4xl'>Loaddddddddddddddddding</h1> : <>
        {
          CartData?.products.length ?
            <>
              <Button onClick={clearCartData} className='bg-red-400 hover:bg-red-400 rounded-3xl p-5 my-5 float-right'>Clear Cart</Button>
              <div className='clear-both'></div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg dark" >
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-16 py-3">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Qty
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    {CartData?.products.map((item) => {
                      return <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="p-4">
                          <Image width={200} height={200} src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={item.product.title} />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item.product.title}
                        </td>
                        <td className="px-6 py-4" >
                          <div className="flex items-center">
                            <Button disabled={disable} onClick={() => updateProduct(item.product._id, item.count -= 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 disabled:bg-red-400 disabled:text-red-200" type="button">
                              <span className="sr-only">Quantity button</span>
                              {item.count == 1 ? <i className='fa-solid fa-trash'></i> : <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                              </svg>}
                            </Button>
                            <div>

                              {
                                currentID == item.product._id ? <>  {countLoading ? <i className='fa-solid fa-spin fa-spinner'></i> : <span>{item.count}</span>}</> : <span>{item.count}</span>
                              }
                            </div>
                            <Button disabled={disable} onClick={() => updateProduct(item.product._id, item.count += 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 disabled:bg-red-400 disabled:text-red-200" type="button">
                              <span className="sr-only">Quantity button</span>
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                              </svg>
                            </Button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item.price}
                        </td>
                        <td className="px-6 py-4">
                          <Button onClick={() => deleteProduct(item.product._id)} className="font-medium bg-red-600 dark:bg-red-500 "><i className='fa-solid fa-trash text-white'></i></Button>
                        </td>
                      </tr>

                    })}
                  </tbody>
                  <tfoot className="text-xs text-gray-300 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
                    <tr>
                      <th colSpan={4} className="px-16 py-3">
                        Total Price
                      </th>
                      <th scope="col" className="px-6 py-3 ">
                        {CartData?.totalCartPrice}
                      </th>

                    </tr>
                  </tfoot>
                </table>
              </div>

              <Button className='bg-main text-white p-5 rounded-2xl' >
                <Link href={'/checkoutsession/' + CartData._id}>Check out Session</Link>
              </Button>
            </> :

            <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                Empty Cart
              </div>
            </div>

        }</>}


    </>




  )
}



// e-comm checkout cash visa , numbercartITems context,production
// sass , redux