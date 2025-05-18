import Navbar from "./components/Navbar";
import EndpageCanvas from "./components/EndpageCanvas";

export default async function App({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  return (
    <div className="relative flex justify-center items-center">
      <Navbar />

      <EndpageCanvas />
    </div>
  );
}
