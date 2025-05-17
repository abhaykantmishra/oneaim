"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  User,
  Package,
  Heart,
  CreditCard,
  MapPin,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Edit,
  Plus,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components/ui-components/product-card"
import { toast } from "sonner"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")
//   const { toast } = useToast()

  const handleSaveProfile = (e) => {
    e.preventDefault()
    toast.success([
        "Profile updated!\n\n",
        "Your profile information has been updated successfully.",
    ])
  }

  const handleSavePassword = (e) => {
    e.preventDefault()
    toast.success(
        "Your password has been changed successfully.",
    )
  }

  const handleDeleteAddress = (id) => {
    toast.error([
      "Address deleted! ",
      "The address has been removed from your account.",
    ])
  }

  const handleDeletePaymentMethod = (id) => {
    toast.warning([
       "Payment method deleted! ",
       "The payment method has been removed from your account.",
    ])
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-64 flex-shrink-0">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg?text=JD" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold text-lg">John Doe</h2>
              <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            </div>
          </div>

          <nav className="space-y-1">
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeTab === "profile" ? "bg-primary/10 text-primary" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <User className="h-5 w-5 mr-3" />
              Profile
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeTab === "orders" ? "bg-primary/10 text-primary" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <Package className="h-5 w-5 mr-3" />
              Orders
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeTab === "wishlist" ? "bg-primary/10 text-primary" : ""}`}
              onClick={() => setActiveTab("wishlist")}
            >
              <Heart className="h-5 w-5 mr-3" />
              Wishlist
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeTab === "addresses" ? "bg-primary/10 text-primary" : ""}`}
              onClick={() => setActiveTab("addresses")}
            >
              <MapPin className="h-5 w-5 mr-3" />
              Addresses
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeTab === "payment" ? "bg-primary/10 text-primary" : ""}`}
              onClick={() => setActiveTab("payment")}
            >
              <CreditCard className="h-5 w-5 mr-3" />
              Payment Methods
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeTab === "notifications" ? "bg-primary/10 text-primary" : ""}`}
              onClick={() => setActiveTab("notifications")}
            >
              <Bell className="h-5 w-5 mr-3" />
              Notifications
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeTab === "settings" ? "bg-primary/10 text-primary" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Button>

            <Separator className="my-4" />

            <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Profile</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3 flex flex-col items-center">
                        <Avatar className="h-32 w-32">
                          <AvatarImage src="/placeholder.svg?text=JD" alt="John Doe" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm" className="mt-4">
                          Change Avatar
                        </Button>
                      </div>

                      <div className="md:w-2/3 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              defaultValue="John"
                              className="border-primary/30 focus-visible:ring-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              defaultValue="Doe"
                              className="border-primary/30 focus-visible:ring-primary"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            defaultValue="john.doe@example.com"
                            className="border-primary/30 focus-visible:ring-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            defaultValue="+1 (555) 123-4567"
                            className="border-primary/30 focus-visible:ring-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="birthdate">Date of Birth</Label>
                          <Input
                            id="birthdate"
                            type="date"
                            defaultValue="1990-01-01"
                            className="border-primary/30 focus-visible:ring-primary"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" className="bg-primary hover:bg-primary/90">
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password to keep your account secure</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSavePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        className="border-primary/30 focus-visible:ring-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        className="border-primary/30 focus-visible:ring-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        className="border-primary/30 focus-visible:ring-primary"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" className="bg-primary hover:bg-primary/90">
                        Update Password
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Orders</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    Sort
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  {orders.length > 0 ? (
                    <div className="divide-y">
                      {orders.map((order) => (
                        <div key={order.id} className="p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                            <div>
                              <p className="font-medium">Order #{order.id}</p>
                              <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "Shipped"
                                      ? "bg-blue-100 text-blue-800"
                                      : order.status === "Processing"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                }`}
                              >
                                {order.status}
                              </span>
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/track-order?orderId=${order.id}`}>Track</Link>
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                            <div className="col-span-2 flex items-center gap-4">
                              <div className="relative w-16 h-16 bg-white rounded border">
                                <Image
                                  src={order.items[0].image || "/placeholder.svg"}
                                  alt={order.items[0].name}
                                  fill
                                  className="object-contain p-2"
                                />
                                {order.items.length > 1 && (
                                  <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    +{order.items.length - 1}
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{order.items[0].name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {order.items.length > 1 ? `+ ${order.items.length - 1} more items` : ""}
                                </p>
                              </div>
                            </div>

                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Total</p>
                              <p className="font-medium">${order.total.toFixed(2)}</p>
                            </div>

                            <div className="flex justify-end">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/order-confirmation?orderId=${order.id}`}>
                                  View Details
                                  <ChevronRight className="ml-1 h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Orders Yet</h3>
                      <p className="text-muted-foreground mb-4">
                        You haven&apos;t placed any orders yet. Start shopping to see your orders here.
                      </p>
                      <Button asChild>
                        <Link href="/products">Browse Products</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Wishlist</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/wishlist">View All</Link>
                </Button>
              </div>

              {wishlistItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {wishlistItems.map((item) => (
                    <ProductCard key={item.id} product={item} size="medium" showQuickView={false} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Your Wishlist is Empty</h3>
                    <p className="text-muted-foreground mb-4">
                      Save items you love to your wishlist and they&apos;ll appear here.
                    </p>
                    <Button asChild>
                      <Link href="/products">Discover Products</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Addresses</h2>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-1" />
                  Add New Address
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((address) => (
                  <Card key={address.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <h3 className="font-medium">{address.name}</h3>
                          {address.default && (
                            <span className="ml-2 px-2 py-0.5 rounded text-xs bg-primary/10 text-primary">Default</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500"
                            onClick={() => handleDeleteAddress(address.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>{address.street}</p>
                        {address.apartment && <p>{address.apartment}</p>}
                        <p>
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p>{address.country}</p>
                        <p className="mt-2">{address.phone}</p>
                      </div>

                      {!address.default && (
                        <Button variant="link" className="mt-4 h-auto p-0 text-primary">
                          Set as Default
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}

                <Card className="border-dashed">
                  <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
                    <Button variant="outline" size="lg" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add New Address
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Payment Methods Tab */}
            <TabsContent value="payment" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Payment Methods</h2>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Payment Method
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paymentMethods.map((method) => (
                  <Card key={method.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <div className="w-10 h-6 bg-white border rounded mr-2 flex items-center justify-center">
                            <Image
                              src={`/placeholder.svg?text=${method.type}`}
                              alt={method.type}
                              width={32}
                              height={20}
                            />
                          </div>
                          <h3 className="font-medium">
                            {method.type} •••• {method.last4}
                          </h3>
                          {method.default && (
                            <span className="ml-2 px-2 py-0.5 rounded text-xs bg-primary/10 text-primary">Default</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500"
                            onClick={() => handleDeletePaymentMethod(method.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>{method.name}</p>
                        <p>Expires: {method.expiry}</p>
                      </div>

                      {!method.default && (
                        <Button variant="link" className="mt-4 h-auto p-0 text-primary">
                          Set as Default
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}

                <Card className="border-dashed">
                  <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
                    <Button variant="outline" size="lg" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Payment Method
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Notification Preferences</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>Manage the emails you want to receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="order-updates">Order Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about your orders and shipping updates
                      </p>
                    </div>
                    <Switch id="order-updates" defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="promotions">Promotions and Deals</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about sales, discounts, and special offers
                      </p>
                    </div>
                    <Switch id="promotions" defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="product-updates">Product Updates</Label>
                      <p className="text-sm text-muted-foreground">Receive emails about new products and features</p>
                    </div>
                    <Switch id="product-updates" />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="newsletter">Newsletter</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive our weekly newsletter with tips and articles
                      </p>
                    </div>
                    <Switch id="newsletter" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Push Notifications</CardTitle>
                  <CardDescription>Manage notifications on your devices</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-order-updates">Order Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about your orders and shipping updates
                      </p>
                    </div>
                    <Switch id="push-order-updates" defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-promotions">Promotions and Deals</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about sales and special offers
                      </p>
                    </div>
                    <Switch id="push-promotions" />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-wishlist">Wishlist Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when items in your wishlist go on sale
                      </p>
                    </div>
                    <Switch id="push-wishlist" defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary hover:bg-primary/90">Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Account Settings</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Manage how your information is used and shared</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-collection">Data Collection</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow us to collect data about your browsing and shopping habits to improve your experience
                      </p>
                    </div>
                    <Switch id="data-collection" defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="personalized-ads">Personalized Ads</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow us to show you personalized advertisements based on your interests
                      </p>
                    </div>
                    <Switch id="personalized-ads" defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="third-party">Third-Party Sharing</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow us to share your information with trusted partners
                      </p>
                    </div>
                    <Switch id="third-party" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Management</CardTitle>
                  <CardDescription>Manage your account settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Account Deletion</Label>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary hover:bg-primary/90">Save Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Sample data
const orders = [
  {
    id: "ORD-7352",
    date: "June 15, 2023",
    status: "Delivered",
    items: [
      {
        id: 1,
        name: "Wireless Headphones",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 3,
        name: "Laptop Stand",
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
    total: 124.98,
  },
  {
    id: "ORD-7351",
    date: "June 10, 2023",
    status: "Shipped",
    items: [
      {
        id: 4,
        name: "Bluetooth Speaker",
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
    total: 59.99,
  },
  {
    id: "ORD-7350",
    date: "June 5, 2023",
    status: "Processing",
    items: [
      {
        id: 5,
        name: "Mechanical Keyboard",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: 6,
        name: "Wireless Mouse",
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
    total: 109.98,
  },
]

const wishlistItems = [
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
]

const addresses = [
  {
    id: 1,
    name: "Home",
    street: "123 Main St",
    apartment: "Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    phone: "+1 (555) 123-4567",
    default: true,
  },
  {
    id: 2,
    name: "Work",
    street: "456 Business Ave",
    apartment: "Suite 200",
    city: "New York",
    state: "NY",
    zipCode: "10022",
    country: "United States",
    phone: "+1 (555) 987-6543",
    default: false,
  },
]

const paymentMethods = [
  {
    id: 1,
    type: "Visa",
    last4: "4242",
    name: "John Doe",
    expiry: "12/25",
    default: true,
  },
  {
    id: 2,
    type: "Mastercard",
    last4: "5678",
    name: "John Doe",
    expiry: "08/24",
    default: false,
  },
]

