import Link from "next/link";
import productsData from "@/data/products.json";
import AddToCartButton from "@/app/components/AddToCartButton";
import ImageComponent from "@/app/components/ImageComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Components for better organization
const BackToProducts = () => (
    <Button variant="link" asChild className="p-0 h-auto">
        <Link href="/products" className="inline-flex items-center gap-1">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
            Back to Products
        </Link>
    </Button>
);

// Import the new ProductImageCarousel component
import ProductImageCarousel from "@/app/components/ProductImageCarousel";

const ProductImage = ({ image, name }) => (
    <ProductImageCarousel
        mainImage={image}
        productName={name}
    />
);

const ProductFeatures = ({ features }) => (
    <Card className="mb-6 shadow-sm">
        <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3">Features</h2>
            <ul className="list-disc list-inside space-y-2">
                {features.map((feature, index) => (
                    <li key={index} className="text-muted-foreground">{feature}</li>
                ))}
            </ul>
        </CardContent>
    </Card>
);

const ProductSpecifications = ({ specifications }) => (
    <Card className="mb-6 shadow-sm">
        <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3">Specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className="flex flex-col border-b pb-2">
                        <span className="text-muted-foreground capitalize text-sm">{key}</span>
                        <span className="font-medium">{value}</span>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

export default async function ProductDetailPage({ params }) {
    const { id } = await params;
    const productId = parseInt(id);
    const product = productsData.products.find(p => p.id === productId);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600">Product Not Found</h1>
                    <div className="mt-4">
                        <BackToProducts />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <BackToProducts />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="overflow-hidden border-0 shadow-md">
                    <CardContent className="p-0">
                        <ProductImage image={product.image} name={product.name} />
                    </CardContent>
                </Card>

                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-muted-foreground mb-6">{product.description}</p>
                    <div className="text-2xl font-bold text-primary mb-4">${product.price.toFixed(2)}</div>
                    <div className="mb-6">
                        <Badge variant="secondary" className="text-sm">
                            {product.category}
                        </Badge>
                    </div>

                    <ProductFeatures features={product.features} />
                    <ProductSpecifications specifications={product.specifications} />

                    <div className="mt-auto">
                        <Card className="bg-secondary/10 border-0 shadow-sm mb-4">
                            <CardContent className="py-3">
                                <div className="text-muted-foreground">
                                    Stock: <span className="font-medium text-foreground">{product.stock} units available</span>
                                </div>
                            </CardContent>
                        </Card>
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}