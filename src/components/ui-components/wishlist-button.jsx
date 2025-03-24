"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"


export function WishlistButton({
  productId,
  variant = "secondary",
  size = "icon",
  className,
  initialState = false,
}) {
  const [isInWishlist, setIsInWishlist] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)

  const toggleWishlist = () => {
    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      const newState = !isInWishlist
      setIsInWishlist(newState)
      setIsProcessing(false)

      toast(newState ? "Added to wishlist" : "Removed from wishlist",{
        description: newState
          ? "This item has been added to your wishlist"
          : "This item has been removed from your wishlist",
      })
    }, 300)
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn(size === "icon" && "h-8 w-8 rounded-full", isInWishlist && "text-primary bg-primary/10", className)}
      onClick={toggleWishlist}
      disabled={isProcessing}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={cn("h-4 w-4", isInWishlist && "fill-primary")} />
      {size !== "icon" && <span className="ml-1">{isInWishlist ? "In Wishlist" : "Add to Wishlist"}</span>}
    </Button>
  )
}