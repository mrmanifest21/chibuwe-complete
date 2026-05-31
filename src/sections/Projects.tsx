import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const YELLOW = '#FFC107'

const P = [
  { img: '/images/glass-staircase-1.jpg', cat: 'Glass Balustrades', title: 'Curved Glass Staircase' },
  { img: '/images/glass-staircase-2.jpg', cat: 'Glass Balustrades', title: 'Glass Spiral Staircase' },
  { img: '/images/ss-glass-stairs.jpg', cat: 'Stainless Steel', title: 'SS & Glass Interior Stairs' },
  { img: '/images/ss-wire-balustrade.jpg', cat: 'Balustrades', title: 'SS Wire Balustrade' },
  { img: '/images/ss-indoor-railing.jpg', cat: 'Stainless Steel', title: 'SS Indoor Railing' },
  { img: '/images/ss-staircase-outdoor.jpg', cat: 'Stainless Steel', title: 'SS Outdoor Staircase' },
  { img: '/images/glass-balcony.jpg', cat: 'Glass Balustrades', title: 'Glass Balcony' },
  { img: '/images/aluminum-doors.jpg', cat: 'Aluminum', title: 'Aluminum Folding Doors' },
  { img: '/images/frameless-shower.jpg', cat: 'Frameless Showers', title: 'Frameless Glass Shower' },
  { img: '/images/jojo-tanks-grey.jpg', cat: 'Jojo Tanks', title: 'Jojo Tanks Installation' },
  { img: '/images/commercial-building.jpg', cat: 'Building', title: 'Commercial Building' },
  { img: '/images/red-kitchen.jpg', cat: 'Carpentry', title: 'Custom Red Kitchen' },
  { img: '/images/blue-wardrobes.jpg', cat: 'Carpentry', title: 'Blue Built-in Wardrobes' },
  { img: '/images/solar-panels.jpg', cat: 'Solar', title: 'Solar Panel Installation' },
  { img: '/images/foundation-work.jpg', cat: 'Foundations', title: 'Foundation Work' },
  { img: '/images/waterproofing.jpg', cat: 'Waterproofing', title: 'Waterproofing Solutions' },
  { img: '/images/jojo-tanks-green.jpg', cat: 'Jojo Tanks', title: 'Jojo Tanks Green' },
  { img: '/images/jojo-installation.jpg', cat: 'Jojo Tanks', title: 'Jojo Installation' },
  { img: '/images/construction-trenches.jpg', cat: 'Building', title: 'Construction Site' },
]

function Card({ p, className }: { p: typeof P[0]; className?: string }) {
  return (
    <div className={`group relative overflow-hidden cursor-pointer ${className || ''}`}>
      <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }}>
        <span className="font-heading uppercase" style={{ fontSize: '10px', color: YELLOW, letterSpacing: '3px', fontWeight: 600 }}>{p.cat}</span>
        <span className="font-display text-white mt-1" style={{ fontSize: '20px', fontWeight: 600 }}>{p.title}</span>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.from(section.querySelectorAll('.proj-item'), {
        y: 50, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: section.querySelector('.gallery-grid'), start: 'top 85%' },
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="bg-white" style={{ padding: '140px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div className="text-center mb-20">
          <span className="font-heading uppercase block mb-3" style={{ fontSize: '11px', color: YELLOW, letterSpacing: '5px', fontWeight: 600 }}>Our Portfolio</span>
          <h2 className="font-display mb-4" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: '#000', fontWeight: 700 }}>Featured Projects</h2>
          <p className="font-body mx-auto" style={{ fontSize: '16px', color: '#666', maxWidth: '550px', lineHeight: 1.8 }}>Real projects showcasing our craftsmanship across South Africa.</p>
        </div>

        {/* === EDITORIAL GALLERY === */}
        <div className="gallery-grid">

          {/* ROW 1: Large feature left + 2 stacked right */}
          <div className="proj-item grid grid-cols-1 md:grid-cols-3 mb-2" style={{ gap: '8px', height: 'clamp(320px, 38vw, 460px)' }}>
            <Card p={P[0]} className="md:col-span-2" />
            <div className="hidden md:grid grid-rows-2" style={{ gap: '8px' }}>
              <Card p={P[1]} />
              <Card p={P[2]} />
            </div>
          </div>

          {/* ROW 2: Four equal */}
          <div className="proj-item grid grid-cols-2 md:grid-cols-4 mb-2" style={{ gap: '8px', height: 'clamp(180px, 20vw, 240px)' }}>
            <Card p={P[3]} />
            <Card p={P[4]} />
            <Card p={P[5]} />
            <Card p={P[6]} />
          </div>

          {/* ROW 3: 2 stacked left + large feature right */}
          <div className="proj-item grid grid-cols-1 md:grid-cols-3 mb-2" style={{ gap: '8px', height: 'clamp(320px, 38vw, 460px)' }}>
            <div className="hidden md:grid grid-rows-2" style={{ gap: '8px' }}>
              <Card p={P[7]} />
              <Card p={P[8]} />
            </div>
            <Card p={P[9]} className="md:col-span-2" />
          </div>

          {/* ROW 4: Three wide */}
          <div className="proj-item grid grid-cols-1 md:grid-cols-3 mb-2" style={{ gap: '8px', height: 'clamp(220px, 24vw, 300px)' }}>
            <Card p={P[10]} />
            <Card p={P[11]} />
            <Card p={P[12]} />
          </div>

          {/* ROW 5: Two large */}
          <div className="proj-item grid grid-cols-1 md:grid-cols-2 mb-2" style={{ gap: '8px', height: 'clamp(260px, 28vw, 340px)' }}>
            <Card p={P[13]} />
            <Card p={P[14]} />
          </div>

          {/* ROW 6: Five thumbnails */}
          <div className="proj-item grid grid-cols-2 md:grid-cols-5" style={{ gap: '8px', height: 'clamp(140px, 14vw, 180px)' }}>
            <Card p={P[15]} />
            <Card p={P[16]} />
            <Card p={P[17]} />
            <Card p={P[18]} />
            <div className="hidden md:flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <span className="font-display block" style={{ fontSize: '28px', color: YELLOW, fontWeight: 700 }}>500+</span>
                <span className="font-heading uppercase block mt-1" style={{ fontSize: '9px', color: '#999', letterSpacing: '2px', fontWeight: 500 }}>Projects Done</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
