"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {} from "@radix-ui/react-alert-dialog";
import React, { useEffect, useState } from "react";

export default function Dessin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.brush.ninja/drawing.js";
    script.async = true;
    document.body.appendChild(script);

    setIsModalOpen(true);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="relative">
      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bienvenue sur Brush Ninja 🎨</AlertDialogTitle>
            <AlertDialogDescription>
              Ceci est notre outil de création intégré, utilisez-le pour créer
              votre propre dessin!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Créer mon dessin</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <brush-ninja-drawing height="100vh" />
    </div>
  );
}
