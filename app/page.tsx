import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import Image from "next/image"
import bgImage from "../../curly-train/public/bg.png"

export default function IndexPage() {
  return (
    <section className="relative h-screen w-screen overflow-hidden bg-gray-900 text-white">
    
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={bgImage}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>

    
      <div className="relative z-10 flex size-full items-center justify-center p-3">
        <div className="flex aspect-square w-[90%] max-w-[500px] flex-col items-start gap-6 rounded-lg bg-white/10 p-8 shadow-lg backdrop-blur-lg md:py-10">
          <h1 className="font-rubik text-2xl font-medium leading-tight tracking-tighter text-white md:text-4xl">
            Stay up-to-date with the latest in Dota 2 Esports.
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground" style={{ fontFamily: 'Rubik, sans-serif' }}>
            Explore team stats, tournament schedules, live match updates, and in-depth analyses. Dive into a comprehensive and visually engaging experience that keeps you connected to the world of Dota 2.
          </p>
          <div className="flex gap-4">
            <Link href="#" target="_blank" rel="noreferrer" className={buttonVariants()}>
              Login
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "outlineOnly" })}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
