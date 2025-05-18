import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash } from "lucide-react";
import React from "react";

interface SectionManagementProps {
  pageSections: any[] /* eslint-disable @typescript-eslint/no-explicit-any */;
  currentSection: number;
  setCurrentSection: (idx: number) => void;
  onSectionDeleteByIndex: (idx: number) => void;
  onSectionPlusClick: () => void;
}

export default function SectionManagement({
  pageSections,
  currentSection,
  setCurrentSection,
  onSectionDeleteByIndex,
  onSectionPlusClick,
}: SectionManagementProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        {pageSections.map((section, idx) => (
          <div key={idx} className="relative">
            <div
              className={`hover:bg-gray-400 hover:cursor-pointer bg-gray-300 h-28 w-full rounded-[--radius] text-xl flex justify-center items-center text-slate-700 ${
                currentSection === idx ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setCurrentSection(idx)}
            >
              {idx + 1}
            </div>
            <div className="absolute top-0 right-0 m-2">
              <React.Fragment>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size={"icon"} variant={"ghost"}>
                      <Trash />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Section</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this section? This
                        action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2 mt-4">
                      <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          variant="destructive"
                          onClick={() => onSectionDeleteByIndex(idx)}
                        >
                          Delete
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </React.Fragment>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5" onClick={onSectionPlusClick}>
        <div className="bg-gray-300 h-28 w-full hover:bg-gray-400 hover:cursor-pointer rounded-[--radius] text-xl flex justify-center items-center text-slate-700">
          <Plus />
        </div>
      </div>
    </>
  );
}
