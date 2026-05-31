import { useEffect, useRef, useState } from 'react'

const YELLOW = '#FFC107'
const WHITE_DIM = 'rgba(255,255,255,0.08)'

interface Node {
  x: number
  y: number
  targetX: number
  targetY: number
  vx: number
  vy: number
  glow: number
}

interface Edge {
  from: number
  to: number
  alpha: number
  targetAlpha: number
}

function createBuildingStructure(w: number, h: number): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = []
  const edges: Edge[] = []
  const cx = w * 0.55
  const baseY = h * 0.78
  const floorH = h * 0.18
  const buildingW = Math.min(w * 0.35, 420)

  // Helper to add node and return index
  const add = (x: number, y: number, glow: number) => {
    nodes.push({ x: x + (Math.random() - 0.5) * 10, y: y + (Math.random() - 0.5) * 10, targetX: x, targetY: y, vx: 0, vy: 0, glow })
    return nodes.length - 1
  }

  // Building corners per floor
  const floors = 3
  const cols = 5
  const floorNodes: number[][] = []

  for (let f = 0; f <= floors; f++) {
    const fy = baseY - f * floorH
    const row: number[] = []
    for (let c = 0; c < cols; c++) {
      const fx = cx - buildingW / 2 + (c / (cols - 1)) * buildingW
      const isCorner = c === 0 || c === cols - 1
      const isRoof = f === floors
      const glow = isRoof ? 1.0 : isCorner ? 0.7 : 0.3
      row.push(add(fx, fy, glow))
    }
    floorNodes.push(row)
  }

  // Roof peak
  const peak = add(cx, baseY - floors * floorH - h * 0.1, 1.2)

  // Connect floors vertically
  for (let f = 0; f < floors; f++) {
    for (let c = 0; c < cols; c++) {
      edges.push({ from: floorNodes[f][c], to: floorNodes[f + 1][c], alpha: 0, targetAlpha: c === 0 || c === cols - 1 ? 0.5 : 0.15 })
    }
  }

  // Connect horizontally per floor
  for (let f = 0; f <= floors; f++) {
    for (let c = 0; c < cols - 1; c++) {
      const isEdge = f === floors
      edges.push({ from: floorNodes[f][c], to: floorNodes[f][c + 1], alpha: 0, targetAlpha: isEdge ? 0.7 : 0.2 })
    }
  }

  // Roof triangles
  edges.push({ from: peak, to: floorNodes[floors][0], alpha: 0, targetAlpha: 0.6 })
  edges.push({ from: peak, to: floorNodes[floors][cols - 1], alpha: 0, targetAlpha: 0.6 })

  // Add decorative nodes floating around
  for (let i = 0; i < 40; i++) {
    const angle = Math.random() * Math.PI * 2
    const dist = 100 + Math.random() * 300
    const dx = cx + Math.cos(angle) * dist
    const dy = baseY - floors * floorH * 0.5 + Math.sin(angle) * dist * 0.6
    add(dx, dy, 0.15 + Math.random() * 0.2)
  }

  // Cross bracing on edges
  for (let f = 0; f < floors; f++) {
    edges.push({ from: floorNodes[f][0], to: floorNodes[f + 1][1], alpha: 0, targetAlpha: 0.1 })
    edges.push({ from: floorNodes[f][cols - 1], to: floorNodes[f + 1][cols - 2], alpha: 0, targetAlpha: 0.1 })
  }

  return { nodes, edges }
}

export default function HeroBlueprint() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const mouseRef = useRef({ x: -1000, y: -1000, active: false })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const cvs = canvasRef.current
    if (!cvs) return
    let ctx = cvs.getContext('2d')!
    const canvas = cvs

    let w = canvas.offsetWidth
    let h = canvas.offsetHeight
    const dpr = Math.min(window.devicePixelRatio, 2)
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.scale(dpr, dpr)

    const { nodes, edges } = createBuildingStructure(w, h)
    let time = 0

    function onMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
      mouseRef.current.active = true
    }
    function onMouseLeave() { mouseRef.current.active = false }
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    setLoaded(true)

    function animate() {
      frameRef.current = requestAnimationFrame(animate)
      time += 0.016

      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, w, h)

      const mouse = mouseRef.current

      // Update nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]

        // Gentle float
        n.vx += (n.targetX - n.x) * 0.02
        n.vy += (n.targetY - n.y) * 0.02
        n.vx *= 0.95
        n.vy *= 0.95
        n.x += n.vx + Math.sin(time * 0.5 + i) * 0.15
        n.y += n.vy + Math.cos(time * 0.3 + i) * 0.1

        // Mouse repel
        if (mouse.active) {
          const dx = n.x - mouse.x
          const dy = n.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150 && dist > 0) {
            const force = (1 - dist / 150) * 3
            n.x += (dx / dist) * force
            n.y += (dy / dist) * force
          }
        }
      }

      // Draw edges with progressive reveal
      for (let i = 0; i < edges.length; i++) {
        const e = edges[i]
        const n1 = nodes[e.from]
        const n2 = nodes[e.to]

        // Progressive draw-in
        const revealDelay = i * 0.008
        const revealProgress = Math.min(Math.max((time - revealDelay) / 1.5, 0), 1)
        if (revealProgress <= 0) continue

        e.alpha += (e.targetAlpha * revealProgress - e.alpha) * 0.05

        const isGold = n1.glow > 0.5 || n2.glow > 0.5
        ctx.strokeStyle = isGold ? YELLOW : WHITE_DIM
        ctx.globalAlpha = e.alpha
        ctx.lineWidth = isGold ? 1.2 : 0.6
        ctx.beginPath()
        ctx.moveTo(n1.x, n1.y)
        ctx.lineTo(n2.x, n2.y)
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      // Draw nodes with glow
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        if (n.glow < 0.2) {
          // Small ambient dots
          ctx.fillStyle = WHITE_DIM
          ctx.beginPath()
          ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2)
          ctx.fill()
          continue
        }

        // Glow
        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.glow * 20)
        gradient.addColorStop(0, `rgba(255,193,7,${n.glow * 0.6})`)
        gradient.addColorStop(0.3, `rgba(255,193,7,${n.glow * 0.2})`)
        gradient.addColorStop(1, 'rgba(255,193,7,0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.glow * 20, 0, Math.PI * 2)
        ctx.fill()

        // Core dot
        ctx.fillStyle = YELLOW
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.glow * 2.5 + 0.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Subtle grid background
      ctx.strokeStyle = 'rgba(255,255,255,0.015)'
      ctx.lineWidth = 0.5
      const gridSize = 40
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
    }
    animate()

    function onResize() {
      if (!canvasRef.current) return
      w = canvasRef.current.offsetWidth
      h = canvasRef.current.offsetHeight
      canvasRef.current.width = w * dpr
      canvasRef.current.height = h * dpr
      ctx = canvasRef.current.getContext('2d')!
      ctx.scale(dpr, dpr)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameRef.current)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative w-full" style={{ height: '100vh' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} />

      {/* Bottom gradient */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '55%', background: 'linear-gradient(to top, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.75) 30%, transparent 100%)', zIndex: 2, pointerEvents: 'none' }} />
      {/* Left gradient */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '45%', height: '100%', background: 'linear-gradient(to right, rgba(10,10,10,0.7) 0%, transparent 100%)', zIndex: 2, pointerEvents: 'none' }} />

      {/* Hero text */}
      <div className="absolute bottom-0 left-0 z-10" style={{ padding: '0 40px 120px', maxWidth: '850px' }}>
        <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-heading uppercase block mb-4" style={{ fontSize: '11px', color: YELLOW, letterSpacing: '5px', fontWeight: 600 }}>
            NHBRC Registered &middot; Est. 2006
          </span>
          <h1 className="font-display text-white leading-none" style={{ fontSize: 'clamp(44px, 7.5vw, 96px)', letterSpacing: '1px', fontWeight: 700 }}>
            Building South<br />Africa's Future
          </h1>
          <p className="font-body mt-6" style={{ fontSize: '16px', maxWidth: '480px', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>
            From foundation to finish — quality construction you can trust. Two decades of excellence across residential, commercial, and industrial projects.
          </p>
          <button
            onClick={() => scrollTo('contact')}
            className="mt-10 font-heading font-semibold uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:brightness-110"
            style={{ padding: '18px 48px', fontSize: '12px', letterSpacing: '3px', backgroundColor: YELLOW, color: '#000' }}
          >
            Get a Free Quote
          </button>
        </div>
      </div>

      {/* Right side vertical text */}
      <div className="absolute z-10 hidden lg:block" style={{ right: '40px', top: '50%', transform: 'translateY(-50%)', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
        <span className="font-heading uppercase" style={{ fontSize: '10px', color: 'rgba(255,193,7,0.3)', letterSpacing: '5px', fontWeight: 500 }}>
          CHIBUWE CONSTRUCTION &amp; PROJECTS &middot; SANDTON
        </span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute z-10 hidden md:flex flex-col items-center" style={{ bottom: '40px', right: '40px' }}>
        <span className="font-heading uppercase mb-3" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '3px', writingMode: 'vertical-rl' }}>Scroll</span>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(255,193,7,0.5), transparent)' }} />
      </div>
    </section>
  )
}
