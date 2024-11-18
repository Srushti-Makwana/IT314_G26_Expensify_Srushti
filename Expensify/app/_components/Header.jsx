"use client";

import React from "react";
import { Button } from "@/components/ui/button"; // Updated import path based on alias
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link"; // Import Link for navigation
import Image from "next/image"; // Import Image component


function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-4 flex justify-between items-center bg-gradient-to-r from-blue-800 via-gray-800 to-black shadow-md">
      {/* Logo image with link to home */}
      <Link href="/" passHref>
        <Image
          src="/logo.png" // Ensure logo.png is in the 'public' folder
          alt="Expensify Logo"
          width={80}
          height={40}
          className="object-contain cursor-pointer"
        />
      </Link>

      <div className="flex gap-4">
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Link href="/sign-in" passHref>
            <Button className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200">
              Get Started
            </Button>
          </Link>
        )}
        <Link href="/dashboard" passHref>
          <Button className="px-6 py-2 text-white bg-gray-700 hover:bg-gray-800 transition-all duration-200">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
