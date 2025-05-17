"use client";

import { cn } from "@/lib/utils";
import { imageStyle } from "./EndpageCard";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewEndpageCard() {
  const router = useRouter();
  const onNewEndpageClick = () => {
    const newGeneratedEndpageCode = "newCodeSimulation";
    router.push(`/dashboard/endpage/${newGeneratedEndpageCode}`);
  };

  return (
    <div>
      <div
        className={cn(
          imageStyle,
          "bg-gray-200 hover:bg-gray-300 hover:cursor-pointer border-dashed border-2 border-primary flex justify-center items-center"
        )}
        onClick={onNewEndpageClick}
      >
        <Plus className="size-24 text-primary" />
      </div>
    </div>
  );
}
