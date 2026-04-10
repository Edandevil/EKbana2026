"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useControls, button, Leva } from "leva";
import defaultConfig from "./blob-config.json";

// Track pointer globally to bypass any DOM z-index occlusion issues without causing React re-renders
const globalPointer = new THREE.Vector2(0, 0);
if (typeof window !== "undefined") {
  window.addEventListener("pointermove", (e) => {
    globalPointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    globalPointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}

function InteractiveBlobMesh({ scale, posX, posY, posZ, distort, speed, rotationSpeed, pointerMultiplier = 1, materialProps, targetScale, targetPosX, targetPosY, targetPosZ }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetPos = useRef(new THREE.Vector3(posX, posY, posZ));
  const initialPos = new THREE.Vector3(posX, posY, posZ);
  
  useFrame(() => {
    if (meshRef.current) {
      // Base Rotation
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed * 1.5;
      
      // Calculate scroll progress (0 for fold 1, 1 for fold 2)
      const scrollY = window.scrollY || 0;
      const progress = Math.min(Math.max(scrollY / window.innerHeight, 0), 1);
      
      // Interpolate base coordinates using scroll
      const currentX = THREE.MathUtils.lerp(posX, targetPosX ?? posX, progress);
      const currentY = THREE.MathUtils.lerp(posY, targetPosY ?? posY, progress);
      const currentZ = THREE.MathUtils.lerp(posZ, targetPosZ ?? posZ, progress);
      const currentScaleBase = THREE.MathUtils.lerp(scale, targetScale ?? scale, progress);
      
      initialPos.set(currentX, currentY, currentZ);
      
      // Mouse Parallax mapping bypasses z-index blocks via globalPointer
      targetPos.current.x = initialPos.x + (globalPointer.x * pointerMultiplier);
      targetPos.current.y = initialPos.y + (globalPointer.y * pointerMultiplier);
      
      // Smooth interpolation for silky animation
      meshRef.current.position.lerp(targetPos.current, 0.05);

      // Smoothly update scale dynamically
      const targetScaleVec = new THREE.Vector3(currentScaleBase, currentScaleBase, currentScaleBase);
      meshRef.current.scale.lerp(targetScaleVec, 0.1);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 64]} />
      <MeshDistortMaterial
        {...materialProps}
        distort={distort}
        speed={speed}
      />
    </mesh>
  );
}

function SceneLights() {
  const { sp1Color, sp1Intensity, sp1Dist, sp1Pos } = useControls("Spotlight#1", {
    sp1Color: defaultConfig.sp1.color,
    sp1Intensity: { value: defaultConfig.sp1.intensity, min: 0, max: 200 },
    sp1Dist: { value: defaultConfig.sp1.dist, min: 0, max: 50 },
    sp1Pos: { value: defaultConfig.sp1.pos, step: 0.1 }
  });

  const { sp2Color, sp2Intensity, sp2Dist, sp2Pos } = useControls("Spotlight#2", {
    sp2Color: defaultConfig.sp2.color,
    sp2Intensity: { value: defaultConfig.sp2.intensity, min: 0, max: 200 },
    sp2Dist: { value: defaultConfig.sp2.dist, min: 0, max: 50 },
    sp2Pos: { value: defaultConfig.sp2.pos, step: 0.1 }
  });

  const { sp3Color, sp3Intensity, sp3Dist, sp3Pos } = useControls("Spotlight#3", {
    sp3Color: defaultConfig.sp3.color,
    sp3Intensity: { value: defaultConfig.sp3.intensity, min: 0, max: 200 },
    sp3Dist: { value: defaultConfig.sp3.dist, min: 0, max: 50 },
    sp3Pos: { value: defaultConfig.sp3.pos, step: 0.1 }
  });

  return (
    <>
      <spotLight position={[sp1Pos.x, sp1Pos.y, sp1Pos.z]} color={sp1Color} intensity={sp1Intensity} distance={sp1Dist} penumbra={1} decay={2} />
      <spotLight position={[sp2Pos.x, sp2Pos.y, sp2Pos.z]} color={sp2Color} intensity={sp2Intensity} distance={sp2Dist} penumbra={1} decay={2} />
      <spotLight position={[sp3Pos.x, sp3Pos.y, sp3Pos.z]} color={sp3Color} intensity={sp3Intensity} distance={sp3Dist} penumbra={1} decay={2} />
    </>
  );
}

export default function BlobCanvas() {
  const envProps = useControls("Environment", {
    envMapIntensity: { value: defaultConfig.env.envMapIntensity, min: 0, max: 5 }
  });

  // Split configurations for Main Blob and Secondary Blob
  const b1 = useControls("Main Blob", {
    scale: { value: defaultConfig.blob1.scale, min: 0.5, max: 5, step: 0.1 },
    posX: { value: defaultConfig.blob1.position.x, min: -10, max: 10, step: 0.1 },
    posY: { value: defaultConfig.blob1.position.y, min: -10, max: 10, step: 0.1 },
    posZ: { value: defaultConfig.blob1.position.z, min: -10, max: 10, step: 0.1 },
    color: defaultConfig.blob1.color,
    metalness: { value: defaultConfig.blob1.metalness, min: 0, max: 1 },
    roughness: { value: defaultConfig.blob1.roughness, min: 0, max: 1 },
    clearcoat: { value: defaultConfig.blob1.clearcoat, min: 0, max: 1 },
    clearcoatRoughness: { value: defaultConfig.blob1.clearcoatRoughness, min: 0, max: 1 },
    distort: { value: defaultConfig.blob1.distort, min: 0, max: 1 },
    speed: { value: defaultConfig.blob1.speed, min: 0, max: 10 }
  });

  const b2 = useControls("Secondary Blob", {
    scale: { value: defaultConfig.blob2.scale, min: 0.1, max: 5, step: 0.1 },
    posX: { value: defaultConfig.blob2.position.x, min: -10, max: 10, step: 0.1 },
    posY: { value: defaultConfig.blob2.position.y, min: -10, max: 10, step: 0.1 },
    posZ: { value: defaultConfig.blob2.position.z, min: -10, max: 10, step: 0.1 },
    color: defaultConfig.blob2.color,
    metalness: { value: defaultConfig.blob2.metalness, min: 0, max: 1 },
    roughness: { value: defaultConfig.blob2.roughness, min: 0, max: 1 },
    clearcoat: { value: defaultConfig.blob2.clearcoat, min: 0, max: 1 },
    clearcoatRoughness: { value: defaultConfig.blob2.clearcoatRoughness, min: 0, max: 1 },
    distort: { value: defaultConfig.blob2.distort, min: 0, max: 1 },
    speed: { value: defaultConfig.blob2.speed, min: 0, max: 10 }
  });

  // Track scroll for background fade effect
  const bgRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const p = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
      if (bgRef.current) bgRef.current.style.opacity = p.toString();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useControls("Actions", {
    "Save Configuration": button(async (get) => {
      const payload = {
        blob1: {
          scale: get("Main Blob.scale"),
          position: { x: get("Main Blob.posX"), y: get("Main Blob.posY"), z: get("Main Blob.posZ") },
          color: get("Main Blob.color"),
          metalness: get("Main Blob.metalness"),
          roughness: get("Main Blob.roughness"),
          clearcoat: get("Main Blob.clearcoat"),
          clearcoatRoughness: get("Main Blob.clearcoatRoughness"),
          distort: get("Main Blob.distort"),
          speed: get("Main Blob.speed")
        },
        blob2: {
          scale: get("Secondary Blob.scale"),
          position: { x: get("Secondary Blob.posX"), y: get("Secondary Blob.posY"), z: get("Secondary Blob.posZ") },
          color: get("Secondary Blob.color"),
          metalness: get("Secondary Blob.metalness"),
          roughness: get("Secondary Blob.roughness"),
          clearcoat: get("Secondary Blob.clearcoat"),
          clearcoatRoughness: get("Secondary Blob.clearcoatRoughness"),
          distort: get("Secondary Blob.distort"),
          speed: get("Secondary Blob.speed")
        },
        env: {
          envMapIntensity: get("Environment.envMapIntensity")
        },
        sp1: {
          color: get("Spotlight#1.sp1Color"),
          intensity: get("Spotlight#1.sp1Intensity"),
          dist: get("Spotlight#1.sp1Dist"),
          pos: get("Spotlight#1.sp1Pos")
        },
        sp2: {
          color: get("Spotlight#2.sp2Color"),
          intensity: get("Spotlight#2.sp2Intensity"),
          dist: get("Spotlight#2.sp2Dist"),
          pos: get("Spotlight#2.sp2Pos")
        },
        sp3: {
          color: get("Spotlight#3.sp3Color"),
          intensity: get("Spotlight#3.sp3Intensity"),
          dist: get("Spotlight#3.sp3Dist"),
          pos: get("Spotlight#3.sp3Pos")
        }
      };
      
      try {
        const res = await fetch('/api/save-blob', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) alert("Successfully saved configuration to code!");
        else alert("Failed to save configuration.");
      } catch (e) {
        alert("Error saving configuration.");
      }
    })
  });

  return (
    <>
      <Leva hidden theme={{
        colors: {
          elevation1: '#111',
          elevation2: '#181818',
          elevation3: '#222',
          accent1: '#8bc34a',
        }
      }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", width: "100%", overflow: "hidden" }}>
          {/* Background layer for the 2nd fold gradient transition */}
          <div 
            ref={bgRef} 
            style={{ 
              position: "absolute", inset: 0, zIndex: -1, 
              background: "linear-gradient(to bottom, #4992FF, #0056D4)", 
              opacity: 0, transition: "none" 
            }} 
          />



        <Canvas camera={{ position: [0, 0, 10], fov: 40 }} style={{ pointerEvents: "auto", display: "block", width: "100%", height: "100%" }}>
          <ambientLight intensity={0.77} />
          
          <SceneLights />

          {/* Global base highlight lights */}
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#ffffff" />

          {/* Main Blob shrinks and merges to center */}
          <InteractiveBlobMesh 
            scale={b1.scale} posX={b1.posX} posY={b1.posY} posZ={b1.posZ}
            targetScale={0.8} targetPosX={0} targetPosY={0.8} targetPosZ={0}
            distort={b1.distort} speed={b1.speed} rotationSpeed={0.002}
            pointerMultiplier={-0.8} 
            materialProps={{
               color: b1.color, metalness: b1.metalness, roughness: b1.roughness,
               clearcoat: b1.clearcoat, clearcoatRoughness: b1.clearcoatRoughness,
               envMapIntensity: envProps.envMapIntensity
            }} 
          />
          
          {/* Secondary smaller blob scales to 0 to combine invisibly */}
          <InteractiveBlobMesh 
            scale={b2.scale} posX={b2.posX} posY={b2.posY} posZ={b2.posZ}
            targetScale={0.001} targetPosX={0} targetPosY={1} targetPosZ={0}
            distort={b2.distort} speed={b2.speed} rotationSpeed={-0.003} 
            pointerMultiplier={-1.5}
            materialProps={{
               color: b2.color, metalness: b2.metalness, roughness: b2.roughness,
               clearcoat: b2.clearcoat, clearcoatRoughness: b2.clearcoatRoughness,
               envMapIntensity: envProps.envMapIntensity
            }} 
          />
          
          <Environment preset="city" />
        </Canvas>
        </div>
      </div>
    </>
  );
}
