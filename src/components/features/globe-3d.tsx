"use client"

import { useMemo, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Line, Stars, Html } from "@react-three/drei"
import * as THREE from "three"

const GLOBE_RADIUS = 2

// Generate random points on sphere surface
function getPointOnSphere(radius: number) {
    const phi = Math.acos(-1 + (2 * Math.random()))
    const theta = Math.sqrt(Math.PI * 5) * phi * 10

    return [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
    ] as [number, number, number]
}

// Cubic Bezier Curve for Arcs
function getArcPoints(start: number[], end: number[], height: number = 0.5, segments: number = 50) {
    const p1 = new THREE.Vector3(...start)
    const p2 = new THREE.Vector3(...end)
    const mid = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(GLOBE_RADIUS + height)

    const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2)
    return curve.getPoints(segments)
}

function Arcs({ count = 20 }: { count?: number }) {
    const arcs = useMemo(() => {
        return Array.from({ length: count }).map(() => {
            const start = getPointOnSphere(GLOBE_RADIUS)
            const end = getPointOnSphere(GLOBE_RADIUS)
            const height = 0.5 + Math.random() * 1.5
            const points = getArcPoints(start, end, height)
            return {
                points,
                color: Math.random() > 0.5 ? "#60a5fa" : "#a78bfa",
                speed: 0.002 + Math.random() * 0.005
            }
        })
    }, [count])

    const groupRef = useRef<THREE.Group>(null)

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y -= 0.001 // Counter-rotate slightly
        }
    })

    return (
        <group ref={groupRef}>
            {arcs.map((arc, i) => (
                <Line
                    key={i}
                    points={arc.points}
                    color={arc.color}
                    transparent
                    opacity={0.6}
                    lineWidth={1.5}
                    dashed={true}
                    dashScale={5}
                    dashSize={0.5}
                    gapSize={0.5}
                >
                    {/* @ts-ignore - animated dash offset requires custom material or frame logic, using simple rotation for now */}
                </Line>
            ))}
        </group>
    )
}

function City({ position }: { position: number[] }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const time = Math.random() * 100

    useFrame((state) => {
        if (!meshRef.current) return
        // Pulsing effect
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + time) * 0.3
        meshRef.current.scale.set(scale, scale, scale)
    })

    return (
        <mesh ref={meshRef} position={new THREE.Vector3(...position)}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#ffffff" toneMapped={false} />
        </mesh>
    )
}

function World() {
    const groupRef = useRef<THREE.Group>(null)

    useFrame(() => {
        if (!groupRef.current) return
        groupRef.current.rotation.y += 0.002
    })

    const cities = useMemo(() => {
        return Array.from({ length: 80 }).map(() => getPointOnSphere(GLOBE_RADIUS))
    }, [])

    return (
        <group ref={groupRef}>
            {/* Core Globe (Dark) */}
            <Sphere args={[GLOBE_RADIUS - 0.05, 64, 64]}>
                <meshPhongMaterial
                    color="#0f172a"
                    emissive="#020617"
                    specular="#1e293b"
                    shininess={10}
                />
            </Sphere>

            {/* Wireframe overlay for tech look */}
            <Sphere args={[GLOBE_RADIUS - 0.04, 32, 32]}>
                <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.15} />
            </Sphere>

            {/* Atmosphere Glow (Inner) */}
            <Sphere args={[GLOBE_RADIUS, 64, 64]}>
                <meshPhongMaterial
                    color="#3b82f6"
                    transparent
                    opacity={0.15}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </Sphere>

            {/* Atmosphere Glow (Outer Halo) */}
            <mesh scale={[1.15, 1.15, 1.15]}>
                <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
                <meshBasicMaterial
                    color="#60a5fa"
                    transparent
                    opacity={0.08}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Pulsing Cities */}
            {cities.map((pos, i) => (
                <City key={i} position={pos} />
            ))}

            {/* Dynamic Arcs */}
            <Arcs count={25} />
        </group>
    )
}

export function Globe3D() {
    return (
        <div className="w-full h-full absolute inset-0 bg-black">
            <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} gl={{ antialias: true, alpha: false }}>
                <color attach="background" args={['#020617']} />

                <ambientLight intensity={0.4} color="#ffffff" />
                <pointLight position={[10, 10, 10]} intensity={2.5} color="#60a5fa" />
                <pointLight position={[-10, -5, -10]} intensity={1} color="#c084fc" />

                <Stars radius={60} depth={20} count={3000} factor={4} saturation={0} fade speed={1} />

                <World />

                <fog attach="fog" args={['#020617', 5, 18]} />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-transparent pointer-events-none" />
        </div>
    )
}
