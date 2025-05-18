import type { Metadata } from "next";
import { BackgroundBeams } from "../../../components/ui/background-beams";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div 
    className="h-screen flex justify-center items-center"
      style={{
      backgroundImage: "linear-gradient(to right top, #1a345c, #252d51, #292746, #2a223b, #291d31)",
      }}
    >
      {/* Background beams en fond */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <BackgroundBeams />
        </div>
      {children}
    </div>
  );
}
