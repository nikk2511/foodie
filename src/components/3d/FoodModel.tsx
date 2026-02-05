'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Easing function for organic movement
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

// Premium Burger Model with realistic layer animations
export function BurgerModel({ scale = 1 }: { scale?: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const bunTopRef = useRef<THREE.Mesh>(null);
    const cheeseRef = useRef<THREE.Mesh>(null);
    const lettuceRef = useRef<THREE.Mesh>(null);
    const pattyRef = useRef<THREE.Mesh>(null);
    const tomatoRef = useRef<THREE.Mesh>(null);

    // Memoize sesame seed positions to prevent jitter
    const sesameSeeds = useMemo(() => {
        return [...Array(20)].map((_, i) => ({
            angle: (i / 20) * Math.PI * 2,
            radius: 0.5 + Math.random() * 0.4,
            heightOffset: Math.random() * 0.15,
            rotX: Math.random() * Math.PI,
            rotY: Math.random() * Math.PI,
            rotZ: Math.random() * Math.PI,
        }));
    }, []);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        if (groupRef.current) {
            // Slow, elegant rotation
            groupRef.current.rotation.y = t * 0.15;
            // Subtle tilt breathing
            groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.05;
            groupRef.current.rotation.z = Math.cos(t * 0.3) * 0.03;
        }

        // Organic layer breathing - each layer moves independently
        if (bunTopRef.current) {
            bunTopRef.current.position.y = 0.75 + Math.sin(t * 1.2) * 0.03;
            bunTopRef.current.rotation.z = Math.sin(t * 0.8) * 0.02;
        }

        if (cheeseRef.current) {
            // Cheese droop effect
            cheeseRef.current.position.y = 0.08 + Math.sin(t * 1.5 + 0.5) * 0.015;
            cheeseRef.current.rotation.y = t * 0.1 + Math.sin(t * 0.5) * 0.05;
        }

        if (lettuceRef.current) {
            // Lettuce subtle wave
            lettuceRef.current.position.y = 0.2 + Math.sin(t * 1.3 + 1) * 0.02;
            lettuceRef.current.rotation.z = Math.sin(t * 2) * 0.03;
        }

        if (pattyRef.current) {
            // Patty slight pulse (sizzle effect)
            const sizzle = 1 + Math.sin(t * 8) * 0.005;
            pattyRef.current.scale.set(sizzle, 1, sizzle);
        }

        if (tomatoRef.current) {
            tomatoRef.current.position.y = 0.35 + Math.sin(t * 1.4 + 1.5) * 0.018;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
            <group ref={groupRef} scale={scale}>
                {/* Ambient glow underneath */}
                <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[1.8, 32]} />
                    <meshBasicMaterial color="#ff6b00" transparent opacity={0.15} />
                </mesh>

                {/* Bottom bun - golden brioche */}
                <mesh position={[0, -0.35, 0]}>
                    <cylinderGeometry args={[1.1, 1.2, 0.35, 64]} />
                    <meshStandardMaterial
                        color="#c8956c"
                        roughness={0.6}
                        metalness={0.05}
                        envMapIntensity={0.3}
                    />
                </mesh>

                {/* Patty with juicy texture */}
                <mesh ref={pattyRef} position={[0, -0.05, 0]}>
                    <cylinderGeometry args={[1.05, 1.08, 0.28, 64]} />
                    <meshStandardMaterial
                        color="#3d2817"
                        roughness={0.75}
                        metalness={0.1}
                    />
                </mesh>

                {/* Grill marks on patty */}
                {[-0.4, 0.4].map((z, i) => (
                    <mesh key={i} position={[0, 0.08, z]} rotation={[0, 0, 0]}>
                        <boxGeometry args={[2, 0.02, 0.08]} />
                        <meshStandardMaterial color="#1a0f08" roughness={0.9} />
                    </mesh>
                ))}

                {/* Melted cheese with drip */}
                <mesh ref={cheeseRef} position={[0, 0.08, 0]} rotation={[0, 0.2, 0]}>
                    <boxGeometry args={[2, 0.06, 2]} />
                    <meshStandardMaterial
                        color="#ffb800"
                        roughness={0.25}
                        metalness={0.15}
                        envMapIntensity={0.5}
                    />
                </mesh>

                {/* Cheese drips */}
                {[0, Math.PI * 0.5, Math.PI, Math.PI * 1.5].map((angle, i) => (
                    <mesh
                        key={i}
                        position={[Math.cos(angle) * 1, -0.1 - i * 0.05, Math.sin(angle) * 1]}
                    >
                        <sphereGeometry args={[0.08, 16, 16]} />
                        <meshStandardMaterial color="#ffb800" roughness={0.2} metalness={0.15} />
                    </mesh>
                ))}

                {/* Lettuce - wavy fresh leaves */}
                <mesh ref={lettuceRef} position={[0, 0.2, 0]}>
                    <torusGeometry args={[0.85, 0.18, 6, 48]} />
                    <MeshDistortMaterial
                        color="#7cb342"
                        roughness={0.65}
                        distort={0.15}
                        speed={2}
                    />
                </mesh>

                {/* Tomato slices */}
                <mesh ref={tomatoRef} position={[0, 0.35, 0]}>
                    <cylinderGeometry args={[0.9, 0.95, 0.12, 64]} />
                    <meshStandardMaterial
                        color="#e53935"
                        roughness={0.35}
                        metalness={0.05}
                        envMapIntensity={0.4}
                    />
                </mesh>

                {/* Tomato seeds detail */}
                <mesh position={[0, 0.36, 0]}>
                    <ringGeometry args={[0.3, 0.6, 8]} />
                    <meshStandardMaterial color="#ff7043" roughness={0.4} side={THREE.DoubleSide} />
                </mesh>

                {/* Onion rings */}
                <mesh position={[0, 0.45, 0]}>
                    <torusGeometry args={[0.6, 0.05, 8, 32]} />
                    <meshStandardMaterial color="#f5f5f5" roughness={0.4} transparent opacity={0.9} />
                </mesh>

                {/* Top bun - glossy brioche dome */}
                <mesh ref={bunTopRef} position={[0, 0.75, 0]}>
                    <sphereGeometry args={[1.1, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial
                        color="#d4a056"
                        roughness={0.45}
                        metalness={0.08}
                        envMapIntensity={0.6}
                    />
                </mesh>

                {/* Butter glaze on top bun */}
                <mesh position={[0, 0.9, 0]}>
                    <sphereGeometry args={[0.95, 32, 16, 0, Math.PI * 2, 0, Math.PI / 3]} />
                    <meshStandardMaterial
                        color="#e8b866"
                        roughness={0.2}
                        metalness={0.1}
                        transparent
                        opacity={0.6}
                    />
                </mesh>

                {/* Sesame seeds with proper placement */}
                {sesameSeeds.map((seed, i) => (
                    <mesh
                        key={i}
                        position={[
                            Math.cos(seed.angle) * seed.radius,
                            0.85 + seed.heightOffset,
                            Math.sin(seed.angle) * seed.radius,
                        ]}
                        rotation={[seed.rotX, seed.rotY, seed.rotZ]}
                    >
                        <capsuleGeometry args={[0.025, 0.055, 4, 8]} />
                        <meshStandardMaterial color="#f5f0dc" roughness={0.4} />
                    </mesh>
                ))}
            </group>
        </Float>
    );
}

// Premium Pizza - steaming hot slice
export function PizzaModel({ scale = 1 }: { scale?: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const pepperoniRefs = useRef<(THREE.Mesh | null)[]>([]);

    const pepperoniPositions = useMemo(() => [
        [0.1, 0.14, 0.4],
        [0.5, 0.14, 0],
        [-0.2, 0.14, -0.3],
        [0.3, 0.14, -0.5],
        [-0.4, 0.14, 0.2],
    ] as [number, number, number][], []);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.12;
            // Pizza wobble as if just pulled from oven
            groupRef.current.rotation.x = 0.15 + Math.sin(t * 0.8) * 0.04;
            groupRef.current.rotation.z = Math.cos(t * 0.6) * 0.03;
        }

        // Pepperoni sizzle animation
        pepperoniRefs.current.forEach((ref, i) => {
            if (ref) {
                const phase = i * 0.5;
                ref.position.y = 0.14 + Math.sin(t * 3 + phase) * 0.008;
                ref.scale.setScalar(1 + Math.sin(t * 4 + phase) * 0.03);
            }
        });
    });

    return (
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
            <group ref={groupRef} scale={scale} rotation={[0.15, 0, 0]}>
                {/* Heat glow beneath */}
                <mesh position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[2, 32]} />
                    <meshBasicMaterial color="#ff4500" transparent opacity={0.1} />
                </mesh>

                {/* Pizza base - crispy crust */}
                <mesh>
                    <coneGeometry args={[1.6, 0.18, 3, 1, false, 0, Math.PI]} />
                    <meshStandardMaterial
                        color="#daa06d"
                        roughness={0.75}
                        metalness={0.02}
                    />
                </mesh>

                {/* Tomato sauce layer */}
                <mesh position={[0, 0.08, 0]}>
                    <coneGeometry args={[1.45, 0.04, 3, 1, false, 0, Math.PI]} />
                    <meshStandardMaterial color="#c0392b" roughness={0.5} />
                </mesh>

                {/* Melted mozzarella - stretchy look */}
                <mesh position={[0, 0.1, 0]}>
                    <coneGeometry args={[1.42, 0.06, 3, 1, false, 0, Math.PI]} />
                    <MeshDistortMaterial
                        color="#fffde7"
                        roughness={0.3}
                        metalness={0.1}
                        distort={0.08}
                        speed={1.5}
                    />
                </mesh>

                {/* Cheese bubbles */}
                {[...Array(8)].map((_, i) => (
                    <mesh
                        key={i}
                        position={[
                            (Math.random() - 0.5) * 1.2,
                            0.15,
                            (Math.random() - 0.5) * 0.8 - 0.2
                        ]}
                    >
                        <sphereGeometry args={[0.06 + Math.random() * 0.04, 16, 16]} />
                        <meshStandardMaterial color="#fff8e1" roughness={0.2} metalness={0.05} />
                    </mesh>
                ))}

                {/* Pepperoni slices with grease shine */}
                {pepperoniPositions.map((pos, i) => (
                    <mesh
                        key={i}
                        ref={(el) => { pepperoniRefs.current[i] = el; }}
                        position={pos}
                    >
                        <cylinderGeometry args={[0.18, 0.18, 0.04, 24]} />
                        <meshStandardMaterial
                            color="#8b0000"
                            roughness={0.4}
                            metalness={0.15}
                            envMapIntensity={0.5}
                        />
                    </mesh>
                ))}

                {/* Pepperoni oil spots */}
                {pepperoniPositions.map((pos, i) => (
                    <mesh key={`oil-${i}`} position={[pos[0], pos[1] + 0.025, pos[2]]}>
                        <circleGeometry args={[0.12, 16]} />
                        <meshStandardMaterial
                            color="#ff6b35"
                            transparent
                            opacity={0.4}
                            roughness={0.1}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                ))}

                {/* Basil leaves */}
                {[[0.2, 0.16, -0.1], [-0.3, 0.16, 0.3]].map((pos, i) => (
                    <mesh key={i} position={pos as [number, number, number]} rotation={[0, i * 1.2, 0]}>
                        <sphereGeometry args={[0.12, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2]} />
                        <meshStandardMaterial color="#2e7d32" roughness={0.6} side={THREE.DoubleSide} />
                    </mesh>
                ))}

                {/* Crispy crust edge */}
                <mesh position={[0, 0.05, -1.4]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.2, 0.12, 12, 24, Math.PI]} />
                    <meshStandardMaterial color="#b8860b" roughness={0.65} />
                </mesh>

                {/* Crust bubbles */}
                {[...Array(5)].map((_, i) => (
                    <mesh
                        key={i}
                        position={[
                            -0.8 + i * 0.4,
                            0.08,
                            -1.3 + Math.sin(i) * 0.1
                        ]}
                    >
                        <sphereGeometry args={[0.06, 12, 12]} />
                        <meshStandardMaterial color="#c9a86c" roughness={0.6} />
                    </mesh>
                ))}
            </group>
        </Float>
    );
}

// Premium Sushi Roll - fresh and elegant
export function SushiModel({ scale = 1 }: { scale?: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const salmonRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.18;
            // Elegant floating motion
            groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
            groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.03;
        }

        // Salmon slight shimmer
        if (salmonRef.current) {
            const shimmer = 1 + Math.sin(t * 2) * 0.02;
            salmonRef.current.scale.set(shimmer, 1, shimmer);
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.25} floatIntensity={0.5}>
            <group ref={groupRef} scale={scale}>
                {/* Soft shadow/glow */}
                <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[1.2, 32]} />
                    <meshBasicMaterial color="#ff6b35" transparent opacity={0.08} />
                </mesh>

                {/* Nori (seaweed) wrapper - dark and textured */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.78, 0.78, 0.55, 64]} />
                    <meshStandardMaterial
                        color="#0d1f0d"
                        roughness={0.95}
                        metalness={0}
                    />
                </mesh>

                {/* Rice layer - white with texture */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.72, 0.72, 0.57, 64]} />
                    <meshStandardMaterial
                        color="#fefefe"
                        roughness={0.55}
                        metalness={0}
                    />
                </mesh>

                {/* Rice grain texture (small bumps) */}
                {[...Array(50)].map((_, i) => {
                    const angle = (i / 50) * Math.PI * 2;
                    const r = 0.55 + Math.random() * 0.12;
                    return (
                        <mesh
                            key={i}
                            position={[Math.cos(angle) * r, (Math.random() - 0.5) * 0.4, Math.sin(angle) * r]}
                            rotation={[Math.random(), Math.random(), Math.random()]}
                        >
                            <capsuleGeometry args={[0.015, 0.03, 2, 4]} />
                            <meshStandardMaterial color="#f8f8f8" roughness={0.4} />
                        </mesh>
                    );
                })}

                {/* Salmon center - fresh orange with white marbling */}
                <mesh ref={salmonRef} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.32, 0.32, 0.59, 64]} />
                    <meshStandardMaterial
                        color="#fa8072"
                        roughness={0.25}
                        metalness={0.08}
                        envMapIntensity={0.6}
                    />
                </mesh>

                {/* Salmon fat marbling lines */}
                {[...Array(4)].map((_, i) => (
                    <mesh
                        key={i}
                        position={[0, (i - 1.5) * 0.12, 0]}
                        rotation={[Math.PI / 2, 0, i * 0.8]}
                    >
                        <boxGeometry args={[0.5, 0.02, 0.02]} />
                        <meshStandardMaterial color="#ffe4e1" roughness={0.3} />
                    </mesh>
                ))}

                {/* Avocado slices - creamy green */}
                {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
                    <mesh
                        key={i}
                        position={[Math.cos(angle) * 0.52, 0, Math.sin(angle) * 0.52]}
                        rotation={[Math.PI / 2, angle + Math.PI / 2, 0]}
                    >
                        <capsuleGeometry args={[0.08, 0.18, 6, 12]} />
                        <meshStandardMaterial
                            color="#9acd32"
                            roughness={0.35}
                            metalness={0.05}
                        />
                    </mesh>
                ))}

                {/* Cucumber accent */}
                <mesh position={[0.45, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.56, 16]} />
                    <meshStandardMaterial color="#3cb371" roughness={0.4} />
                </mesh>

                {/* Sesame seed garnish */}
                {[...Array(8)].map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2;
                    return (
                        <mesh
                            key={i}
                            position={[Math.cos(angle) * 0.65, 0.32, Math.sin(angle) * 0.65]}
                            rotation={[Math.random(), Math.random(), Math.random()]}
                        >
                            <capsuleGeometry args={[0.02, 0.04, 4, 8]} />
                            <meshStandardMaterial color={i % 2 === 0 ? "#f5f5dc" : "#1a1a1a"} roughness={0.4} />
                        </mesh>
                    );
                })}

                {/* Wasabi dollop */}
                <mesh position={[0.9, 0, 0]}>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshStandardMaterial color="#7cba3f" roughness={0.5} />
                </mesh>

                {/* Ginger slices */}
                <mesh position={[-0.9, 0.02, 0]} rotation={[0, 0.5, 0]}>
                    <boxGeometry args={[0.25, 0.02, 0.15]} />
                    <meshStandardMaterial color="#ffb6c1" roughness={0.3} transparent opacity={0.9} />
                </mesh>
            </group>
        </Float>
    );
}

// Premium Donut - glazed perfection
export function DonutModel({ scale = 1 }: { scale?: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const glazeRef = useRef<THREE.Mesh>(null);

    const sprinkles = useMemo(() => {
        const items: Array<{
            pos: [number, number, number];
            rot: [number, number, number];
            color: string
        }> = [];
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#aa96da'];

        for (let i = 0; i < 40; i++) {
            const angle = (i / 40) * Math.PI * 2;
            const radius = 0.55 + Math.random() * 0.25;
            const height = 0.15 + Math.random() * 0.1;
            items.push({
                pos: [
                    Math.cos(angle) * radius,
                    height,
                    Math.sin(angle) * radius,
                ],
                rot: [
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                ],
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }
        return items;
    }, []);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.2;
            // Donut bounce
            groupRef.current.position.y = Math.sin(t * 1.2) * 0.06;
            groupRef.current.rotation.x = Math.sin(t * 0.8) * 0.04;
        }

        // Glaze shimmer
        if (glazeRef.current && glazeRef.current.material instanceof THREE.MeshStandardMaterial) {
            glazeRef.current.material.emissiveIntensity = 0.1 + Math.sin(t * 2) * 0.05;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <group ref={groupRef} scale={scale}>
                {/* Glow under donut */}
                <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[1.3, 32]} />
                    <meshBasicMaterial color="#ff69b4" transparent opacity={0.12} />
                </mesh>

                {/* Donut base - fluffy dough */}
                <mesh>
                    <torusGeometry args={[0.65, 0.32, 24, 48]} />
                    <meshStandardMaterial
                        color="#e8c07d"
                        roughness={0.7}
                        metalness={0}
                    />
                </mesh>

                {/* Dough texture bumps */}
                {[...Array(12)].map((_, i) => {
                    const angle = (i / 12) * Math.PI * 2;
                    return (
                        <mesh
                            key={i}
                            position={[Math.cos(angle) * 0.65, -0.1, Math.sin(angle) * 0.65]}
                        >
                            <sphereGeometry args={[0.08, 12, 12]} />
                            <meshStandardMaterial color="#dbb870" roughness={0.65} />
                        </mesh>
                    );
                })}

                {/* Pink strawberry glaze - shiny */}
                <mesh ref={glazeRef} position={[0, 0.08, 0]}>
                    <torusGeometry args={[0.65, 0.28, 24, 48, Math.PI * 1.7]} />
                    <meshStandardMaterial
                        color="#ff85a2"
                        roughness={0.15}
                        metalness={0.2}
                        envMapIntensity={0.8}
                        emissive="#ff85a2"
                        emissiveIntensity={0.1}
                    />
                </mesh>

                {/* Glaze drips */}
                {[0.3, 1.2, 2.5, 3.8, 5.2].map((angle, i) => (
                    <mesh
                        key={i}
                        position={[
                            Math.cos(angle) * 0.82,
                            -0.15 - i * 0.03,
                            Math.sin(angle) * 0.82
                        ]}
                    >
                        <sphereGeometry args={[0.08, 12, 12]} />
                        <meshStandardMaterial color="#ff85a2" roughness={0.15} metalness={0.15} />
                    </mesh>
                ))}

                {/* Rainbow sprinkles */}
                {sprinkles.map((sprinkle, i) => (
                    <mesh
                        key={i}
                        position={sprinkle.pos}
                        rotation={sprinkle.rot}
                    >
                        <capsuleGeometry args={[0.018, 0.065, 4, 8]} />
                        <meshStandardMaterial
                            color={sprinkle.color}
                            roughness={0.25}
                            metalness={0.1}
                        />
                    </mesh>
                ))}

                {/* Chocolate drizzle */}
                {[...Array(6)].map((_, i) => {
                    const startAngle = (i / 6) * Math.PI * 2;
                    return (
                        <mesh
                            key={i}
                            position={[Math.cos(startAngle) * 0.5, 0.18, Math.sin(startAngle) * 0.5]}
                            rotation={[0, startAngle, 0]}
                        >
                            <boxGeometry args={[0.4, 0.02, 0.03]} />
                            <meshStandardMaterial color="#3d1f0d" roughness={0.3} />
                        </mesh>
                    );
                })}
            </group>
        </Float>
    );
}

// Export all models
export const foodModels = {
    burger: BurgerModel,
    pizza: PizzaModel,
    sushi: SushiModel,
    donut: DonutModel,
};

type FoodType = keyof typeof foodModels;

interface FoodModelProps {
    type: FoodType;
    scale?: number;
}

export function FoodModel({ type, scale = 1 }: FoodModelProps) {
    const ModelComponent = foodModels[type];
    return <ModelComponent scale={scale} />;
}
