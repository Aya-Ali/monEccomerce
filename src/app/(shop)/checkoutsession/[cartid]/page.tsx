'use client'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { checkoutCash, checkoutPayment } from 'src/OrderAction'

export default function Checkoutsession() {
  const { cartid }: { cartid: string } = useParams()
  const route = useRouter()
  const ShippingForm = useForm({
    defaultValues: {
      "details": "",
      "phone": "",
      "city": ""
    }
  })

  async function handlecheckOutPayment(Values: { details: string, phone: string, city: string }) {
    let data = await checkoutPayment(cartid, Values)
    console.log(data);
    if (data.status == 'success') {

      // window.location.href = data.session.url
      window.open(data.session.url, "_self")
    }

  }
  async function handleCash(Values: { details: string, phone: string, city: string }) {
    let data = await checkoutCash(cartid, Values)
    console.log(data);
    if (data.status == 'success') {

      // window.location.href = data.session.url
      // window.open(data.session.url, "_self")
      route.push('/allorders')
      route.refresh()
    }

  }
  return (
    <div className='w-3/4 mx-auto my-5'>

      <h1 className='text-3xl'>Checkout Session</h1>
      <Form {...ShippingForm}>
        <form className='space-y-2' >
          <FormField
            control={ShippingForm.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel >Details:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={ShippingForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel >phone:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={ShippingForm.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel >city:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='bg-main text-white' onClick={ShippingForm.handleSubmit(handlecheckOutPayment)}>Pay</Button>
          <Button className='bg-main text-white' onClick={ShippingForm.handleSubmit(handleCash)}>cash</Button>
        </form>
      </Form>
    </div>
  )
}
