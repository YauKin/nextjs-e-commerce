import ImageComponent from "@/app/components/ImageComponent";
import Link from "next/link";
import productsData from "@/data/products.json";

export default function ProductsPage() {
  const { products } = productsData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link 
            href={`/products/${product.id}`} 
            key={product.id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-48 w-full bg-gray-200">
              <ImageComponent
                src={product.image}
                alt={product.name}
                className="h-full w-full"
                fill={false}
                width={800}
                height={600}
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.price}</span>
                <span className="text-sm text-gray-500">{product.category}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}