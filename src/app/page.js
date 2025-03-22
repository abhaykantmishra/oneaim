import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-full">
    <h1>Dashboard</h1>
    <Link href="/dashboard" className="bg-gray-200 mx-10">Dashboard Page</Link>
    <br />

    <h1>Authentication pages</h1>
    <Link href="/signup" className="bg-gray-200 mx-10">SignUp Page</Link>
    <br />
    <Link href="/signin" className="bg-gray-200 mx-10">SignIn Page</Link>
    <br />
    <Link href="/forgot-password" className="bg-gray-200 mx-10">Forgot Password Page</Link>
    <br />

    <h1>Consumer pages</h1>
    <Link href="/cart" className="bg-gray-200 mx-10">Cart Page</Link>
    <br />
    <Link href="/products" className="bg-gray-200 mx-10">Products Browsing Page</Link>
    <br />
    <Link href="/product/abc" className="bg-gray-200 mx-10">Single Product Page</Link>
    <br />

    <h1>Seller pages</h1>
    <Link href="/seller-dashboard" className="bg-gray-200 mx-10">Seller Dashboard Page</Link>
    <br />
    
    </div>
  );
}
