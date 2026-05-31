import { HardHat, Home, Zap, Droplets, Paintbrush, Shield, Gem, DoorOpen, Mail, Phone, MapPin } from 'lucide-react'

const YELLOW = '#FFC107'

const LINKS = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Services', target: 'services' },
  { label: 'Projects', target: 'projects' },
  { label: 'Contact', target: 'contact' },
]

const SVCS = [
  { label: 'Glass & SS Balustrades', icon: Gem },
  { label: 'Aluminum Windows & Doors', icon: DoorOpen },
  { label: 'Frameless Showers', icon: HardHat },
  { label: 'Building Construction', icon: Home },
  { label: 'Electrical', icon: Zap },
  { label: 'Plumbing', icon: Droplets },
  { label: 'Painting', icon: Paintbrush },
  { label: 'Roofing', icon: Shield },
]

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ backgroundColor: '#0a0a0a', padding: '80px 40px 30px' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div>
          <span className="font-display font-bold block" style={{ fontSize: '26px', color: '#fff', letterSpacing: '1px' }}>CHIBUWE</span>
          <span className="font-heading uppercase block mt-1" style={{ fontSize: '9px', color: YELLOW, letterSpacing: '3px', fontWeight: 600 }}>CONSTRUCTION &amp; PROJECTS</span>
          <p className="font-body mt-6" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
            South Africa&apos;s premier construction company delivering excellence from foundation to finish.
          </p>
          <div className="mt-4 space-y-1">
            <p className="font-body" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>CK No. 2016140624/07</p>
            <p className="font-body" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>VAT No. 4380287682</p>
            <p className="font-body" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>NHBRC Registered</p>
          </div>
          <div className="mt-6 flex gap-3">
            <a href="mailto:info@chibuweconstructions.co.za" className="flex items-center justify-center transition-colors hover:bg-yellow-500" style={{ width: '40px', height: '40px', backgroundColor: YELLOW }}>
              <Mail size={16} color="#000" />
            </a>
            <a href="tel:0107457663" className="flex items-center justify-center transition-colors hover:bg-yellow-500" style={{ width: '40px', height: '40px', backgroundColor: YELLOW }}>
              <Phone size={16} color="#000" />
            </a>
            <a href="https://maps.google.com/?q=3+Alison+Street+Buccluech+Sandton+2090" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center transition-colors hover:bg-yellow-500" style={{ width: '40px', height: '40px', backgroundColor: YELLOW }}>
              <MapPin size={16} color="#000" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-heading uppercase mb-6" style={{ fontSize: '11px', color: YELLOW, letterSpacing: '3px', fontWeight: 600 }}>Quick Links</h4>
          <ul className="space-y-3">
            {LINKS.map((l) => (
              <li key={l.target}>
                <button onClick={() => scrollTo(l.target)} className="font-body transition-colors duration-200 hover:text-white" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading uppercase mb-6" style={{ fontSize: '11px', color: YELLOW, letterSpacing: '3px', fontWeight: 600 }}>Services</h4>
          <ul className="space-y-3">
            {SVCS.map((s) => {
              const Icon = s.icon
              return (
                <li key={s.label} className="flex items-center gap-2">
                  <Icon size={12} color={YELLOW} />
                  <span className="font-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{s.label}</span>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <h4 className="font-heading uppercase mb-6" style={{ fontSize: '11px', color: YELLOW, letterSpacing: '3px', fontWeight: 600 }}>Contact</h4>
          <div className="space-y-4">
            <div>
              <p className="font-body" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                3 Alison Street, Buccluech, Sandton, 2090
              </p>
            </div>
            <div>
              <a href="tel:0107457663" className="font-body block transition-colors hover:text-yellow-400" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>010 745 7663</a>
              <a href="tel:0749930280" className="font-body block transition-colors hover:text-yellow-400" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>074 993 0280</a>
              <a href="tel:0838828136" className="font-body block transition-colors hover:text-yellow-400" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>083 882 8136</a>
            </div>
            <div>
              <a href="mailto:info@chibuweconstructions.co.za" className="font-body block transition-colors hover:text-yellow-400" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>info@chibuweconstructions.co.za</a>
              <a href="mailto:saleschibuwe@gmail.com" className="font-body block transition-colors hover:text-yellow-400" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>saleschibuwe@gmail.com</a>
            </div>
          </div>
          <p className="font-body mt-6 italic" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
            &quot;Fortune favours the brave and those who are lion hearted&quot;
          </p>
        </div>
      </div>

      <div className="mt-16 pt-6 flex flex-col md:flex-row items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', maxWidth: '1200px', margin: '60px auto 0' }}>
        <p className="font-body" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
          &copy; {new Date().getFullYear()} Chibuwe Construction &amp; Projects. All rights reserved.
        </p>
        <p className="font-body mt-2 md:mt-0" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
          chibuweconstructions.co.za
        </p>
      </div>
    </footer>
  )
}
