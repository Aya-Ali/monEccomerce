'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ForgetPassword() {
  const Router = useRouter()
  const forgetPasswordScheme = z.object({
    email: z.email('enter Valid Email').nonempty("Email Required"),
  })
  const forgetPasswordForm = useForm<z.infer<typeof forgetPasswordScheme>>({
    defaultValues: {
      email: "",

    },
    resolver: zodResolver(forgetPasswordScheme)
  })
  async function handleforgetPassword(values: z.infer<typeof forgetPasswordScheme>) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`, {
         method: "POST",
         body: JSON.stringify(values),
         headers: {
           'Content-Type': 'application/json'
         }
       })
       if (!res.ok) {
         let ErrorData = await res.json()
         toast.error(ErrorData.message, { position: "top-center", duration: 5000 })
       }
      else{
         const data = await res.json()
       if (data.statusMsg == 'success') {
         toast.success(data.message, { position: "top-center", duration: 5000 })
         Router.push("/verifyCode")
       }
      }
  }

  return (
    <div className='w-3/4 mx-auto my-5'>
      <Form {...forgetPasswordForm}>
        <form className='space-y-5' onSubmit={forgetPasswordForm.handleSubmit(handleforgetPassword)}>

          <FormField
            control={forgetPasswordForm.control}
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
        


        
          <Button className='w-full bg-main rounded-3xl'>Send Email</Button>
        </form>
      </Form>
    </div>
  )
}
