import { auth } from "@/auth"; 
import { redirect } from "next/navigation";
import SignInForm from "./SignInForm"; 

export default async function SignInPage() {
  const session = await auth();
  if (session) {
    redirect("/admin");
  }
  return <SignInForm />;
} 