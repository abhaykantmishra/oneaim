"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { CreditCard, ShieldCheck, Truck, ChevronRight, Check, Edit, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { PriceDisplay } from "@/components/ui-components/price-display"
import { toast } from "sonner"

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState("shipping")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    email: "",
    saveAddress: true,
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
    billingAddressSame: true,
  })

  const [shippingMethod, setShippingMethod] = useState("standard")

  const handleShippingSubmit = (e) => {
    e.preventDefault()
    setActiveStep("payment")
    window.scrollTo(0, 0)
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    setActiveStep("review")
    window.scrollTo(0, 0)
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      toast.success(
         "Order placed successfully!"
      )
      router.push("/order-confirmation?orderId=ORD-7353")
    }, 2000)
  }

  // Calculate order summary
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = shippingMethod === "express" ? 15.99 : shippingMethod === "standard" ? 5.99 : 0
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4 mb-8">
        <Link href="/cart" className="flex items-center text-primary hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-bold">Checkout</h1>

        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground">
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
              <Link href="/cart" className="hover:text-primary">
                Cart
              </Link>
            </li>
            <li>
              <ChevronRight className="h-4 w-4" />
            </li>
            <li className="text-foreground">Checkout</li>
          </ol>
        </nav>
      </div>

      {/* Checkout Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Checkout Steps</h2>
              <div className="text-sm text-muted-foreground">
                Step {activeStep === "shipping" ? "1" : activeStep === "payment" ? "2" : "3"} of 3
              </div>
            </div>

            <div className="relative flex items-center justify-between">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-muted -z-10"></div>

              <div
                className={`flex flex-col items-center ${activeStep === "shipping" ? "text-primary" : "text-foreground"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep === "shipping" ? "bg-primary text-white" : activeStep === "payment" || activeStep === "review" ? "bg-green-500 text-white" : "bg-muted"}`}
                >
                  {activeStep === "payment" || activeStep === "review" ? <Check className="h-5 w-5" /> : "1"}
                </div>
                <span className="text-xs mt-1">Shipping</span>
              </div>

              <div
                className={`flex flex-col items-center ${activeStep === "payment" ? "text-primary" : activeStep === "review" ? "text-foreground" : "text-muted-foreground"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep === "payment" ? "bg-primary text-white" : activeStep === "review" ? "bg-green-500 text-white" : "bg-muted"}`}
                >
                  {activeStep === "review" ? <Check className="h-5 w-5" /> : "2"}
                </div>
                <span className="text-xs mt-1">Payment</span>
              </div>

              <div
                className={`flex flex-col items-center ${activeStep === "review" ? "text-primary" : "text-muted-foreground"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep === "review" ? "bg-primary text-white" : "bg-muted"}`}
                >
                  3
                </div>
                <span className="text-xs mt-1">Review</span>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          {activeStep === "shipping" && (
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Enter your shipping details to continue</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                        required
                        className="border-primary/30 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                        required
                        className="border-primary/30 focus-visible:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      required
                      className="border-primary/30 focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input
                      id="apartment"
                      value={shippingInfo.apartment}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, apartment: e.target.value })}
                      className="border-primary/30 focus-visible:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        required
                        className="border-primary/30 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                        required
                        className="border-primary/30 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                      <Input
                        id="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                        required
                        className="border-primary/30 focus-visible:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={shippingInfo.country}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                      required
                      className="border-primary/30 focus-visible:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        required
                        className="border-primary/30 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        required
                        className="border-primary/30 focus-visible:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saveAddress"
                      checked={shippingInfo.saveAddress}
                      onCheckedChange={(checked) =>
                        setShippingInfo({ ...shippingInfo, saveAddress: checked })
                      }
                    />
                    <label
                      htmlFor="saveAddress"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Save this address for future orders
                    </label>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h3 className="font-medium">Shipping Method</h3>
                    <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
                      <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="font-normal cursor-pointer">
                            <div className="font-medium">Standard Shipping</div>
                            <div className="text-sm text-muted-foreground">3-5 business days</div>
                          </Label>
                        </div>
                        <div className="font-medium">$5.99</div>
                      </div>

                      <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="font-normal cursor-pointer">
                            <div className="font-medium">Express Shipping</div>
                            <div className="text-sm text-muted-foreground">1-2 business days</div>
                          </Label>
                        </div>
                        <div className="font-medium">$15.99</div>
                      </div>

                      <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="free" id="free" />
                          <Label htmlFor="free" className="font-normal cursor-pointer">
                            <div className="font-medium">Free Shipping</div>
                            <div className="text-sm text-muted-foreground">5-7 business days</div>
                          </Label>
                        </div>
                        <div className="font-medium">$0.00</div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Continue to Payment
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Payment Information */}
          {activeStep === "payment" && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>Enter your payment details to complete your purchase</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <Tabs defaultValue="credit-card" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      <TabsTrigger value="apple-pay">Apple Pay</TabsTrigger>
                    </TabsList>

                    <TabsContent value="credit-card" className="space-y-6 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentInfo.cardNumber}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                          required
                          className="border-primary/30 focus-visible:ring-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nameOnCard">Name on Card</Label>
                        <Input
                          id="nameOnCard"
                          placeholder="John Doe"
                          value={paymentInfo.nameOnCard}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, nameOnCard: e.target.value })}
                          required
                          className="border-primary/30 focus-visible:ring-primary"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={paymentInfo.expiryDate}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                            required
                            className="border-primary/30 focus-visible:ring-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={paymentInfo.cvv}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                            required
                            className="border-primary/30 focus-visible:ring-primary"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="saveCard"
                          checked={paymentInfo.saveCard}
                          onCheckedChange={(checked) =>
                            setPaymentInfo({ ...paymentInfo, saveCard: checked  })
                          }
                        />
                        <label
                          htmlFor="saveCard"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Save this card for future purchases
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="billingAddressSame"
                          checked={paymentInfo.billingAddressSame}
                          onCheckedChange={(checked) =>
                            setPaymentInfo({ ...paymentInfo, billingAddressSame: checked })
                          }
                        />
                        <label
                          htmlFor="billingAddressSame"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Billing address is the same as shipping address
                        </label>
                      </div>

                      {!paymentInfo.billingAddressSame && (
                        <div className="pt-4 space-y-4">
                          <h3 className="font-medium">Billing Address</h3>
                          {/* Billing address form fields would go here */}
                          <p className="text-sm text-muted-foreground">Please enter your billing address details.</p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="paypal" className="pt-4">
                      <div className="text-center py-8">
                        <Image
                          src="/placeholder.svg?text=PayPal"
                          alt="PayPal"
                          width={120}
                          height={60}
                          className="mx-auto mb-4"
                        />
                        <p className="text-muted-foreground mb-4">
                          You will be redirected to PayPal to complete your payment.
                        </p>
                        <Button className="bg-[#0070ba] hover:bg-[#005ea6]">Continue with PayPal</Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="apple-pay" className="pt-4">
                      <div className="text-center py-8">
                        <Image
                          src="/placeholder.svg?text=Apple+Pay"
                          alt="Apple Pay"
                          width={120}
                          height={60}
                          className="mx-auto mb-4"
                        />
                        <p className="text-muted-foreground mb-4">
                          You will be prompted to confirm your payment with Apple Pay.
                        </p>
                        <Button className="bg-black hover:bg-black/90">Continue with Apple Pay</Button>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveStep("shipping")}
                      className="sm:flex-1"
                    >
                      Back to Shipping
                    </Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90 sm:flex-1">
                      Continue to Review
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Order Review */}
          {activeStep === "review" && (
            <Card>
              <CardHeader>
                <CardTitle>Review Your Order</CardTitle>
                <CardDescription>Please review your order details before placing your order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Shipping Information */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Shipping Information</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-primary"
                      onClick={() => setActiveStep("shipping")}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="font-medium">
                      {shippingInfo.firstName} {shippingInfo.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {shippingInfo.address}
                      {shippingInfo.apartment && `, ${shippingInfo.apartment}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                    </p>
                    <p className="text-sm text-muted-foreground">{shippingInfo.country}</p>
                    <p className="text-sm text-muted-foreground mt-2">Phone: {shippingInfo.phone}</p>
                    <p className="text-sm text-muted-foreground">Email: {shippingInfo.email}</p>
                  </div>
                </div>

                {/* Shipping Method */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Shipping Method</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-primary"
                      onClick={() => setActiveStep("shipping")}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="font-medium">
                      {shippingMethod === "standard"
                        ? "Standard Shipping"
                        : shippingMethod === "express"
                          ? "Express Shipping"
                          : "Free Shipping"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {shippingMethod === "standard"
                        ? "3-5 business days"
                        : shippingMethod === "express"
                          ? "1-2 business days"
                          : "5-7 business days"}
                    </p>
                    <p className="text-sm font-medium mt-1">
                      ${shippingMethod === "standard" ? "5.99" : shippingMethod === "express" ? "15.99" : "0.00"}
                    </p>
                  </div>
                </div>

                {/* Payment Information */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Payment Information</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-primary"
                      onClick={() => setActiveStep("payment")}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="font-medium">Credit Card</p>
                    <p className="text-sm text-muted-foreground">
                      **** **** **** {paymentInfo.cardNumber.slice(-4) || "1234"}
                    </p>
                    <p className="text-sm text-muted-foreground">{paymentInfo.nameOnCard || "John Doe"}</p>
                    <p className="text-sm text-muted-foreground">Expires: {paymentInfo.expiryDate || "12/25"}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-medium mb-2">Order Items</h3>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
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
                          <p className="font-medium">{item.name}</p>
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

                <div className="pt-4">
                  <Button
                    type="button"
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Place Order"}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    By placing your order, you agree to our{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="border-red-100 sticky top-4">
            <CardHeader className="border-b border-red-100">
              <CardTitle className="text-primary">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {/* Order Items */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 bg-white rounded border flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                      />
                      <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.seller}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                      {item.originalPrice && (
                        <p className="text-xs text-muted-foreground line-through">
                          ${(item.originalPrice * item.quantity).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-red-100" />

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <Separator className="bg-red-100" />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>

              {/* Promo Code */}
              <div className="pt-4">
                <div className="flex items-center gap-2">
                  <Input placeholder="Promo code" className="border-primary/30 focus-visible:ring-primary" />
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    Apply
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-red-100 flex flex-col space-y-4">
              <div className="flex items-center gap-2 w-full">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                <span className="text-sm">Secure checkout</span>
              </div>
              <div className="flex items-center gap-2 w-full">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm">Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-2 w-full">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <div className="flex gap-1">
                  {["visa", "mastercard", "amex", "paypal"].map((method) => (
                    <div key={method} className="w-8 h-5 bg-white border rounded">
                      <Image src={`/placeholder.svg?text=${method}`} alt={method} width={32} height={20} />
                    </div>
                  ))}
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Sample data
const cartItems = [
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
  },
]

