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

export default function ResetPassword() {
  const Router = useRouter()
  const ResetScheme = z.object({
    email: z.email('enter Valid Email').nonempty("Email Required"),
    newPassword: z.string().nonempty("password Required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/, "enter valid Password"),
  })
  const ResetForm = useForm<z.infer<typeof ResetScheme>>({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(ResetScheme)
  })
  async function handleResetPassword(values: z.infer<typeof ResetScheme>) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!res.ok) {
      let ErrorData = await res.json()
      toast.error(ErrorData.message, { position: "top-center", duration: 5000 })
    }
    const data = await res.json()
    if (data.token) {
      toast.success("Password Updated", { position: "top-center", duration: 5000 })
      Router.push("/login")
    }
  }

  return (
    <div className='w-3/4 mx-auto my-5'>
      <Form {...ResetForm}>
        <form className='space-y-5' onSubmit={ResetForm.handleSubmit(handleResetPassword)}>

          <FormField
            control={ResetForm.control}
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
            control={ResetForm.control}
            name="newPassword"
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



          <Button className='w-full bg-main rounded-3xl'>Reset</Button>
        </form>
      </Form>
    </div>
  )
}
