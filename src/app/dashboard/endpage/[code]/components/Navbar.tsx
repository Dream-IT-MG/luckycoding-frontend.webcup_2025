"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { encodeJSONToURLParam } from "@/app/lib/json-url";
import { PageSection } from "../page";
import Link from "next/link";

export default function Navbar({
  pageSections,
}: {
  pageSections: PageSection[];
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  const copyToClipboard = () => {
    const encoded = encodeJSONToURLParam(pageSections);
    setInputValue(`${process.env.NEXT_PUBLIC_HOST}/endpage/${encoded}`);

    console.log(inputValue);
    const input = inputRef.current;
    if (input) {
      input.select();
      input.setSelectionRange(0, 99999); // For mobile devices
      navigator.clipboard.writeText(input.value).then(() => {
        toast({
          title: "Public share link copied",
          description:
            "Your EndPage. public url has been copied to your clipboard",
        });
      });
    }
  };

  useEffect(() => {
    const encoded = encodeJSONToURLParam(pageSections);
    setInputValue(`${process.env.NEXT_PUBLIC_HOST}/endpage/${encoded}`);
  }, [pageSections]);

  return (
    <div className="h-14 w-11/12 absolute top-0 mt-4 rounded-[--radius] bg-background left-50 p-2 flex justify-between items-center">
      <div className="font-bold">☘️ NOTRE APP</div>
      <div className="flex gap-2">
        <Button variant={"secondary"}>Preview</Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Publish</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Publish your Endpage</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input id="link" ref={inputRef} value={inputValue} readOnly />
              </div>
              <Button
                type="submit"
                size="sm"
                className="px-3"
                onClick={copyToClipboard}
              >
                <span className="sr-only">Copy</span>
                <Copy />
              </Button>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary" asChild>
                  <Link href={"/assistance"}>Finir l'édition</Link>
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
