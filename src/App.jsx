import React from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Three from "./components/Three";
import "./App.css";

const App = () => {
  return (
    <Canvas id="three-canvas-container" shadows>
      <Suspense fallback={<></>}>
        <Three />
      </Suspense>
    </Canvas>
  );
};

export default App;
