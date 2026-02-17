"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Line, Sphere, Stars, Text, Environment } from "@react-three/drei"
import * as THREE from "three"

function Node({ position, color, size = 0.2, label }: { position: [number, number, number]; color: string; size?: number, label?: string }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const textRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (!meshRef.current) return
        // Random subtle movement
        const t = state.clock.getElapsedTime()
        meshRef.current.position.y += Math.sin(t + position[0]) * 0.002

        if (textRef.current) {
            textRef.current.lookAt(state.camera.position)
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere ref={meshRef} args={[size, 32, 32]} position={position}>
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.8}
                    roughness={0.1}
                    metalness={0.8}
                />
            </Sphere>
            <pointLight position={position} intensity={0.5} color={color} distance={3} />

            {label && (
                <Text
                    ref={textRef}
                    position={[position[0], position[1] + size + 0.2, position[2]]}
                    fontSize={0.15}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    {label}
                </Text>
            )}
        </Float>
    )
}

function Connections({ count = 15 }: { count?: number }) {
    const lines = useMemo(() => {
        const l: any[] = []
        for (let i = 0; i < count; i++) {
            const start = [
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 6
            ] as [number, number, number]

            const end = [
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 6
            ] as [number, number, number]

            l.push({ start, end })
        }
        return l
    }, [count])

    return (
        <group>
            {lines.map((line, i) => (
                <MovingLine key={i} start={line.start} end={line.end} />
            ))}
        </group>
    )
}

function MovingLine({ start, end }: { start: [number, number, number], end: [number, number, number] }) {
    const ref = useRef<any>(null)

    useFrame((state) => {
        if (!ref.current) return
        const t = state.clock.getElapsedTime()
        // Pulse opacity
        ref.current.material.opacity = 0.1 + Math.sin(t * 2 + start[0]) * 0.1
    })

    return (
        <Line
            ref={ref}
            points={[start, end]}
            color="#4f46e5"
            transparent
            opacity={0.2}
            lineWidth={1}
        />
    )
}

function SceneContent() {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (!groupRef.current) return
        // Cinematic slow rotation
        groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
    })

    // Generate random nodes
    const nodes = useMemo(() => {
        const n: any[] = []
        // Core hub
        n.push({ pos: [0, 0, 0], color: "#ffffff", size: 0.5, label: "Platform Core" })

        // Satellites
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2
            const radius = 3 + Math.random() * 2
            const y = (Math.random() - 0.5) * 4
            const x = Math.cos(angle) * radius
            const z = Math.sin(angle) * radius

            n.push({
                pos: [x, y, z],
                color: i % 2 === 0 ? "#3b82f6" : "#8b5cf6",
                size: 0.2 + Math.random() * 0.2,
                label: i % 2 === 0 ? "Project" : "Student"
            })
        }
        return n
    }, [])

    return (
        <group ref={groupRef}>
            {nodes.map((n, i) => (
                <Node key={i} position={n.pos} color={n.color} size={n.size} label={n.label} />
            ))}
            <Connections count={20} />
        </group>
    )
}

export function NetworkScene3D() {
    return (
        <div className="w-full h-full absolute inset-0 bg-black">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true }}>
                <color attach="background" args={['#000000']} />

                {/* Lighting */}
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#4f46e5" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#ec4899" />

                {/* Environment Reflections */}
                <Environment preset="city" />

                {/* Stars Background */}
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                {/* Main Content */}
                <SceneContent />

                {/* Fog for depth */}
                <fog attach="fog" args={['#000000', 5, 20]} />
            </Canvas>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent pointer-events-none" />
        </div>
    )
}
