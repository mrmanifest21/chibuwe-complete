import {
  Gem, HardHat, Home, Zap, Droplets, Paintbrush,
  Grid3X3, Hammer, Shield, BrickWall, Warehouse,
  ShowerHead, DoorOpen, Maximize, Layers, Lightbulb,
  Sun, Wind, Wrench, Ruler
} from 'lucide-react'

const YELLOW = '#FFC107'

const FEATURED = [
  { icon: Gem, title: 'Glass & Stainless Steel Balustrades', desc: 'Frameless glass, curved staircases, and premium SS balustrades.' },
  { icon: DoorOpen, title: 'Aluminum Windows & Doors', desc: 'Custom aluminum fittings, sliding and folding doors.' },
  { icon: ShowerHead, title: 'Frameless Showers', desc: 'Elegant glass shower enclosures and cubicles.' },
]

const MAIN = [
  { icon: HardHat, title: 'Building Construction', desc: 'Complete solutions from foundation to roof.' },
  { icon: Home, title: 'Renovations', desc: 'Professional renovation and remodelling.' },
  { icon: Zap, title: 'Electrical', desc: 'Full electrical services and solar installations.' },
  { icon: Droplets, title: 'Plumbing', desc: 'Installations, repairs, and maintenance.' },
  { icon: Paintbrush, title: 'Painting', desc: 'Interior, exterior, waterproofing coatings.' },
  { icon: Grid3X3, title: 'Tiling', desc: 'Floor and wall tiling for all spaces.' },
  { icon: Hammer, title: 'Carpentry', desc: 'Custom kitchens, cupboards, wardrobes.' },
  { icon: Shield, title: 'Roofing', desc: 'Trusses, installation, waterproofing.' },
  { icon: BrickWall, title: 'Paving & Concrete', desc: 'Driveways, foundations, boundary walls.' },
]

const EXTRA = [
  { icon: Warehouse, title: 'Jojo Tanks', desc: 'Installation and cleaning of water storage tanks.' },
  { icon: Maximize, title: 'Flooring', desc: 'Wooden, laminate, and vinyl flooring.' },
  { icon: Layers, title: 'Drywalling', desc: 'Office partitioning and interior wall systems.' },
  { icon: Lightbulb, title: 'Ceiling & Cornices', desc: 'Bulkheads, cornices, decorative mouldings.' },
  { icon: Sun, title: 'Solar', desc: 'Solar geysers and panel installations.' },
  { icon: Wind, title: 'Air Conditioning', desc: 'Installation, maintenance, and repair.' },
  { icon: Wrench, title: 'Welding', desc: 'Gates, balustrades, custom metalwork.' },
  { icon: Ruler, title: 'Waterproofing', desc: 'Comprehensive waterproofing solutions.' },
]

export default function Services() {
  return (
    <section id="services" style={{ backgroundColor: '#f8f8f8', padding: '140px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div className="text-center mb-20">
          <span className="font-heading uppercase block mb-3" style={{ fontSize: '11px', color: YELLOW, letterSpacing: '5px', fontWeight: 600 }}>
            What We Do
          </span>
          <h2 className="font-display mb-4" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: '#000', fontWeight: 700 }}>
            Our Services
          </h2>
          <p className="font-body mx-auto" style={{ fontSize: '16px', color: '#666', maxWidth: '550px', lineHeight: 1.8 }}>
            From luxury glass installations to complete building construction — excellence across every trade.
          </p>
        </div>

        {/* Featured 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {FEATURED.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.title} className="bg-white p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-elevated group" style={{ borderTop: '3px solid ' + YELLOW }}>
                <div className="flex items-center justify-center mb-6" style={{ width: '56px', height: '56px', backgroundColor: YELLOW }}>
                  <Icon size={24} color="#000" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading mb-3" style={{ fontSize: '18px', color: '#000', fontWeight: 600 }}>{s.title}</h3>
                <p className="font-body" style={{ fontSize: '14px', color: '#666', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Main 9 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px mb-16" style={{ backgroundColor: '#e5e5e5' }}>
          {MAIN.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.title} className="bg-white p-8 flex items-start gap-5 transition-all duration-300 hover:bg-gray-50 group">
                <div className="flex-shrink-0 flex items-center justify-center transition-all duration-300 group-hover:bg-yellow-400" style={{ width: '48px', height: '48px', backgroundColor: '#f0f0f0' }}>
                  <Icon size={20} color="#333" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-heading mb-1" style={{ fontSize: '15px', color: '#000', fontWeight: 600 }}>{s.title}</h4>
                  <p className="font-body" style={{ fontSize: '13px', color: '#777', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Extra 8 */}
        <h3 className="font-display text-center mb-10" style={{ fontSize: '28px', color: '#000', fontWeight: 600 }}>
          Additional Services
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXTRA.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.title} className="bg-white p-6 flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <div className="flex-shrink-0 flex items-center justify-center" style={{ width: '40px', height: '40px', backgroundColor: '#f5f5f5' }}>
                  <Icon size={18} color="#555" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-heading" style={{ fontSize: '14px', color: '#000', fontWeight: 600 }}>{s.title}</h4>
                  <p className="font-body mt-1" style={{ fontSize: '12px', color: '#888', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
