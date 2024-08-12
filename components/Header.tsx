"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const matches: { title: string; href: string; description: string }[] = [
  {
    title: "UpComing Matches",
    href: "/matches/upcoming",
    description:
      "Explore Upcoming matches of Dota 2",
  },
  {
    title: "Live Matches",
    href: "/matches/live",
    description:
      "Explore live matches of Dota 2",
  },
  {
    title: "Past Matches",
    href: "/matches/prev",
    description:
      "Explore Past matches of Dota 2",
  }
]
const tournament: { title: string; href: string; description: string }[] = [
  {
    title: "UpComing Tournaments",
    href: "/tournament/upcoming",
    description:
      "Explore Upcoming tournaments of Dota 2",
  },
  {
    title: "Live Tournaments",
    href: "/tournament/live",
    description:
      "Explore live tournaments of Dota 2",
  },
  {
    title: "Past Tournaments",
    href: "/tournament/prev",
    description:
      "Explore Past tournaments of Dota 2",
  }
]

export default function NavigationMenuDemo() {
  return (
    <div className="m-2 flex w-full justify-center z-50">
    <NavigationMenu className="">
      <NavigationMenuList className="">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Matches</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {matches.map((match) => (
                <ListItem
                  key={match.title}
                  title={match.title}
                  href={match.href}
                >
                  {match.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Tournament</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {tournament.map((tournament) => (
                <ListItem
                  key={tournament.title}
                  title={tournament.title}
                  href={tournament.href}
                >
                  {tournament.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/players" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Players
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link href="/teams" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Teams
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/heroes" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} >
            Heroes
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/chat" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} >
            Chat
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="https://dailyblog-esport1.vercel.app" target="_blank" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} target="_blank">
            News
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
