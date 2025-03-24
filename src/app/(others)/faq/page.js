"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter FAQs based on search query
  const filterFAQs = (faqs) => {
    if (!searchQuery.trim()) return faqs

    const query = searchQuery.toLowerCase()
    return faqs.filter((faq) => faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about our platform, shopping, selling, and more.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for answers..."
            className="pl-10 border-primary/30 focus-visible:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* FAQ Categories */}
      <Tabs defaultValue="general" className="max-w-3xl mx-auto">
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="shopping">Shopping</TabsTrigger>
          <TabsTrigger value="selling">Selling</TabsTrigger>
          <TabsTrigger value="account">Account & Payment</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Accordion type="single" collapsible className="w-full">
            {filterFAQs(generalFAQs).map((faq, index) => (
              <AccordionItem key={index} value={`general-${index}`}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filterFAQs(generalFAQs).length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No matching FAQs found. Try a different search term.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="shopping">
          <Accordion type="single" collapsible className="w-full">
            {filterFAQs(shoppingFAQs).map((faq, index) => (
              <AccordionItem key={index} value={`shopping-${index}`}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filterFAQs(shoppingFAQs).length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No matching FAQs found. Try a different search term.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="selling">
          <Accordion type="single" collapsible className="w-full">
            {filterFAQs(sellingFAQs).map((faq, index) => (
              <AccordionItem key={index} value={`selling-${index}`}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filterFAQs(sellingFAQs).length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No matching FAQs found. Try a different search term.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="account">
          <Accordion type="single" collapsible className="w-full">
            {filterFAQs(accountFAQs).map((faq, index) => (
              <AccordionItem key={index} value={`account-${index}`}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filterFAQs(accountFAQs).length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No matching FAQs found. Try a different search term.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Still Need Help */}
      <div className="max-w-3xl mx-auto mt-16 p-8 bg-muted rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
        <p className="text-muted-foreground mb-6">
          Can&apos;t find the answer you&apos;re looking for? Please contact our support team.
        </p>
        <Button className="bg-primary hover:bg-primary/90" asChild>
          <Link href="/contact">
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Support
          </Link>
        </Button>
      </div>
    </div>
  )
}

const generalFAQs = [
  {
    question: "What is MarketPlace?",
    answer:
      "MarketPlace is an online platform that connects buyers and sellers from around the world. We offer a wide range of products across multiple categories, with secure payment processing and reliable shipping options.",
  },
  {
    question: "How do I create an account?",
    answer:
      "To create an account, click on the 'Sign Up' button in the top right corner of the page. You'll need to provide your email address, create a password, and fill in some basic information. You can also sign up using your Google or Facebook account for faster registration.",
  },
  {
    question: "Is MarketPlace available in my country?",
    answer:
      "MarketPlace is available in over 100 countries worldwide. You can check if we ship to your location by entering your country during the checkout process or by visiting our Shipping Information page.",
  },
  {
    question: "What are the benefits of using MarketPlace?",
    answer:
      "MarketPlace offers a secure shopping environment, verified sellers, competitive prices, a wide product selection, buyer protection, and excellent customer service. We also have a rewards program where you can earn points on purchases.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact our customer support team through the 'Contact Us' page on our website, by emailing support@marketplace.com, or by calling our customer service line at +1 (555) 123-4567. Our support hours are Monday through Friday, 9AM to 6PM EST.",
  },
]

const shoppingFAQs = [
  {
    question: "How do I place an order?",
    answer:
      "To place an order, browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping information and payment details to complete your purchase.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and in some regions, bank transfers and cash on delivery.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and visiting the 'Orders' section.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for most items. Products must be in their original condition with all packaging and tags. Some categories like electronics may have different return windows. Please check our Returns page for specific details.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to over 100 countries worldwide. International shipping costs and delivery times vary by location. Import duties and taxes may apply depending on your country's regulations.",
  },
  {
    question: "How long will it take to receive my order?",
    answer:
      "Delivery times depend on your location and the shipping method selected. Domestic orders typically arrive within 3-7 business days, while international orders may take 7-21 business days. Expedited shipping options are available at checkout.",
  },
]

const sellingFAQs = [
  {
    question: "How do I become a seller on MarketPlace?",
    answer:
      "To become a seller, visit our 'Sell on MarketPlace' page and follow the registration process. You'll need to provide business information, tax details, and set up your payment method. Once approved, you can start listing products.",
  },
  {
    question: "What are the fees for selling on MarketPlace?",
    answer:
      "We charge a combination of subscription fees and per-sale commissions. Basic seller accounts start at $29.99 per month plus a 5% commission on each sale. Professional accounts have higher monthly fees but lower commissions. Visit our Pricing page for detailed information.",
  },
  {
    question: "How do I list products for sale?",
    answer:
      "After setting up your seller account, you can list products through your Seller Dashboard. You'll need to provide product details, images, pricing, inventory levels, and shipping information. You can list items individually or use bulk upload tools for multiple listings.",
  },
  {
    question: "When and how do I get paid for my sales?",
    answer:
      "Payments are processed every 14 days for all sales where the delivery has been confirmed and the return period has passed. Funds are transferred directly to your linked bank account. You can view your payment history and upcoming disbursements in your Seller Dashboard.",
  },
  {
    question: "How do I handle returns and refunds as a seller?",
    answer:
      "When a customer initiates a return, you'll receive a notification. You can either approve the return automatically or review it first. Once the item is returned, you'll need to inspect it and process the refund within 2 business days. Our seller protection program covers certain types of disputes.",
  },
]

const accountFAQs = [
  {
    question: "How do I reset my password?",
    answer:
      "To reset your password, click on 'Sign In', then select 'Forgot Password'. Enter the email address associated with your account, and we'll send you a password reset link. Follow the instructions in the email to create a new password.",
  },
  {
    question: "How can I update my account information?",
    answer:
      "You can update your account information by logging in and navigating to 'My Account' or 'Account Settings'. From there, you can edit your personal details, change your password, update payment methods, and manage your shipping addresses.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Yes, we use industry-standard encryption and security protocols to protect your payment information. We are PCI DSS compliant and never store your full credit card details on our servers. All transactions are processed through secure payment gateways.",
  },
  {
    question: "Can I have multiple shipping addresses?",
    answer:
      "Yes, you can save multiple shipping addresses in your account. During checkout, you'll be able to select from your saved addresses or add a new one. This is particularly useful for sending gifts or if you have multiple delivery locations.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "To delete your account, go to 'Account Settings' and select 'Close Account' at the bottom of the page. You'll need to confirm your decision and may be asked to provide feedback. Note that account deletion is permanent and will remove all your data, including order history and saved items.",
  },
]

