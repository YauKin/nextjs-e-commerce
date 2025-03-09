import Image from "next/image";
import Link from "next/link";
import productsData from "@/data/products.json";
import ImageComponent from "@/app/components/ImageComponent";

export default function Home() {
    const { products } = productsData;
    const featuredProducts = products.slice(0, 4);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] bg-gray-100 dark:bg-gray-900">
                <div className="container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Our E-Shop</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Discover our curated collection of premium products</p>
                        <Link
                            href="/products"
                            className="inline-block bg-foreground text-background px-8 py-3 rounded-full hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            <Link
                                href={`/products/${product.id}`}
                                key={product.id}
                                className="group"
                            >
                                <div className="relative h-64 mb-4 bg-gray-200 rounded-lg overflow-hidden">
                                    <ImageComponent
                                        src={product.image}
                                        alt={product.name}
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        fill={false}
                                        width={800}
                                        height={600}
                                    />
                                </div>
                                <h3 className="font-semibold mb-2">{product.name}</h3>
                                <p className="text-lg font-bold">${product.price}</p>
                            </Link>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link
                            href="/products"
                            className="inline-block border border-foreground px-8 py-3 rounded-full hover:bg-foreground hover:text-background transition-colors"
                        >
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Array.from(new Set(products.map(p => p.category))).slice(0, 3).map((category) => (
                            <div key={category} className="relative h-48 group overflow-hidden rounded-lg">
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
                                <ImageComponent
                                    src={products.find(p => p.category === category)?.image || ''}
                                    alt={category}
                                    className="h-full w-full"
                                    fill={false}
                                    width={800}
                                    height={600}
                                />
                                <div className="absolute inset-0 z-20 flex items-center justify-center">
                                    <h3 className="text-2xl font-bold text-white">{category}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Promotional Banner */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="bg-foreground text-background rounded-2xl p-8 md:p-12">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Special Offer</h2>
                            <p className="text-lg mb-6">Get 20% off on your first purchase. Use code WELCOME20 at checkout.</p>
                            <Link
                                href="/products"
                                className="inline-block bg-background text-foreground px-8 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
