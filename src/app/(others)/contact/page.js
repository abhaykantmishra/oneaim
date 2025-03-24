"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, MapPin, Phone, MessageSquare, Send, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent! \n We'll get back to you as soon as possible.")

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "general",
        message: "",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Contact Us</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have questions or feedback? We&apos;d love to hear from you. Our team is here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <span>Call Us</span>
            </CardTitle>
            <CardDescription>Speak directly with our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium">Customer Support:</p>
            <p className="text-muted-foreground mb-2">+1 (555) 123-4567</p>
            <p className="font-medium">Seller Support:</p>
            <p className="text-muted-foreground mb-2">+1 (555) 987-6543</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
              <Clock className="h-4 w-4" />
              <span>Mon-Fri: 9AM-6PM EST</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <span>Email Us</span>
            </CardTitle>
            <CardDescription>Get in touch via email</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium">General Inquiries:</p>
            <p className="text-muted-foreground mb-2">info@marketplace.com</p>
            <p className="font-medium">Customer Support:</p>
            <p className="text-muted-foreground mb-2">support@marketplace.com</p>
            <p className="font-medium">Seller Support:</p>
            <p className="text-muted-foreground">sellers@marketplace.com</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Visit Us</span>
            </CardTitle>
            <CardDescription>Our headquarters location</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium">Headquarters:</p>
            <p className="text-muted-foreground">
              123 Commerce Street
              <br />
              Shopping District
              <br />
              New York, NY 10001
              <br />
              United States
            </p>
            <div className="mt-4">
              <Link
                href="https://maps.google.com"
                target="_blank"
                className="text-primary hover:underline text-sm flex items-center gap-1"
              >
                View on map <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>Send Us a Message</span>
              </CardTitle>
              <CardDescription>Fill out the form below and we&apos;ll get back to you as soon as possible</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-primary/30 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-primary/30 focus-visible:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border-primary/30 focus-visible:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Subject</Label>
                  <RadioGroup
                    value={formData.subject}
                    onValueChange={handleRadioChange}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="general" id="general" />
                      <Label htmlFor="general">General Inquiry</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="support" id="support" />
                      <Label htmlFor="support">Customer Support</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="seller" id="seller" />
                      <Label htmlFor="seller">Seller Support</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="feedback" id="feedback" />
                      <Label htmlFor="feedback">Feedback</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="border-primary/30 focus-visible:ring-primary"
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="font-medium mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
              <div className="pt-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/faq">View All FAQs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

const faqs = [
  {
    question: "How do I track my order?",
    answer:
      "You can track your order by logging into your account and visiting the 'Orders' section, or by using the tracking number provided in your shipping confirmation email.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for most items. Products must be in their original condition with all packaging and tags.",
  },
  {
    question: "How do I become a seller?",
    answer:
      "To become a seller, visit our 'Sell on MarketPlace' page and follow the registration process. You'll need to provide some business information and payment details.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary by location.",
  },
]