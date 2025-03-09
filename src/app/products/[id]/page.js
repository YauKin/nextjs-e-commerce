import Link from "next/link";
import productsData from "@/data/products.json";
import AddToCartButton from "@/app/components/AddToCartButton";
import ImageComponent from "@/app/components/ImageComponent";

// Components for better organization
const BackToProducts = () => (
    <Link href="/products" className="text-blue-600 hover:underline inline-block">
        ← Back to Products
    </Link>
);

const ProductImage = ({ image, name }) => (
    <ImageComponent
        src={image}
        alt={name}
        className="h-96 bg-gray-200 rounded-lg overflow-hidden"
        priority // Optimize loading for above-the-fold image
        fill={false}
        width={800}
        height={600}
    />
);

const ProductFeatures = ({ features }) => (
    <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Features</h2>
        <ul className="list-disc list-inside space-y-1">
            {features.map((feature, index) => (
                <li key={index} className="text-gray-600">{feature}</li>
            ))}
        </ul>
    </div>
);

const ProductSpecifications = ({ specifications }) => (
    <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Specifications</h2>
        <div className="grid grid-cols-2 gap-2">
            {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                    <span className="text-gray-500 capitalize">{key}</span>
                    <span className="font-medium">{value}</span>
                </div>
            ))}
        </div>
    </div>
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
                <ProductImage image={product.image} name={product.name} />

                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="text-2xl font-bold mb-4">${product.price}</div>
                    <div className="mb-6">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                            {product.category}
                        </span>
                    </div>

                    <ProductFeatures features={product.features} />
                    <ProductSpecifications specifications={product.specifications} />

                    <div className="mt-auto">
                        <div className="text-gray-600 mb-2">
                            Stock: {product.stock} units available
                        </div>
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}