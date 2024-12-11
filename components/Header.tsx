"use client";

import * as React from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { cn } from "@/lib/utils";

const links = [
  { title: "Matches", href: "/matches/live" },
  { title: "Tournaments", href: "/tournaments" },
  { title: "Players", href: "/proplayers" },
  { title: "Teams", href: "/teams" },
  { title: "Heroes", href: "/heroes" },
  { title: "Chat", href: "/chat" },
  { title: "News", href: "https://dailyblog-esport1.vercel.app", external: true },
];

export default function NavigationMenuDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative z-10 flex w-full justify-between items-center px-4 py-2 bg-gray-800 text-white shadow-md">
      <div className="text-lg font-bold">Dota 2 Hub</div>
      <button
        className="text-2xl p-2 focus:outline-none border-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 md:hidden"
        onClick={toggleMenu}
        aria-label="Toggle Navigation"
      >
        {isOpen ? <AiOutlineClose /> : <FiMenu />}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6">
        {links.map(({ title, href, external }) => (
          <Link key={title} href={href} legacyBehavior passHref>
            <a
              className={cn("text-sm px-3 py-2 hover:bg-gray-700 rounded")}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
            >
              {title}
            </a>
          </Link>
        ))}
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-95 z-20 overflow-y-auto p-4">
          <button
            className="absolute top-4 right-4 text-3xl text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Close Navigation"
          >
            <AiOutlineClose />
          </button>
          <ul className="space-y-6 text-center mt-12">
            {links.map(({ title, href, external }) => (
              <li key={title}>
                <Link href={href} legacyBehavior passHref>
                  <a
                    className="block text-lg font-semibold px-6 py-3 text-white bg-gray-800 hover:bg-gray-700 rounded focus:ring-2 focus:ring-gray-500"
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    {title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
