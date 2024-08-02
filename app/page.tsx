import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          <br className="hidden sm:inline" />
          Stay up-to-date with the latest in Dota 2 esports. 
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
        Explore team stats, tournament schedules, live match updates, and in-depth analyses. Dive into a comprehensive and visually engaging experience that keeps you connected to the world of Dota 2.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href="#"
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Login
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href="#"
          className={buttonVariants({ variant: "outline" })}
        >
          Contact
        </Link>
      </div>
    </section>
  )
}
