import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import SiteHeader from "@/components/site-header"
import Image from "next/image"
import Head from "next/head"
import bgImg from '../public/bg.png'
import Advertizement from "@/components/advt/add"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <div className="relative min-h-screen text-white">
          <Image src={bgImg} alt="Background Image" fill style={{ objectFit: 'cover' }} className="z-0 opacity-50" />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
            <Advertizement/>
              <SiteHeader />
              <div className="z-1 flex-1">{children}</div>
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
