import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tighter text-primary sm:text-5xl">Welcome to our Platform</h1>
        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
          Please sign in to access your account or create a new one.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button asChild size="lg">
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

