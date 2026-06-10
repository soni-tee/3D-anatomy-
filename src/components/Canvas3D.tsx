'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense, ReactNode } from 'react'

interface Canvas3DProps {
  children?: ReactNode
}

export function Canvas3D({ children }: Canvas3DProps) {
  return (
    <div className="w-full h-full relative bg-neutral-900">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          
          {children}
          
          {/* Default placeholder if no children are provided */}
          {!children && (
            <mesh>
              <boxGeometry args={[2, 2, 2]} />
              <meshStandardMaterial color="#ef4444" wireframe />
            </mesh>
          )}
          
          <OrbitControls 
            makeDefault 
            enableDamping 
            dampingFactor={0.05} 
            minDistance={2} 
            maxDistance={50} 
          />
        </Suspense>
      </Canvas>
      <div className="absolute top-4 left-4 text-white/50 text-sm pointer-events-none">
        3D Viewport
      </div>
    </div>
  )
}
