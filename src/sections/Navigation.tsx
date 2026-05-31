import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Services', target: 'services' },
  { label: 'Projects', target: 'projects' },
  { label: 'Contact', target: 'contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = NAV_LINKS.map((l) => l.target)
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(255,255,255,0.98)' : 'transparent',
        boxShadow: scrolled ? '0 2px 30px rgba(0,0,0,0.1)' : 'none',
        height: '80px',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
      }}
    >
      <div className="flex items-center justify-between h-full" style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 40px' }}>
        <div className="flex flex-col cursor-pointer" onClick={() => scrollTo('home')}>
          <span className="font-display font-bold leading-none transition-colors duration-300" style={{ fontSize: '26px', color: scrolled ? '#000000' : '#ffffff', letterSpacing: '1px' }}>
            CHIBUWE
          </span>
          <span className="font-heading uppercase leading-none" style={{ fontSize: '9px', color: '#FFC107', letterSpacing: '3px', marginTop: '2px', fontWeight: 600 }}>
            CONSTRUCTION &amp; PROJECTS
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <button
              key={link.target}
              onClick={() => scrollTo(link.target)}
              className="font-heading uppercase relative group"
              style={{ fontSize: '12px', letterSpacing: '2px', color: activeSection === link.target ? '#FFC107' : scrolled ? '#000000' : '#ffffff', background: 'none', border: 'none', cursor: 'pointer', paddingBottom: '4px', fontWeight: 500 }}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-0.5 transition-all duration-300" style={{ width: activeSection === link.target ? '100%' : '0%', backgroundColor: '#FFC107' }} />
            </button>
          ))}
        </div>

        <button className="md:hidden flex flex-col gap-1.5" onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
          <span className="block transition-all duration-300" style={{ width: '24px', height: '2px', backgroundColor: scrolled ? '#000000' : '#ffffff', transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span className="block transition-all duration-300" style={{ width: '24px', height: '2px', backgroundColor: scrolled ? '#000000' : '#ffffff', opacity: mobileOpen ? 0 : 1 }} />
          <span className="block transition-all duration-300" style={{ width: '24px', height: '2px', backgroundColor: scrolled ? '#000000' : '#ffffff', transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl">
          {NAV_LINKS.map((link) => (
            <button
              key={link.target}
              onClick={() => scrollTo(link.target)}
              className="block w-full text-left font-heading uppercase hover:bg-gray-50"
              style={{ fontSize: '12px', letterSpacing: '2px', color: activeSection === link.target ? '#FFC107' : '#000000', padding: '16px 40px', border: 'none', background: 'none', cursor: 'pointer', borderBottom: '1px solid #f0f0f0', fontWeight: 500 }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
