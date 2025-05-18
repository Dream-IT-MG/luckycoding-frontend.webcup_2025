"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { BackgroundBeams } from "../../components/ui/background-beams";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AssistancePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Comment vous sentez-vous après avoir créé votre page d'adieu ? C'est parfois un grand pas de dire au revoir, que ce soit à un travail, une relation ou un lieu... Je suis là pour vous écouter.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // défile vers le bas à chaque nouveau message
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Ajouter le message de l'utilisateur
    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Préparer historique messages pour l'API
      const messageHistory = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Appel API Groq
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama3-70b-8192", // Llama Maverick que j'ai utilisé ici (j'ai deja la clé donc hihi)
          messages: [
            // Contexte initial de notre assistant TT
            {
              role: "system",
              content: `Tu es un assistant empathique et bienveillant sur TheEnd.page, une plateforme qui aide les gens à créer des pages d'adieu stylisées lorsqu'ils quittent quelque chose ou quelqu'un (travail, relation, lieu, etc.).

                L'utilisateur vient de créer et publier sa "End Page" - une page pour exprimer ses sentiments concernant ce départ. Cette page peut être empreinte de colère (démission d'un emploi toxique), de tristesse (rupture amoureuse), de nostalgie (déménagement), de soulagement, de joie ou d'autres émotions.

                Ton rôle est d'être présent pour l'utilisateur dans ce moment potentiellement difficile, de l'écouter, de valider ses émotions et de l'aider à avancer.
                            
                Quelques principes à suivre:
                - Sois empathique, jamais jugeant
                - Pose des questions ouvertes et encourageantes
                - Valide les émotions exprimées
                - Propose une perspective constructive sans minimiser les sentiments
                - Si approprié, aide l'utilisateur à voir comment cette fin peut être un nouveau départ
                - Offre un espace sûr pour que l'utilisateur puisse exprimer ce qu'il ressent

                Adapte toujours ton ton à l'émotion exprimée par l'utilisateur. Utilise un langage simple et chaleureux, comme si tu parlais à un ami.`
            },
            // Ajouter historique réel de la conversation
            ...messageHistory
          ],
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      const assistantResponse = data.choices[0].message.content;

      // Ajouter réponse de l'assistant
      setMessages(prev => [...prev, {
        role: "assistant",
        content: assistantResponse
      }]);
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API:", error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Désolé, j'ai rencontré un problème de communication. Veuillez réessayer."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className="tracking-gradient relative flex flex-col lg:flex-row min-h-screen overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right top, #1a345c, #252d51, #292746, #2a223b, #291d31)",
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BackgroundBeams />
      </div>

      {/* Section gauche - devient haut sur mobile */}
      <div className="relative z-10 w-full lg:w-1/3 flex flex-col items-center justify-center">
        <div className="h-40 sm:h-60 lg:h-auto flex items-center justify-center">
          <Image
            src="/assistant_celebrate.webp"
            alt="Assistant"
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-full lg:h-auto lg:w-full object-contain"
            priority
          />
        </div>
        
        {/* Nouvelle section Hall of Fame */}
        <div className="mt-4 lg:mt-6 text-center px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Hall of Fame</h2>
          <p className="text-gray-300 text-sm sm:text-base mb-3">
            Découvrez les pages d'adieu les plus inspirantes créées par notre communauté.
          </p>
          <Link 
            href="/portal"
            className="inline-block px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors text-sm sm:text-base"
          >
            Explorer
          </Link>
        </div>
      </div>

      {/* Section droite avec le chatbot - devient bas sur mobile */}
      <div className="relative z-10 w-full lg:w-2/3 flex flex-col p-4 sm:p-6 lg:p-8 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Espace de dialogue</h1>
        
        {/* Historique des messages */}
        <div 
          className="flex-grow overflow-auto mb-4 rounded-lg bg-gray-800 bg-opacity-40 p-3 sm:p-4" 
          style={{ maxHeight: "calc(100vh - 220px)" }}
        >
          <div className="flex flex-col space-y-3 sm:space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[75%] rounded-lg p-2 sm:p-3 ${
                    msg.role === "user" 
                      ? "bg-pink-600 text-white" 
                      : "bg-gray-700 text-white"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm sm:text-base">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[75%] rounded-lg p-2 sm:p-3 bg-gray-700 text-white">
                  <div className="flex space-x-2 justify-center items-center h-6">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Formulaire de saisie */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écrivez votre message ici..."
            className="flex-grow p-2 sm:p-3 rounded-lg bg-gray-700 text-white text-sm sm:text-base"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg ${
              isLoading || !input.trim() 
                ? "bg-gray-500 cursor-not-allowed" 
                : "bg-pink-600 hover:bg-pink-700"
            } text-white text-sm sm:text-base`}
          >
            Envoyer
          </button>
        </form>
      </div>
    </main>
  );
}