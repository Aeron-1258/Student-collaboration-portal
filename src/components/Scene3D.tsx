"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, PerspectiveCamera, Stars } from "@react-three/drei"
import * as THREE from "three"

function Node({ position, color }: { position: [number, number, number]; color: string }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (!meshRef.current) return
        const time = state.clock.getElapsedTime()
        meshRef.current.rotation.x = time * 0.2
        meshRef.current.rotation.y = time * 0.3
    })

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={meshRef} position={position}>
                <icosahedronGeometry args={[0.8, 0]} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.8}
                    roughness={0.2}
                    wireframe
                />
            </mesh>
            <mesh position={position} scale={0.9}>
                <icosahedronGeometry args={[0.8, 0]} />
                <meshBasicMaterial color={color} transparent opacity={0.1} />
            </mesh>
        </Float>
    )
}



function Scene() {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (!groupRef.current) return
        // Rotate the entire group based on scroll or time
        // For now, simple continuous rotation
        groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
    })

    return (
        <group ref={groupRef}>
            <Node position={[0, 0, 0]} color="#3b82f6" /> {/* Center */}
            <Node position={[3, 2, -2]} color="#8b5cf6" />
            <Node position={[-3, -2, -2]} color="#06b6d4" />
            <Node position={[2, -3, 1]} color="#f43f5e" />
            <Node position={[-2, 3, 1]} color="#10b981" />

            {/* Connecting beams (simplified as scaled boxes for "tech" feel) */}
            <mesh position={[1.5, 1, -1]} rotation={[0, 0, 0.5]}>
                <boxGeometry args={[3, 0.05, 0.05]} />
                <meshStandardMaterial color="#888" emissive="#444" />
            </mesh>
            <mesh position={[-1.5, -1, -1]} rotation={[0, 0, 0.5]}>
                <boxGeometry args={[3, 0.05, 0.05]} />
                <meshStandardMaterial color="#888" emissive="#444" />
            </mesh>
        </group>
    )
}

export function Scene3D() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: "high-performance" }}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={1} />
                <Environment preset="city" />

                <Scene />

                {/* Particles / Stars for depth - Reduced count for performance */}
                <Stars radius={100} depth={50} count={800} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    )
}
