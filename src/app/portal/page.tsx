import { lazy, Suspense } from "react";
const Spline = lazy(() => import("@splinetool/react-spline/next"));
import "./loader.css";

export default function Portal() {
  return (
    <main className="w-full">
      <Suspense fallback={<div className="flex item-center justify-center align-center w-full h-[100vh] pt-[20rem]"><b>Chargement du terrain...</b><div className="loader">
  <div className="box box0">
    <div></div>
  </div>
  <div className="box box1">
    <div></div>
  </div>
  <div className="box box2">
    <div></div>
  </div>
  <div className="box box3">
    <div></div>
  </div>
  <div className="box box4">
    <div></div>
  </div>
  <div className="box box5">
    <div></div>
  </div>
  <div className="box box6">
    <div></div>
  </div>
  <div className="box box7">
    <div></div>
  </div>
  <div className="ground">
    <div></div>
  </div>
</div></div>}>
        <Spline
          scene="https://prod.spline.design/zj7EUb2itZu4S8zX/scene.splinecode" 
        />
      </Suspense>
    </main>
  );
}
