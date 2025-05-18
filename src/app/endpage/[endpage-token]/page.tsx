"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import useSound from "use-sound";
import Image from "next/image";
import soundoff from "./icons/soundoff.png";
import soundon from "./icons/soundon.png";
import { CardContainer, CardItem } from "@/components/ui/3d-card";
import blob from "./assets/bitmap2.svg";
import TypeWriterEffect from "react-typewriter-effect";
import { emojiForEmotions } from "@/utils/emotions";
import { decodeJSONFromURLParam } from "@/app/lib/json-url";

type MediaItem = {
  emotion: string;
  narration: {
    voicetone: string;
    text: string;
  };
  media: {
    type: string;
    props: string;
  };
};

export default function Index() {
  const params = useParams();
  const token = params["endpage-token"];

  const [images, setImages] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [emotions, setEmotions] = useState<string[]>([]);

  const [soundIsPlaying, setSoundIsPlaying] = useState(false);
  const [indexSlide, setIndexSlide] = useState(0);
  const [playSound, { sound, stop, duration }] = useSound("/sakura.mp3");
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const playBackgroundSound = () => {
    sound?.volume(0.4);
    sound?.loop(true);
    setSoundIsPlaying(true);
  };

  // Fonction simplifiée pour jouer le texte avec TTS
  const speakText = (text: string) => {
    // Arrêter toute synthèse vocale en cours
    if (speechSynthRef.current) {
      window.speechSynthesis.cancel();
    }

    if (!ttsEnabled) return;

    // Créer une nouvelle instance de SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(text);

    // Essayer de trouver une voix française
    const voices = window.speechSynthesis.getVoices();
    const frenchVoice = voices.find((voice) => voice.lang.includes("fr"));
    if (frenchVoice) {
      utterance.voice = frenchVoice;
    }

    // Événements pour suivre l'état de la synthèse vocale
    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      speechSynthRef.current = null;
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      speechSynthRef.current = null;
    };

    // Stocker la référence à l'utterance actuelle
    speechSynthRef.current = utterance;

    // Jouer la synthèse vocale
    window.speechSynthesis.speak(utterance);
  };

  // Initialiser les voix au chargement du composant
  useEffect(() => {
    // Fonction pour initialiser les voix
    const initVoices = () => {
      window.speechSynthesis.getVoices();
    };

    // Appeler initVoices une fois pour déclencher le chargement des voix
    initVoices();

    // Écouter l'événement voiceschanged
    window.speechSynthesis.onvoiceschanged = initVoices;

    // Nettoyage
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      if (speechSynthRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (!token || typeof token !== "string") return;

    alert(decodeJSONFromURLParam(token));
    console.log(decodeJSONFromURLParam(token));
    const serverMockup = decodeJSONFromURLParam(token) as MediaItem[];

    const imgs = serverMockup.map(
      (item) => item.media?.props || "/default.jpg"
    );
    const descs = serverMockup.map((item) => item.narration.text);
    const emos = serverMockup.map((item) => item.emotion);

    setImages(imgs);
    setDescriptions(descs);
    setEmotions(emos);
  }, []);

  // Effet pour jouer l'audio de fond
  useEffect(() => {
    if (duration) {
      playBackgroundSound();
    }
  }, [duration]);

  // Gérer l'audio de fond
  useEffect(() => {
    if (soundIsPlaying) {
      playSound();
    } else {
      stop();
    }
  }, [soundIsPlaying]);

  // Gérer le changement de slide et déclencher le TTS
  useEffect(() => {
    // S'assurer que l'audio joue si le son est activé
    if (soundIsPlaying && sound) {
      playSound();
    }

    // Jouer le texte actuel
    speakText(descriptions[indexSlide]);

    const interval = setInterval(() => {
      if (indexSlide < descriptions.length - 1) {
        setIndexSlide(indexSlide + 1);
      } else {
        return () => clearInterval(interval);
      }
    }, 4000);

    // Nettoyage quand le composant est démonté
    return () => clearInterval(interval);
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
        <div className="flex-1 scrollable-div border m-2 rounded-full shadow self-end h-28 bg-white inline-block align-top p-10 items-center gap-4">
          <div className="flex text-center items-center justify-center">
            <div
              onClick={() => setTtsEnabled(!ttsEnabled)}
              className="w-10 h-10 cursor-pointer flex items-center justify-center bg-white rounded-full shadow-md mr-2"
              title={ttsEnabled ? "Désactiver la voix" : "Activer la voix"}
            >
              {ttsEnabled ? (
                <span className="text-xl">🔊</span>
              ) : (
                <span className="text-xl">🔇</span>
              )}
            </div>
            <TypeWriterEffect
              className="flex-1 justify-center"
              startDelay={100}
              cursorColor="black"
              text={descriptions[indexSlide]}
              key={descriptions[indexSlide]}
              typeSpeed={20}
              scrollArea={myAppRef}
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 right-10 flex gap-3">
        <Image
          src={!soundIsPlaying ? soundoff : soundon}
          alt="jukebox"
          onClick={() => setSoundIsPlaying((prev) => !prev)}
          className="w-10 h-10 cursor-pointer object-contain"
        />
      </div>
    </main>
  );
}
