"use client";

import Navbar from "./components/Navbar";
import EndpageCanvas from "./components/EndpageCanvas";
import { useParams } from "next/navigation";
import { useState } from "react";

export type PageSection = {
  emotion: string;
  narration: {
    voicetone: string;
    text: string;
  };
  media: {
    type: string;
    props: unknown;
  } | null;
};

export default function App() {
  const params = useParams();
  const code = params["code"];

  const [pageSections, setPageSections] = useState<PageSection[]>([
    {
      emotion: "soulage",
      narration: {
        voicetone: "",
        text: "",
      },
      media: null,
    },
  ]);

  return (
    <div className="relative flex justify-center items-center">
      <Navbar pageSections={pageSections} />
      <EndpageCanvas
        setPageSections={setPageSections}
        pageSections={pageSections}
      />
    </div>
  );
}
