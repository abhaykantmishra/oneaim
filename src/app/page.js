import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-full">
    <Link href="/signup" className="bg-gray-200 mx-10">SignUp Page</Link>
    <br />
    <Link href="/signin" className="bg-gray-200 mx-10">SignIn Page</Link>
    <br />
    <Link href="/forgot-password" className="bg-gray-200 mx-10">Forgot Password Page</Link>
    <br />
    {/* <Link href="/signup">Signup Page</Link> */}
    {/* <Link href="/signup">Signup Page</Link> */}
    </div>
  );
}
