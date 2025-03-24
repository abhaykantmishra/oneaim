"use client"

import { Card, CardContent } from "../ui/card"
import Link from "next/link"
import Image from "next/image"
import { Star, ShoppingBag } from "lucide-react"
import { Button } from "../ui/button"

export function ProductCard({ product, size="md" }) {

    const addToCart = (p) => {
        toast.success(`${p.name} has been added to your cart`)
    }

    return (
      
      <Card className={`overflow-hidden transition-all hover:shadow-md border-red-100 hover:border-primary ${size === "md" ? "w-80" : "w-56"}`}>
        <Link href={`/product/${product.id}`}>
            <div className="relative h-48 bg-white">
            <Image src={product?.image || "/placeholder.svg"} alt={product?.name} fill className="object-contain p-4" />
            {product.discount && (
                <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                {product?.discount}% OFF
                </div>
            )}
            </div>
        </Link>
        <CardContent className="p-4">
          <div className="flex items-center gap-1 mb-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{product?.rating}</span>
            <span className="text-xs text-muted-foreground">({product?.reviews})</span>
          </div>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold hover:text-primary transition-colors">{product.name}</h3>
          </Link>
          <p className="text-muted-foreground text-sm mb-2">{product?.seller}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary">${product?.price?.toFixed(2)}</span>
              {product?.originalPrice && (
                <span className="text-muted-foreground text-sm line-through">${product?.originalPrice?.toFixed(2)}</span>
              )}
            </div>
            <Button
              size="sm"
              variant="default"
              className="bg-primary hover:bg-primary/90"
              onClick={() => addToCart(product)}
            >
              <ShoppingBag className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    )
}