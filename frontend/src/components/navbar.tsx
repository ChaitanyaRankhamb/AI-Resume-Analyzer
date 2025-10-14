"use client";
import * as React from "react";
import Link from "next/link";
import { Menu, FileText } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import isLoggedIn from "./IsLoggedIn";

const navigation = [
  { name: "Home", href: "#hero" },
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  // Fetch logged-in status on mount
  React.useEffect(() => {
    const checkLoggedIn = async () => {
      const result = await isLoggedIn(); // must return a promise
      setLoggedIn(result);
    };
    checkLoggedIn();
  }, []);

  const handleSmoothScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                  <FileText className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 blur-sm -z-10" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                ResumeAI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleSmoothScroll(item.href)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative group cursor-pointer"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {loggedIn ? (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/profile">Profile</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/sign-in">Login</Link>
                </Button>
                <Button size="sm" className="relative overflow-hidden group" asChild>
                  <Link href="/sign-up">
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </Link>
                </Button>
              </>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center md:hidden space-x-2">
            {loggedIn && (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/profile">Profile</Link>
              </Button>
            )}

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8 px-4">
                  {/* Mobile Logo */}
                  <div className="flex items-center space-x-2 pb-4 border-b border-border">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold">ResumeAI</span>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-2">
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleSmoothScroll(item.href)}
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-2 text-left cursor-pointer"
                      >
                        {item.name}
                      </button>
                    ))}
                  </nav>

                  {/* Mobile Actions */}
                  <div className="pt-4 border-t border-border flex flex-col gap-2">
                    {!loggedIn && (
                      <>
                        <Button variant="ghost" className="justify-start border-2 border-border" asChild>
                          <Link href="/sign-in">Login</Link>
                        </Button>
                        <Button className="justify-end" asChild>
                          <Link href="/sign-up">Sign Up</Link>
                        </Button>
                      </>
                    )}
                    <ThemeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
