'use client'
import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "src/components/ui/navigation-menu"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { CountContext } from "src/CountContext"


export default function Navbar() {
  const { data, status } = useSession()
  const pathName: string = usePathname()
  const CountData = React.useContext(CountContext)
  const MenuItems: { path: string, content: string, Protected: boolean }[] = [
    { path: "/home", content: "Home", Protected: false },
    { path: "/products", content: "Products", Protected: false },
    { path: "/category", content: "Category", Protected: false },
    { path: "/cart", content: "Cart", Protected: true },
    { path: "/wishlist", content: "Wishlist", Protected: false },
    { path: "/allorders", content: "Orders", Protected: true },
  ]
  const MenuAuthItems: { path: string, content: string }[] = [
    { path: "/login", content: "Login" },
    { path: "/register", content: "Register" },

  ]
  function logout() {
    // cookies , remove session user
    signOut({ callbackUrl: "/login" })
  }
  return (
    <NavigationMenu viewport={false} className="shadow-2xl p-5 max-w-full  justify-between">
      <NavigationMenuList>

        <NavigationMenuItem >
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href='/'>
              <Image src='/images/freshcart-logo.svg' alt="logo" width={100} height={100} />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {
          MenuItems.map((item) => {


            return <NavigationMenuItem key={item.path}>
              {
                item.Protected && status == 'authenticated' && <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link className={pathName == item.path ? "text-main relative" : "relative"} href={item.path}>

                    {item.content}

                    {item.path == '/cart' && <span className="absolute top-0 right-0"> {CountData?.count} </span>}

                  </Link>
                </NavigationMenuLink>
              }

              {
                !item.Protected && <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link className={pathName == item.path ? "text-main" : ""} href={item.path}>{item.content}</Link>
                </NavigationMenuLink>
              }
            </NavigationMenuItem>

          })
        }


      </NavigationMenuList>
      <NavigationMenuList>


        {
          status == "authenticated" ? <>
            <NavigationMenuItem >
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <span onClick={logout}>Logout</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem >
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <span className="bg-red-400 p-5">hello {data?.user.name}</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </> : <>

            {
              MenuAuthItems.map((item) => {
                return <NavigationMenuItem key={item.path}>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link className={pathName == item.path ? "text-main" : ""} href={item.path}>{item.content}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              })
            }

          </>
        }






      </NavigationMenuList>
    </NavigationMenu >
  )
}

