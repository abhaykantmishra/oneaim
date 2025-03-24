import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted border-t">
      {/* Newsletter Section */}
      {/* <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Subscribe to our newsletter</h3>
              <p className="text-primary-foreground/90 max-w-md">
                Get the latest updates, exclusive offers and special discounts delivered to your inbox.
              </p>
            </div>
            <div className="md:w-1/2 w-full max-w-md">
              <form className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-foreground/70" />
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/70 focus-visible:ring-primary-foreground/30"
                    required
                  />
                </div>
                <Button type="submit" className="bg-white text-primary hover:bg-white/90">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/dashboard" className="flex items-center gap-2 mb-4">
              <Image src="/placeholder.svg" alt="OneAim Logo" width={40} height={40} />
              <span className="font-bold text-xl text-primary">OneAim</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Your one-stop marketplace for all your shopping needs. Find the best products from verified sellers at
              competitive prices.
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">
                  123 Commerce Street, Shopping District
                  <br />
                  XYz, ABC 10001, INDIA
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-sm">+91 000000000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-sm">support@oneaim.com</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/electronics" className="text-muted-foreground hover:text-primary">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/categories/fashion" className="text-muted-foreground hover:text-primary">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/categories/home-garden" className="text-muted-foreground hover:text-primary">
                  Home & Garden
                </Link>
              </li>
              <li>
                <Link href="/categories/sports-outdoors" className="text-muted-foreground hover:text-primary">
                  Sports & Outdoors
                </Link>
              </li>
              <li>
                <Link href="/categories/toys-games" className="text-muted-foreground hover:text-primary">
                  Toys & Games
                </Link>
              </li>
              <li>
                <Link href="/categories/health-beauty" className="text-muted-foreground hover:text-primary">
                  Health & Beauty
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-muted-foreground hover:text-primary">
                  Today's Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help-center" className="text-muted-foreground hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-muted-foreground hover:text-primary">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-primary">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-primary">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4">About & Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-muted-foreground hover:text-primary">
                  Press Center
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-primary">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods & Social Media */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="font-medium mb-3 text-center md:text-left">Payment Methods</h4>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {["visa", "mastercard", "amex", "paypal", "apple-pay", "google-pay"].map((method) => (
                <div key={method} className="bg-white p-2 rounded border w-12 h-8 flex items-center justify-center">
                  <Image src={`/placeholder.svg?text=${method}`} alt={method} width={32} height={20} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-center md:text-left">Follow Us</h4>
            <div className="flex gap-3">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-full border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-full border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-full border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-full border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-full border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 pt-8 border-t text-center md:flex md:justify-between md:items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {currentYear} OneAim. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
            <Link href="/accessibility" className="text-muted-foreground hover:text-primary">
              Accessibility
            </Link>
            <Link href="/sitemap" className="text-muted-foreground hover:text-primary">
              Sitemap
            </Link>
            <Link href="/affiliate" className="text-muted-foreground hover:text-primary">
              Affiliate Program
            </Link>
            <Link href="/seller-terms" className="text-muted-foreground hover:text-primary">
              Seller Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

