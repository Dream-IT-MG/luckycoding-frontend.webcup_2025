"use client"

import { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginRequest, userSignupRequest } from "../services/auth-service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().min(1, { message: "L'adresse e-mail est obligatoire." }),
  username: z.string()
    .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
    .max(20, "Le nom d'utilisateur ne peut pas dépasser 20 caractères")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Le nom d'utilisateur ne peut contenir que des lettres, chiffres, tirets et underscores"
    ),
  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[a-z]/, "Le mot de passe doit contenir au moins une lettre minuscule")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une lettre majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .regex(/[^a-zA-Z0-9]/, "Le mot de passe doit contenir au moins un caractère spécial"),
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    
    const response = await userSignupRequest({
      email: values.email,
      username: values.username,
      password: values.password
    });

    if (response.status === "success") {
      userLoginRequest(({
        email: values.email,
        password: values.password
      }))
      router.push("dashboard");
    } else {
      toast.error(response.message ?? "Veuillez réessayez plus tard");
      setIsLoading(false)
    }
  }

    useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      document.body.style.setProperty("--x", `${e.clientX}px`);
      document.body.style.setProperty("--y", `${e.clientY}px`);
      document
        .querySelector(".tracking-gradient")
        ?.classList.add("show-gradient");
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        document
          .querySelector(".tracking-gradient")
          ?.classList.remove("show-gradient");
      }, 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    isLoading ? (
      <div className="tracking-gradient">
        <Spinner />
      </div>
    ) : (
      <div 
        className="tracking-gradient max-w-sm w-full">
        <div className="grid gap-4">
          <h1 className="text-center text-white font-semibold text-3xl">Inscription</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input className="input shadow-dimension w-full" type="email" placeholder="Adresse e-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input className="input shadow-dimension w-full" type="text" placeholder="Nom d'utilisateur" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input className="input shadow-dimension w-full" type="password" placeholder="Mot de passe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
                Créer un compte
              </button>
            </form>
          </Form>
          <p className="text-white text-center">Déjà inscrit ? Connectez-vous <Link href="/login" className="text-pink-600">ici</Link></p>
        </div>
      </div>
    )
  );
}
