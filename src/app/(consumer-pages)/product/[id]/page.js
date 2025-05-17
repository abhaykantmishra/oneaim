"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"


export default function ProductDetailPage({ params }) {
  const { id } = params
  // In a real app, you would fetch the product data based on the ID
  const product = products.find((p) => p.id.toString() === id) || products[0]

  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const addToCart = () => {
    toast(`${quantity} x ${product.name} added to your cart`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-6">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="h-4 w-4" />
          </li>
          <li>
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
          </li>
          <li>
            <ChevronRight className="h-4 w-4" />
          </li>
          <li>
            <Link href={`/categories/${product.category}`} className="hover:text-primary">
              {product.category}
            </Link>
          </li>
          <li>
            <ChevronRight className="h-4 w-4" />
          </li>
          <li className="text-primary font-medium truncate max-w-[200px]">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative h-[500px] w-[500px] mx-auto bg-white rounded-none overflow-hidden border border-red-100">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain p-4 mx-auto"
            />
            {product.discount && (
              <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                {product.discount}% OFF
              </div>
            )}
          </div>
          <div className="flex flex-row justify-evenly">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`relative w-20 h-20 bg-white rounded-md overflow-hidden border cursor-pointer transition-all ${selectedImage === index ? "ring-2 ring-primary" : "hover:opacity-80"}`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-contain p-2"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <div className="flex">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                      />
                    ))}
                </div>
                <span className="ml-2 text-sm font-medium">{product.rating}</span>
                <span className="mx-2 text-muted-foreground">•</span>
                <Link href="#reviews" className="text-sm text-muted-foreground hover:text-primary">
                  {product.reviews} Reviews
                </Link>
              </div>
              <div className="text-sm text-muted-foreground">
                SKU: <span className="text-foreground">{product.sku}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              )}
              {product.discount && (
                <span className="text-sm font-medium text-green-600">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="font-medium">Availability:</span>
              <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Seller:</span>
              <Link href={`/seller/${product.sellerId}`} className="text-primary hover:underline">
                {product.seller}
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center">
              <span className="font-medium w-24">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={increaseQuantity}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button className="flex-1 bg-primary hover:bg-primary/90" size="lg" onClick={addToCart}>
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                <Heart className="h-5 w-5 mr-2" />
                Wishlist
              </Button>
              <Button variant="outline" size="icon" className="hidden sm:flex">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">Free Shipping</p>
                <p className="text-muted-foreground">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">Secure Payment</p>
                <p className="text-muted-foreground">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">Easy Returns</p>
                <p className="text-muted-foreground">30 day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
          <TabsTrigger
            value="description"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary py-3"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="specifications"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary py-3"
          >
            Specifications
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary py-3"
          >
            Reviews ({product.reviews})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="pt-6">
          <div className="prose max-w-none">
            <p>{product.fullDescription}</p>
            <h3>Features</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Technical Specifications</h3>
              <div className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2 py-2 border-b">
                    <span className="font-medium">{key}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">In The Box</h3>
              <ul className="space-y-2">
                {product.inTheBox.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="pt-6" id="reviews">
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="text-center p-6 border rounded-lg">
                  <div className="text-5xl font-bold text-primary mb-2">{product.rating}</div>
                  <div className="flex justify-center mb-2">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                        />
                      ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Based on {product.reviews} reviews</p>
                  <Button>Write a Review</Button>
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>
                <div className="space-y-6">
                  {product.customerReviews.map((review, index) => (
                    <div key={index} className="border-b pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">{review.name}</div>
                        <div className="text-sm text-muted-foreground">{review.date}</div>
                      </div>
                      <div className="flex mb-2">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                            />
                          ))}
                      </div>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-primary">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden transition-all hover:shadow-md border-red-100 hover:border-primary"
            >
              <Link href={`/product/${product.id}`}>
              <div className="relative h-48 bg-white">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-semibold hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                <p className="text-muted-foreground text-sm mb-2">{product.seller}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-muted-foreground text-sm line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// Sample data
const products = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    price: 89.99,
    originalPrice: 129.99,
    discount: 30,
    rating: 4.8,
    reviews: 124,
    seller: "AudioTech Inc.",
    sellerId: "audiotech",
    category: "Electronics",
    sku: "AT-WH-001",
    inStock: true,
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    description: "Premium wireless headphones with noise cancellation and 30-hour battery life.",
    fullDescription:
      "Experience immersive sound with our premium wireless headphones. Featuring advanced noise cancellation technology, these headphones block out ambient noise so you can focus on your music. With a 30-hour battery life, you can enjoy your favorite tunes all day long. The comfortable over-ear design makes them perfect for extended listening sessions.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.0 connectivity",
      "Comfortable over-ear design",
      "Built-in microphone for calls",
      "Quick charge: 5 minutes for 3 hours of playback",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 Ohm",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      "Bluetooth Version": "5.0",
      Weight: "250g",
      Color: "Black",
    },
    inTheBox: ["Wireless Headphones", "USB-C Charging Cable", "3.5mm Audio Cable", "Carrying Case", "User Manual"],
    customerReviews: [
      {
        name: "John D.",
        rating: 5,
        date: "May 15, 2023",
        comment:
          "These headphones are amazing! The sound quality is excellent and the noise cancellation works really well. Battery life is as advertised - I've been using them for a week on a single charge.",
      },
      {
        name: "Sarah M.",
        rating: 4,
        date: "April 28, 2023",
        comment:
          "Great headphones for the price. Comfortable to wear for long periods and the sound is clear. The only downside is that the app is a bit buggy.",
      },
      {
        name: "Michael T.",
        rating: 5,
        date: "April 10, 2023",
        comment:
          "Best headphones I've ever owned. The noise cancellation is perfect for my commute and the sound quality is top-notch. Highly recommend!",
      },
    ],
  },
]

const relatedProducts = [
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    rating: 4.6,
    reviews: 89,
    seller: "TechGear",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 34.99,
    originalPrice: 49.99,
    discount: 30,
    rating: 4.5,
    reviews: 213,
    seller: "ErgoDesign",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 59.99,
    rating: 4.7,
    reviews: 176,
    seller: "SoundWave",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.4,
    reviews: 156,
    seller: "AudioTech Inc.",
    image: "/placeholder.svg?height=300&width=300",
  },
]

