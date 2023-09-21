import Link from 'next/link'
import { auth } from '@clerk/nextjs'

export default async function Home() {
  const { userId } = await auth()
  let href = userId ? '/journal' : '/new-user'

  return (
    <main className="h-screen w-screen bg-black text-white">
      <nav className="py-6 px-4 h-[8%]">
        <ul className="flex justify-end items-center gap-x-7 pr-2">
          <Link href={userId ? 'journal' : '/sign-in'}>
            <li className="cursor-pointer hover:text-green-500">Log in</li>
          </Link>
          <Link href={userId ? 'journal' : '/sign-up'}>
            <li className="cursor-pointer bg-green-600 rounded-lg p-3 hover:shadow-2xl hover:shadow-green-500 hover:bg-green-500">
              Sign Up
            </li>
          </Link>
        </ul>
      </nav>
      <div className="h-[92%] items-center flex justify-center">
        <div className="w-[92%] md:w-full md:max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl">
            <span className="text-green-500">MOOD;</span> Your Journal Buddy.
          </h1>
          <p className="mt-4 lg:text-2xl text-white/60 ">
            Welcome to Mood, the cutting-edge journaling app that brings
            emotional intelligence to your fingertips. With Mood, you can
            effortlessly capture and understand your moods, fostering
            self-awareness and emotional well-being like never before
          </p>
          <div>
            <Link href={href}>
              <button className="bg-green-600 rounded-lg  p-4 capitalize mt-8 hover:bg-green-500 hover:shadow-2xl hover:shadow-green-500">
                get started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
