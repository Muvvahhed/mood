import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ModeToggle } from '@/components/ModeToggle'
import Image from 'next/image'
import Spinner from '@/components/ui/spinner'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const links = [
    { href: '/journal', label: 'journal' },
    { href: '/history', label: 'history' },
  ]
  return (
    <div
      className={`w-full h-screen flex flex-col text-black bg-white/80 dark:bg-[#09090b] dark:text-white`}
    >
      <nav className="h-[10%] w-full flex items-center md:pl-10 pr-6 border-b dark:bg-[#09090b] gap-x-2 md:gap-x-5 dark:border-[#27272a] ">
        <div className="text-4xl font-bold text-green-500 font-montserrat"></div>
        <Link href={'/'}>
          <Image
            src="/mood-high-resolution-logo-color-on-transparent-background(1).png"
            alt="logo"
            width={120}
            height={120}
            about="logo"
          />
        </Link>
        <div className="ml-auto">
          <ModeToggle />
        </div>
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
      <div className="h-[90%] flex">
        <aside className="w-[15%] h-full hidden md:block border-r dark:border-[#27272a] font-sans px-2 pt-2">
          {/* <div>Mood</div> */}
          <ul className="flex w-full flex-col gap-4 items-stretch">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className={`capitalize flex justify-center items-center h-16 text-xl hover:bg-[#22c55e66] hover:rounded-md cursor-pointer dark:hover:bg-inherit dark:hover:text-primary-green `}
              >
                <li>{link.label}</li>
              </Link>
            ))}
          </ul>
        </aside>
        <div className="flex flex-col w-full md:w-[85%] h-full">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
