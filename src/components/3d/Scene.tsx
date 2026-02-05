'use client';

import { Suspense, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Preload } from '@react-three/drei';

interface Scene3DProps {
    children: ReactNode;
    className?: string;
    cameraPosition?: [number, number, number];
    fov?: number;
    environment?: 'sunset' | 'dawn' | 'night' | 'warehouse' | 'city' | 'studio';
}

function Fallback() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-amber border-t-transparent rounded-full animate-spin" />
        </div>
    );
}

export function Scene3D({
    children,
    className = '',
    cameraPosition = [0, 0, 5],
    fov = 45,
    environment = 'studio',
}: Scene3DProps) {
    return (
        <div className={`w-full h-full ${className}`}>
            <Suspense fallback={<Fallback />}>
                <Canvas
                    dpr={[1, 2]}
                    gl={{
                        antialias: true,
                        alpha: true,
                        powerPreference: 'high-performance',
                    }}
                    style={{ background: 'transparent' }}
                >
                    <PerspectiveCamera makeDefault position={cameraPosition} fov={fov} />

                    {/* Lighting */}
                    <ambientLight intensity={0.4} />
                    <directionalLight
                        position={[10, 10, 5]}
                        intensity={1}
                        castShadow
                    />
                    <pointLight position={[-10, -10, -5]} intensity={0.5} color="#f59e0b" />
                    <spotLight
                        position={[0, 10, 0]}
                        angle={0.3}
                        penumbra={1}
                        intensity={0.5}
                        color="#ffd700"
                    />

                    {/* Environment map for reflections */}
                    <Environment preset={environment} />

                    {children}

                    <Preload all />
                </Canvas>
            </Suspense>
        </div>
    );
}
