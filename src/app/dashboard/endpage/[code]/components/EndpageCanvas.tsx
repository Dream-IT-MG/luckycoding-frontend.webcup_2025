"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { emojiForEmotions, emotions } from "@/utils/emotions";
import { ImageIcon, Plus, Smile } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { Layers } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import NarationForm from "./NarationForm";

export default function EndpageCanvas() {
  const [currentEmotion, setCurrentEmotion] = useState("soulage");
  return (
    <>
      <div className="rounded-[--radius] h-screen w-full flex flex-col justify-center items-center">
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex justify-center items-center">
              <span className="text-6xl">
                {emojiForEmotions[currentEmotion]}
              </span>
            </div>
          </SheetTrigger>
          <SheetContent className="overflow-y-scroll" side={"bottom"}>
            <SheetHeader>
              <SheetTitle>Choose your emotion</SheetTitle>
              <SheetDescription>
                Choose one emotion from the list bellow
              </SheetDescription>

              {Object.entries(emojiForEmotions).map(([key, emoji]) => (
                <div key={key} onClick={() => setCurrentEmotion(key)}>
                  {emoji} - {key}
                </div>
              ))}
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <div className="mt-10 w-full justify-center flex">
          <Sheet>
            <SheetTrigger asChild>
              <div className="h-56 bg-gray-200 flex flex-col justify-center rounded-[--radius] items-center hover:bg-gray-300 w-11/12 text-slate-700">
                <ImageIcon className="size-16" />
                <div className="text-xs mt-2">Click to add new media</div>
              </div>
            </SheetTrigger>
            <SheetContent className="overflow-y-scroll" side={"left"}>
              <SheetHeader>
                <SheetTitle>Add new media</SheetTitle>
                <SheetDescription>Choose one component</SheetDescription>
                <div className="flex flex-col gap-2">
                  <div className="hover:bg-gray-400 hover:cursor-pointer  bg-gray-300 h-28 w-full rounded-[--radius] text-xl flex justify-center items-center text-slate-700">
                    Image
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="hover:bg-gray-400 hover:cursor-pointer  bg-gray-300 h-28 w-full rounded-[--radius] text-xl flex justify-center items-center text-slate-700">
                    Video
                  </div>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="absolute right-0 top-1/2">
        <Sheet>
          <SheetTrigger>
            <div className="bg-background h-24 w-12 flex justify-center items-center text-slate-700 rounded-l-[--radius]">
              <Layers />
            </div>
          </SheetTrigger>
          <SheetContent className="overflow-y-scroll">
            <SheetHeader>
              <SheetTitle>Section management</SheetTitle>
              <SheetDescription>Create or delete section</SheetDescription>
              <div className="flex flex-col gap-2">
                <div className="hover:bg-gray-400 hover:cursor-pointer  bg-gray-300 h-28 w-full rounded-[--radius] text-xl flex justify-center items-center text-slate-700">
                  1
                </div>
              </div>
              <div className="mt-5">
                <div className="bg-gray-300 h-28 w-full hover:bg-gray-400 hover:cursor-pointer rounded-[--radius] text-xl flex justify-center items-center text-slate-700">
                  <Plus />
                </div>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="absolute bottom-0 left-0 w-full mb-4 px-2">
        <div className="flex justify-center items-center w-full gap-2">
          <div className="rounded-full size-16 border shadow inline-block align-top bg-background">
            <Image
              src={`/emotions/${currentEmotion}.png`}
              alt="emotionAvatar"
              className="size-16"
              width={200}
              height={200}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant={"secondary"}
                className="rounded-full h-16 flex-1 bg-gray-200 hover:bg-gray-300 text-slate-700"
              >
                Click to add naration
              </Button>
            </SheetTrigger>
            <SheetContent
              className="overflow-y-scroll items-start"
              side={"bottom"}
            >
              <SheetHeader>
                <SheetTitle>Add naration</SheetTitle>
                <SheetDescription>
                  Create or edit your naration
                </SheetDescription>
                <div className="pt-6">
                  <NarationForm />
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
