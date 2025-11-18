import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { foodCategories } from '@/lib/categories';
import { ScanLine, ChevronRight } from 'lucide-react';

const featuredTests = [
  {
    category: 'Milk & Dairy',
    name: 'Test Milk for Detergent',
    slug: 'milk-and-dairy',
  },
  {
    category: 'Spices',
    name: 'Check Turmeric for Metanil Yellow',
    slug: 'spices',
  },
  {
    category: 'Fruits',
    name: 'Detect Artificial Wax on Apples',
    slug: 'fruits',
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

  return (
    <div>
      <section className="relative w-full h-[50vh] md:h-[60vh] text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-headline">
            Your Food, Safe and Pure.
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-neutral-200">
            Instantly check for common food adulterants with AI-powered analysis or simple home tests.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/detect">
              <ScanLine className="mr-2 h-5 w-5" />
              Scan with AI
            </Link>
          </Button>
        </div>
      </section>

      <section id="categories" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center font-headline">Explore by Category</h2>
          <p className="mt-2 text-center text-muted-foreground max-w-2xl mx-auto">
            Select a food category to learn about common adulterants and how to test for them at home.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mt-10">
            {foodCategories.map((category) => (
              <Link key={category.slug} href={`/tests/${category.slug}`} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center aspect-square">
                    <category.icon className="w-12 h-12 text-primary mb-3 transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="font-semibold text-base">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="tests" className="py-12 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center font-headline">Featured Manual Tests</h2>
          <p className="mt-2 text-center text-muted-foreground max-w-2xl mx-auto">
            Quick and easy tests you can perform right now to ensure your food is safe.
          </p>
          <div className="mt-10 max-w-3xl mx-auto space-y-4">
            {featuredTests.map((test) => (
              <Link key={test.name} href={`/tests/${test.slug}`}>
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-primary font-semibold">{test.category}</p>
                      <p className="font-medium">{test.name}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
