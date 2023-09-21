import { SignIn, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const SignInPage = async () => {
  const user = await currentUser()
  if (user) {
    redirect('/')
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[url('/bg.svg')] bg-cover">
      <SignIn afterSignInUrl={'/journal'} />
    </div>
  )
}

export default SignInPage
