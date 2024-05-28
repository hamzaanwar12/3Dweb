import React from "react";
import { angleToRadians } from "../utils/angle.js";

export default function Three() {
  return (
    <>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={"hotpink"} />
      </mesh>
      <mesh>
        <planeGeometry args={[32, 32]}/>
        <meshStandardMaterial color="#1ea3d8" />
      </mesh>
      <ambientLight args={["#ffffff", 0.25]} />
    </>
  );
}
