import Navbar from "./components/Navbar";
import EndpageCanvas from "./components/EndpageCanvas";

export default async function App({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  console.log(code);

  return (
    <main className="tracking-gradient relative flex align-center justify-center min-h-screen overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right top, #1a345c, #252d51, #292746, #2a223b, #291d31)",
      }}>
        <div className="relative flex justify-center items-center w-[70vw] min-h-[90vh] bg-white shadow-md rounded-lg">
          <Navbar />

          <EndpageCanvas />
        </div>

    </main>
  );
}
