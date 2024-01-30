'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from './components/nav'
// import { Analytics } from '@vercel/analytics/react';
// import { SpeedInsights } from '@vercel/speed-insights/next';
import { PreloadResources } from '@/app/preload'
import './globals.css'

import { RecoilRoot } from 'recoil'

const inter = Inter({ subsets: ['latin'] })

// fix this
// export const metadata: Metadata = {
//   title: 'NEETCLONE!',
//   description: 'Leetcode clone of Neetcode, webapp',

// }

// const cx = (...classes) => classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RecoilRoot>
      <html lang="en">
        {/* <body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
          <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0"> */}
        <body>
            <main>  
            {/* possible to move somewhere else */}
              {children}
            {/* <Analytics /> */}
            {/* <SpeedInsights /> */}
            <PreloadResources />
          </main>
        </body>
      </html> 
    </RecoilRoot>
  )
}
