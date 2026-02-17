"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Line, Stars, Environment, Html } from "@react-three/drei"
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
function getArcPoints(start: number[], end: number[], height: number = 0.5, segments: number = 20) {
    const p1 = new THREE.Vector3(...start)
    const p2 = new THREE.Vector3(...end)
    const mid = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(GLOBE_RADIUS + height)

    const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2)
    return curve.getPoints(segments)
}

function Arcs({ count = 10 }: { count?: number }) {
    const arcs = useMemo(() => {
        return Array.from({ length: count }).map(() => {
            const start = getPointOnSphere(GLOBE_RADIUS)
            const end = getPointOnSphere(GLOBE_RADIUS)
            const points = getArcPoints(start, end, 1 + Math.random())
            return { points, color: Math.random() > 0.5 ? "#60a5fa" : "#a78bfa" }
        })
    }, [count])

    return (
        <group>
            {arcs.map((arc, i) => (
                <Line
                    key={i}
                    points={arc.points}
                    color={arc.color}
                    transparent
                    opacity={0.4}
                    lineWidth={1}
                />
            ))}
        </group>
    )
}

function World() {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (!groupRef.current) return
        groupRef.current.rotation.y += 0.003
    })

    // Generate reduced "cities" (dots) around the globe
    const cities = useMemo(() => {
        return Array.from({ length: 60 }).map(() => getPointOnSphere(GLOBE_RADIUS))
    }, [])

    return (
        <group ref={groupRef}>
            {/* Core Globe (Dark) */}
            <Sphere args={[GLOBE_RADIUS - 0.05, 64, 64]}>
                <meshPhongMaterial
                    color="#0f172a"
                    emissive="#1e293b"
                    emissiveIntensity={0.2}
                    specular="#334155"
                    shininess={10}
                />
            </Sphere>

            {/* Atmosphere Glow */}
            <Sphere args={[GLOBE_RADIUS, 64, 64]}>
                <meshPhongMaterial
                    color="#3b82f6"
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </Sphere>

            {/* City Dots */}
            {cities.map((pos, i) => (
                <mesh key={i} position={new THREE.Vector3(...pos)}>
                    <sphereGeometry args={[0.03, 8, 8]} />
                    <meshBasicMaterial color="white" />
                </mesh>
            ))}

            {/* Arcs */}
            <Arcs count={15} />
        </group>
    )
}

export function Globe3D() {
    return (
        <div className="w-full h-full absolute inset-0 bg-black">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: false }}>
                <color attach="background" args={['#020617']} />

                <ambientLight intensity={0.5} color="#blue" />
                <pointLight position={[10, 10, 10]} intensity={2} color="#60a5fa" />
                <pointLight position={[-10, 5, -10]} intensity={1} color="#c084fc" />

                <Stars radius={50} depth={0} count={2000} factor={3} saturation={0} fade speed={0.5} />

                <World />

                <fog attach="fog" args={['#020617', 5, 20]} />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent pointer-events-none" />
        </div>
    )
}
