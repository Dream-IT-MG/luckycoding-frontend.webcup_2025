"use client";

import { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BackgroundBeams } from "../components/ui/background-beams";

export default function BienvenuePage() {
  const [step, setStep] = useState(0);
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [selectedDeparture, setSelectedDeparture] = useState("");
  const [otherDepartureText, setOtherDepartureText] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);
  const router = useRouter();

  const images = [
    "/assistant_wave.png",
    "/assistant_thinking.png",
    "/assistant_keep.png",
    "/assistant_idea.png",
  ];

  const departures = [
    {
      id: "travail",
      label: "Mon travail qui est toxique",
      emoji: "💼",
      color: "bg-red-500",
    },
    {
      id: "famille",
      label: "Mon association pour partir vivre à l'étranger",
      emoji: "🌍",
      color: "bg-blue-500",
    },
    {
      id: "relation",
      label: "Mon petit ami / ma petite amie",
      emoji: "💔",
      color: "bg-purple-500",
    },
    {
      id: "ville",
      label: "Ma ville et mes amis pour un nouveau départ",
      emoji: "🏙️",
      color: "bg-amber-500",
    },
    {
      id: "autre",
      label: "Autre chose (à préciser)",
      emoji: "✏️",
      color: "bg-gray-400",
    },
  ];

  const emotions = [
    { id: "colere", label: "En colère", emoji: "😠", color: "bg-red-500" },
    { id: "triste", label: "Triste", emoji: "😢", color: "bg-blue-400" },
    { id: "soulage", label: "Soulagé(e)", emoji: "😌", color: "bg-green-400" },
    {
      id: "nostalgique",
      label: "Nostalgique",
      emoji: "🥲",
      color: "bg-amber-300",
    },
    { id: "joyeux", label: "Joyeux/se", emoji: "😄", color: "bg-yellow-400" },
    { id: "anxieux", label: "Anxieux/se", emoji: "😰", color: "bg-cyan-400" },
    {
      id: "reconnaissant",
      label: "Reconnaissant(e)",
      emoji: "🙏",
      color: "bg-purple-400",
    },
    { id: "fier", label: "Fier/ère", emoji: "🦚", color: "bg-teal-400" },
    { id: "decu", label: "Déçu(e)", emoji: "😔", color: "bg-indigo-400" },
    { id: "libere", label: "Libéré(e)", emoji: "🕊️", color: "bg-pink-400" },
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.push("/dashboard/endpage/");
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

  // const handleOtherDepartureSubmit = () => {
  //   if (otherDepartureText.trim() !== "") {
  //     handleNext();
  //   }
  // };

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
      className="tracking-gradient relative flex min-h-screen overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right top, #1a345c, #252d51, #292746, #2a223b, #291d31)",
      }}
    >
      {/* Background beams en fond */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BackgroundBeams />
      </div>

      {/* Section gauche */}
      <div className="relative z-10 w-1/3 flex items-center justify-center">
        <Image
          src={images[step]}
          alt="Assistant"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Section droite */}
      <div className="relative z-10 w-2/3 flex flex-col justify-center p-12 text-white">
        {step === 0 && (
          <>
            <h1 className="text-5xl font-bold mb-4">
              Bienvenue sur TheEnd.page
            </h1>
            <p className="mb-6 text-lg">
              La plateforme pour donner du style à vos au revoir...
            </p>
            <p className="mb-6 text-lg">
              Rage, larmes, enthousiasme, gifs ou classe absolue, à vous de
              choisir comment claquer la porte.
            </p>
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              Commencer
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              Qu'est-ce que vous quittez ?
            </h2>

            <div className="flex flex-col space-y-3 mb-6">
              {departures.map((departure) => (
                <div
                  key={departure.id}
                  onClick={() => handleDepartureSelect(departure.id)}
                  className={`${departure.color} bg-opacity-80 hover:bg-opacity-100 flex items-center p-4 rounded-lg shadow-md cursor-pointer transition-all duration-200 hover:scale-105 border border-transparent w-full`}
                >
                  <div className="text-3xl mr-4">{departure.emoji}</div>
                  <div className="font-medium">{departure.label}</div>
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
                  className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                >
                  Envoyer
                </button>
              </div>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              Quel ton pour ce départ ?
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {emotions.map((emotion) => (
                <div
                  key={emotion.id}
                  onClick={() => handleEmotionSelect(emotion.id)}
                  className={`${emotion.color} bg-opacity-80 hover:bg-opacity-100 flex items-center p-3 rounded-lg shadow-md cursor-pointer transition-all duration-200 hover:scale-105 border border-transparent`}
                >
                  <div className="text-3xl mr-3">{emotion.emoji}</div>
                  <div className="font-medium">{emotion.label}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              Prêt à claquer la porte ?
            </h2>
            <p className="mb-6">
              Votre page de départ est presque prête. Elle sera mémorable,
              partageable, et un peu thérapeutique.
            </p>
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              J'y vais
            </button>
          </>
        )}
      </div>
    </main>
  );
}
