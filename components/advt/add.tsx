"use client";

import * as React from "react";
import { Button } from "../ui/button";

export default function ADDVT() {
  const [isVisible, setIsVisible] = React.useState(true);

  const closeAdSection = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className=" ad-section bg-gradient-to-r from-[#E4003A] to-[#FF5959] text-white h-14 w-full flex items-center justify-between px-6 border-b-2 border-gray-950 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="text-lg font-semibold">
            <span>Sponsored Ad</span>
          </div>
        </div>

        <Button
          onClick={closeAdSection}
          className="text-white text-2xl font-bold p-1 hover:bg-opacity-80 rounded-full focus:outline-none bg-transparent hover:bg-transparent"
          aria-label="Close Advertisement"
        >
          &times;
        </Button>
      </div>
    )
  );
}
