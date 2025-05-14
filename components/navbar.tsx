"use-client";

import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';
import { Sparkles } from 'lucide-react';
import { Poppins } from 'next/font/google'
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { ModeToggle } from './mode-toggle';
import MobileSidebar from './mobile-sidebar';

const font = Poppins({
    weight: "600",
    subsets: ["latin"]
});

const Navbar = () => {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
      <div className="flex items-center">
        <MobileSidebar />
        <Link href="/">
          <h1 className={cn(
            "hidden md:block text-lg md:text-3xl font-bold text-primary",
            font.className            
            )}>
            mIla
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <Button variant="premium" size="sm">
            Upgrade
            <Sparkles className="ml-2 h-4 w-4 text-white fill-white"/>
        </Button>
        <ModeToggle/>
        <UserButton afterSignOutUrl='/'/>
      </div>
    </div>
  )
}

export default Navbar;