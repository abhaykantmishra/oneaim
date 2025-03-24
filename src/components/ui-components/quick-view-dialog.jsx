"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ProductRating } from "@/components/ui-components/product-rating"
import { PriceDisplay } from "@/components/ui-components/price-display"
import { AddToCartButton } from "@/components/ui-components/add-to-cart-button"
import { WishlistButton } from "@/components/ui-components/wishlist-button"
import { ArrowRight, Check, Truck } from "lucide-react"



export function QuickViewDialog({ product, open, onOpenChange }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const images = product.images || [product.image]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Product Images */}
          <div className="bg-white p-6 flex flex-col">
            <div className="relative aspect-square bg-white rounded-md overflow-hidden border mb-4">
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-4"
              />
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative aspect-square bg-white rounded-md overflow-hidden border cursor-pointer transition-all ${selectedImage === index ? "ring-2 ring-primary" : "hover:opacity-80"}`}
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
            )}
          </div>

          {/* Product Info */}
          <div className="p-6 flex flex-col">
            <DialogTitle className="text-xl font-bold mb-2">{product.name}</DialogTitle>

            <div className="flex items-center gap-4 mb-4">
              <ProductRating rating={product.rating} reviews={product.reviews} />
              <Link href={`/seller/${product.seller}`} className="text-sm text-primary hover:underline">
                {product.seller}
              </Link>
            </div>

            <PriceDisplay
              price={product.price}
              originalPrice={product.originalPrice}
              size="lg"
              showDiscount={true}
              className="mb-4"
            />

            {product.description && <p className="text-muted-foreground mb-4 line-clamp-3">{product.description}</p>}

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-sm">{product.inStock ? "In Stock" : "Out of Stock"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Free shipping on orders over $50</span>
              </div>
            </div>

            <Tabs defaultValue="overview" className="mb-6">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="pt-4 space-y-2">
                {product.features && product.features.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Key Features</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="text-sm">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="specifications" className="pt-4">
                {product.specifications && Object.keys(product.specifications).length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="text-sm py-1 border-b">
                        <span className="font-medium">{key}:</span> {value}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No specifications available</p>
                )}
              </TabsContent>
            </Tabs>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <AddToCartButton
                product={product}
                showQuantity={true}
                className="flex-1 bg-primary hover:bg-primary/90"
              />

              <WishlistButton productId={product.id} variant="outline" size="default" className="sm:flex-initial" />
            </div>

            <Button variant="link" className="mt-4 text-primary justify-center sm:justify-start" asChild>
              <Link href={`/product/${product.id}`}>
                View full details <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}