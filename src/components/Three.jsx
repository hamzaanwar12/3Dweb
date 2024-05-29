import React from "react";
import {  useRef } from "react";
import { angleToRadians } from "../utils/angle.js";
import { Environment,OrbitControls,PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Three() {
    const orbitConrolsRef = useRef(null)
    const ballRef = useRef(null)
    useFrame((state)=>
    {
        if(orbitConrolsRef.current)
            {
               // console.log(state.mouse)
                const {x,y} = state.mouse
                orbitConrolsRef.current.setAzimuthalAngle(-x*angleToRadians(35))
                orbitConrolsRef.current.setPolarAngle((y+1)*angleToRadians(60))
                orbitConrolsRef.current.update()
            }
    })
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 7]} />
      <ambientLight args={["#ffffff", 1.3]} />
      {/* <spotLight args={["#ffffff", 10, 7, angleToRadians(30), 0.3]} position={[-3, 3, 0]} castShadow={true} /> */}
      <spotLight args={["#ffffff", 20]} position={[-3, 3, 0]} castShadow={true} />

      <OrbitControls ref={orbitConrolsRef}  minPolarAngle={angleToRadians(30)} maxPolarAngle={angleToRadians(80)} />
      <mesh position={[-1,1.7,0]} castShadow={true} ref={ballRef}>
        <sphereGeometry args={[1, 36, 32]} />
        <meshStandardMaterial color={"cyan"} />
      </mesh>
      <mesh receiveShadow={true} rotation={[-angleToRadians(90),angleToRadians(0),angleToRadians(40)]}>
        <planeGeometry args={[15, 15]} rotation={[]}  />
        <meshStandardMaterial color="grey" />
      </mesh>
      <Environment background>
                <mesh>
                    <sphereGeometry args={[50, 100, 100]} />
                    <meshBasicMaterial color="grey" side={THREE.BackSide} />
                </mesh>
            </Environment>
    </>
  );
}
