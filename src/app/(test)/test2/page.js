import { ProductCard } from "@/components/ui-components/product-card";

const product = 
{
    id: 1,
    name: "Wireless Headphones",
    price: 89.99,
    originalPrice: 129.99,
    discount: 30,
    rating: 4.8,
    reviews: 124,
    seller: "AudioTech",
    category: "Electronics",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Premium wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals alike.",
    date: "2023-05-15",
}

export default function Test2(){
    return (
        <div className="flex flex-row">
            <ProductCard product={product} size="md" />
            <ProductCard product={product} size="md" />
            <ProductCard product={product} size="md" />
            <ProductCard product={product} size="md" />
            {/* <ProductCard product={product} size="md" /> */}
            {/* <ProductCard product={product} size="md" /> */}
            {/* <ProductCard product={product} size="md" /> */}
        </div>
    )
}