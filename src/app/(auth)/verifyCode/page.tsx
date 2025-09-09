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
import { InputOTP, InputOTPGroup, InputOTPSlot } from 'src/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'

export default function VerifyCode() {
    const Router = useRouter()
    const VerifyCodeScheme = z.object({
        resetCode: z.string().nonempty("required"),
    })
    const VerifyCodeForm = useForm<z.infer<typeof VerifyCodeScheme>>({
        defaultValues: {
            resetCode: "",

        },
        resolver: zodResolver(VerifyCodeScheme)
    })
    async function handleVerifyCode(values: z.infer<typeof VerifyCodeScheme>) {

        console.log(values);
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`, {
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
           if (data.status == 'Success') {
             toast.success("Success", { position: "top-center", duration: 5000 })
             Router.push("/resetPassword")
           }
    }

    return (
        <div className='w-3/4 mx-auto my-5'>
            <Form {...VerifyCodeForm}>
                <form className='space-y-5' onSubmit={VerifyCodeForm.handleSubmit(handleVerifyCode)}>

                    <FormField
                        control={VerifyCodeForm.control}
                        name="resetCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Enter Verify Code:</FormLabel>
                                <FormControl>
                                    <InputOTP {...field}
                                        maxLength={6}
                                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                                    >
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />

                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />




                    <Button className='w-full bg-main rounded-3xl'>Verify Code</Button>
                </form>
            </Form>
        </div>
    )
}
