"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { WishlistButton } from "@/components/ui-components/wishlist-button"
import { AddToCartButton } from "@/components/ui-components/add-to-cart-button"
import { ProductRating } from "@/components/ui-components/product-rating"
import { PriceDisplay } from "@/components/ui-components/price-display"
import { QuickViewDialog } from "@/components/ui-components/quick-view-dialog"



export function ProductCard({
  product,
  size = "medium",
  className,
  showQuickView = true,
  showAddToCart = true,
  showWishlist = true,
}) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

  // Size-specific classes
  const sizeClasses = {
    small: {
      card: "max-w-[200px]",
      imageContainer: "h-32",
      title: "text-sm font-medium line-clamp-1",
      seller: "text-xs",
    },
    medium: {
      card: "max-w-[300px]",
      imageContainer: "h-48",
      title: "font-semibold line-clamp-2",
      seller: "text-sm",
    },
    large: {
      card: "max-w-[350px]",
      imageContainer: "h-64",
      title: "text-lg font-semibold line-clamp-2",
      seller: "text-sm",
    },
  }

  return (
    <>
      <Card
        className={cn(
          "overflow-hidden transition-all hover:shadow-md border-red-100 hover:border-primary group",
          sizeClasses[size].card,
          className,
        )}
      >
        <div className={cn("relative bg-white", sizeClasses[size].imageContainer)}>
          <Link href={`/product/${product.id}`} className="block w-full h-full">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain p-4 transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Product badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.discount && <Badge className="bg-primary text-primary-foreground">{product.discount}% OFF</Badge>}
            {product.isNew && <Badge className="bg-green-600 text-white">NEW</Badge>}
            {product.isFeatured && <Badge className="bg-amber-500 text-white">FEATURED</Badge>}
          </div>

          {/* Quick actions */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {showWishlist && <WishlistButton productId={product.id} />}

            {showQuickView && (
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setIsQuickViewOpen(true)}
              >
                <Eye className="h-4 w-4" />
                <span className="sr-only">Quick view</span>
              </Button>
            )}
          </div>
        </div>

        <CardContent className="p-4">
          <ProductRating rating={product.rating} reviews={product.reviews} size={size === "small" ? "sm" : "md"} />

          <Link href={`/product/${product.id}`}>
            <h3 className={cn("hover:text-primary transition-colors mt-1", sizeClasses[size].title)}>{product.name}</h3>
          </Link>

          <p className={cn("text-muted-foreground mb-2", sizeClasses[size].seller)}>{product.seller}</p>

          <div className="flex items-center justify-between">
            <PriceDisplay
              price={product.price}
              originalPrice={product.originalPrice}
              size={size === "small" ? "sm" : "md"}
            />

            {showAddToCart && (
              <AddToCartButton product={product} variant="default" size={size === "small" ? "sm" : "default"} />
            )}
          </div>
        </CardContent>
      </Card>

      {showQuickView && <QuickViewDialog product={product} open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen} />}
    </>
  )
}