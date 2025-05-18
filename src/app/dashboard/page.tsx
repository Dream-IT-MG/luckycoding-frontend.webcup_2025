import { redirect } from "next/navigation";

export default async function App() {
  redirect("/dashboard/endpage"); // Server-side redirect
}
