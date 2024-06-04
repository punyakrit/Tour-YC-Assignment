"use client"
import { oAuth } from "@/app/actions/action";
import { ChromeIcon } from "lucide-react";
import React from "react";

function GoogleLoginButton() {
  return (
    <button
    onClick={async ()=>{
        await oAuth()
    }}
      type="button"
      className="group relative flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <ChromeIcon className="mr-2 h-5 w-5" />
      Sign in with Google
    </button>
  );
}

export default GoogleLoginButton;
