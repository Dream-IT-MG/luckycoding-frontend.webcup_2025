"use client";

import { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BackgroundBeams } from "../components/ui/background-beams";
import { ApiService } from "@/services/ApiService";

export default function BienvenuePage() {
  const [step, setStep] = useState(0);
  const [, setSelectedEmotion] = useState("");
  const [, setSelectedDeparture] = useState("");
  const [otherDepartureText, setOtherDepartureText] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);
  const router = useRouter();

  const images = [
    "/assistant_wave.webp",
    "/assistant_thinking.webp",
    "/assistant_keep.webp",
    "/assistant_idea.webp",
  ];

  const departures = [
    { id: "travail", label: "Mon travail qui est toxique", emoji: "💼", color: "bg-red-500/20 border-red-500/50 border-2", otherColor:"bg-red-500" },
    { id: "famille", label: "Mon association pour partir vivre à l'étranger", emoji: "🌍", color: "bg-blue-500/20 border-blue-500/50 border-2", otherColor:"bg-blue-500"},
    { id: "relation", label: "Mon petit ami / ma petite amie", emoji: "💔", color: "bg-purple-500/20 border-purple-500/50 border-2", otherColor:"bg-purple-500" },
    { id: "ville", label: "Ma ville et mes amis pour un nouveau départ", emoji: "🏙️", color: "bg-amber-500/20 border-amber-500/50 border-2", otherColor:"bg-amber-500" },
    { id: "autre", label: "Autre chose (à préciser)", emoji: "✏️", color: "bg-gray-400/20 border-gray-500/50 border-2", otherColor:"bg-gray-400" },
  ];

  const emotions = [
    { id: "colere", label: "En colère", emoji: "😠", color: "bg-red-500" },
    { id: "triste", label: "Triste", emoji: "😢", color: "bg-blue-400" },
    { id: "soulage", label: "Soulagé(e)", emoji: "😌", color: "bg-green-400" },
    { id: "nostalgique", label: "Nostalgique", emoji: "🥲", color: "bg-amber-300" },
    { id: "joyeux", label: "Joyeux/se", emoji: "😄", color: "bg-yellow-400" },
    { id: "anxieux", label: "Anxieux/se", emoji: "😰", color: "bg-cyan-400" },
    { id: "reconnaissant", label: "Reconnaissant(e)", emoji: "🙏", color: "bg-purple-400" },
    { id: "fier", label: "Fier/ère", emoji: "🦚", color: "bg-teal-400" },
    { id: "decu", label: "Déçu(e)", emoji: "😔", color: "bg-indigo-400" },
    { id: "libere", label: "Libéré(e)", emoji: "🕊️", color: "bg-pink-400" },
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.push("/home");
    }
  };

  const handleEmotionSelect = (emotionId: SetStateAction<string>) => {
    setSelectedEmotion(emotionId);
    handleNext();
  };

  const handleDepartureSelect = (departureId: SetStateAction<string>) => {
    setSelectedDeparture(departureId);
    
    if (departureId === "autre") {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
      handleNext();
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      document.body.style.setProperty("--x", `${e.clientX}px`);
      document.body.style.setProperty("--y", `${e.clientY}px`);
      document
        .querySelector(".tracking-gradient")
        ?.classList.add("show-gradient");
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        document
          .querySelector(".tracking-gradient")
          ?.classList.remove("show-gradient");
      }, 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <main
      className="tracking-gradient relative flex flex-col lg:flex-row min-h-screen overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right top, #1a345c, #252d51, #292746, #2a223b, #291d31)",
      }}
    >
      {/* Background beams en fond */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BackgroundBeams />
      </div>

      {/* Section droite (sur desktop) - passe en haut sur mobile */}
      <div className="relative z-10 w-full lg:w-1/2 flex flex-col justify-center p-4 sm:p-8 lg:p-12 text-white order-2 lg:order-1">
        {step === 0 && (
          <div className="pl-0 sm:pl-4 lg:pl-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">Bienvenue..</h1>
            <p className="mb-4 text-base lg:text-lg">
              Tu viens de terminer une étape dans ta vie ?
            </p>
            <p className="mb-4 text-base lg:text-lg">
              Ne t'inquiète pas, je suis là pour t'accompager durant cette période !
            </p>
            <p className="mb-4 text-base lg:text-lg">
              Il est important d'exprimer ses émotions durant de telles périodes,
            </p>
            <p className="mb-6 text-base lg:text-lg">
              Je vais t'aider à passer le cap avec Classe .. ou pas.. 
              alors, allons-y..
            </p>
            <div>
              <button
                onClick={handleNext}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 w-full sm:w-auto"
              >
                Commencer
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Alors.. que vas-tu laisser derrière ?</h2>
            
            <div className="flex flex-col space-y-3 mb-6">
              {departures.map((departure) => (
                <div
                  key={departure.id}
                  onClick={() => handleDepartureSelect(departure.id)}
                  className="w-full relative cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-opacity-100 mr-0 sm:mr-10"
                >
                  <div className="text-4xl sm:text-5xl absolute top-[calc(50%-1.5rem)] sm:top-[calc(50%-2rem)] left-[8px] sm:left-[15px]">
                    {departure.emoji}
                  </div>
                  <div
                    className={`h-16 sm:h-20 lg:h-24 ml-10 sm:ml-12 p-2 sm:p-4 pl-10 sm:pl-16 ${departure.color} bg-opacity-80 flex items-center rounded-lg shadow-md border border-transparent w-full text-sm sm:text-base`}
                  >
                    {departure.label}
                  </div>
                </div>
              ))}
            </div>

            {showOtherInput && (
              <div className="mt-4">
                <textarea
                  className="mb-4 p-3 text-black border rounded w-full h-24 resize-none"
                  placeholder="Précisez ce que vous quittez..."
                  value={otherDepartureText}
                  onChange={(e) => setOtherDepartureText(e.target.value)}
                ></textarea>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 w-full sm:w-auto"
                >
                  Envoyer
                </button>
              </div>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Je vois.. et que ressens-tu par rapport à cela ?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              {emotions.map((emotion) => (
                <div
                  key={emotion.id}
                  onClick={() => handleEmotionSelect(emotion.id)}
                  className={`${emotion.color} bg-opacity-80 hover:bg-opacity-100 flex items-center p-2 sm:p-3 rounded-lg shadow-md cursor-pointer transition-all duration-200 hover:scale-105 border border-transparent`}
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl mr-2 sm:mr-3">{emotion.emoji}</div>
                  <div className="font-medium text-sm sm:text-base">{emotion.label}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Bien, exprimons tes émotions maintenant !</h2>
            <p className="mb-3 sm:mb-6 text-base">
              Exprimer ce que l'on ressent est agréablement satisfaisant !
            </p>
            <p className="mb-3 sm:mb-6 text-base">
              Elle sera mémorable, partageable, et un peu thérapeutique.
            </p>
            <p className="mb-4 sm:mb-6 text-base">
              Prêt à claquer la porte ?
            </p>
            <div>
              <button
                onClick={handleNext}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 w-full sm:w-auto"
              >
                Allons-y !
              </button>
            </div>
          </>
        )}
      </div>

      {/* Section gauche (sur desktop) - passe en bas sur mobile */}
      <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center p-4 h-64 sm:h-80 lg:h-auto order-1 lg:order-2">
        <Image
          src={images[step]}
          alt="Assistant"
          width={0}
          height={0}
          sizes="100vw"
          className="w-auto h-full lg:h-auto lg:w-full object-contain"
          priority
        />
      </div>

    </main>
  );
}