'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'

import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'

const SideMenu = () => {
  const router = useRouter()
  return (
    <Sheet>
      <SheetTrigger>
        <HamburgerMenuIcon className="h-8 w-8" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetDescription className="flex justify-center flex-col gap-y-7 mt-10">
            <SheetClose
              className="text-xl text-center hover:text-green-500"
              onClick={(e) => {
                router.push('/journal')
              }}
            >
              Journal
            </SheetClose>
            <SheetClose
              className="text-xl text-center hover:text-green-500"
              onClick={(e) => {
                router.push('/history')
              }}
            >
              History
            </SheetClose>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default SideMenu
