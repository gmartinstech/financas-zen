import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/icons"

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-4">
       <Link href="/" className="flex items-center gap-2 text-foreground">
        <Logo className="h-8 w-8 text-primary" />
        <span className="font-headline text-2xl font-semibold">FinançasZen</span>
      </Link>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Digite seu e-mail abaixo para entrar em sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="nome@exemplo.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full asChild">
            <Link href="/dashboard">Entrar</Link>
          </Button>
          <Button variant="outline" className="w-full">
            Entrar com Google
          </Button>
           <div className="mt-4 text-center text-sm">
            Não tem uma conta?{" "}
            <Link href="#" className="underline">
              Inscreva-se
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
