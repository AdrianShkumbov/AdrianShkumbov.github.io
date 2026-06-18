import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Bounds, Center } from '@react-three/drei';

function Model({ url }) {
  if (!url) return null;
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function CadViewer({ 
  modelPath,
  cameraPos = [5, -2.5, -5],
  targetPos = [0, 0, 0],
  lightPos = [10, 10, 10],
  lightIntensity = 0.8,
  ambientIntensity = 0.3,
  envPreset = "night",
  containerHeight = "h-96",
  containerMargin = "my-8",
  autoCenter = true 
}) {
  return (
    <div className={`w-full ${containerHeight} ${containerMargin} bg-slate-200 rounded-xl border-2 border-slate-300 shadow-inner overflow-hidden relative`}>
      <Canvas shadows camera={{ position: cameraPos, fov: 50 }}>
        
        <ambientLight intensity={ambientIntensity} />
        <pointLight position={lightPos} intensity={lightIntensity} castShadow />
        
        <Suspense fallback={null}>
          {autoCenter ? (
            <Bounds fit clip observe margin={1.2}>
              <Center>
                <Model url={modelPath} />
              </Center>
            </Bounds>
          ) : (
            <Model url={modelPath} />
          )}
          
          <Environment preset={envPreset} />
        </Suspense>

        <OrbitControls 
          makeDefault 
          target={targetPos}
          onEnd={(e) => {
            const cam = e.target.object.position;
            const tgt = e.target.target; 
            
            console.log(`cameraPos={[${cam.x.toFixed(2)}, ${cam.y.toFixed(2)}, ${cam.z.toFixed(2)}]}`);
            console.log(`targetPos={[${tgt.x.toFixed(2)}, ${tgt.y.toFixed(2)}, ${tgt.z.toFixed(2)}]}`);
          }} 
        />
      </Canvas>
      
      <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur px-3 py-1 rounded text-xs font-semibold text-gray-600 pointer-events-none">
        Interactive 3D: Click & Rotate
      </div>
    </div>
  );
}