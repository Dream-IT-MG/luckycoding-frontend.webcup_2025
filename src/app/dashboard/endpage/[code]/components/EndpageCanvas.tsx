"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { emojiForEmotions } from "@/utils/emotions";
import { Brush, ImageIcon, Import, Palette, Pencil } from "lucide-react";
import React, { useRef } from "react";
import { Layers } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import NarationForm, { narrationFormSchema } from "./NarationForm";
import { z } from "zod";
import SectionManagement from "./SectionManagement";
import ImageMediaInput from "./ImageMediaInput";
import VideoMediaInput from "./VideoMediaInput";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PageSection } from "../page";
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import Link from "next/link";

export default function EndpageCanvas({
  pageSections,
  setPageSections,
}: {
  pageSections: PageSection[];
  setPageSections: React.Dispatch<React.SetStateAction<PageSection[]>>;
}) {
  const currentEmotion = () => pageSections[currentSection].emotion;

  const inputRef = useRef<HTMLInputElement>(null);

  const changeCurrentSectionEmotion = (emotion: string) => {
    setPageSections((prev) =>
      prev.map((section, idx) =>
        idx === currentSection ? { ...section, emotion } : section
      )
    );
  };

  const [currentSection, setCurrentSection] = useState(0);

  const getLastSectionEmotion = () => {
    if (pageSections.length === 0) return "";
    return pageSections[pageSections.length - 1].emotion;
  };

  const getLastSectionNarrationVoiceTone = () => {
    if (pageSections.length === 0) return "";
    return pageSections[pageSections.length - 1].narration.voicetone;
  };

  const onSectionPlusClick = () => {
    setPageSections((prev) => [
      ...prev,
      {
        emotion: getLastSectionEmotion(),
        narration: {
          voicetone: getLastSectionNarrationVoiceTone(),
          text: "",
        },
        media: null,
        dessin: "",
      },
    ]);
    setCurrentSection(pageSections.length);
  };

  const onSectionDeleteByIndex = (index: number) => {
    if (pageSections.length === 1) return; // Prevent deleting the last section
    setPageSections((prev) => prev.filter((_, idx) => idx !== index));
    if (currentSection === index) {
      setCurrentSection(index === 0 ? 0 : index - 1);
    } else if (currentSection > index) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  const onNarrationFormSubmit = (data: z.infer<typeof narrationFormSchema>) => {
    setPageSections((prev) =>
      prev.map((section, idx) =>
        idx === currentSection
          ? {
              ...section,
              narration: {
                voicetone: data.voice_tone,
                text: data.narration,
              },
            }
          : section
      )
    );
  };

  const uploadImage = async (file: File) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setPageSections((prev) =>
        prev.map((section, idx) =>
          idx === currentSection
            ? {
                ...section,
                media: {
                  type: "image",
                  props: `/uploads/${file.name}`,
                },
              }
            : section
        )
      );
      console.log("Upload successful!");
    } else {
      console.log("Upload failed.");
    }
  };

  const [isDrawingDialogOpen, setIsDrawingDialogOpen] = useState(false);

  const handleChange = () => {
    setIsDrawingDialogOpen(false);

    const files = inputRef.current?.files;
    if (files && files.length > 0) {
      console.log("Selected file:", files[0]);
      uploadImage(files[0]);
    }
  };

  return (
    <>
      <div className="rounded-[--radius] h-screen w-full flex flex-col justify-center items-center">
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex justify-center items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-6xl cursor-pointer">
                      {emojiForEmotions[currentEmotion()]}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click me to switch to different emotion</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </SheetTrigger>
          <SheetContent className="overflow-y-scroll" side={"bottom"}>
            <SheetHeader>
              <SheetTitle>Choose your emotion</SheetTitle>
              <SheetDescription>
                Choose one emotion from the list bellow
              </SheetDescription>

              {Object.entries(emojiForEmotions).map(([key, emoji]) => (
                <div
                  key={key}
                  onClick={() => changeCurrentSectionEmotion(key)}
                  className="h-12 hover:cursor-pointer hover:bg-gray-100 p-5 flex items-center rounded-[--radius] pt-5"
                >
                  <span className="text-5xl">{emoji}</span>
                  <span className="capitalize ml-5">{key}</span>
                </div>
              ))}
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <div className="mt-10 w-11/12 justify-center flex gap-5">
          <Sheet>
            <SheetTrigger asChild>
              <div className="relative h-56 lg:h-[60vh] w-11/12 bg-gray-200 rounded-[--radius] flex flex-col justify-center items-center hover:bg-gray-300 text-slate-700 overflow-hidden group transition-all duration-300">
                {pageSections[currentSection].media?.type === "image" ? (
                  <>
                    <img
                      src={pageSections[currentSection].media?.props as string}
                      alt="Image preview"
                      className="absolute inset-0 object-cover w-full h-full scale-100 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
                    <Pencil className="absolute top-2 right-2 text-white opacity-90 group-hover:opacity-100" />
                  </>
                ) : (
                  <>
                    <ImageIcon className="size-16 z-10" />
                    <div className="text-xs mt-2 z-10">
                      Click to add new media
                    </div>
                  </>
                )}
              </div>
            </SheetTrigger>

            <SheetContent className="overflow-y-scroll" side={"left"}>
              <SheetHeader>
                <SheetTitle>Add new media</SheetTitle>
                <SheetDescription>Choose one component</SheetDescription>
                <div className="flex flex-col gap-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <div className="hover:bg-gray-400 hover:cursor-pointer bg-gray-300 h-28 w-full rounded-[--radius] text-xl flex justify-center items-center text-slate-700">
                        Image
                      </div>
                    </SheetTrigger>
                    <SheetContent side="bottom">
                      <SheetHeader>
                        <SheetTitle>Add Image</SheetTitle>
                        <SheetDescription>Enter the image URL</SheetDescription>
                        <ImageMediaInput
                          value={
                            pageSections[currentSection].media?.type === "image"
                              ? (pageSections[currentSection].media
                                  ?.props as string)
                              : ""
                          }
                          onSubmit={(url: string) => {
                            setPageSections((prev) =>
                              prev.map((section, idx) =>
                                idx === currentSection
                                  ? {
                                      ...section,
                                      media: {
                                        type: "image",
                                        props: url,
                                      },
                                    }
                                  : section
                              )
                            );
                          }}
                        />
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </div>
                <div className="flex flex-col gap-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <div className="hover:bg-gray-400 hover:cursor-pointer bg-gray-300 h-28 w-full rounded-[--radius] text-xl flex justify-center items-center text-slate-700">
                        Video
                      </div>
                    </SheetTrigger>
                    <SheetContent side="bottom">
                      <SheetHeader>
                        <SheetTitle>Add Video</SheetTitle>
                        <SheetDescription>Enter the video URL</SheetDescription>
                        <VideoMediaInput
                          value={
                            pageSections[currentSection].media?.type === "video"
                              ? (
                                  pageSections[currentSection].media?.props as {
                                    src: string;
                                  }
                                )?.src ?? ""
                              : ""
                          }
                          onSubmit={(src: string) => {
                            setPageSections((prev) =>
                              prev.map((section, idx) =>
                                idx === currentSection
                                  ? {
                                      ...section,
                                      media: {
                                        type: "video",
                                        props: { src },
                                      },
                                    }
                                  : section
                              )
                            );
                          }}
                        />
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </div>
                <div className="flex flex-col gap-2">
                  <Dialog
                    open={isDrawingDialogOpen}
                    onOpenChange={setIsDrawingDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <div className="hover:bg-gray-400 hover:cursor-pointer bg-gray-300 h-28 w-full rounded-[--radius] text-xl flex justify-center items-center text-slate-700">
                        Drawing
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-fit">
                      <DialogHeader>
                        <DialogTitle className="text-center">
                          Create or import your drawing 🎨
                        </DialogTitle>
                        <DialogDescription className="hidden" />
                        <div className="flex justify-center items-center gap-10 pt-5">
                          <Link
                            href="/dessin"
                            target="_blank"
                            className="relative size-56 bg-gray-200 rounded-[--radius] flex flex-col justify-center items-center hover:bg-gray-300 text-slate-700 overflow-hidden group transition-all duration-300"
                          >
                            <Palette className="size-12 z-10" />
                            <div className="text-xs mt-2 z-10">
                              Click to create a new drawing
                            </div>
                          </Link>
                          <div className="text-slate-700">or</div>
                          <div
                            className="relative size-56 bg-gray-200 rounded-[--radius] flex flex-col justify-center items-center hover:bg-gray-300 text-slate-700 overflow-hidden group transition-all duration-300"
                            onClick={() => inputRef.current?.click()}
                          >
                            <input
                              type="file"
                              ref={inputRef}
                              onChange={handleChange}
                              className="hidden"
                            />

                            <Import className="size-12 z-10" />
                            <div className="text-xs mt-2 z-10">
                              Click to import an existing drawing
                            </div>
                          </div>
                        </div>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
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
              <SectionManagement
                pageSections={pageSections}
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
                onSectionDeleteByIndex={onSectionDeleteByIndex}
                onSectionPlusClick={onSectionPlusClick}
              />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="absolute bottom-0 left-0 w-full mb-4 px-2">
        <div className="flex justify-center items-center w-full gap-2">
          <div className="rounded-full size-16 border shadow inline-block align-top bg-background">
            <Image
              src={`/emotions/${currentEmotion()}.png`}
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
                {pageSections[currentSection].narration.text.trim()
                  ? pageSections[currentSection].narration.text
                      .trim()
                      .slice(0, 32) +
                    (pageSections[currentSection].narration.text.trim().length >
                    32
                      ? "..."
                      : "")
                  : "Add Naration"}
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
                  <NarationForm
                    narrationText={pageSections[currentSection].narration.text}
                    narrationVoiceTone={
                      pageSections[currentSection].narration.voicetone
                    }
                    onNarrationSubmitForm={onNarrationFormSubmit}
                  />
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
