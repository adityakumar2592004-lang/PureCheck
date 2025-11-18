import { notFound } from 'next/navigation';
import { manualTestsData, FoodItem } from '@/lib/manual-tests';
import { foodCategories } from '@/lib/categories';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FlaskConical, TestTube } from 'lucide-react';
import Link from 'next/link';

type Props = {
  params: { category: string };
};

export async function generateStaticParams() {
  return foodCategories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
    const categoryInfo = foodCategories.find(c => c.slug === params.category);
    const title = categoryInfo ? `Tests for ${categoryInfo.name}` : 'Manual Tests';

    return {
        title: `${title} | PureCheck`,
        description: `Learn how to perform simple home tests for adulterants in ${categoryInfo?.name.toLowerCase()}.`,
    };
}


export default function CategoryTestsPage({ params }: Props) {
  const { category } = params;
  const testsData = manualTestsData[category];
  const categoryInfo = foodCategories.find(c => c.slug === category);

  if (!testsData || !categoryInfo) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8">
            <Link href="/#categories" className="text-sm text-muted-foreground hover:text-primary transition-colors">&larr; Back to Categories</Link>
        </div>
        <header className="text-center mb-12">
            <div className="flex justify-center items-center gap-4">
                <categoryInfo.icon className="w-12 h-12 text-primary" />
                <h1 className="text-4xl font-bold font-headline text-primary">
                    Manual Tests for {categoryInfo.name}
                </h1>
            </div>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
                Simple do-it-yourself tests to check for common adulterants in {categoryInfo.name.toLowerCase()}.
            </p>
      </header>
      
      <div className="max-w-4xl mx-auto">
        {testsData.map((foodItem: FoodItem) => (
          <Card key={foodItem.name} className="mb-6">
            <CardHeader>
              <CardTitle>{foodItem.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {foodItem.tests.map((test, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="font-semibold text-left">
                      Test for: {test.adulterant}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <TestTube className="w-5 h-5 text-accent" />
                          Test Procedure
                        </h4>
                        <p className="text-muted-foreground">{test.test}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <FlaskConical className="w-5 h-5 text-accent" />
                          Scientific Explanation
                        </h4>
                        <p className="text-muted-foreground">{test.explanation}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
