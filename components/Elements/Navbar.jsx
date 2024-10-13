"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Car, LogOut, Menu, User } from "lucide-react"
import { ModeToggle } from "../Mode-Toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-6xl mx-auto flex h-14 items-center justify-between">
        <div className="logo">
          <Link href="/" className="flex items-center justify-center space-x-2">
            <span className="font-bold">CarListings</span>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <ModeToggle />
          {status === "loading" ? (
            <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user?.image ?? ""} alt={session.user?.name ?? ""} />
                    <AvatarFallback>{session.user?.name?.[0] ?? "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="flex flex-row items-center space-x-2">
                  <div className="">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user?.image ?? ""} className="bg-green-500 object-cover" alt={session.user?.name ?? ""} />
                    <AvatarFallback className="bg-green-500 text-white">{session.user?.name?.[0] ?? "U"}</AvatarFallback>
                  </Avatar>
                  </div>
                  <div className="">
                  <div className="text-sm font-medium">{session.user?.name}</div>
                  <div className="text-xs text-muted-foreground">{session.user?.email}</div>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onSelect={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
