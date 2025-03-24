"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [step, setStep] = useState("email") // email, otp, reset
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const router = useRouter()

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Replace with your actual API endpoint
    //   const response = await fetch("https://your-api-endpoint.com/forgot-password", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email }),
    //   })
        
        const response = {"ok": false}

        // toast.promise(response, {
        //   loading: 'Loading...',
        //   success: (data) => {
        //     return `${data.name} toast has been added`;
        //   },
        //   error: 'Error',
        // });

      if (response.ok) {
        toast.success("We've sent an OTP to your email address.")
        setStep("otp")
      } else {
        const data = await response.json()
        toast.error(data.message || "Please check your email and try again.")
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.",)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const otpValue = otp.join("")

    try {
      // Replace with your actual API endpoint
    //   const response = await fetch("https://your-api-endpoint.com/verify-otp", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email, otp: otpValue }),
    //   })

      const response = {"ok":true}

      if (response.ok) {
          toast.message("OTP Verified!", {
            description: "You can now reset your password.",
          })
        router.push("/reset-password/1")
      } else {
        const data = await response.json()
        toast.error(data.message || "Please check the OTP and try again.")
      }
    } catch (error) {
      toast("An unexpected error occurred. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[86vh] items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-primary">Forgot Password</CardTitle>
          <CardDescription className="text-center">
            {step === "email"
              ? "Enter your email to receive a one-time password"
              : "Enter the 6-digit code sent to your email"}
          </CardDescription>
        </CardHeader>

        {step === "email" ? (
          <form onSubmit={handleEmailSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full mt-5" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send OTP"}
              </Button>
              <div className="text-center text-sm">
                Remember your password?{" "}
                <Link href="/signin" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <div className="flex justify-between gap-2">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      className="h-12 w-12 text-center text-lg"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      required
                    />
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full mt-5" disabled={isLoading || otp.some((digit) => !digit)}>
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>
              <Button type="button" variant="ghost" className="w-full" onClick={() => setStep("email")}>
                Back to Email
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  )
}