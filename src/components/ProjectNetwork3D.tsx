"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Line, Sphere, Stars } from "@react-three/drei"
import * as THREE from "three"

function Node({ position, color, size = 0.2 }: { position: [number, number, number]; color: string; size?: number }) {
    const meshRef = useRef<THREE.Mesh>(null)

    // Random gentle pulsation
    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.getElapsedTime()
        const scale = 1 + Math.sin(t * 2 + position[0]) * 0.1
        meshRef.current.scale.set(scale, scale, scale)
    })

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <Sphere ref={meshRef} args={[size, 16, 16]} position={position}>
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.5}
                    roughness={0.1}
                />
            </Sphere>
            {/* Glow effect halo */}
            <Sphere args={[size * 1.5, 16, 16]} position={position}>
                <meshBasicMaterial color={color} transparent opacity={0.1} side={THREE.BackSide} />
            </Sphere>
        </Float>
    )
}

function Connections({ points, color }: { points: [number, number, number][], color: string }) {
    // Create lines connecting the center (0,0,0) to all outer points
    // and some random connections between outer points
    const lines = useMemo(() => {
        const l: [THREE.Vector3, THREE.Vector3][] = []
        const center = new THREE.Vector3(0, 0, 0)

        points.forEach(p => {
            l.push([center, new THREE.Vector3(...p)])
        })

        // Add a few cross connections for complexity
        for (let i = 0; i < points.length; i++) {
            const next = (i + 1) % points.length
            l.push([new THREE.Vector3(...points[i]), new THREE.Vector3(...points[next])])
        }
        return l
    }, [points])

    return (
        <group>
            {lines.map((line, i) => (
                <Line
                    key={i}
                    points={line}
                    color={color}
                    transparent
                    opacity={0.3}
                    lineWidth={1}
                />
            ))}
        </group>
    )
}

function Scene() {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (!groupRef.current) return
        // Slow rotation of the entire network
        groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    })

    const outerNodes: [number, number, number][] = [
        [2, 1, 0],
        [-2, 1.5, 0.5],
        [1.5, -1.5, 1],
        [-1.5, -1, -1],
        [0, 2.5, -0.5],
        [0, -2, 0.5]
    ]

    return (
        <group ref={groupRef}>
            {/* Central Hub */}
            <Node position={[0, 0, 0]} color="#4f46e5" size={0.6} />

            {/* Outer Nodes */}
            {outerNodes.map((pos, i) => (
                <Node key={i} position={pos} color={i % 2 === 0 ? "#3b82f6" : "#ec4899"} size={0.25} />
            ))}

            {/* Connections */}
            <Connections points={outerNodes} color="#818cf8" />
        </group>
    )
}

export default function ProjectNetwork3D() {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ alpha: true, antialias: true }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
                <Scene />
            </Canvas>
        </div>
    )
}
