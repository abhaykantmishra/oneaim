"use client"

import { useState } from "react"
import { ShoppingCart, Plus, Minus, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export function AddToCartButton({
  product,
  variant = "default",
  size = "default",
  showQuantity = false,
  initialQuantity = 1,
  className,
}) {
  const [quantity, setQuantity] = useState(initialQuantity)
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const addToCart = () => {
    setIsAdding(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsAdding(false)
      setIsAdded(true)
      
      toast.success(`${quantity} × ${product.name} added to your cart`,)
      
      // Reset the added state after a delay
      setTimeout(() => {
        setIsAdded(false)
      }, 1500)
    }, 600)
  }

  if (showQuantity) {
    return (
      <div className="flex items-center">
        <div className="flex items-center border rounded-l-md border-input">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-none"
            onClick={decreaseQuantity}
            disabled={quantity <= 1 || isAdding}
          >
            <Minus className="h-3 w-3" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          
          <span className="w-10 text-center text-sm">{quantity}</span>
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-none"
            onClick={increaseQuantity}
            disabled={isAdding}
          >
            <Plus className="h-3 w-3" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
        
        <Button
          type="button"
          variant={variant}
          size={size}
          className={cn("rounded-l-none", className)}
          onClick={addToCart}
          disabled={isAdding || isAdded}
        >
          {isAdding ? (
            <span>Adding...</span>
          ) : isAdded ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              Added
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    )
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={addToCart}
      disabled={isAdding || isAdded}
    >
      {isAdding ? (
        <span>Adding...</span>
      ) : isAdded ? (
        <>
          <Check className="h-4 w-4 mr-1" />
          Added
        </>
      ) : size === "icon" ? (
        <ShoppingCart className="h-4 w-4" />
      ) : size === "sm" ? (
        <>
          <ShoppingCart className="h-4 w-4 mr-1" />
          Add
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-1" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
