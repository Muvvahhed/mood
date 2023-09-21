import { SignUp, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const SignUpPage = async () => {
  const user = await currentUser()
  if (user) {
    redirect('/')
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[url('/bg.svg')] bg-cover">
      <SignUp afterSignUpUrl={'/new-user'} redirectUrl={'/new-user'} />
    </div>
  )
}

export default SignUpPage
