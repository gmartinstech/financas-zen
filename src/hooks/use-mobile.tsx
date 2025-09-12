'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Settings, User, Menu } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/icons';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ArrowLeftRight,
  FileText,
  Goal,
} from 'lucide-react';
import { cn } from '@/lib/utils';


const navItems = [
  { href: '/dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
  { href: '/transactions', icon: <ArrowLeftRight />, label: 'Transações' },
  { href: '/documents', icon: <FileText />, label: 'Documentos' },
  { href: '/budgets', icon: <Goal />, label: 'Orçamentos' },
];

export function Header() {
    const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6"
    >
      <div className="flex items-center gap-6">
         <Link href="/dashboard" className="flex items-center gap-2">
            <Logo className="size-6 text-primary" />
            <span className="font-headline text-lg font-semibold hidden sm:inline-block">FinançasZen</span>
          </Link>
        <nav className="hidden items-center gap-4 md:flex">
             {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname === item.href ? "text-primary" : "text-muted-foreground"
                    )}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
      </div>

      <div className="flex w-full items-center justify-end gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://picsum.photos/seed/1/100/100" alt="User Avatar" data-ai-hint="avatar user" />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Usuário</p>
                <p className="text-xs leading-none text-muted-foreground">
                  usuario@email.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Preferências</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
               <Link href="/login">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
         <div className="block md:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                {navItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                ))}
                 <DropdownMenuSeparator />
                 <DropdownMenuItem asChild>
                    <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Preferências</span>
                    </Link>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </header>
  );
}