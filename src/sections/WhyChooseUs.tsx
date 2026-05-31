import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Award, Clock, Users, Target } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const YELLOW = '#FFC107'

const ETHICS = [
  'Professionalism in everything we do',
  'Meeting deadlines on every project',
  'Maximizing resources for best results',
  'Transparent communication throughout',
]

const DIFFS = [
  { icon: Award, title: 'NHBRC Registered', desc: 'National Home Builders Registration Council certified.' },
  { icon: Clock, title: 'On-Time Delivery', desc: 'Deadlines met without quality compromise.' },
  { icon: Users, title: 'Skilled Workforce', desc: '50+ trained professionals across all trades.' },
  { icon: Target, title: 'Quality Materials', desc: 'Best materials from trusted SA suppliers.' },
]

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const startTime = Date.now()
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / 1500, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      })
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.from(section.querySelectorAll('.why-animate'), {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%' },
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section id="why-choose-us" ref={sectionRef} style={{ backgroundColor: '#0f0f0f', padding: '140px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div className="why-animate">
            <span className="font-heading uppercase block mb-3" style={{ fontSize: '11px', color: YELLOW, letterSpacing: '5px', fontWeight: 600 }}>Why Choose Us</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: '#fff', fontWeight: 700 }}>
              The Chibuwe Difference
            </h2>
            <p className="font-body mt-6" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
              We combine skilled craftsmanship with professional project management to deliver construction excellence on every project.
            </p>
            <div className="mt-8 space-y-4">
              {ETHICS.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex items-center justify-center flex-shrink-0" style={{ width: '22px', height: '22px', backgroundColor: YELLOW }}>
                    <Check size={13} color="#000" strokeWidth={3} />
                  </div>
                  <span className="font-body" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DIFFS.map((d) => {
              const Icon = d.icon
              return (
                <div key={d.title} className="why-animate p-6" style={{ border: '1px solid rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                  <Icon size={24} color={YELLOW} strokeWidth={1.5} />
                  <h4 className="font-heading text-white mt-4" style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '0.5px' }}>{d.title}</h4>
                  <p className="font-body mt-2" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{d.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {[
            { value: 20, suffix: '+', label: 'Years Experience' },
            { value: 500, suffix: '+', label: 'Projects Completed' },
            { value: 50, suffix: '+', label: 'Expert Workers' },
            { value: 100, suffix: '%', label: 'Client Satisfaction' },
          ].map((stat, i) => (
            <div key={stat.label} className="why-animate text-center py-10" style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
              <div className="font-display" style={{ fontSize: '48px', color: YELLOW, lineHeight: 1, fontWeight: 700 }}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-heading uppercase mt-3" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
