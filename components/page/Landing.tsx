import React from "react";
import { SparklesCore } from "../UI/sparkles";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function Landing() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
    return null;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", user.id)
    .single();

  const displayName = profile?.name || user?.user_metadata?.name || "User";

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden ">
      <h1 className="md:text-4xl text-xl lg:text-6xl font-bold text-center text-white relative z-20">
        Welcome{" "}
        <span className="bg-gradient-to-t from-blue-300 to-blue-950 inline-block text-transparent bg-clip-text">
          {displayName}
        </span>{" "}
        to @Tour YC(S21)
      </h1>
      <Link href={"/profile"}>
        <button className="text-white my-5 border px-4 py-2 rounded-2xl hover:bg-white hover:text-black transition duration-500">
          View Profile
        </button>
      </Link>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}

export default Landing;
