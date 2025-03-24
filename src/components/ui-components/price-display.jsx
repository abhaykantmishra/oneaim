import { cn } from "@/lib/utils"

export function PriceDisplay({
  price,
  originalPrice,
  size = "md",
  showDiscount = false,
  className,
}) {
  // Calculate discount percentage if not provided
  const discountPercentage = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  // Size-specific classes
  const sizeClasses = {
    sm: {
      current: "text-sm font-bold",
      original: "text-xs",
      discount: "text-xs",
    },
    md: {
      current: "text-base font-bold",
      original: "text-sm",
      discount: "text-sm",
    },
    lg: {
      current: "text-xl font-bold",
      original: "text-base",
      discount: "text-sm",
    },
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center gap-2">
        <span className={cn("text-primary", sizeClasses[size].current)}>${price.toFixed(2)}</span>

        {originalPrice && originalPrice > price && (
          <span className={cn("text-muted-foreground line-through", sizeClasses[size].original)}>
            ${originalPrice.toFixed(2)}
          </span>
        )}
      </div>

      {showDiscount && originalPrice && originalPrice > price && (
        <span className={cn("text-green-600 font-medium", sizeClasses[size].discount)}>
          Save ${(originalPrice - price).toFixed(2)} ({discountPercentage}%)
        </span>
      )}
    </div>
  )
}

