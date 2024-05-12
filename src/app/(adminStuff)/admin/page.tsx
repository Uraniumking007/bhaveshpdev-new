import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const { data, error } = await createClient().auth.getUser();
  console.log(data);

  if (!data.user) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Admin Page</h1>
    </div>
  );
}
