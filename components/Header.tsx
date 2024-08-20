"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
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
    title: "Upcoming Matches",
    href: "/matches/upcoming",
    description: "Explore upcoming matches of Dota 2",
  },
  {
    title: "Live Matches",
    href: "/matches/live",
    description: "Explore live matches of Dota 2",
  },
  {
    title: "Past Matches",
    href: "/matches/past",
    description: "Explore past matches of Dota 2",
  },
]

const tournament: { title: string; href: string; description: string }[] = [
  {
    title: "Upcoming Tournaments",
    href: "/tournament/upcoming",
    description: "Explore upcoming tournaments of Dota 2",
  },
  {
    title: "Live Tournaments",
    href: "/tournament/live",
    description: "Explore live tournaments of Dota 2",
  },
  {
    title: "Past Tournaments",
    href: "/tournament/past",
    description: "Explore past tournaments of Dota 2",
  },
]

export default function NavigationMenuDemo() {
  return (
    <div className="m-2 flex w-full justify-center z-50">
      <NavigationMenu className="w-full max-w-7xl">
        <NavigationMenuList className="flex flex-wrap justify-center gap-2">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="px-4 py-2 text-base sm:px-2 sm:py-1 sm:text-sm">Matches</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 p-3 sm:grid-cols-2 lg:grid-cols-3">
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
            <NavigationMenuTrigger className="px-4 py-2 text-base sm:px-2 sm:py-1 sm:text-sm">Tournaments</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 p-3 sm:grid-cols-2 lg:grid-cols-3">
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
            <Link href="/proplayers" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "px-4 py-2 text-base sm:px-2 sm:py-1 sm:text-sm")}>
                Players
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/teams" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "px-4 py-2 text-base sm:px-2 sm:py-1 sm:text-sm")}>
                Teams
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/heroes" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "px-4 py-2 text-base sm:px-2 sm:py-1 sm:text-sm")}>
                Heroes
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>


          <NavigationMenuItem>
            <Link href="/chat" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "px-4 py-2 text-base sm:px-2 sm:py-1 sm:text-sm")}>
                Chat
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="https://dailyblog-esport1.vercel.app" target="_blank" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), "px-4 py-2 text-base sm:px-2 sm:py-1 sm:text-sm")}
                target="_blank"
              >
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
            "block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-xs font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
