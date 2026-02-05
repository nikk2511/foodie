'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Realistic steam particles - wispy and organic
interface SteamParticlesProps {
    count?: number;
    position?: [number, number, number];
    spread?: number;
    speed?: number;
    color?: string;
    opacity?: number;
}

export function SteamParticles({
    count = 80,
    position = [0, 0, 0],
    spread = 0.8,
    speed = 0.4,
    color = '#ffffff',
    opacity = 0.25,
}: SteamParticlesProps) {
    const meshRef = useRef<THREE.Points>(null);

    const { positions, velocities, lifetimes, sizes, initialPositions } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);
        const lifetimes = new Float32Array(count);
        const sizes = new Float32Array(count);
        const initialPositions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            // Clustered spawn points for more realistic steam
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * spread * 0.5;

            positions[i3] = Math.cos(angle) * radius;
            positions[i3 + 1] = Math.random() * 0.5;
            positions[i3 + 2] = Math.sin(angle) * radius;

            initialPositions[i3] = positions[i3];
            initialPositions[i3 + 1] = positions[i3 + 1];
            initialPositions[i3 + 2] = positions[i3 + 2];

            // Organic upward velocity with slight turbulence
            velocities[i3] = (Math.random() - 0.5) * 0.15;
            velocities[i3 + 1] = speed * (0.8 + Math.random() * 0.4);
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.15;

            lifetimes[i] = Math.random();
            sizes[i] = 0.05 + Math.random() * 0.1;
        }

        return { positions, velocities, lifetimes, sizes, initialPositions };
    }, [count, spread, speed]);

    const positionAttr = useMemo(() => new THREE.BufferAttribute(positions, 3), [positions]);
    const sizeAttr = useMemo(() => new THREE.BufferAttribute(sizes, 1), [sizes]);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;
        const sizeArray = meshRef.current.geometry.attributes.size.array as Float32Array;
        const time = state.clock.elapsedTime;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            lifetimes[i] += delta * 0.25;

            if (lifetimes[i] > 1) {
                // Reset particle
                lifetimes[i] = 0;
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * spread * 0.5;
                posArray[i3] = Math.cos(angle) * radius;
                posArray[i3 + 1] = 0;
                posArray[i3 + 2] = Math.sin(angle) * radius;
                sizeArray[i] = 0.05 + Math.random() * 0.1;
            } else {
                // Organic curving motion
                const t = lifetimes[i];
                const turbulence = Math.sin(time * 2 + i) * 0.02 * t;

                posArray[i3] += velocities[i3] * delta + turbulence;
                posArray[i3 + 1] += velocities[i3 + 1] * delta * (1 - t * 0.3);
                posArray[i3 + 2] += velocities[i3 + 2] * delta + Math.cos(time * 1.5 + i) * 0.015 * t;

                // Expand and fade with altitude
                sizeArray[i] = sizes[i] * (1 + t * 2);
            }
        }

        meshRef.current.geometry.attributes.position.needsUpdate = true;
        meshRef.current.geometry.attributes.size.needsUpdate = true;

        // Slow rotation for organic feel
        meshRef.current.rotation.y = time * 0.1;
    });

    return (
        <points ref={meshRef} position={position}>
            <bufferGeometry>
                <primitive attach="attributes-position" object={positionAttr} />
                <primitive attach="attributes-size" object={sizeAttr} />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color={color}
                transparent
                opacity={opacity}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.NormalBlending}
            />
        </points>
    );
}

// Realistic fire/spark particles - flickering and dynamic
interface FireParticlesProps {
    count?: number;
    position?: [number, number, number];
    spread?: number;
    intensity?: number;
}

export function FireParticles({
    count = 50,
    position = [0, 0, 0],
    spread = 0.6,
    intensity = 1,
}: FireParticlesProps) {
    const meshRef = useRef<THREE.Points>(null);

    const { positions, velocities, lifetimes, colors } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);
        const lifetimes = new Float32Array(count);
        const colors = new Float32Array(count * 3);

        const fireColors = [
            new THREE.Color('#ff4500'), // Orange red
            new THREE.Color('#ff6600'), // Orange
            new THREE.Color('#ffaa00'), // Gold
            new THREE.Color('#ffcc00'), // Yellow
            new THREE.Color('#ff3300'), // Red orange
        ];

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Clustered spawn at center
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * spread * 0.3;

            positions[i3] = Math.cos(angle) * radius;
            positions[i3 + 1] = Math.random() * 0.3;
            positions[i3 + 2] = Math.sin(angle) * radius;

            // Upward burst with randomness
            velocities[i3] = (Math.random() - 0.5) * 0.8;
            velocities[i3 + 1] = 1.5 + Math.random() * 2;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.8;

            const color = fireColors[Math.floor(Math.random() * fireColors.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            lifetimes[i] = Math.random();
        }

        return { positions, velocities, lifetimes, colors };
    }, [count, spread]);

    const positionAttr = useMemo(() => new THREE.BufferAttribute(positions, 3), [positions]);
    const colorAttr = useMemo(() => new THREE.BufferAttribute(colors, 3), [colors]);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;
        const colorArray = meshRef.current.geometry.attributes.color.array as Float32Array;
        const time = state.clock.elapsedTime;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            lifetimes[i] += delta * intensity * 0.6;

            if (lifetimes[i] > 1) {
                // Reset spark
                lifetimes[i] = 0;
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * spread * 0.3;
                posArray[i3] = Math.cos(angle) * radius;
                posArray[i3 + 1] = 0;
                posArray[i3 + 2] = Math.sin(angle) * radius;

                // New color
                const hue = 0.05 + Math.random() * 0.1; // Orange-yellow range
                const color = new THREE.Color().setHSL(hue, 1, 0.5 + Math.random() * 0.3);
                colorArray[i3] = color.r;
                colorArray[i3 + 1] = color.g;
                colorArray[i3 + 2] = color.b;
            } else {
                const t = lifetimes[i];
                const flickerX = Math.sin(time * 15 + i * 2) * 0.1 * (1 - t);
                const flickerZ = Math.cos(time * 12 + i * 3) * 0.1 * (1 - t);

                // Gravity and rising motion
                posArray[i3] += velocities[i3] * delta * (1 - t * 0.5) + flickerX * delta;
                posArray[i3 + 1] += velocities[i3 + 1] * delta * (1 - t * 0.7);
                posArray[i3 + 2] += velocities[i3 + 2] * delta * (1 - t * 0.5) + flickerZ * delta;

                // Color fade to darker as lifetime progresses
                colorArray[i3] *= 0.995;
                colorArray[i3 + 1] *= 0.98;
                colorArray[i3 + 2] *= 0.95;
            }
        }

        meshRef.current.geometry.attributes.position.needsUpdate = true;
        meshRef.current.geometry.attributes.color.needsUpdate = true;
    });

    return (
        <points ref={meshRef} position={position}>
            <bufferGeometry>
                <primitive attach="attributes-position" object={positionAttr} />
                <primitive attach="attributes-color" object={colorAttr} />
            </bufferGeometry>
            <pointsMaterial
                size={0.12}
                vertexColors
                transparent
                opacity={0.9}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Ambient floating particles (golden sparkles/dust)
interface AmbientParticlesProps {
    count?: number;
    color?: string;
    size?: number;
    area?: number;
}

export function AmbientParticles({
    count = 150,
    color = '#ffd700',
    size = 0.025,
    area = 8,
}: AmbientParticlesProps) {
    const meshRef = useRef<THREE.Points>(null);

    const { positions, phases, speeds } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const phases = new Float32Array(count);
        const speeds = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * area;
            positions[i3 + 1] = (Math.random() - 0.5) * area;
            positions[i3 + 2] = (Math.random() - 0.5) * area;
            phases[i] = Math.random() * Math.PI * 2;
            speeds[i] = 0.3 + Math.random() * 0.7;
        }

        return { positions, phases, speeds };
    }, [count, area]);

    const positionAttr = useMemo(() => new THREE.BufferAttribute(positions, 3), [positions]);

    useFrame((state) => {
        if (!meshRef.current) return;

        const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;
        const time = state.clock.elapsedTime;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const phase = phases[i];
            const speed = speeds[i];

            // Gentle floating motion
            posArray[i3] += Math.sin(time * speed + phase) * 0.001;
            posArray[i3 + 1] += Math.cos(time * speed * 0.8 + phase) * 0.0015;
            posArray[i3 + 2] += Math.sin(time * speed * 0.6 + phase * 2) * 0.001;

            // Wrap around boundaries
            if (posArray[i3] > area / 2) posArray[i3] = -area / 2;
            if (posArray[i3] < -area / 2) posArray[i3] = area / 2;
            if (posArray[i3 + 1] > area / 2) posArray[i3 + 1] = -area / 2;
            if (posArray[i3 + 1] < -area / 2) posArray[i3 + 1] = area / 2;
            if (posArray[i3 + 2] > area / 2) posArray[i3 + 2] = -area / 2;
            if (posArray[i3 + 2] < -area / 2) posArray[i3 + 2] = area / 2;
        }

        meshRef.current.geometry.attributes.position.needsUpdate = true;
        meshRef.current.rotation.y = time * 0.02;

        // Pulsing opacity effect
        if (meshRef.current.material instanceof THREE.PointsMaterial) {
            meshRef.current.material.opacity = 0.4 + Math.sin(time * 0.5) * 0.2;
        }
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <primitive attach="attributes-position" object={positionAttr} />
            </bufferGeometry>
            <pointsMaterial
                size={size}
                color={color}
                transparent
                opacity={0.5}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Heat shimmer effect for hot food
interface HeatShimmerProps {
    position?: [number, number, number];
    width?: number;
    height?: number;
}

export function HeatShimmer({
    position = [0, 0.5, 0],
    width = 2,
    height = 1.5,
}: HeatShimmerProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime;

        if (meshRef.current.material instanceof THREE.MeshBasicMaterial) {
            meshRef.current.material.opacity = 0.03 + Math.sin(time * 3) * 0.02;
        }

        meshRef.current.scale.x = 1 + Math.sin(time * 2) * 0.1;
        meshRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.1;
    });

    return (
        <mesh ref={meshRef} position={position}>
            <planeGeometry args={[width, height]} />
            <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.05}
                side={THREE.DoubleSide}
                depthWrite={false}
            />
        </mesh>
    );
}
