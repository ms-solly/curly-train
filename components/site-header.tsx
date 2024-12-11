"use client";

import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import React from "react";

const links = [
  { title: "Home", href: "/home" },
  { title: "Matches", href: "/matches/live" },
  { title: "Tournaments", href: "/tournaments" },
  { title: "Players", href: "/proplayers" },
  { title: "Teams", href: "/teams" },
  { title: "Heroes", href: "/heroes" },
  { title: "Chat", href: "/chat" },
  { title: "News", href: "https://dailyblog-esport1.vercel.app", external: true },
];

export default function SiteHeader() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b text-gray-800">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Toggle Hamburger Button */}
          <button
            className={`text-2xl p-2 focus:outline-none border-none rounded transition-all duration-200 ${isOpen ? "bg-transparent text-transparent border-transparent focus:ring-0" : "bg-transparent text-gray-800"} hover:bg-[#E4003A]/10 hover:text-[#E4003A] focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 md:hidden`}
            onClick={toggleMenu}
            aria-label="Toggle Navigation"
          >
            {isOpen ? <AiOutlineClose /> : <FiMenu />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {links.map(({ title, href, external }) => (
              <Link
                key={title}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className={`block text-base font-semibold px-4 py-2 text-gray-800 rounded focus:ring-2 focus:ring-gray-500 hover:bg-[#E4003A]/10 hover:text-[#E4003A] focus:ring-offset-2 transition-all duration-200 ${external ? "text-[#E4003A]" : ""}`}
              >
                {title}
              </Link>
            ))}
            <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
              <div className="h-10 w-10 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-gray-700 hover:text-red-500 focus:ring-2 focus:ring-gray-500">
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
              <div className="h-10 w-10 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-gray-700 hover:text-red-500 focus:ring-2 focus:ring-gray-500">
                <Icons.twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
          </nav>

          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-95 z-20 overflow-y-auto p-4">
                    <button
            className={`absolute text-2xl p-2 focus:outline outline-double border-none rounded transition-all duration-200 ${isOpen ? "bg-gray-900 text-red-700" : "bg-transparent text-gray-800"} hover:bg-[#E4003A]/10 hover:text-white focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 md:hidden`}
            onClick={toggleMenu}
            aria-label="Toggle Navigation"
          >
            {isOpen ? <AiOutlineClose /> : <FiMenu />}
          </button>


          {/* Mobile Navigation Links */}
          <ul className="space-y-6 text-center mt-12">
            {links.map(({ title, href, external }) => (
              <li key={title}>
                <Link
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="block text-lg font-semibold px-6 py-3 text-white bg-gray-800 hover:bg-[#E4003A]/10 hover:text-red-500 rounded focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Social Icons (visible when mobile menu is open) */}
          <div className="mt-8 flex justify-center space-x-4">
            <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
              <div className="h-10 w-10 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-gray-700 hover:text-red-500 focus:ring-2 focus:ring-gray-500">
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
              <div className="h-10 w-10 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-gray-700 hover:text-red-500 focus:ring-2 focus:ring-gray-500">
                <Icons.twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
