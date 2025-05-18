import Spline from "@splinetool/react-spline/next";
import { Suspense } from "react";

export default function Portal() {
  return (
    <main className="w-full">
      <Suspense fallback="Waiting for the scene to generate... ">
        <Spline
          scene="https://prod.spline.design/zj7EUb2itZu4S8zX/scene.splinecode" 
        />
      </Suspense>
    </main>
  );
}
