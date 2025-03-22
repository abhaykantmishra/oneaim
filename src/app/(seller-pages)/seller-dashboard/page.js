"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  BarChart3,
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  MoreHorizontal,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function SellerDashboard() {
  // Add state for product editing
  const [activeTab, setActiveTab] = useState("overview")
  const [editingProduct, setEditingProduct] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [productForm, setProductForm] = useState({
    name: "",
    price: 0,
    inventory: 0,
    description: "",
    status: "Active",
  })

  // Add function to handle editing a product
  const handleEditProduct = (product) => {
    setProductForm({
      name: product.name,
      price: product.price,
      inventory: product.inventory,
      description: product.description || "",
      status: product.status,
    })
    setEditingProduct(product)
    setIsEditing(true)
  }

  // Add function to save product changes
  const saveProductChanges = () => {
    // In a real app, this would make an API call
    const updatedProducts = products.map((p) => {
      if (p.id === editingProduct.id) {
        return {
          ...p,
          name: productForm.name,
          price: Number.parseFloat(productForm.price),
          inventory: Number.parseInt(productForm.inventory),
          description: productForm.description,
          status: productForm.status,
        }
      }
      return p
    })

    // Update the products state (in a real app)
    // setProducts(updatedProducts)

    toast.success("The product has been successfully updated.")

    setIsEditing(false)
    setEditingProduct(null)
  }

  // Add function to handle form changes
  const handleFormChange = (e) => {
    const { name, value } = e.target
    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="font-bold text-xl text-primary">Seller Dashboard</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeTab === "overview" ? "bg-primary/10 text-primary" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <BarChart3 className="h-5 w-5 mr-3" />
            Overview
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeTab === "products" ? "bg-muted" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            <Package className="h-5 w-5 mr-3" />
            Products
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeTab === "orders" ? "bg-muted" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            <ShoppingBag className="h-5 w-5 mr-3" />
            Orders
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeTab === "customers" ? "bg-muted" : ""}`}
            onClick={() => setActiveTab("customers")}
          >
            <Users className="h-5 w-5 mr-3" />
            Customers
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start ${activeTab === "analytics" ? "bg-muted" : ""}`}
            onClick={() => setActiveTab("analytics")}
          >
            <TrendingUp className="h-5 w-5 mr-3" />
            Analytics
          </Button>
        </nav>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full">
            <Link href="/dashboard">Switch to Buyer</Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b p-4 flex items-center justify-between">
          <div className="md:hidden">
            <h2 className="font-bold text-xl text-primary">Seller Dashboard</h2>
          </div>
          <div className="flex items-center ml-auto">
            <div className="relative mr-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-[200px] md:w-[300px] pl-8" />
            </div>
            <Button variant="outline" size="sm" className="mr-2">
              <Link href="/messages">Messages</Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image src="/placeholder.svg?height=100&width=100" alt="Profile" fill className="object-cover" />
              </div>
              <span className="hidden md:inline font-medium">John Seller</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <div className="md:hidden mb-6">
              <TabsList className="w-full">
                <TabsTrigger value="overview" className="flex-1">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="products" className="flex-1">
                  Products
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex-1">
                  Orders
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-primary/20">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$12,546.00</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500 font-medium flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +12.5%
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">243</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500 font-medium flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +8.2%
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500 font-medium flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +2
                      </span>{" "}
                      new this month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Customer Rating</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.8/5</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-red-500 font-medium flex items-center">
                        <TrendingDown className="h-3 w-3 mr-1" />
                        -0.1
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>You have received 30 orders this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  order.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "Processing"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {order.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">${order.amount.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="mt-4 text-center">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/seller-dashboard/orders">View All Orders</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Selling Products</CardTitle>
                    <CardDescription>Your best performing products this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topProducts.map((product) => (
                        <div key={product.id} className="flex items-center">
                          <div className="relative w-12 h-12 mr-4 bg-white rounded border">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.sold} sold</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${product.revenue.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">${product.price.toFixed(2)} each</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/seller-dashboard/products">View All Products</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Your Products</h2>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>

              {isEditing ? (
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-primary">Edit Product</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Product Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={productForm.name}
                            onChange={handleFormChange}
                            className="border-primary/30 focus-visible:ring-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="price">Price ($)</Label>
                          <Input
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            value={productForm.price}
                            onChange={handleFormChange}
                            className="border-primary/30 focus-visible:ring-primary"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="inventory">Inventory</Label>
                          <Input
                            id="inventory"
                            name="inventory"
                            type="number"
                            value={productForm.inventory}
                            onChange={handleFormChange}
                            className="border-primary/30 focus-visible:ring-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <select
                            id="status"
                            name="status"
                            value={productForm.status}
                            onChange={handleFormChange}
                            className="w-full rounded-md border border-primary/30 p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="Active">Active</option>
                            <option value="Draft">Draft</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                          id="description"
                          name="description"
                          rows="3"
                          value={productForm.description}
                          onChange={handleFormChange}
                          className="w-full rounded-md border border-primary/30 p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        ></textarea>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90" onClick={saveProductChanges}>
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="w-[300px] pl-8 border-primary/30 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary/30 text-primary hover:bg-primary/10"
                      >
                        Filter
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary/30 text-primary hover:bg-primary/10"
                      >
                        Sort
                      </Button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-primary/20">
                    <Table>
                      <TableHeader className="bg-primary/5">
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Inventory</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Sales</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((product) => (
                          <TableRow key={product.id} className="hover:bg-primary/5">
                            <TableCell>
                              <div className="flex items-center">
                                <div className="relative w-10 h-10 mr-3 bg-white rounded border">
                                  <Image
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-1"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">{product.name}</p>
                                  <p className="text-xs text-muted-foreground">ID: {product.id}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  product.status === "Active"
                                    ? "bg-green-100 text-green-800"
                                    : product.status === "Draft"
                                      ? "bg-gray-100 text-gray-800"
                                      : "bg-red-100 text-red-800"
                                }`}
                              >
                                {product.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Input
                                  type="number"
                                  className="w-16 h-8 mr-2 border-primary/30 focus-visible:ring-primary"
                                  value={product.inventory}
                                  onChange={(e) => {
                                    // In a real app, this would update the product inventory
                                    const newInventory = Number.parseInt(e.target.value)
                                    if (newInventory >= 0) {
                                      // Update inventory logic would go here
                                      toast.success(`${product.name} inventory updated to ${newInventory}`)
                                    }
                                  }}
                                />
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 border-primary/30 text-primary hover:bg-primary/10"
                                  onClick={() => {
                                    // Quick save inventory
                                    toast.success(`${product.name} inventory has been updated`)
                                  }}
                                >
                                  Save
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell>{product.sales} sold</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary hover:bg-primary/10 mr-1"
                                onClick={() => handleEditProduct(product)}
                              >
                                Edit
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleEditProduct(product)}>Edit</DropdownMenuItem>
                                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                  <DropdownMenuItem>Archive</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Orders</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              order.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Processing"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.status === "Shipped"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/seller-dashboard/orders/${order.id}`}>View</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

// Sample data
const recentOrders = [
  { id: "ORD-7352", customer: "John Smith", status: "Completed", amount: 125.99 },
  { id: "ORD-7351", customer: "Sarah Johnson", status: "Processing", amount: 89.99 },
  { id: "ORD-7350", customer: "Michael Brown", status: "Pending", amount: 149.99 },
  { id: "ORD-7349", customer: "Emily Davis", status: "Completed", amount: 34.99 },
  { id: "ORD-7348", customer: "Robert Wilson", status: "Processing", amount: 219.99 },
]

const topProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    sold: 42,
    revenue: 3779.58,
    price: 89.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Bluetooth Speaker",
    sold: 38,
    revenue: 2279.62,
    price: 59.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Laptop Stand",
    sold: 35,
    revenue: 1224.65,
    price: 34.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Wireless Mouse",
    sold: 31,
    revenue: 929.69,
    price: 29.99,
    image: "/placeholder.svg?height=100&width=100",
  },
]

const products = [
  {
    id: "PRD-001",
    name: "Wireless Headphones",
    status: "Active",
    inventory: 24,
    price: 89.99,
    sales: 42,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "PRD-002",
    name: "Bluetooth Speaker",
    status: "Active",
    inventory: 18,
    price: 59.99,
    sales: 38,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "PRD-003",
    name: "Laptop Stand",
    status: "Active",
    inventory: 7,
    price: 34.99,
    sales: 35,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "PRD-004",
    name: "Wireless Mouse",
    status: "Active",
    inventory: 12,
    price: 29.99,
    sales: 31,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "PRD-005",
    name: "Mechanical Keyboard",
    status: "Active",
    inventory: 15,
    price: 79.99,
    sales: 28,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "PRD-006",
    name: "USB-C Hub",
    status: "Draft",
    inventory: 20,
    price: 49.99,
    sales: 0,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "PRD-007",
    name: "Smartphone Stand",
    status: "Active",
    inventory: 0,
    price: 19.99,
    sales: 25,
    image: "/placeholder.svg?height=100&width=100",
  },
]

const orders = [
  { id: "ORD-7352", customer: "John Smith", date: "Jun 12, 2023", status: "Completed", items: 3, total: 125.99 },
  { id: "ORD-7351", customer: "Sarah Johnson", date: "Jun 11, 2023", status: "Processing", items: 1, total: 89.99 },
  { id: "ORD-7350", customer: "Michael Brown", date: "Jun 10, 2023", status: "Pending", items: 2, total: 149.99 },
  { id: "ORD-7349", customer: "Emily Davis", date: "Jun 09, 2023", status: "Completed", items: 1, total: 34.99 },
  { id: "ORD-7348", customer: "Robert Wilson", date: "Jun 08, 2023", status: "Processing", items: 4, total: 219.99 },
  { id: "ORD-7347", customer: "Jennifer Taylor", date: "Jun 07, 2023", status: "Shipped", items: 2, total: 109.98 },
  { id: "ORD-7346", customer: "David Martinez", date: "Jun 06, 2023", status: "Completed", items: 1, total: 59.99 },
  { id: "ORD-7345", customer: "Lisa Anderson", date: "Jun 05, 2023", status: "Completed", items: 3, total: 189.97 },
]