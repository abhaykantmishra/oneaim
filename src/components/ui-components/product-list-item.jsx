"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { WishlistButton } from "@/components/ui-components/wishlist-button"
import { AddToCartButton } from "@/components/ui-components/add-to-cart-button"
import { ProductRating } from "@/components/ui-components/product-rating"
import { PriceDisplay } from "@/components/ui-components/price-display"
import { cn } from "@/lib/utils"



export function ProductListItem({
  product,
  className,
  showQuickView = false,
  showAddToCart = true,
  showWishlist = true,
  showDescription = true,
}) {
  return (
    <Card
      className={cn("overflow-hidden transition-all hover:shadow-md border-red-100 hover:border-primary", className)}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-48 h-48">
          <Link href={`/product/${product.id}`}>
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain p-4 bg-white"
            />
          </Link>

          {/* Product badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.discount && <Badge className="bg-primary text-primary-foreground">{product.discount}% OFF</Badge>}
            {product.isNew && <Badge className="bg-green-600 text-white">NEW</Badge>}
            {product.isFeatured && <Badge className="bg-amber-500 text-white">FEATURED</Badge>}
          </div>

          {/* Wishlist button */}
          {showWishlist && (
            <div className="absolute top-2 right-2">
              <WishlistButton productId={product.id} />
            </div>
          )}
        </div>

        <CardContent className="flex-1 p-4">
          <ProductRating rating={product.rating} reviews={product.reviews} />

          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg hover:text-primary transition-colors">{product.name}</h3>
          </Link>

          <p className="text-muted-foreground text-sm mb-2">{product.seller}</p>

          {showDescription && product.description && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
          )}

          <div className="flex items-center justify-between mt-auto">
            <PriceDisplay price={product.price} originalPrice={product.originalPrice} />

            {showAddToCart && (
              <AddToCartButton
                product={product}
                variant="default"
                showQuantity={false}
                className="bg-primary hover:bg-primary/90"
              />
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}