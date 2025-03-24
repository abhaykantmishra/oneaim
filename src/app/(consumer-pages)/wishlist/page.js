"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Trash2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/ui-components/product-card"
import { ProductListItem } from "@/components/ui-components/product-list-item"
import { toast } from "sonner"

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)
  const [viewMode, setViewMode] = useState("grid")

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
    toast("Removed from wishlist",{
      description: "The item has been removed from your wishlist",
    })
  }

  const clearWishlist = () => {
    setWishlistItems([])
    toast("Wishlist cleared",{
      description: "All items have been removed from your wishlist",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">My Wishlist</h1>

        {wishlistItems.length > 0 ? (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <p className="text-muted-foreground">
                You have <span className="font-medium text-foreground">{wishlistItems.length}</span> items in your
                wishlist
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/30 text-primary hover:bg-primary/10"
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                >
                  {viewMode === "grid" ? "List View" : "Grid View"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-300 text-red-500 hover:bg-red-50"
                  onClick={clearWishlist}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear Wishlist
                </Button>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="relative">
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white shadow-sm border-red-100 hover:bg-red-50 hover:text-red-500"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove from wishlist</span>
                    </Button>
                    <ProductCard product={item} showWishlist={false} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="relative">
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-white shadow-sm border-red-100 hover:bg-red-50 hover:text-red-500"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove from wishlist</span>
                    </Button>
                    <ProductListItem product={item} showWishlist={false} />
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-primary">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven&apos;t added anything to your wishlist yet.</p>
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/products">
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// Sample data
const initialWishlistItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 89.99,
    originalPrice: 129.99,
    discount: 30,
    rating: 4.8,
    reviews: 124,
    seller: "AudioTech Inc.",
    image: "/placeholder.svg?height=300&width=300",
  },
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
    id: 5,
    name: "Mechanical Keyboard",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.9,
    reviews: 156,
    seller: "TypeMaster",
    image: "/placeholder.svg?height=300&width=300",
  },
]