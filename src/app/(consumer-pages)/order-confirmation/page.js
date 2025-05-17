"use client"

import { Suspense } from "react"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Package, Truck, Calendar, ArrowRight, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PriceDisplay } from "@/components/ui-components/price-display"
import { ProductCard } from "@/components/ui-components/product-card"


export default function OrderConfirmationPage() {
    return (
        <>
        <Suspense fallback={<p>Loading order...</p>}>
            <OrderConfirmationDetails />
        </Suspense>
        </>
    )
}

function OrderConfirmationDetails() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId") || "ORD-7353"

  const [order, setOrder] = useState(null)

  useEffect(() => {
    // Simulate API call to fetch order details
    setTimeout(() => {
      setOrder({
        id: orderId,
        date: "June 15, 2023",
        status: "Processing",
        items: [
          {
            id: 1,
            name: "Wireless Headphones",
            price: 89.99,
            originalPrice: 129.99,
            quantity: 1,
            image: "/placeholder.svg?height=200&width=200",
          },
          {
            id: 3,
            name: "Laptop Stand",
            price: 34.99,
            originalPrice: 49.99,
            quantity: 1,
            image: "/placeholder.svg?height=200&width=200",
          },
          {
            id: 4,
            name: "Bluetooth Speaker",
            price: 59.99,
            quantity: 2,
            image: "/placeholder.svg?height=200&width=200",
          },
        ],
        shipping: {
          method: "Standard Shipping",
          address: "123 Main St, Apt 4B, New York, NY 10001, USA",
          estimatedDelivery: "June 20, 2023",
        },
        payment: {
          method: "Credit Card",
          last4: "1234",
        },
        subtotal: 244.96,
        shipping: 5.99,
        tax: 19.6,
        total: 270.55,
      })
    }, 1000)
  }, [orderId])

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Thank You for Your Order!</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your order has been received and is being processed. We&apos;ve sent a confirmation email to your registered
            email address.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Order #{order.id}</CardTitle>
                <CardDescription>Placed on {order.date}</CardDescription>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">Status:</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {order.status}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Order Items */}
            <div>
              <h3 className="font-medium mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative w-16 h-16 bg-white rounded border">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex-1">
                      <Link href={`/product/${item.id}`} className="font-medium hover:text-primary">
                        {item.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <PriceDisplay
                        price={item.price * item.quantity}
                        originalPrice={item.originalPrice ? item.originalPrice * item.quantity : undefined}
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <Truck className="h-4 w-4 mr-2 text-primary" />
                  Shipping Information
                </h3>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Method:</span> {order.shipping.method}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Address:</span> {order.shipping.address}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Estimated Delivery:</span>{" "}
                    {order.shipping.estimatedDelivery}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  Payment Information
                </h3>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Method:</span> {order.payment.method}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Card:</span> **** **** **** {order.payment.last4}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <Package className="h-4 w-4 mr-2 text-primary" />
                  Order Summary
                </h3>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping:</span>
                    <span>${order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax:</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-1">
                    <span>Total:</span>
                    <span className="text-primary">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-4 border-t pt-6">
            <Button variant="outline" className="sm:flex-1" asChild>
              <Link href="/track-order">
                <Truck className="mr-2 h-4 w-4" />
                Track Order
              </Link>
            </Button>
            <Button variant="outline" className="sm:flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
            <Button variant="outline" className="sm:flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Share Order
            </Button>
          </CardFooter>
        </Card>

        {/* What's Next */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">What&apos;s Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Order Processing</h3>
                <p className="text-sm text-muted-foreground">
                  We&apos;re preparing your items for shipment. You&apos;ll receive an email when your order ships.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Your order will be delivered by {order.shipping.estimatedDelivery}. Track your order anytime.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Once your order arrives, please confirm receipt and let us know if you have any issues.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommended Products */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">You Might Also Like</h2>
            <Link href="/products" className="text-primary flex items-center hover:underline">
              View More <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product}  showQuickView={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Sample data
const recommendedProducts = [
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
  {
    id: 6,
    name: "Wireless Mouse",
    price: 29.99,
    rating: 4.4,
    reviews: 98,
    seller: "TechGear",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 7,
    name: "USB-C Hub",
    price: 49.99,
    rating: 4.6,
    reviews: 75,
    seller: "ConnectPro",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 8,
    name: "External SSD",
    price: 119.99,
    originalPrice: 149.99,
    discount: 20,
    rating: 4.8,
    reviews: 112,
    seller: "StorageMaster",
    image: "/placeholder.svg?height=300&width=300",
  },
]

