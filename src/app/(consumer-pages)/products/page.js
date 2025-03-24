"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Filter, ShoppingBag, Star, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function ProductsPage() {
  // Update the useState hooks to include functional filters
  const [viewMode, setViewMode] = useState("grid")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortOption, setSortOption] = useState("popularity")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [cartItems, setCartItems] = useState([])

  // Add a useEffect to apply filters
  useEffect(() => {
    let result = [...products]

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category))
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((product) => selectedBrands.includes(product.seller))
    }

    // Apply price range filter
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Apply sorting
    if (sortOption === "price-low") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortOption === "price-high") {
      result.sort((a, b) => b.price - a.price)
    } else if (sortOption === "newest") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date))
    } else {
      // Default: popularity (by reviews)
      result.sort((a, b) => b.reviews - a.reviews)
    }

    setFilteredProducts(result)
  }, [selectedCategories, selectedBrands, priceRange, sortOption, products])

  // Add to cart function
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prev, { ...product, quantity: 1 }]
      }
    })

    toast.success(`${product.name} has been added to your cart`)
  }

  // Update the category checkbox handler
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }

  // Update the brand checkbox handler
  const handleBrandChange = (brandName) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brandName)) {
        return prev.filter((name) => name !== brandName)
      } else {
        return [...prev, brandName]
      }
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">All Products</h1>

        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground">Products</li>
          </ol>
        </nav>

        {/* Filters and Sort - Mobile */}
        <div className="flex lg:hidden items-center justify-between mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Narrow down products to find exactly what you&apos;re looking for.</SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <MobileFilters
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedCategories={selectedCategories}
                  handleCategoryChange={handleCategoryChange}
                  selectedBrands={selectedBrands}
                  handleBrandChange={handleBrandChange}
                />
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  Sort by
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortOption("popularity")}>Popularity</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("price-low")}>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("price-high")}>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("newest")}>Newest First</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className={viewMode === "grid" ? "bg-muted" : ""}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={viewMode === "list" ? "bg-muted" : ""}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32 space-y-6">
              <div>
                <h3 className="font-medium mb-4 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </h3>
                <DesktopFilters
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedCategories={selectedCategories}
                  handleCategoryChange={handleCategoryChange}
                  selectedBrands={selectedBrands}
                  handleBrandChange={handleBrandChange}
                />
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {/* Sort and View Options - Desktop */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">1-24</span> of{" "}
                <span className="font-medium text-foreground">256</span> products
              </div>

              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      Sort by: <span className="font-medium capitalize">{sortOption.replace("-", " to ")}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortOption("popularity")}>Popularity</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption("price-low")}>Price: Low to High</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption("price-high")}>Price: High to Low</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption("newest")}>Newest First</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={viewMode === "grid" ? "bg-muted" : ""}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={viewMode === "list" ? "bg-muted" : ""}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <ProductListItem key={product.id} product={product} addToCart={addToCart} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-1">
                <Button variant="outline" size="icon" disabled>
                  <ChevronDown className="h-4 w-4 rotate-90" />
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-white hover:bg-primary/90">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  4
                </Button>
                <Button variant="outline" size="sm">
                  5
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Update the ProductCard component to use the addToCart function
function ProductCard({ product, addToCart }) {
  return (
    <Link href={`/product/${product.id}`}>
    <Card className="overflow-hidden transition-all hover:shadow-md border-red-100 hover:border-primary">
      <div className="relative h-48 bg-white">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain p-4" />
        {product.discount && (
          <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-1 mb-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-2">{product.seller}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-muted-foreground text-sm line-through">${product.originalPrice.toFixed(2)}</span>
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
    </Link>
  )
}

// Update the ProductListItem component to use the addToCart function
function ProductListItem({ product, addToCart }) {
  return (
    <Link href={`/product/${product.id}`}>
    <Card className="overflow-hidden transition-all hover:shadow-md border-red-100 hover:border-primary">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-48 h-48">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-contain p-4 bg-white"
          />
          {product.discount && (
            <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}% OFF
            </div>
          )}
        </div>
        <CardContent className="flex-1 p-4">
          <div className="flex items-center gap-1 mb-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-lg hover:text-primary transition-colors">{product.name}</h3>
          </Link>
          <p className="text-muted-foreground text-sm mb-2">{product.seller}</p>
          <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary text-lg">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-muted-foreground text-sm line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => addToCart(product)}>
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
    </Link>
  )
}

// Update the DesktopFilters component to use the filter handlers
function DesktopFilters({
  priceRange,
  setPriceRange,
  selectedCategories,
  handleCategoryChange,
  selectedBrands,
  handleBrandChange,
}) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="space-y-4">
        <h4 className="font-medium text-primary">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.name)}
                onCheckedChange={() => handleCategoryChange(category.name)}
                className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
              <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                {category.name} <span className="text-muted-foreground">({category.count})</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-medium text-primary">Price Range</h4>
        <Slider
          defaultValue={[0, 1000]}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="py-4"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm">$</span>
            <Input
              type="number"
              className="h-8 w-20 border-primary/30 focus-visible:ring-primary"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
            />
          </div>
          <span className="text-sm">to</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm">$</span>
            <Input
              type="number"
              className="h-8 w-20 border-primary/30 focus-visible:ring-primary"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
            />
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-4">
        <h4 className="font-medium text-primary">Brands</h4>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand.id}`}
                checked={selectedBrands.includes(brand.name)}
                onCheckedChange={() => handleBrandChange(brand.name)}
                className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
              <Label htmlFor={`brand-${brand.id}`} className="text-sm cursor-pointer">
                {brand.name} <span className="text-muted-foreground">({brand.count})</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Apply/Reset Buttons */}
      <div className="flex items-center gap-2 pt-2">
        <Button className="flex-1 bg-primary hover:bg-primary/90">Apply Filters</Button>
        <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/10">
          Reset
        </Button>
      </div>
    </div>
  )
}

// Update the MobileFilters component to use the filter handlers
function MobileFilters({
  priceRange,
  setPriceRange,
  selectedCategories,
  handleCategoryChange,
  selectedBrands,
  handleBrandChange,
}) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="space-y-4">
        <h4 className="font-medium">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`mobile-category-${category.id}`}
                checked={selectedCategories.includes(category.name)}
                onCheckedChange={() => handleCategoryChange(category.name)}
                className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
              <Label htmlFor={`mobile-category-${category.id}`} className="text-sm cursor-pointer">
                {category.name} <span className="text-muted-foreground">({category.count})</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-medium">Price Range</h4>
        <Slider
          defaultValue={[0, 1000]}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="py-4"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm">$</span>
            <Input
              type="number"
              className="h-8 w-20"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
            />
          </div>
          <span className="text-sm">to</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm">$</span>
            <Input
              type="number"
              className="h-8 w-20"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
            />
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-4">
        <h4 className="font-medium">Brands</h4>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={`mobile-brand-${brand.id}`}
                checked={selectedBrands.includes(brand.name)}
                onCheckedChange={() => handleBrandChange(brand.name)}
                className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
              <Label htmlFor={`mobile-brand-${brand.id}`} className="text-sm cursor-pointer">
                {brand.name} <span className="text-muted-foreground">({brand.count})</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Apply/Reset Buttons */}
      <div className="flex items-center gap-2 pt-4">
        <Button className="flex-1">Apply Filters</Button>
        <Button variant="outline" className="flex-1">
          Reset
        </Button>
      </div>
    </div>
  )
}

// Update the products data to include category
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 89.99,
    originalPrice: 129.99,
    discount: 30,
    rating: 4.8,
    reviews: 124,
    seller: "AudioTech",
    category: "Electronics",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Premium wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals alike.",
    date: "2023-05-15",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    rating: 4.6,
    reviews: 89,
    seller: "TechGear",
    category: "Electronics",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Track your fitness, receive notifications, and more with this sleek and stylish smartwatch. Water-resistant and long battery life.",
    date: "2023-06-20",
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
    category: "Home & Garden",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Ergonomic laptop stand that improves posture and reduces neck strain. Adjustable height and foldable for easy storage.",
    date: "2023-07-01",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 59.99,
    rating: 4.7,
    reviews: 176,
    seller: "SoundWave",
    category: "Electronics",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Portable Bluetooth speaker with rich bass and crystal clear sound. Waterproof and perfect for outdoor activities.",
    date: "2023-08-10",
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
    category: "Electronics",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Mechanical keyboard with customizable RGB lighting and tactile feedback. Perfect for gamers and programmers.",
    date: "2023-09-05",
  },
  {
    id: 6,
    name: "Wireless Mouse",
    price: 29.99,
    rating: 4.4,
    reviews: 98,
    seller: "TechGear",
    category: "Electronics",
    image: "/placeholder.svg?height=300&width=300",
    description: "Ergonomic wireless mouse with adjustable DPI and silent clicks. Comfortable for all-day use.",
    date: "2023-10-12",
  },
]

const categories = [
  { id: 1, name: "Electronics", count: 1243 },
  { id: 2, name: "Home & Garden", count: 865 },
  { id: 3, name: "Fashion", count: 1432 },
  { id: 4, name: "Digital Services", count: 756 },
  { id: 5, name: "Sports & Outdoors", count: 532 },
]

const brands = [
  { id: 1, name: "AudioTech", count: 43 },
  { id: 2, name: "TechGear", count: 65 },
  { id: 3, name: "ErgoDesign", count: 32 },
  { id: 4, name: "SoundWave", count: 56 },
  { id: 5, name: "TypeMaster", count: 28 },
]