'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, Home, CreditCard, Settings } from 'lucide-react';

import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from './Logo';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
      // Don't need to redirect here as the auth state change will handle it
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getUserInitials = () => {
    if (!user) return '';
    const firstName = user.user_metadata?.first_name || '';
    const lastName = user.user_metadata?.last_name || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U';
  };

  return (
    <header
      className={cn(
        'fixed left-0 top-0 z-50 w-full transition-all duration-300',
        'bg-background/80 shadow-md backdrop-blur-sm'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/">
          <Logo />
          <span className="sr-only">Isithebe seMbokodo Home</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'font-medium text-foreground/70 transition-colors hover:text-primary',
                pathname === link.href && 'text-primary font-semibold'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || 'User'} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.user_metadata?.first_name} {user.user_metadata?.last_name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center cursor-pointer">
                    <Home className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/membership" className="flex items-center cursor-pointer">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Membership
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="flex items-center cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background">
              <div className="flex h-full flex-col">
                <div className="mb-8 flex items-center justify-between">
                  <Link href="/">
                    <Logo />
                  </Link>
                </div>
                <nav className="flex flex-col items-start gap-6">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'text-xl font-medium text-foreground/70 transition-colors hover:text-primary',
                        pathname === link.href && 'text-primary'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  
                  {/* Dashboard Navigation for authenticated users */}
                  {user && (
                    <div className="w-full">
                      <div className="border-t pt-4 mt-4">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                          Dashboard
                        </h3>
                        <div className="space-y-2">
                          <Link
                            href="/dashboard"
                            className={cn(
                              'flex items-center gap-3 text-lg font-medium text-foreground/70 transition-colors hover:text-primary',
                              pathname === '/dashboard' && 'text-primary'
                            )}
                          >
                            <Home className="h-5 w-5" />
                            Dashboard
                          </Link>
                          <Link
                            href="/dashboard/membership"
                            className={cn(
                              'flex items-center gap-3 text-lg font-medium text-foreground/70 transition-colors hover:text-primary',
                              pathname === '/dashboard/membership' && 'text-primary'
                            )}
                          >
                            <CreditCard className="h-5 w-5" />
                            Membership
                          </Link>
                          <Link
                            href="/dashboard/profile"
                            className={cn(
                              'flex items-center gap-3 text-lg font-medium text-foreground/70 transition-colors hover:text-primary',
                              pathname === '/dashboard/profile' && 'text-primary'
                            )}
                          >
                            <User className="h-5 w-5" />
                            Profile
                          </Link>
                          <Link
                            href="/dashboard/settings"
                            className={cn(
                              'flex items-center gap-3 text-lg font-medium text-foreground/70 transition-colors hover:text-primary',
                              pathname === '/dashboard/settings' && 'text-primary'
                            )}
                          >
                            <Settings className="h-5 w-5" />
                            Settings
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </nav>
                <div className="mt-auto space-y-2">
                  {user ? (
                    <>
                      {/* User Profile Section */}
                      <div className="border-t pt-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
                            {getUserInitials()}
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {user.user_metadata?.first_name} {user.user_metadata?.last_name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button onClick={handleSignOut} variant="destructive" className="w-full">
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild className="w-full">
                        <Link href="/auth/login">Sign In</Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/auth/register">Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
