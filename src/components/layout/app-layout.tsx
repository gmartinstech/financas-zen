import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Header } from './header';
import { SidebarNav } from './sidebar-nav';
import { Logo } from '@/components/icons';
import { Button } from '../ui/button';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar
        variant="sidebar"
        collapsible="icon"
        className="border-sidebar-border"
      >
        <SidebarHeader>
          <Link href="/dashboard" className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="flex size-8 items-center justify-center p-0"
              aria-label="Home"
            >
              <Logo className="size-6 text-primary" />
            </Button>
            <span className="font-headline text-lg font-semibold">FinançasZen</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter>
           <Link href="/login" legacyBehavior passHref>
             <Button variant="ghost" className="w-full justify-start gap-2 p-2 text-left">
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
             </Button>
            </Link>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="min-h-screen bg-background">
        <Header />
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
