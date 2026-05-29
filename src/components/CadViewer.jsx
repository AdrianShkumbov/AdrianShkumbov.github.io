import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Bounds } from '@react-three/drei';

function Model({ url }) {
  // Safety check: wait until URL is ready
  if (!url) return null;
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

// Added configurable props with your specific default values
export default function CadViewer({ 
  modelPath,
  cameraPos = [5, -2.5, -5],
  lightPos = [10, 10, 10],
  lightIntensity = 0.8,
  ambientIntensity = 0.3,
  envPreset = "night",
  containerHeight = "h-96",
  containerMargin = "my-8"
}) {
  return (
    <div className={`w-full ${containerHeight} ${containerMargin} bg-slate-200 rounded-xl border-2 border-slate-300 shadow-inner overflow-hidden relative`}>
      <Canvas shadows camera={{ position: cameraPos, fov: 50 }}>
        
        {/* Injected the lighting variables */}
        <ambientLight intensity={ambientIntensity} />
        <pointLight position={lightPos} intensity={lightIntensity} castShadow />
        
        <Suspense fallback={null}>
          {/* Bounds recalculates when the model mounts/changes */}
          <Bounds fit clip observe margin={1.2}>
            <Model url={modelPath} />
          </Bounds>
          
          {/* Injected the environment variable */}
          <Environment preset={envPreset} />
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