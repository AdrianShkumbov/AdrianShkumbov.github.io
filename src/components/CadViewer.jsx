import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Environment, ContactShadows } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  // Using primitive is the standard for rendering loaded GLTF scenes
  return <primitive object={scene} />;
}

export default function CadViewer({ modelPath }) {
  return (
    <div className="w-full h-96 bg-gray-100 rounded-xl border border-gray-300 shadow-inner overflow-hidden my-8 relative">
      {/* We set shadows to true and use a modern FOV. 
         Ambient and Point lights provide explicit illumination 
         without relying on deprecated auto-lighting helpers.
      */}
      <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
        
        <Suspense fallback={null}>
          <Center>
            <Model url={modelPath} />
          </Center>
          {/* Environment provides high-quality reflections for mechanical materials */}
          <Environment preset="city" />
          <ContactShadows 
            position={[0, -0.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4.5} 
          />
        </Suspense>

        <OrbitControls makeDefault />
      </Canvas>
      
      <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur px-3 py-1 rounded text-xs font-semibold text-gray-600 pointer-events-none">
        Interactive 3D: Click & Drag
      </div>
    </div>
  );
}