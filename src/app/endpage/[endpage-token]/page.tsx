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
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
  const [dataLoaded, setDataLoaded] = useState(false); // Nouvel état pour tracker le chargement

  const [soundIsPlaying, setSoundIsPlaying] = useState(false);
  const [indexSlide, setIndexSlide] = useState(0);
  const [playSound, { sound, stop, duration }] = useSound("/sakura.mp3");
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [open, setOpen] = useState(false);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const playBackgroundSound = () => {
    sound?.volume(0.4);
    sound?.loop(true);
    setSoundIsPlaying(true);
  };

  // Fonction pour arrêter la synthèse vocale en cours
  const stopCurrentSpeech = () => {
    if (speechSynthRef.current) {
      window.speechSynthesis.cancel();
      speechSynthRef.current = null;
      setIsSpeaking(false);
    }
  };

  // Fonction simplifiée pour jouer le texte avec TTS
  const speakText = (text: string) => {
    if (!ttsEnabled || !text) return; // Vérification ajoutée

    // Arrêter la synthèse vocale précédente
    stopCurrentSpeech();

    const utterance = new SpeechSynthesisUtterance(text);

    // Essayer de trouver une voix française
    const voices = window.speechSynthesis.getVoices();
    const frenchVoice = voices.find((voice) => voice.lang.includes("fr"));
    if (frenchVoice) {
      utterance.voice = frenchVoice;
    }

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

    speechSynthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Effet pour fermer la dialog après 2s
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [open]);

  // Effet pour ouvrir la dialog au dernier slide
  useEffect(() => {
    if (dataLoaded && indexSlide === descriptions.length - 1) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [indexSlide, descriptions.length, dataLoaded]);

  // Effet pour initialiser les données et les voix
  useEffect(() => {
    if (!token || typeof token !== "string") return;

    try {
      const serverMockup = decodeJSONFromURLParam(token) as MediaItem[];

      const imgs = serverMockup.map(
        (item) => item.media?.props || "/default.jpg"
      );
      const descs = serverMockup.map((item) => item.narration.text);
      const emos = serverMockup.map((item) => item.emotion);

      setImages(imgs);
      setDescriptions(descs);
      setEmotions(emos);
      setDataLoaded(true); // Marquer les données comme chargées

      // Initialiser les voix
      const initVoices = () => {
        window.speechSynthesis.getVoices();
      };

      initVoices();
      window.speechSynthesis.onvoiceschanged = initVoices;

      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    } catch (error) {
      console.error("Erreur lors du décodage des données:", error);
    }
  }, [token]);

  // Effet pour jouer l'audio de fond
  useEffect(() => {
    if (duration) {
      playBackgroundSound();
    }
  }, [duration]);

  // Effet pour gérer la musique de fond
  useEffect(() => {
    if (soundIsPlaying) {
      playSound();
    } else {
      stop();
    }
  }, [soundIsPlaying, playSound, stop]);

  // Effet pour gérer le TTS quand indexSlide change ou quand les données sont chargées
  useEffect(() => {
    if (dataLoaded && descriptions[indexSlide]) {
      speakText(descriptions[indexSlide]);
    }
  }, [indexSlide, ttsEnabled, dataLoaded, descriptions]);

  // Effet pour gérer l'intervalle de changement de slide
  useEffect(() => {
    // Nettoyer l'intervalle précédent s'il existe
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Créer un nouvel intervalle seulement si les données sont chargées et qu'on n'est pas au dernier slide
    if (dataLoaded && indexSlide < descriptions.length - 1) {
      intervalRef.current = setInterval(() => {
        setIndexSlide((prev) => prev + 1);
      }, 4000);
    }

    // Nettoyer l'intervalle au démontage ou lors du changement
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [indexSlide, descriptions.length, dataLoaded]);

  // Effet pour nettoyer au démontage du composant
  useEffect(() => {
    return () => {
      stopCurrentSpeech();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Fonction pour gérer le toggle du TTS
  const toggleTTS = () => {
    if (ttsEnabled) {
      // Si on désactive le TTS, arrêter la synthèse en cours
      stopCurrentSpeech();
    }
    setTtsEnabled(!ttsEnabled);
  };

  const myAppRef = document.querySelector(".scrollable-div");

  // Ne pas rendre le composant si les données ne sont pas encore chargées
  if (!dataLoaded || descriptions.length === 0) {
    return (
      <main className="bg-gray-60 h-screen flex items-center justify-center overflow-hidden">
        <div>Chargement...</div>
      </main>
    );
  }

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
              onClick={toggleTTS}
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
              text={descriptions[indexSlide] || ""}
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
