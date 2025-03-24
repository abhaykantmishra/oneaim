"use client"

import Link from "next/link"
import Image from "next/image"
import { Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductRating } from "@/components/ui-components/product-rating"


export function ServiceCard({ service, size = "medium", layout = "horizontal", className }) {
  // Size-specific classes
  const sizeClasses = {
    small: {
      card: "max-w-[300px]",
      imageContainer: layout === "horizontal" ? "w-1/3 h-24" : "w-full h-32",
      title: "text-sm font-medium line-clamp-1",
      provider: "text-xs",
    },
    medium: {
      card: "max-w-[400px]",
      imageContainer: layout === "horizontal" ? "w-1/3 h-32 md:h-auto" : "w-full h-48",
      title: "font-semibold line-clamp-2",
      provider: "text-sm",
    },
    large: {
      card: "max-w-[500px]",
      imageContainer: layout === "horizontal" ? "w-1/3 h-40 md:h-auto" : "w-full h-64",
      title: "text-lg font-semibold line-clamp-2",
      provider: "text-sm",
    },
  }

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md border-red-100 hover:border-primary",
        sizeClasses[size].card,
        className,
      )}
    >
      <div className={cn("flex", layout === "horizontal" ? "flex-row" : "flex-col")}>
        <div className={cn("relative", sizeClasses[size].imageContainer)}>
          <Image src={service.image || "/placeholder.svg"} alt={service.name} fill className="object-cover" />
          {service.featured && (
            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">Featured</Badge>
          )}
        </div>

        <CardContent className={cn("p-4 flex-1", layout === "vertical" && "w-full")}>
          <ProductRating rating={service.rating} reviews={service.reviews} size={size === "small" ? "sm" : "md"} />

          <Link href={`/service/${service.id}`}>
            <h3 className={cn("hover:text-primary transition-colors mt-1", sizeClasses[size].title)}>{service.name}</h3>
          </Link>

          <p className={cn("text-muted-foreground", sizeClasses[size].provider)}>{service.provider}</p>

          {service.description && size !== "small" && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{service.description}</p>
          )}

          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-primary">Starting at ${service.price.toFixed(2)}</span>

            <Button
              variant="outline"
              size={size === "small" ? "sm" : "default"}
              className="border-primary text-primary hover:bg-primary/10"
              asChild
            >
              <Link href={`/service/${service.id}`}>
                <Briefcase className="h-4 w-4 mr-1" />
                Details
              </Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}