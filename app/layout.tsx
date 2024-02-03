'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from './components/nav'
// import { Analytics } from '@vercel/analytics/react';
// import { SpeedInsights } from '@vercel/speed-insights/next';
import { PreloadResources } from '@/app/preload'
import './globals.css'

import { RecoilRoot } from 'recoil'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

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
        <body>
          <main>
            <ToastContainer />
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
