import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const YELLOW = '#FFC107'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from(section.querySelectorAll('.about-animate'), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%' },
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="bg-white" style={{ padding: '140px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section header */}
        <div className="about-animate text-center mb-20">
          <span className="font-heading uppercase block mb-3" style={{ fontSize: '11px', color: YELLOW, letterSpacing: '5px', fontWeight: 600 }}>
            About Us
          </span>
          <h2 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: '#000', fontWeight: 700 }}>
            Two Decades of Excellence
          </h2>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Large feature image */}
          <div className="about-animate lg:col-span-7">
            <div className="relative overflow-hidden group h-full" style={{ minHeight: '450px' }}>
              <img
                src="/images/glass-staircase-1.jpg"
                alt="Luxury glass staircase by Chibuwe Construction"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}>
                <p className="font-heading uppercase" style={{ fontSize: '11px', color: YELLOW, letterSpacing: '3px', fontWeight: 600 }}>Signature Work</p>
                <p className="font-display text-white mt-1" style={{ fontSize: '24px', fontWeight: 600 }}>Glass &amp; Stainless Steel Specialists</p>
              </div>
            </div>
          </div>

          {/* Text content + smaller image */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="about-animate flex-1 flex flex-col justify-center" style={{ padding: '20px 0' }}>
              <p className="font-body" style={{ fontSize: '16px', color: '#444', lineHeight: 1.8, marginBottom: '16px' }}>
                Chibuwe Construction &amp; Projects is a black empowerment company (CK No. 2016140624/07) with decades of experience in the South African construction industry.
              </p>
              <p className="font-body" style={{ fontSize: '16px', color: '#444', lineHeight: 1.8, marginBottom: '24px' }}>
                From residential homes to commercial developments, our skilled team delivers results that exceed expectations. Based in Sandton, we serve clients across South Africa.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {['NHBRC Registered', 'VAT Registered', 'B-BBEE Compliant'].map((badge) => (
                  <div key={badge} className="flex items-center gap-2">
                    <span style={{ width: '8px', height: '8px', backgroundColor: YELLOW, borderRadius: '50%' }} />
                    <span className="font-heading" style={{ fontSize: '11px', color: '#555', fontWeight: 500, letterSpacing: '1px' }}>{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-animate overflow-hidden group" style={{ height: '200px' }}>
              <img
                src="/images/glass-staircase-2.jpg"
                alt="Glass spiral staircase installation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="about-animate grid grid-cols-2 md:grid-cols-4" style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
          {[
            { num: '20+', label: 'Years Experience' },
            { num: '500+', label: 'Projects Completed' },
            { num: '50+', label: 'Expert Workers' },
            { num: '100%', label: 'Client Satisfaction' },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center py-10" style={{ borderRight: i < 3 ? '1px solid #eee' : 'none' }}>
              <span className="font-display block" style={{ fontSize: '48px', color: YELLOW, lineHeight: 1, fontWeight: 700 }}>{stat.num}</span>
              <span className="font-heading uppercase block mt-2" style={{ fontSize: '10px', color: '#999', letterSpacing: '3px', fontWeight: 500 }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
