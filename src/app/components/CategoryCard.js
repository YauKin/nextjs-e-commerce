'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import ImageComponent from './ImageComponent';

export default function CategoryCard({ category }) {
  return (
    <Link href={`/products?category=${category.slug}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg cursor-pointer">
        <CardHeader className="p-0">
          <div className="aspect-video relative">
            <ImageComponent
              src={category.image}
              alt={category.name}
              priority={false}
              className="w-full h-full group-hover:scale-105 transition-transform duration-300"
              objectFit="cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-center group-hover:text-primary transition-colors">
            {category.name}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
}