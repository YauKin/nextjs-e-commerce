import Image from "next/image";
import Link from "next/link";
import productsData from "@/data/products.json";
import ImageComponent from "@/app/components/ImageComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Home() {
    const { products } = productsData;
    const featuredProducts = products.slice(0, 4);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[70vh] bg-gradient-to-r from-background to-secondary/20 dark:from-background dark:to-secondary/10">
                <div className="container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-2xl space-y-6">
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">
                            Welcome to Our <span className="text-primary">E-Shop</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Discover our curated collection of premium products
                        </p>
                        <Button size="lg" asChild>
                            <Link href="/products">Shop Now</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 bg-secondary/5">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center">Featured Products</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product) => (
                            <Card key={product.id} className="group overflow-hidden border-0 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
                                <Link href={`/products/${product.id}`}>
                                    <CardHeader className="p-0">
                                        <div className="aspect-square relative overflow-hidden rounded-t-xl bg-muted">
                                            <ImageComponent
                                                src={product.image}
                                                alt={product.name}
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                fill={true}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
                                            <span className="text-sm text-muted-foreground">{product.category}</span>
                                        </div>
                                    </CardContent>
                                </Link>
                            </Card>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/products" className="gap-2">
                                View All Products
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 bg-card">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Array.from(new Set(products.map(p => p.category))).slice(0, 3).map((category) => (
                            <Card key={category} className="group overflow-hidden border-0 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
                                <Link href={`/products?category=${category.toLowerCase()}`} className="block">
                                    <CardHeader className="p-0">
                                        <div className="relative h-48 overflow-hidden">
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
                                            <ImageComponent
                                                src={products.find(p => p.category === category)?.image || ''}
                                                alt={category}
                                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                fill={true}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                                            />
                                            <div className="absolute inset-0 z-20 flex items-center justify-center">
                                                <h3 className="text-2xl font-bold text-white">{category}</h3>
                                            </div>
                                        </div>
                                    </CardHeader>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Promotional Banner */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <Card className="bg-primary text-primary-foreground rounded-2xl overflow-hidden">
                        <CardContent className="p-8 md:p-12">
                            <div className="max-w-2xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">Special Offer</h2>
                                <p className="text-lg mb-6 text-primary-foreground/90">Get 20% off on your first purchase. Use code WELCOME20 at checkout.</p>
                                <Button variant="secondary" size="lg" asChild>
                                    <Link href="/products">Shop Now</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
