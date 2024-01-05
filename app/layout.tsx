import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from './components/nav'
// import { Analytics } from '@vercel/analytics/react';
// import { SpeedInsights } from '@vercel/speed-insights/next';
import { PreloadResources } from '@/app/preload'
import './globals.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NEETCLONE App',
  description: 'Leetcode clone of Neetcode',
}

// const cx = (...classes) => classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          {/* <Analytics /> */}
          {/* <SpeedInsights /> */}
          <PreloadResources />
        </main>
      </body>
    </html>
  )
}
