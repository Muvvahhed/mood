import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import HomePage from '../app/page'

vi.mock('@clerk/nextjs', () => {
  return {
    auth: () => new Promise((resolve) => resolve({ userId: 'sbvikrhokme' })),
    ClerkProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'sbvikrhokme',
        fullName: 'John Doe',
      },
    }),
  }
})

vi.mock('next/font/google', () => {
  return {
    Inter: () => ({ className: 'Inter' }),
  }
})

test('Home', async () => {
  render(await HomePage())
  expect(screen.getByText('Your Journal Buddy.')).toBeTruthy()
})
