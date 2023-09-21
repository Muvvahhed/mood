import './globals.css'
import { Inter, Montserrat, Lato } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/theme_provider'

const inter = Inter({ subsets: ['latin'] })

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})
const lato = Lato({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '700'],
})

export const metadata = {
  title: 'Mood',
  description: 'An AI powered Journaling App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${montserrat.variable} ${lato.variable}`}>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
