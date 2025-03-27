import '../src/styles/globals.css'
import Layout from '../src/components/Layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GamesDwell - Play Amazing Games Online',
  description: 'Discover and play the best online games across multiple categories. Action, puzzle, strategy, and more!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}