"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Layers, MessageCircle, ShieldCheck } from "lucide-react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Scene3D } from "@/components/Scene3D"
import { HeroDashboard } from "@/components/hero-dashboard"

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`min-h-screen flex flex-col justify-center relative z-10 px-4 md:px-12 ${className}`}>
      {children}
    </section>
  )
}

export default function Home() {
  const { data: session } = useSession()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <main className="relative bg-[#F5F5F7] text-[#1d1d1f] overflow-hidden">
      {/* 3D Background */}
      {/* Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/dashboard-bg.png"
          alt="Collaboration Background"
          fill
          priority
          className="object-cover object-center opacity-40 mix-blend-multiply"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-transparent" />
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Section 1: Connect (Hero) */}
      <Section className="items-center text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl md:text-2xl font-medium text-gray-500 mb-4 tracking-wide">
            {session ? `Welcome back, ${session.user?.name}` : "Student Collaboration Portal"}
          </h2>
          <h1 className="text-[15vw] leading-[0.85] font-bold tracking-tighter text-black mb-8">
            {session ? "Dashboard" : "Connect"}
          </h1>
          <p className="max-w-2xl mx-auto text-xl md:text-2xl font-medium text-gray-600 mb-10">
            {session
              ? "Your network is active. Jump back in to see your latest project updates and messages."
              : "Discover your most advanced network yet. Blazing fast connections, meaningful projects, superb team matching."
            }
          </p>
          <div className="flex gap-4 justify-center mb-16">
            {session ? (
              <Link href="/dashboard">
                <Button size="lg" className="rounded-full h-12 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg shadow-blue-200 transition-all hover:scale-105">
                  Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/signup">
                <Button size="lg" className="rounded-full h-12 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg shadow-blue-200 transition-all hover:scale-105">
                  Join Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            )}

            <Link href="/projects">
              <Button variant="outline" size="lg" className="rounded-full h-12 px-8 text-lg border-gray-300 hover:bg-gray-100 bg-transparent">
                Explore
              </Button>
            </Link>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-5xl rounded-xl shadow-2xl overflow-hidden border border-white/20 bg-white"
          >
            <HeroDashboard />
          </motion.div>
        </motion.div>
      </Section>

      {/* Section 2: Innovate */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, margin: "-100px" }}
          >
            <h3 className="text-lg font-semibold text-gray-500 mb-2">Features that help you</h3>
            <h2 className="text-[12vw] leading-none font-bold text-indigo-600 mb-6">
              Innovate
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-md">
              The easy-to-use platform packs advanced features into a lightweight, intuitive design. Pair with students who have the skills you need.
            </p>
          </motion.div>
          <div className="flex flex-col gap-6">
            {/* Feature specs simulating camera specs */}
            <Link href="/projects">
              <motion.div
                whileHover={{ scale: 1.02, translateX: 10 }}
                className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/40 shadow-xl flex items-center gap-6 group hover:border-blue-200 transition-colors cursor-pointer"
              >
                <div className="h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Layers className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-4xl font-bold mb-1 text-slate-800">Unlimited</div>
                  <div className="text-sm font-bold uppercase tracking-widest text-slate-500">Projects</div>
                </div>
              </motion.div>
            </Link>

            <Link href="/messages">
              <motion.div
                whileHover={{ scale: 1.02, translateX: 10 }}
                className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/40 shadow-xl flex items-center gap-6 group hover:border-blue-200 transition-colors cursor-pointer"
              >
                <div className="h-16 w-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-4xl font-bold mb-1 text-slate-800">Real-time</div>
                  <div className="text-sm font-bold uppercase tracking-widest text-slate-500">Chat & Sync</div>
                </div>
              </motion.div>
            </Link>

            <Link href="/signup">
              <motion.div
                whileHover={{ scale: 1.02, translateX: 10 }}
                className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/40 shadow-xl flex items-center gap-6 group hover:border-blue-200 transition-colors cursor-pointer"
              >
                <div className="h-16 w-16 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-4xl font-bold mb-1 text-slate-800">Verified</div>
                  <div className="text-sm font-bold uppercase tracking-widest text-slate-500">Student Profiles</div>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </Section>

      {/* Section 3: Achieve */}
      <Section className="items-end text-right">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: "-100px" }}
          className="max-w-3xl"
        >
          <h3 className="text-lg font-semibold text-gray-500 mb-2">Outstanding</h3>
          <h2 className="text-[10vw] leading-none font-bold text-black mb-6">
            Achieve
          </h2>
          <h2 className="text-[10vw] leading-none font-bold text-indigo-600 mb-12 -mt-8 opacity-80">
            Success
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed ml-auto max-w-xl">
            Perfect for content creators looking to take their creativity to the next level. Featuring high-speed matching and lightning-fast collaboration tools.
          </p>

          <div className="mt-12 flex justify-end gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-black" />
              <span className="font-semibold text-lg">Instant Matching</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-black" />
              <span className="font-semibold text-lg">Secure Data</span>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Footer CTA */}
      <section className="py-32 bg-black text-white text-center relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-7xl font-bold mb-8">Ready to upgrade?</h2>
          <Link href="/signup">
            <Button size="lg" className="h-16 px-12 text-xl rounded-full bg-white text-black hover:bg-gray-200">
              Get Started <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
