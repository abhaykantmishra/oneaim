"use client"

import { useState } from "react"
import { Search, MapPin, Phone, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StoreLocatorPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("usa")
  const [searchRadius, setSearchRadius] = useState("25")
  const [isSearching, setIsSearching] = useState(false)
  const [selectedStore, setSelectedStore] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    setIsSearching(true)

    // Simulate API call
    setTimeout(() => {
      setIsSearching(false)
    }, 1000)
  }

  const filteredStores = stores.filter(
    (store) =>
      store.country === selectedCountry &&
      (searchQuery === "" ||
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.zip.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Find a Store</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Locate our physical stores and authorized resellers near you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Store Search</CardTitle>
              <CardDescription>Find stores by location or search for a specific store</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="location" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="location">By Location</TabsTrigger>
                  <TabsTrigger value="name">By Name</TabsTrigger>
                </TabsList>

                <TabsContent value="location">
                  <form onSubmit={handleSearch} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <label htmlFor="country" className="text-sm font-medium">
                        Country
                      </label>
                      <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                        <SelectTrigger className="border-primary/30 focus:ring-primary">
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usa">United States</SelectItem>
                          <SelectItem value="canada">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="australia">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="zipCode" className="text-sm font-medium">
                        ZIP/Postal Code
                      </label>
                      <Input
                        id="zipCode"
                        placeholder="e.g., 10001"
                        className="border-primary/30 focus-visible:ring-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="radius" className="text-sm font-medium">
                        Search Radius
                      </label>
                      <Select value={searchRadius} onValueChange={setSearchRadius}>
                        <SelectTrigger className="border-primary/30 focus:ring-primary">
                          <SelectValue placeholder="Select radius" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 miles</SelectItem>
                          <SelectItem value="25">25 miles</SelectItem>
                          <SelectItem value="50">50 miles</SelectItem>
                          <SelectItem value="100">100 miles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSearching}>
                      {isSearching ? (
                        <span>Searching...</span>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Find Stores
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="name">
                  <form onSubmit={handleSearch} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <label htmlFor="storeName" className="text-sm font-medium">
                        Store Name or City
                      </label>
                      <Input
                        id="storeName"
                        placeholder="e.g., MarketPlace New York"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border-primary/30 focus-visible:ring-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="country" className="text-sm font-medium">
                        Country
                      </label>
                      <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                        <SelectTrigger className="border-primary/30 focus:ring-primary">
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usa">United States</SelectItem>
                          <SelectItem value="canada">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="australia">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSearching}>
                      {isSearching ? (
                        <span>Searching...</span>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Search Stores
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Store List */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-4">
              {filteredStores.length} {filteredStores.length === 1 ? "Store" : "Stores"} Found
            </h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {filteredStores.map((store) => (
                <Card
                  key={store.id}
                  className={`cursor-pointer transition-colors ${selectedStore?.id === store.id ? "border-primary" : "hover:border-primary/50"}`}
                  onClick={() => setSelectedStore(store)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-bold">{store.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {store.address}, {store.city}, {store.state} {store.zip}
                    </p>
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <Phone className="h-3 w-3 mr-1" />
                      {store.phone}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{store.type}</span>
                      <Button variant="ghost" size="sm" className="text-primary">
                        Details <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredStores.length === 0 && (
                <div className="text-center py-8 bg-muted rounded-lg">
                  <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="font-medium">No stores found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {/* Map Placeholder */}
          <div className="bg-muted rounded-lg h-[400px] flex items-center justify-center mb-6">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="font-medium">Interactive Map</p>
              <p className="text-sm text-muted-foreground">Map would be displayed here with store locations</p>
            </div>
          </div>

          {/* Selected Store Details */}
          {selectedStore ? (
            <Card>
              <CardHeader>
                <CardTitle>{selectedStore.name}</CardTitle>
                <CardDescription>
                  {selectedStore.type} • {selectedStore.distance} miles away
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      Address
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedStore.address}
                      <br />
                      {selectedStore.city}, {selectedStore.state} {selectedStore.zip}
                      <br />
                      {selectedStore.country === "usa"
                        ? "United States"
                        : selectedStore.country === "canada"
                          ? "Canada"
                          : selectedStore.country === "uk"
                            ? "United Kingdom"
                            : "Australia"}
                    </p>
                    <Button variant="link" className="p-0 h-auto text-primary" asChild>
                      <a
                        href={`https://maps.google.com/?q=${selectedStore.address},${selectedStore.city},${selectedStore.state}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Directions
                      </a>
                    </Button>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      Store Hours
                    </h3>
                    <div className="text-sm space-y-1">
                      {selectedStore.hours.map((hour, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="font-medium">{hour.day}</span>
                          <span className="text-muted-foreground">{hour.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2 flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-primary" />
                    Contact Information
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Phone: {selectedStore.phone}
                    <br />
                    Email: {selectedStore.email}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Available Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedStore.services.map((service, index) => (
                      <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="bg-primary hover:bg-primary/90">Schedule an Appointment</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a Store</h3>
                <p className="text-muted-foreground">Choose a store from the list to view detailed information</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

const stores = [
  {
    id: 1,
    name: "MarketPlace Flagship Store",
    type: "Flagship Store",
    address: "123 Broadway",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "usa",
    phone: "(212) 555-1234",
    email: "nyc@marketplace.com",
    distance: 0.5,
    hours: [
      { day: "Monday - Friday", hours: "9:00 AM - 9:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 8:00 PM" },
      { day: "Sunday", hours: "11:00 AM - 6:00 PM" },
    ],
    services: ["In-store Pickup", "Returns", "Tech Support", "Personal Shopping", "Repair Services"],
  },
  {
    id: 2,
    name: "MarketPlace Brooklyn",
    type: "Retail Store",
    address: "456 Atlantic Avenue",
    city: "Brooklyn",
    state: "NY",
    zip: "11217",
    country: "usa",
    phone: "(718) 555-5678",
    email: "brooklyn@marketplace.com",
    distance: 4.2,
    hours: [
      { day: "Monday - Friday", hours: "10:00 AM - 8:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 7:00 PM" },
      { day: "Sunday", hours: "11:00 AM - 6:00 PM" },
    ],
    services: ["In-store Pickup", "Returns", "Tech Support"],
  },
  {
    id: 3,
    name: "MarketPlace Queens",
    type: "Retail Store",
    address: "789 Queens Blvd",
    city: "Queens",
    state: "NY",
    zip: "11375",
    country: "usa",
    phone: "(718) 555-9012",
    email: "queens@marketplace.com",
    distance: 7.8,
    hours: [
      { day: "Monday - Friday", hours: "10:00 AM - 8:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 7:00 PM" },
      { day: "Sunday", hours: "11:00 AM - 6:00 PM" },
    ],
    services: ["In-store Pickup", "Returns"],
  },
  {
    id: 4,
    name: "MarketPlace Authorized Reseller - Tech Haven",
    type: "Authorized Reseller",
    address: "321 Main Street",
    city: "Hoboken",
    state: "NJ",
    zip: "07030",
    country: "usa",
    phone: "(201) 555-3456",
    email: "techhaven@example.com",
    distance: 5.3,
    hours: [
      { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 6:00 PM" },
      { day: "Sunday", hours: "Closed" },
    ],
    services: ["In-store Pickup", "Returns", "Tech Support"],
  },
  {
    id: 5,
    name: "MarketPlace San Francisco",
    type: "Flagship Store",
    address: "555 Market Street",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "usa",
    phone: "(415) 555-7890",
    email: "sf@marketplace.com",
    distance: 2900,
    hours: [
      { day: "Monday - Friday", hours: "9:00 AM - 9:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 8:00 PM" },
      { day: "Sunday", hours: "11:00 AM - 6:00 PM" },
    ],
    services: ["In-store Pickup", "Returns", "Tech Support", "Personal Shopping", "Repair Services"],
  },
]

