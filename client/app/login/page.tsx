"use client";
import Link from 'next/link'

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-orange-300 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-4xl">
        <div className="bg-white/20 backdrop-blur-md p-8  shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-white">Welcome back</h2>
          <p className="text-white/70">Please Enter your Account details</p>
          <div className="space-y-4">
            <div>
              <label className="block text-white/70">Email</label>
              <input
                type="email"
                defaultValue="Johndoe@gmail.com"
                className="w-full p-3 mt-1 rounded-full bg-black/70 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-white/70">Password</label>
              <input
                type="password"
                defaultValue="••••••••"
                className="w-full p-3 mt-1 rounded-full bg-black/70 text-white focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center justify-end text-white/70">
            <a href="#" className="underline">
              Forgot Password?
            </a>
          </div>
          <button className="w-full py-3 mt-4 bg-gradient-to-r from-pink-500 to-orange-300 text-white font-bold rounded-full">
            Sign in
          </button>
          <div className="flex items-center justify-center text-white/70">
          <Link href="/register">sign up</Link>
          </div>
        </div>
        <div className="bg-black/70 p-8  shadow-lg text-white space-y-6">
          <h2 className="text-3xl font-bold">What’s our Jobseekers Said.</h2>
          <blockquote className="text-lg">
            <p>
              “Search and find your dream job is now easier than ever. Just
              browse a job and apply if you need to.”
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
