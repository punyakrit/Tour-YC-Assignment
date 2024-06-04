import { ChromeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { emailLogin, UserSignUp } from "../../actions/action";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function SignIn() {

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
            Sign In to Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="-space-y-px rounded-md shadow-sm">
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
                className="relative block w-full appearance-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
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
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <button
              type="submit"
              formAction={emailLogin}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign In
            </button>
            <button
              type="button"
              formAction={""}
              className="group relative flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <ChromeIcon className="mr-2 h-5 w-5" />
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
