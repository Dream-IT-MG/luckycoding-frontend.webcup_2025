import { Button } from "@/components/ui/button";
import React from "react";

export default function Navbar() {
  return (
    <div className="h-14 w-11/12 absolute top-0 mt-4 rounded-[--radius] bg-background left-50 p-2 flex justify-between items-center">
      <div className="font-bold">☘️ NOTRE APP</div>
      <div className="flex gap-2">
        <Button variant={"secondary"}>Preview</Button>
        <Button>Publish</Button>
      </div>
    </div>
  );
}
