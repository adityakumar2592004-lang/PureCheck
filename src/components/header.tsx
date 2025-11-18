import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="py-3 px-4 md:px-6 bg-card/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold font-headline text-foreground">PureCheck</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/#categories" className="text-muted-foreground hover:text-foreground transition-colors">
            Categories
          </Link>
          <Link href="/#tests" className="text-muted-foreground hover:text-foreground transition-colors">
            Manual Tests
          </Link>
        </nav>
        <Button asChild variant="outline">
          <Link href="/detect">AI Scan</Link>
        </Button>
      </div>
    </header>
  );
}
