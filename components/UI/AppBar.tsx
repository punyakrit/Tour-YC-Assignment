import { signOut } from "@/app/actions/action";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function AppBar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/signin');
    return null;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", user.id)
    .single();


  const displayName = profile?.name || user?.user_metadata?.name || "User";

  return (
    <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">Welcome, {displayName}</div>

      <form action={signOut} className="flex items-center">
        <button className="mx-10 border px-3 py-2">Sign Out</button>
      </form>
    </div>
  );
}

export default AppBar;
