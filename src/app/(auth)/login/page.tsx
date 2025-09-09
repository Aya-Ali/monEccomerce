'use client'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { getCartData } from 'src/CartAction'
import { CartData } from 'src/types/cartData'
import { CountContext } from 'src/CountContext'

export default function Login() {
  const Router = useRouter()
  const CountData = useContext(CountContext)
  const LoginScheme = z.object({
    email: z.email('enter Valid Email').nonempty("Email Required"),
    password: z.string().nonempty("password Required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/, "enter valid Password"),
  })
  const LoginForm = useForm<z.infer<typeof LoginScheme>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginScheme)
  })
  async function handleLogin(values: z.infer<typeof LoginScheme>) {


    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/home"
    })

    if (res?.ok) {
      toast.success("Login Success", { position: "top-center", duration: 5000 })
      const cartData: CartData = await getCartData()

      let sum = cartData.data.products.reduce((total: number, el) => {
        return total += el.count
      }, 0)
      console.log(sum);
      CountData?.setCount(sum)
      Router.push("/home")
    } else {
      toast.error(res?.error, { position: "top-center", duration: 5000 })
    }


    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
    //   method: "POST",
    //   body: JSON.stringify(values),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // if (!res.ok) {
    //   let ErrorData = await res.json()
    //   toast.error(ErrorData.message, { position: "top-center", duration: 5000 })
    // }
    // const data = await res.json()
    // if (data.message == 'success') {
    //   toast.success("Login Success", { position: "top-center", duration: 5000 })
    //   Router.push("/home")
    // }
  }

  return (
    <div className='w-3/4 mx-auto my-5'>
      <Form {...LoginForm}>
        <form className='space-y-5' onSubmit={LoginForm.handleSubmit(handleLogin)}>

          <FormField
            control={LoginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel >Enter Email:</FormLabel>
                <FormControl>
                  <Input type='email' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={LoginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel >Enter password:</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />


          <Link href={'/forgetPassword'}>forgetPassword ????</Link>
          <Button className='w-full bg-main rounded-3xl'>Login</Button>
        </form>
      </Form>
    </div>
  )
}



