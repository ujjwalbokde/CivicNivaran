import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
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
      <body>{children}
        <Toaster position="top-right" reverseOrder={false} />
      </body>
      
    </html>
  )
}
