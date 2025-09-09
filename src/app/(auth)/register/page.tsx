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

export default function Register() {
  const Router = useRouter()
  const RegisterScheme = z.object({
    name: z.string().nonempty("Name Required").min(2, "min char 2").max(15, "max char 15"),
    email: z.email('enter Valid Email').nonempty("Email Required"),
    password: z.string().nonempty("password Required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/, "enter valid Password"),
    rePassword: z.string().nonempty("Repassword Required"),
    phone: z.string().nonempty("Phone Required").regex(/^(2|\+20)?01[0125][0-9]{8}$/, "enter Valid Phone")
  }).refine((obj) => {
    return obj.password === obj.rePassword
  }, {
    path: ['rePassword'],
    error: "Confirm password not match"
  })
  const RegisterForm = useForm<z.infer<typeof RegisterScheme>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(RegisterScheme)
  })
  async function handleRegister(values: z.infer<typeof RegisterScheme>) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`, {
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
    const data = await res.json()
    if (data.message == 'success') {
      toast.success("Account Created", { position: "top-center", duration: 5000 })
      Router.push("/login")
    }
  }

  return (
    <div className='w-3/4 mx-auto my-5'>
      <Form {...RegisterForm}>
        <form className='space-y-5' onSubmit={RegisterForm.handleSubmit(handleRegister)}>
          <FormField
            control={RegisterForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel >Enter Name:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={RegisterForm.control}
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
            control={RegisterForm.control}
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

          <FormField
            control={RegisterForm.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel >Enter rePassword:</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={RegisterForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel >Enter phone:</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='w-full bg-main rounded-3xl'>Register</Button>
        </form>
      </Form>
    </div>
  )
}
