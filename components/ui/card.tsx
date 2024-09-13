import * as React from "react"

import { cn } from "@/lib/utils"
import { AiOutlineArrowRight } from "react-icons/ai"
import Link from "next/link"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 inline-block w-full relative", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight uppercase inline-block",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"


interface CornerButtonProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const CornerButton = React.forwardRef<HTMLAnchorElement, CornerButtonProps>(
  ({ className, children, ...props }, ref) => (
    <Link
      ref={ref}
      className={cn(
        "sticky top-2 right-0 ml-auto uppercase w-fit bg-gray-800 p-1 rounded hover:bg-gray-700/95 flex items-center justify-center space-x-2 absolute mx-2",
        className
      )}
      {...props}
    >
      {children}
      <AiOutlineArrowRight />
    </Link>
  )
);

CornerButton.displayName = 'CornerButton';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent,CornerButton }
