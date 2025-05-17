import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingBag, Briefcase, Star, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-black/70 z-10" />
        <Image
          src="/placeholder.svg"
          alt="Marketplace Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Your One-Stop Marketplace</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Find the best products and services from verified sellers here
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-primary hover:bg-white/90 border-primary"
              asChild
            >
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-primary">Featured Categories</h2>
          <Link href="/categories" className="text-primary flex items-center gap-1 hover:underline mt-2 md:mt-0">
            View all categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={category.href}>
              <Card className="overflow-hidden transition-all hover:shadow-md border-red-100 hover:border-primary">
                <div className="relative h-40">
                  <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <p className="text-muted-foreground text-sm">{category.count} listings</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-primary">Featured Products</h2>
            <Link href="/products" className="text-primary flex items-center gap-1 hover:underline mt-2 md:mt-0">
              View all products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden transition-all hover:shadow-md border-red-100 hover:border-primary"
              >
                <Link href={`/product/${product.id}`}>
                <div className="relative h-48 bg-white">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                  />
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
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{product.seller}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-muted-foreground text-sm line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      <ShoppingBag className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-primary">Top Services</h2>
          <Link href="/services" className="text-primary flex items-center gap-1 hover:underline mt-2 md:mt-0">
            View all services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.id}
              className="overflow-hidden transition-all hover:shadow-md border-red-100 hover:border-primary"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/3 h-32 md:h-auto">
                  <Image src={service.image || "/placeholder.svg"} alt={service.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4 flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{service.rating}</span>
                    <span className="text-xs text-muted-foreground">({service.reviews})</span>
                  </div>
                  <h3 className="font-semibold">{service.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{service.provider}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-primary">Starting at ${service.price.toFixed(2)}</span>
                    <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      <Briefcase className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Become a Seller */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Become a Seller Today</h2>
              <p className="text-white/90 mb-6">
                Join thousands of successful sellers on our platform. Reach more customers and grow your business with
                our powerful tools and support.
              </p>
              <Button className="bg-white text-primary hover:bg-white/90" size="lg" asChild>
                <Link href="/seller/register">Start Selling</Link>
              </Button>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-6 rounded-none">
                <TrendingUp className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-semibold mb-2">Grow Your Business</h3>
                <p className="text-white/80">
                  Access millions of potential customers looking for your products and services.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-none">
                <ShoppingBag className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-semibold mb-2">Easy Management</h3>
                <p className="text-white/80">
                  Powerful tools to manage your inventory, orders, and customer relationships.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-none">
                <Star className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-semibold mb-2">Build Reputation</h3>
                <p className="text-white/80">Earn reviews and ratings to establish trust with potential customers.</p>
              </div>
              <div className="bg-white/10 p-6 rounded-none">
                <Briefcase className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-semibold mb-2">Sell Anything</h3>
                <p className="text-white/80">
                  List physical products or digital services with flexible pricing options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Sample data
const categories = [
  {
    id: 1,
    name: "Electronics",
    count: 1243,
    image: "/placeholder.svg?height=400&width=600",
    href: "/categories/electronics",
  },
  {
    id: 2,
    name: "Home & Garden",
    count: 865,
    image: "/placeholder.svg?height=400&width=600",
    href: "/categories/home-garden",
  },
  { id: 3, name: "Fashion", count: 1432, image: "/placeholder.svg?height=400&width=600", href: "/categories/fashion" },
  {
    id: 4,
    name: "Digital Services",
    count: 756,
    image: "/placeholder.svg?height=400&width=600",
    href: "/categories/digital-services",
  },
]

const products = [
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
    id: 4,
    name: "Bluetooth Speaker",
    price: 59.99,
    rating: 4.7,
    reviews: 176,
    seller: "SoundWave",
    image: "/placeholder.svg?height=300&width=300",
  },
]

const services = [
  {
    id: 1,
    name: "Website Development",
    price: 499,
    rating: 4.9,
    reviews: 87,
    provider: "WebWizards",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Logo Design",
    price: 99,
    rating: 4.7,
    reviews: 132,
    provider: "CreativeMinds",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Social Media Management",
    price: 299,
    rating: 4.6,
    reviews: 64,
    provider: "SocialBoost",
    image: "/placeholder.svg?height=200&width=300",
  },
]
