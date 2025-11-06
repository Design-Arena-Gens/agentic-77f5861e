import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Financial Assistant',
  description: 'Multi-Agent Personal Finance Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
