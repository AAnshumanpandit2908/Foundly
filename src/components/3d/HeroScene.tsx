import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';

// ----------------------------------------------------------------------------
// CENTRAL COMPASS / LOCATION PIN
// ----------------------------------------------------------------------------
const LocationPin = () => {
  const pinRef = useRef<THREE.Group>(null);

  // Soft rotation/tilt based on mouse will be handled by PresentationControls,
  // but we can add an idle float.
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.1, 0.1]}>
      <group ref={pinRef} scale={1.5} position={[2, 0, -1]}>
        {/* Top Sphere part */}
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshPhysicalMaterial 
            color="#8b5cf6"
            transmission={0.9}
            transparent
            opacity={1}
            roughness={0.1}
            thickness={0.5}
            clearcoat={1}
            clearcoatRoughness={0}
            attenuationDistance={2}
            attenuationColor="#6366f1"
          />
        </mesh>
        
        {/* Glowing inner core */}
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="#ffb547" />
          <pointLight color="#ffb547" intensity={2} distance={5} />
        </mesh>

        {/* Bottom Cone part */}
        <mesh position={[0, 0.2, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.5, 1, 32]} />
          <meshPhysicalMaterial 
            color="#6366f1"
            transmission={0.9}
            transparent
            opacity={1}
            roughness={0.1}
            thickness={0.5}
            clearcoat={1}
            clearcoatRoughness={0}
          />
        </mesh>
      </group>
    </Float>
  );
};

// ----------------------------------------------------------------------------
// FLOATING LOST ITEMS
// ----------------------------------------------------------------------------
const itemGeometries = [
  new THREE.BoxGeometry(0.6, 1.2, 0.1), // Phone
  new THREE.BoxGeometry(0.8, 0.5, 0.2), // Wallet
  new THREE.CylinderGeometry(0.2, 0.2, 1.2, 16), // Water Bottle
  new THREE.BoxGeometry(1, 1.2, 0.4), // Backpack approx
  new THREE.TorusGeometry(0.2, 0.05, 16, 32), // Keychain ring
  new THREE.BoxGeometry(0.5, 0.4, 0.3), // Earbuds case
  new THREE.BoxGeometry(0.7, 0.4, 0.05), // ID Card
  new THREE.BoxGeometry(0.6, 0.8, 0.1), // Calculator
];

const FloatingItems = () => {
  const items = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      geometry: itemGeometries[i % itemGeometries.length],
      position: [
        (Math.random() - 0.5) * 8, 
        (Math.random() - 0.5) * 6, 
        (Math.random() - 0.5) * 4 - 2
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI, 
        Math.random() * Math.PI, 
        Math.random() * Math.PI
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 0.5,
    }));
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={2} floatIntensity={2}>
          <mesh 
            geometry={item.geometry} 
            position={item.position} 
            rotation={item.rotation} 
            scale={item.scale}
          >
            <meshPhysicalMaterial 
              color="#8a90b5" 
              transparent 
              opacity={0.7} 
              roughness={0.2} 
              transmission={0.5} 
              thickness={0.5} 
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// ----------------------------------------------------------------------------
// MAIN SCENE
// ----------------------------------------------------------------------------
export const HeroScene = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-[#05060d]">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]} // Lower DPR to improve performance
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }} // Better performance
      >
        <color attach="background" args={['#05060d']} />
        
        {/* Lights */}
        <ambientLight intensity={0.2} color="#6366f1" />
        <pointLight position={[5, 5, 5]} intensity={1} color="#8b5cf6" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#6366f1" />
        <spotLight position={[0, 10, 0]} intensity={2} angle={0.5} penumbra={1} color="#8b5cf6" />

        {/* Environment for reflections */}
        <Environment preset="night" />

        {/* Objects */}
        <PresentationControls 
          global 
          rotation={[0, 0, 0]} 
          polar={[-Math.PI / 4, Math.PI / 4]} 
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <LocationPin />
        </PresentationControls>

        <FloatingItems />

        {/* Particles */}
        <Sparkles count={400} scale={12} size={1.5} speed={0.2} opacity={0.2} color="#eef0ff" />
        <Sparkles count={100} scale={8} size={2.5} speed={0.5} opacity={0.4} color="#6366f1" />

        {/* Post-processing */}
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} opacity={1} />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
