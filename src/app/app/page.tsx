import { redirect } from "next/navigation";

export default async function App() {
  redirect("/app/endpage"); // Server-side redirect
}
