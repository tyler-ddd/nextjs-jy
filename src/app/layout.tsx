
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create ext app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (

    <html lang="en">
      <body className={inter.className}>
      <Head>
        <script async src="https://telegram.org/js/telegram-web-app.js" />
      </Head>
      {children}
      </body>
    </html>
  )
}
