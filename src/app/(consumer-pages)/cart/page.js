"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Minus, Plus, ShoppingBag, Trash2, CreditCard, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
    toast.success("The item has been removed from your cart")
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "discount20") {
      setPromoApplied(true)
      toast.success("20% discount has been applied to your order")
    } else {
      toast.warning("Please enter a valid promo code",)
    }
  }

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const discount = promoApplied ? subtotal * 0.2 : 0
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal - discount + shipping

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-8">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="h-4 w-4" />
          </li>
          <li className="text-foreground">Cart</li>
        </ol>
      </nav>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-red-100">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-primary">Cart Items ({cartItems.length})</h2>
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4">
                      <div className="relative w-full sm:w-24 h-24 bg-white rounded border border-red-100">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <Link href={`/product/${item.id}`} className="font-medium hover:text-primary">
                            {item.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.seller}</p>
                          {item.options && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {Object.entries(item.options)
                                .map(([key, value]) => `${key}: ${value}`)
                                .join(", ")}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border rounded-md border-red-100">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:text-primary hover:bg-red-50"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:text-primary hover:bg-red-50"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                        {item.originalPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            ${(item.originalPrice * item.quantity).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-red-50 rounded-b-lg border-t border-red-100">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="pr-24 border-primary/30 focus-visible:ring-primary"
                    />
                    <Button
                      className="absolute right-0 top-0 rounded-l-none bg-primary hover:bg-primary/90"
                      onClick={applyPromoCode}
                      disabled={!promoCode || promoApplied}
                    >
                      Apply
                    </Button>
                  </div>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10" asChild>
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-red-100">
              <CardHeader className="border-b border-red-100">
                <CardTitle className="text-primary">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (20%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <Separator className="bg-red-100" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
                {subtotal < 100 && (
                  <div className="text-sm text-muted-foreground bg-red-50 p-3 rounded-md border border-red-100">
                    Add ${(100 - subtotal).toFixed(2)} more to qualify for free shipping
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 border-t border-red-100 pt-6">
                <Button className="w-full bg-primary hover:bg-primary/90" size="lg" asChild>
                  <Link href="/checkout">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Checkout
                  </Link>
                </Button>
                <div className="text-center text-sm text-muted-foreground">Secure checkout powered by Stripe</div>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
            <ShoppingBag className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-primary">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven&apos;t added anything to your cart yet.</p>
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/products">
              Start Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

// Sample data
const initialCartItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 89.99,
    originalPrice: 129.99,
    quantity: 1,
    seller: "AudioTech Inc.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 34.99,
    originalPrice: 49.99,
    quantity: 1,
    seller: "ErgoDesign",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 59.99,
    quantity: 2,
    seller: "SoundWave",
    image: "/placeholder.svg?height=200&width=200",
    options: {
      Color: "Black",
      Warranty: "2 Years",
    },
  },
]

