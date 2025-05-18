"use client";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import Image from "next/image";
import soundoff from "./icons/soundoff.png";
import soundon from "./icons/soundon.png";
import { CardContainer, CardItem } from "@/components/ui/3d-card";
import blob from "./assets/bitmap2.svg";
import TypeWriterEffect from "react-typewriter-effect";
import { emojiForEmotions } from "@/utils/emotions";
import {Dialog,DialogContent,DialogTitle} from "@/components/ui/dialog"

const serverMockup = [{ "emotion": "colere", "narration": { "voicetone": "", "text": "Bonjour, Je m'appelle K" }, "media": { "type": "image", "props": "https://www.cadreaverti-saintsernin.fr/public/Thumbs/Medias/demission-motivee-indemnites_w900_h350_fitfill_1712043393.jpg" } }, { "emotion": "triste", "narration": { "voicetone": "", "text": "Ca faisait longtemps que je n'avais plus e" }, "media": { "type": "image", "props": "https://cdn.futura-sciences.com/sources/images/demission_1.jpg" } }, { "emotion": "soulage", "narration": { "voicetone": "", "text": "Il y avait ce soit disant 'manager' qui " }, "media": { "type": "image", "props": "https://www.cabinet-zenou.fr/images/blog/128_la-demission-du-salarie-comment-faire.jpg" } }]


export default function Index() {
  const [soundIsPlaying, setSoundIsPlaying] = useState(false);
  const [indexSlide, setIndexSlide] = useState(0);
  const [playSound, { sound, stop, duration }] = useSound("/sakura.mp3");

  const [images, setImages] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [emotions, setEmotions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const playBackgroundSound = () => {
    sound?.volume(0.4);
    sound?.loop(true);
    setSoundIsPlaying(true);
  };

  useEffect(() => {
    // serverMockup.push(
    //   { "emotion": "soulage", "narration": { "voicetone": "", "text": "The EndPage." }, "media": { "type": "image", "props": "/gif/claquerporte.gif" } }
    // )
    const imgs = serverMockup.map((item) => item.media.props);
    const descs = serverMockup.map((item) => item.narration.text);
    const emos = serverMockup.map((item) => item.emotion);

    setImages(imgs);
    setDescriptions(descs);
    setEmotions(emos);
  }, [])

   useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false); // Close after 2s
      }, 2000);

      return () => clearTimeout(timer); // Cleanup
    }
  }, [open]);

  // const images = [
  //   "https://www.cadreaverti-saintsernin.fr/public/Thumbs/Medias/demission-motivee-indemnites_w900_h350_fitfill_1712043393.jpg",
  //   "https://cdn.futura-sciences.com/sources/images/demission_1.jpg",
  //   "https://www.cabinet-zenou.fr/images/blog/128_la-demission-du-salarie-comment-faire.jpg",
  //   "https://clockit.io/wp-content/uploads/2023/06/resignation-email-templates.jpg",
  //   "https://www.challenges.fr/_ipx/f_webp&enlarge_true&fit_cover&s_680x420/cha/static/2025-02/27716.HR.png%3FVersionId=4r4BEUxPvYvcgJWZNnNrL_V21hqQ44vf",
  //   // "",
  //   // "",
  //   // "",
  //   // "",
  //   // "",
  // ];


  // const emotions = [
  //   "colere",
  //   "triste",
  //   "soulage",
  //   "nostalgique",
  //   "joyeux",
  //   // "anxieux",
  //   // "reconnaissant",
  //   // "fier",
  //   // "decu",
  //   // "libere",
  // ];


  // const descriptions = [
  //   "Bonjour, Je m'appelle Khanie et j'ai quitté mon travail !",
  //   "Ca faisait longtemps que je n'avais plus envie de travailler..",
  //   "Il y avait ce soit disant 'manager' qui ne foutait rien sauf faire chier!",
  //   "Aujourd'hui, qu'ils aillent se faire foutre!",
  //   "Je pars et vous restez !!",
  // ];

  useEffect(() => {
    if (duration) {
      playBackgroundSound();
    }
  }, [duration]);

  useEffect(() => {
    if (soundIsPlaying) {
      playSound();
    } else {
      stop();
    }
  }, [soundIsPlaying]);

  useEffect(() => {
    
    const interval = setInterval(() => {
      if (indexSlide < descriptions.length - 1) {
        setIndexSlide(indexSlide + 1);
      } else {
        return () => clearInterval(interval);
      }
    }, 4000);

    // Nettoyage quand le composant est démonté
    return () => clearInterval(interval);
  }, [descriptions, indexSlide]);

  useEffect(() => {
      if (indexSlide == descriptions.length -1) {
        const timer = setTimeout(() => {
        setOpen(true)
      }, 4000);

      return () => clearTimeout(timer); 
      }
  }, [indexSlide]);

  const myAppRef = document.querySelector(".scrollable-div");

  return (
    <main className="bg-gray-60 h-screen flex items-center justify-center overflow-hidden">
      <div className="mainContent w-full h-full flex justify-center items-center">
        <CardContainer className="inter-var">
          <CardItem translateZ="100" className="w-[60vw] mt-4 ">
            <img
              src={images[indexSlide]}
              height={200}
              width={200}
              className="h-auto w-full rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
        </CardContainer>
      </div>
      <Image
        src={blob}
        alt="blob"
        className="absolute bottom-0 right-0 h-[50%] w-auto"
      />
      <Image
        src={blob}
        alt="blob"
        className="absolute top-0 left-0 h-[50%] w-auto rotate-[180deg]"
      />
      <div className="absolute top-20 right-[15rem] text-6xl rotate-[20deg]">
        {emojiForEmotions[emotions[indexSlide]]}
      </div>
      <div className="absolute bottom-45 left-[15rem] text-6xl rotate-[-25deg]">
        💼
      </div>
      <div className="absolute bottom-10 left-10">
        <div className="rounded-full h-20 w-20 border shadow m-4 inline-block align-top">
          <Image
            src={`/emotions/${emotions[indexSlide]}.png`}
            alt="emotionAvatar"
            width={200}
            height={200}
          />
        </div>
        <div className="scrollable-div border m-2 rounded-full shadow self-end h-28 bg-white inline-block align-top p-10">
          <TypeWriterEffect
            startDelay={100}
            cursorColor="black"
            text={descriptions[indexSlide]}
            key={descriptions[indexSlide]}
            typeSpeed={20}
            scrollArea={myAppRef}
          />
        </div>
      </div>
      <div className="absolute bottom-10 right-10">
        <Image
          src={!soundIsPlaying ? soundoff : soundon}
          alt="jukebox"
          onClick={() => setSoundIsPlaying((prev) => !prev)}
          className="w-10 h-10 cursor-pointer object-contain"
        />
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle></DialogTitle>
        <img
          alt="dfdf"
          src="/gif/claquerporte.gif"
          className="w-full h-auto"
        />
      </DialogContent>
    </Dialog>
    </main>
  );
}
