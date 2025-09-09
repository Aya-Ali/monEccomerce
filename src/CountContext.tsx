
'use client'
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { getCartData } from "./CartAction";
import { CartData } from "./types/cartData";

type CountType = {
    count: number,
    setCount: Dispatch<SetStateAction<number>>
}
export const CountContext = createContext<CountType | null>(null)

export default function CountProvider({ children }: { children: React.ReactNode }) {

    const [count, setCount] = useState<number>(0)
    useEffect(() => { getUserCart() }, [])

    async function getUserCart() {
        const cartData: CartData = await getCartData()

        let sum = cartData?.data.products.reduce((total: number, el) => {
            return total += el.count
        }, 0)
        setCount(sum)
    }


    return <CountContext.Provider value={{ count, setCount }}>
        {children}
    </CountContext.Provider>
}


// setCount =>     ,  ,  ,add