import { SignUp, currentUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const SignUpPage = async () => {
  const user = await currentUser()
  if (user) {
    redirect('/')
  }
  return (
    <div className="w-screen h-screen flex flex-col bg-[url('/bg.svg')] bg-cover">
      <div className="flex p-4">
        <Link href={'/'}>
          <Image
            src="/mood-high-resolution-logo-color-on-transparent-background(1).png"
            alt="logo"
            width={120}
            height={120}
            about="logo"
          />
        </Link>
      </div>
      <div className="m-auto">
        <SignUp afterSignUpUrl={'/auth'} redirectUrl={'/auth'} />
      </div>
    </div>
  )
}

export default SignUpPage
