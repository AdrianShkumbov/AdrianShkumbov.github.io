import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Bounds } from '@react-three/drei';

function Model({ url }) {
  // Safety check: wait until URL is ready
  if (!url) return null;
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function CadViewer({ modelPath }) {
  return (
    //<div className="w-full h-96 bg-slate-200 rounded-xl border-2 border-slate-400 shadow-inner overflow-hidden my-8 relative">
    <div className="w-full h-96 bg-slate-200 rounded-xl border-2 border-slate-300 shadow-inner overflow-hidden my-8 relative">
      <Canvas shadows camera={{ position: [5, -2.5, -5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        
        {/* FIXED: The point light position is now correctly formatted as an array */}
        <pointLight position={[10, 10, 10]} intensity={0.8} castShadow />
        
        <Suspense fallback={null}>
          {/* Bounds recalculates when the model mounts/changes */}
          <Bounds fit clip observe margin={1.2}>
            <Model url={modelPath} />
          </Bounds>
          
          <Environment preset="night" />
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