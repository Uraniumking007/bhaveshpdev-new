import { createClient } from "@/utils/supabase/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const supabase = createClient();
export const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("Form submitted");
  const formData = new FormData(e.currentTarget);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error(error);
  }
  if (data.user) {
    console.log("User signed in");
    console.log(data.user);

    revalidatePath("/admin", "layout");
    redirect("/admin");
  }
};
export const handleGithub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });
  if (error) {
    console.error(error);
  }
  if (data.url) {
    console.log("Redirecting to GitHub");
    redirect("/admin");
  }
};
