import { signOut } from "@/app/actions/action";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function AppBar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(!user){
    redirect('/signin')
  }
  return (
    <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">Welcome</div>

      {user !== null ? (
        <form action={signOut} className="flex items-center">
          <div>{user.email}</div>
          <button className="mx-10 border px-3 py-2">Sign Out</button>
        </form>
      ) : (
        <Link href={"/signin"}>
          <div>Signin</div>
        </Link>
      )}
    </div>
  );
}

export default AppBar;
