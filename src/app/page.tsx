import { redirect } from "next/navigation";

export default function RootPage() {
  // Middleware handles auth checking and will redirect correctly.
  // If user reaches this somehow, default redirect to home.
  redirect("/home");
}
