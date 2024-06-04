import { ChromeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import {  UserSignUp } from "../../actions/action";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import GoogleLoginButton from "@/components/UI/GoogleLoginButton";

async function Signup() {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(user){
    redirect('/')
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white rounded-lg p-8 shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Register Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link href="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in to your existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="-space-y-px rounded-md shadow-sm">
            <div className="py-2">
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="relative block w-full appearance-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="Name"
              />
            </div>
            <div className="py-2">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="Email address"
              />
            </div>
            <div className="py-2">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <button
              type="submit"
              formAction={UserSignUp}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Register
            </button>
            <GoogleLoginButton/>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
