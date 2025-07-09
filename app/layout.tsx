import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CivicNivaran',
  description: 'A platform for civic engagement and problem resolution',
  generator: 'CivicNivaran',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
