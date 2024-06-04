import { createClient } from "@/utils/supabase/server";
import { MailIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar";
import { Input } from "@/components/UI/input";
import { Textarea } from "@/components/UI/textarea";
import { Button } from "@/components/UI/button";

async function page() {
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

  const displayName = profile?.name || user?.user_metadata?.name ;


  return (
    <div className="h-screen justify-center bg-gray-900 flex flex-col items-center p-6">
      <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div className="flex flex-col items-center py-6">
          <div className="  mb-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.user_metadata.avatar_url || "https://github.com/shadcn.png"} alt="@shadcn" />
              <AvatarFallback>{displayName[0]}</AvatarFallback>
            </Avatar>
          </div>
          <h2 className="text-xl font-semibold text-gray-50">{displayName}</h2>
          <div className="bg-green-900/50 text-green-300 px-2 py-1 rounded-md mt-2">
            Manager
          </div>
          <div className="flex items-center my-4 gap-2 text-gray-400">
            <MailIcon className="h-5 w-5" />
            <span>{user.email}</span>
          </div>
        </div>
        <div className="px-6">
          <h3 className="text-lg font-medium text-gray-400 mb-2">About</h3>
          <Textarea
            className="my-6 bg-transparent text-white"
            placeholder="Enter Your bio"
            name="bioo"
            value={"This is a random bio"}
          />
          <div className="flex justify-center mb-5">
            <Button>Save Details</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
