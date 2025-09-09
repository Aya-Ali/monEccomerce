import { getServerSession } from 'next-auth'
import React from 'react'
import { nextAuthOptions } from 'src/app/api/auth/[...nextauth]/route'

export default async function page() {
  let data = await getServerSession(nextAuthOptions)
  console.log(data?.user.name);

  return (
    <div>page</div>
  )
}
