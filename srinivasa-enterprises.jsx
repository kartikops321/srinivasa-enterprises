import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0a0a0a", bgLight: "#111111", accent: "#c8a55c", accentLight: "#e8cc7a",
  accentDark: "#8a6f30", text: "#f0ece4", textMuted: "#8a8578",
  glass: "rgba(22,22,22,0.65)", glassBorder: "rgba(200,165,92,0.15)",
};

const PRODUCTS = [
  { name: "Basmati Rice", desc: "Premium long-grain aromatic rice, aged to perfection for global markets.", emoji: "🌾", origin: "Punjab, India" },
  { name: "Red Onion", desc: "Export-grade Nashik red onions — crisp, pungent, vibrant color.", emoji: "🧅", origin: "Maharashtra" },
  { name: "Green Chilli", desc: "Fresh Guntur chillies with intense heat and rich flavor profile.", emoji: "🌶️", origin: "Andhra Pradesh" },
  { name: "Curry Leaves", desc: "Aromatic fresh curry leaves, vacuum-packed for maximum freshness.", emoji: "🍃", origin: "Tamil Nadu" },
  { name: "Potatoes", desc: "Farm-fresh potatoes, sorted and graded for international quality standards.", emoji: "🥔", origin: "Uttar Pradesh" },
  { name: "Sweet Potatoes", desc: "Nutrient-rich sweet potatoes, organically grown and export-ready.", emoji: "🍠", origin: "Odisha" },
  { name: "Wheat", desc: "High-protein Indian wheat, milled to global specification standards.", emoji: "🌿", origin: "Madhya Pradesh" },
  { name: "Banana", desc: "Cavendish & Robusta bananas, ripeness-controlled for long-haul shipping.", emoji: "🍌", origin: "Karnataka" },
  { name: "Coconut", desc: "Mature coconuts & derivatives — oil, milk, desiccated — from Kerala.", emoji: "🥥", origin: "Kerala" },
  { name: "Cucumber", desc: "Fresh, crisp cucumbers meeting EU & GCC phytosanitary standards.", emoji: "🥒", origin: "Haryana" },
  { name: "Carrot", desc: "Bright orange carrots, cold-chain preserved for export freshness.", emoji: "🥕", origin: "Ooty" },
  { name: "Bitter Gourd", desc: "Premium bitter gourd for Asian & Middle Eastern culinary markets.", emoji: "🫛", origin: "Telangana" },
  { name: "Jaggery", desc: "Organic unrefined cane jaggery — chemical-free, traditional process.", emoji: "🟤", origin: "Maharashtra" },
];

const CERTIFICATIONS = [
  { name: "GST", full: "Goods & Services Tax", desc: "Fully compliant with Indian GST regulations for seamless trade." },
  { name: "FSSAI", full: "Food Safety & Standards Authority", desc: "Certified food safety standards ensuring quality at every stage." },
  { name: "APEDA", full: "Agricultural Products Export", desc: "Registered with APEDA for agricultural product exports worldwide." },
  { name: "MSME", full: "Micro, Small & Medium Enterprise", desc: "Government-recognized MSME for trusted small enterprise excellence." },
];

const SERVICES = [
  { title: "Import Services", desc: "End-to-end import facilitation — documentation, customs clearance, and delivery.", icon: "📥" },
  { title: "Export Services", desc: "From farm to foreign port — complete export management with compliance.", icon: "📤" },
  { title: "Logistics & Supply Chain", desc: "Temperature-controlled, GPS-tracked global shipping across 50+ countries.", icon: "🚢" },
  { title: "Trading Solutions", desc: "Market intelligence, pricing strategy, and buyer-seller matchmaking.", icon: "📊" },
];

const WHY_US = [
  { title: "Lightning Fast Delivery", desc: "Optimized supply chain for rapid global dispatch.", icon: "⚡" },
  { title: "100% Compliance", desc: "Full regulatory compliance across all markets.", icon: "🛡️" },
  { title: "24/7 Support", desc: "Dedicated support team available around the clock.", icon: "🕐" },
  { title: "Personal Service", desc: "Dedicated account manager for every client.", icon: "🤝" },
];

const STATS = [
  { value: 50, suffix: "+", label: "Countries" },
  { value: 1200, suffix: "+", label: "Shipments" },
  { value: 500, suffix: "+", label: "Clients" },
  { value: 13, suffix: "", label: "Product Lines" },
];

const BROCHURE = [
  { title: "Company Overview", content: "Srinivasa Enterprises is a premier Indian import-export house specializing in agricultural commodities. We connect Indian farmers to global markets — delivering freshness, quality, and reliability at every step of the supply chain." },
  { title: "Product Range", content: "Our portfolio spans 13+ agricultural products — from premium Basmati rice and Nashik red onions to organic jaggery and fresh tropical fruits. Every product undergoes rigorous quality checks and cold-chain preservation before export." },
  { title: "Certifications & Compliance", content: "We hold GST, FSSAI, APEDA, and MSME certifications. Our operations comply with EU, GCC, ASEAN, and US import regulations. Full traceability from farm to port." },
  { title: "Export Process", content: "Our streamlined 5-step export process: Inquiry → Sample Approval → Order Confirmation → Quality Inspection → Shipment & Tracking. We handle all documentation, customs clearance, and logistics." },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body,html { background:${COLORS.bg}; color:${COLORS.text}; font-family:'DM Sans',sans-serif; overflow-x:hidden; scroll-behavior:smooth; }
  .fd { font-family:'Playfair Display',serif; }
  .fh { font-family:'Syne',sans-serif; }
  ::-webkit-scrollbar { width:6px; }
  ::-webkit-scrollbar-track { background:${COLORS.bg}; }
  ::-webkit-scrollbar-thumb { background:${COLORS.accentDark}; border-radius:3px; }
  @keyframes fadeInUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(200,165,92,0.15)} 50%{box-shadow:0 0 40px rgba(200,165,92,0.3)} }
  @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
  .aos { opacity:0; transform:translateY(40px); transition:all 0.8s cubic-bezier(0.16,1,0.3,1); }
  .aos.v { opacity:1; transform:translateY(0); }
  .gc { background:${COLORS.glass}; backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); border:1px solid ${COLORS.glassBorder}; border-radius:16px; }
  .pc { background:${COLORS.glass}; backdrop-filter:blur(16px); border:1px solid ${COLORS.glassBorder}; border-radius:20px; padding:28px 24px; transition:all 0.5s cubic-bezier(0.16,1,0.3,1); cursor:pointer; position:relative; overflow:hidden; }
  .pc::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(200,165,92,0.05) 0%,transparent 50%); opacity:0; transition:opacity 0.5s; border-radius:20px; }
  .pc:hover::before { opacity:1; }
  .pc:hover { transform:translateY(-8px) scale(1.02); border-color:rgba(200,165,92,0.4); box-shadow:0 20px 60px rgba(0,0,0,0.4),0 0 30px rgba(200,165,92,0.1); }
  .btn1 { background:linear-gradient(135deg,${COLORS.accent},${COLORS.accentLight}); color:${COLORS.bg}; font-weight:700; padding:16px 36px; border-radius:60px; border:none; cursor:pointer; font-size:15px; letter-spacing:0.5px; transition:all 0.4s cubic-bezier(0.16,1,0.3,1); font-family:'DM Sans',sans-serif; text-decoration:none; display:inline-flex; align-items:center; gap:8px; }
  .btn1:hover { transform:translateY(-3px) scale(1.05); box-shadow:0 12px 40px rgba(200,165,92,0.35); }
  .btn2 { background:transparent; color:${COLORS.accent}; font-weight:600; padding:15px 35px; border-radius:60px; border:1.5px solid ${COLORS.accent}; cursor:pointer; font-size:15px; transition:all 0.4s cubic-bezier(0.16,1,0.3,1); font-family:'DM Sans',sans-serif; text-decoration:none; display:inline-flex; align-items:center; gap:8px; }
  .btn2:hover { background:rgba(200,165,92,0.1); transform:translateY(-3px); }
  .sw { max-width:1280px; margin:0 auto; padding:0 24px; }
  .st { font-family:'Playfair Display',serif; font-size:clamp(32px,5vw,56px); font-weight:700; color:${COLORS.text}; line-height:1.15; }
  .al { width:60px; height:3px; background:linear-gradient(90deg,${COLORS.accent},${COLORS.accentLight}); border-radius:2px; }
  .tag { font-family:'Syne',sans-serif; font-size:12px; font-weight:700; letter-spacing:3px; text-transform:uppercase; color:${COLORS.accent}; }
  .swb,.scb { position:fixed; z-index:999; border-radius:50%; width:56px; height:56px; display:flex; align-items:center; justify-content:center; font-size:24px; cursor:pointer; border:none; transition:all 0.3s; text-decoration:none; box-shadow:0 6px 24px rgba(0,0,0,0.3); }
  .swb { bottom:24px; right:24px; background:#25d366; color:white; }
  .scb { bottom:90px; right:24px; background:${COLORS.accent}; color:${COLORS.bg}; }
  .swb:hover,.scb:hover { transform:scale(1.12); }
  .ls { position:fixed; inset:0; z-index:10000; background:${COLORS.bg}; display:flex; flex-direction:column; align-items:center; justify-content:center; transition:opacity 0.8s,visibility 0.8s; }
  .ls.h { opacity:0; visibility:hidden; pointer-events:none; }
  .lb { width:200px; height:2px; background:rgba(200,165,92,0.15); border-radius:2px; overflow:hidden; margin-top:24px; }
  .lf { height:100%; background:linear-gradient(90deg,${COLORS.accent},${COLORS.accentLight}); border-radius:2px; transition:width 0.3s; }
  .cc { background:${COLORS.glass}; backdrop-filter:blur(16px); border:1px solid ${COLORS.glassBorder}; border-radius:16px; padding:32px 24px; text-align:center; transition:all 0.5s cubic-bezier(0.16,1,0.3,1); }
  .cc:hover { transform:translateY(-6px); border-color:rgba(200,165,92,0.4); animation:glow 2s infinite; }
  .cb { width:72px; height:72px; border-radius:50%; background:linear-gradient(135deg,rgba(200,165,92,0.15),rgba(200,165,92,0.05)); border:2px solid ${COLORS.accent}; display:flex; align-items:center; justify-content:center; margin:0 auto 16px; font-family:'Syne',sans-serif; font-weight:800; font-size:14px; color:${COLORS.accent}; }
  .bi { background:${COLORS.glass}; backdrop-filter:blur(12px); border:1px solid ${COLORS.glassBorder}; border-radius:16px; overflow:hidden; transition:all 0.4s; cursor:pointer; }
  .bi:hover { border-color:rgba(200,165,92,0.35); }
  .ng { background:rgba(10,10,10,0.8); backdrop-filter:blur(20px); border-bottom:1px solid rgba(200,165,92,0.08); }
  .fi { background:rgba(255,255,255,0.04); border:1px solid rgba(200,165,92,0.15); border-radius:12px; padding:14px 18px; color:${COLORS.text}; font-size:15px; font-family:'DM Sans',sans-serif; width:100%; transition:all 0.3s; outline:none; }
  .fi:focus { border-color:${COLORS.accent}; box-shadow:0 0 20px rgba(200,165,92,0.1); }
  .fi::placeholder { color:${COLORS.textMuted}; }
  textarea.fi { min-height:120px; resize:vertical; }
  @media(max-width:768px) { .dn{display:none!important} .mb{display:flex!important} }
  @media(min-width:769px) { .mb{display:none!important} .mo{display:none!important} }
`;

// ─── COBE GLOBE ───
function CobeGlobe() {
  const canvasRef = useRef(null);
  const phiRef = useRef(0);

  useEffect(() => {
    let globe;
    let animFrame;

    const loadCobe = async () => {
      // Dynamically import COBE
      const script = document.createElement("script");
      script.src = "https://unpkg.com/cobe@0.6.3/dist/index.js";
      script.onload = () => {
        if (!canvasRef.current || !window.createGlobe) return;
        const canvas = canvasRef.current;
        const w = canvas.parentElement.clientWidth;
        const h = canvas.parentElement.clientHeight;
        canvas.width = w * 2;
        canvas.height = h * 2;
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";

        // India = [17.4, 78.5]
        const INDIA = [17.4, 78.5];
        const DESTINATIONS = [
          [25.2, 55.3],  // Dubai
          [24.7, 46.7],  // Riyadh
          [51.5, -0.1],  // London
          [52.5, 13.4],  // Berlin
          [40.7, -74.0], // New York
          [1.3, 103.8],  // Singapore
          [35.7, 139.7], // Tokyo
          [-33.9, 18.4], // Cape Town
          [-33.8, 151.2],// Sydney
          [48.9, 2.35],  // Paris
          [-1.3, 36.8],  // Nairobi
          [3.1, 101.7],  // KL
          [25.0, 67.0],  // Karachi
          [6.5, 3.4],    // Lagos
          [55.7, 37.6],  // Moscow
          [37.6, 127.0], // Seoul
        ];

        globe = window.createGlobe(canvas, {
          devicePixelRatio: 2,
          width: w * 2,
          height: h * 2,
          phi: 1.2,       // Start rotated to show India
          theta: 0.15,
          dark: 1,
          diffuse: 1.4,
          mapSamples: 20000,
          mapBrightness: 4,
          mapBaseBrightness: 0.02,
          baseColor: [0.15, 0.18, 0.25],
          markerColor: [0.78, 0.65, 0.36], // Gold accent
          glowColor: [0.08, 0.12, 0.25],
          markers: [
            // India origin (bigger)
            { location: INDIA, size: 0.08 },
            // Destinations
            ...DESTINATIONS.map((d) => ({ location: d, size: 0.035 })),
          ],
          arcs: DESTINATIONS.map((d) => ({
            from: INDIA,
            to: d,
          })),
          arcColor: [0.78, 0.65, 0.36],
          arcWidth: 0.3,
          arcHeight: 0.3,
        });

        // Auto rotate
        const animate = () => {
          phiRef.current += 0.003;
          globe.update({ phi: phiRef.current + 1.2 });
          animFrame = requestAnimationFrame(animate);
        };
        animate();
      };
      document.head.appendChild(script);
    };

    loadCobe();

    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
      if (globe) globe.destroy();
    };
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.9 }}>
      <canvas ref={canvasRef} style={{ maxWidth: "100%", maxHeight: "100%" }} />
    </div>
  );
}

// ─── COUNTER ───
function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null), started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started.current) { started.current = true; const s = Date.now(); const tick = () => { const p = Math.min((Date.now() - s) / duration, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end)); if (p < 1) requestAnimationFrame(tick); }; tick(); } }, { threshold: 0.3 });
    obs.observe(el); return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── SCROLL ANIMATE ───
function Anim({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => el.classList.add("v"), delay); }, { threshold: 0.1 }); obs.observe(el); return () => obs.disconnect(); }, [delay]);
  return <div ref={ref} className={`aos ${className}`}>{children}</div>;
}

// ─── MAIN ───
export default function App() {
  const [loading, setLoading] = useState(true);
  const [lp, setLp] = useState(0);
  const [mm, setMm] = useState(false);
  const [ab, setAb] = useState(0);
  const [fd, setFd] = useState({ name: "", email: "", phone: "", msg: "" });

  useEffect(() => { let p = 0; const iv = setInterval(() => { p += Math.random() * 15 + 5; if (p >= 100) { setLp(100); setTimeout(() => setLoading(false), 600); clearInterval(iv); } else setLp(p); }, 200); return () => clearInterval(iv); }, []);

  const go = (id) => { setMm(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const NAV = [{ l: "About", id: "about" }, { l: "Products", id: "products" }, { l: "Services", id: "services" }, { l: "Certifications", id: "certs" }, { l: "Contact", id: "contact" }];
  const hov = (e, c) => (e.target.style.color = c);

  return (
    <>
      <style>{styles}</style>

      {/* LOADER */}
      <div className={`ls ${!loading ? "h" : ""}`}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: COLORS.accent, letterSpacing: 2 }}>SRINIVASA</div>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 11, letterSpacing: 5, color: COLORS.textMuted, marginTop: 8, textTransform: "uppercase" }}>Enterprises</div>
        <div className="lb"><div className="lf" style={{ width: `${lp}%` }} /></div>
      </div>

      <a className="swb" href="https://wa.me/917330970931" target="_blank" rel="noopener noreferrer">💬</a>
      <a className="scb" href="tel:+917330970931">📞</a>

      {/* NAV */}
      <nav className="ng" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg,${COLORS.accent},${COLORS.accentLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: COLORS.bg, fontSize: 16, fontFamily: "'Syne',sans-serif" }}>S</div>
            <div><div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 17, color: COLORS.text, lineHeight: 1.1 }}>Srinivasa</div><div style={{ fontSize: 9, letterSpacing: 3, color: COLORS.textMuted, textTransform: "uppercase", fontFamily: "'Syne',sans-serif" }}>Enterprises</div></div>
          </div>
          <div className="dn" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {NAV.map((n) => <button key={n.id} onClick={() => go(n.id)} style={{ background: "none", border: "none", color: COLORS.textMuted, cursor: "pointer", fontSize: 14, fontFamily: "'DM Sans',sans-serif", fontWeight: 500, transition: "color 0.3s" }} onMouseEnter={(e) => hov(e, COLORS.accent)} onMouseLeave={(e) => hov(e, COLORS.textMuted)}>{n.l}</button>)}
            <button className="btn1" style={{ padding: "10px 24px", fontSize: 13 }} onClick={() => go("contact")}>Get a Quote</button>
          </div>
          <button className="mb" onClick={() => setMm(!mm)} style={{ background: "none", border: "none", color: COLORS.text, fontSize: 24, cursor: "pointer", display: "none", alignItems: "center" }}>{mm ? "✕" : "☰"}</button>
        </div>
      </nav>

      {mm && <div className="mo" style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(10,10,10,0.97)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
        {NAV.map((n) => <button key={n.id} onClick={() => go(n.id)} style={{ background: "none", border: "none", color: COLORS.text, fontSize: 22, fontFamily: "'Playfair Display',serif", cursor: "pointer" }}>{n.l}</button>)}
        <button className="btn1" onClick={() => go("contact")}>Get a Quote</button>
      </div>}

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: COLORS.bg }}>
        <CobeGlobe />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, transparent 15%, rgba(10,10,10,0.35) 55%, rgba(10,10,10,0.8) 100%)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px", maxWidth: 900 }}>
          <div style={{ animation: "fadeIn 1s ease 0.3s both" }}><div className="tag" style={{ marginBottom: 20 }}>🌍 India's Premier Agricultural Export House</div></div>
          <h1 className="fd" style={{ fontSize: "clamp(36px,7vw,72px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 20, animation: "fadeInUp 1s ease 0.5s both", background: `linear-gradient(135deg,${COLORS.text} 0%,${COLORS.accent} 50%,${COLORS.text} 100%)`, backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animationName: "fadeInUp, shimmer", animationDuration: "1s, 4s", animationDelay: "0.5s, 1.5s", animationIterationCount: "1, infinite", animationFillMode: "both, none" }}>
            Global Trade.<br />Trusted Quality.<br />Delivered Worldwide.
          </h1>
          <p style={{ fontSize: "clamp(16px,2.5vw,20px)", color: COLORS.textMuted, lineHeight: 1.7, maxWidth: 600, margin: "0 auto 36px", animation: "fadeInUp 1s ease 0.7s both" }}>Premium agricultural exports from India to 50+ countries. Quality certified, globally trusted, always delivered on time.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animation: "fadeInUp 1s ease 0.9s both" }}>
            <button className="btn1" onClick={() => go("contact")}>Get a Quote →</button>
            <a className="btn2" href="https://wa.me/917330970931" target="_blank" rel="noopener noreferrer">💬 Chat on WhatsApp</a>
          </div>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 60, flexWrap: "wrap", animation: "fadeInUp 1s ease 1.1s both" }}>
            {[{ i: "🌍", l: "50+ Countries" }, { i: "✅", l: "Certified Exporter" }, { i: "🚀", l: "Fast Logistics" }].map((s, idx) => (
              <div key={idx} className="gc" style={{ padding: "14px 24px", display: "flex", alignItems: "center", gap: 10, animation: `float 3s ease-in-out ${idx * 0.3}s infinite` }}>
                <span style={{ fontSize: 20 }}>{s.i}</span><span style={{ fontSize: 13, fontWeight: 600, letterSpacing: 0.5 }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", zIndex: 2, animation: "float 2s ease-in-out infinite" }}>
          <div style={{ width: 24, height: 40, border: `2px solid ${COLORS.accent}`, borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 8 }}><div style={{ width: 3, height: 8, background: COLORS.accent, borderRadius: 2, animation: "pulse 1.5s infinite" }} /></div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" style={{ padding: "120px 0", background: COLORS.bg }}>
        <div className="sw">
          <Anim><div className="tag" style={{ marginBottom: 16 }}>About Us</div><div className="al" style={{ marginBottom: 24 }} /></Anim>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 48, alignItems: "center" }}>
            <Anim delay={100}>
              <h2 className="st" style={{ marginBottom: 20 }}>Bridging Indian Farms to<br /><span style={{ color: COLORS.accent }}>Global Tables</span></h2>
              <p style={{ color: COLORS.textMuted, lineHeight: 1.7, fontSize: "clamp(15px,2vw,18px)", maxWidth: 600, marginBottom: 24 }}>Srinivasa Enterprises is a leading agricultural import-export company based in Hyderabad, India. We specialize in sourcing, quality-checking, and delivering premium produce to buyers across 50+ countries.</p>
              <p style={{ color: COLORS.textMuted, lineHeight: 1.8, fontSize: 15 }}>From the fertile fields of India to ports worldwide, our integrated supply chain ensures freshness, compliance, and competitive pricing.</p>
            </Anim>
            <Anim delay={300}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {STATS.map((s, i) => (
                  <div key={i} className="gc" style={{ padding: 28, textAlign: "center", transition: "all 0.4s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(200,165,92,0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.glassBorder; e.currentTarget.style.transform = "translateY(0)"; }}>
                    <div className="fd" style={{ fontSize: 36, fontWeight: 800, color: COLORS.accent, lineHeight: 1 }}><Counter end={s.value} suffix={s.suffix} /></div>
                    <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 6, fontWeight: 500 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </Anim>
          </div>
        </div>
      </section>

      {/* ══ PRODUCTS ══ */}
      <section id="products" style={{ padding: "120px 0", background: COLORS.bgLight }}>
        <div className="sw">
          <Anim><div style={{ textAlign: "center", marginBottom: 64 }}><div className="tag" style={{ marginBottom: 16 }}>Our Products</div><div className="al" style={{ margin: "0 auto 24px" }} /><h2 className="st">Premium Export-Grade<br /><span style={{ color: COLORS.accent }}>Agricultural Products</span></h2></div></Anim>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 24 }}>
            {PRODUCTS.map((p, i) => <Anim key={i} delay={i * 60}><div className="pc"><div style={{ fontSize: 48, marginBottom: 16 }}>{p.emoji}</div><h3 className="fh" style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{p.name}</h3><p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.7, marginBottom: 12 }}>{p.desc}</p><span style={{ fontSize: 11, color: COLORS.accent, fontWeight: 600 }}>📍 {p.origin}</span></div></Anim>)}
          </div>
        </div>
      </section>

      {/* ══ BROCHURE ══ */}
      <section style={{ padding: "120px 0", background: COLORS.bg }}>
        <div className="sw">
          <Anim><div style={{ textAlign: "center", marginBottom: 64 }}><div className="tag" style={{ marginBottom: 16 }}>Interactive Brochure</div><div className="al" style={{ margin: "0 auto 24px" }} /><h2 className="st">Explore Our<br /><span style={{ color: COLORS.accent }}>Company Brochure</span></h2></div></Anim>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            {BROCHURE.map((s, i) => <Anim key={i} delay={i * 100}><div className="bi" style={{ marginBottom: 16 }} onClick={() => setAb(ab === i ? -1 : i)}>
              <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 17 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ width: 32, height: 32, borderRadius: "50%", background: ab === i ? COLORS.accent : "rgba(200,165,92,0.1)", color: ab === i ? COLORS.bg : COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, transition: "all 0.3s" }}>{String(i + 1).padStart(2, "0")}</span><span style={{ color: ab === i ? COLORS.accent : COLORS.text }}>{s.title}</span></span>
                <span style={{ transform: ab === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s", color: COLORS.accent }}>▾</span>
              </div>
              {ab === i && <div style={{ padding: "0 24px 20px", color: COLORS.textMuted, lineHeight: 1.8, fontSize: 15, animation: "fadeInUp 0.4s ease" }}>{s.content}</div>}
            </div></Anim>)}
            <Anim delay={400}><div style={{ textAlign: "center", marginTop: 32 }}><button className="btn2">📄 Download Full Brochure (PDF)</button></div></Anim>
          </div>
        </div>
      </section>

      {/* ══ CERTS ══ */}
      <section id="certs" style={{ padding: "120px 0", background: COLORS.bgLight }}>
        <div className="sw">
          <Anim><div style={{ textAlign: "center", marginBottom: 64 }}><div className="tag" style={{ marginBottom: 16 }}>Trust & Compliance</div><div className="al" style={{ margin: "0 auto 24px" }} /><h2 className="st">Certified.<br /><span style={{ color: COLORS.accent }}>Compliant. Trusted.</span></h2></div></Anim>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24 }}>
            {CERTIFICATIONS.map((c, i) => <Anim key={i} delay={i * 120}><div className="cc"><div className="cb">{c.name}</div><h3 className="fh" style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{c.full}</h3><p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.7 }}>{c.desc}</p></div></Anim>)}
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section id="services" style={{ padding: "120px 0", background: COLORS.bg }}>
        <div className="sw">
          <Anim><div style={{ textAlign: "center", marginBottom: 64 }}><div className="tag" style={{ marginBottom: 16 }}>What We Do</div><div className="al" style={{ margin: "0 auto 24px" }} /><h2 className="st">End-to-End<br /><span style={{ color: COLORS.accent }}>Trade Solutions</span></h2></div></Anim>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
            {SERVICES.map((s, i) => <Anim key={i} delay={i * 100}><div className="gc" style={{ padding: 32, transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)", cursor: "default" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = "rgba(200,165,92,0.35)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = COLORS.glassBorder; }}><div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div><h3 className="fh" style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3><p style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.7 }}>{s.desc}</p></div></Anim>)}
          </div>
        </div>
      </section>

      {/* ══ WHY US ══ */}
      <section style={{ padding: "120px 0", background: COLORS.bgLight }}>
        <div className="sw">
          <Anim><div style={{ textAlign: "center", marginBottom: 64 }}><div className="tag" style={{ marginBottom: 16 }}>Why Us</div><div className="al" style={{ margin: "0 auto 24px" }} /><h2 className="st">Why Global Buyers<br /><span style={{ color: COLORS.accent }}>Choose Srinivasa</span></h2></div></Anim>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24 }}>
            {WHY_US.map((w, i) => <Anim key={i} delay={i * 100}><div style={{ textAlign: "center", padding: 32 }}><div style={{ fontSize: 40, marginBottom: 16, animation: `float 3s ease-in-out ${i * 0.5}s infinite` }}>{w.icon}</div><h3 className="fh" style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{w.title}</h3><p style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.7 }}>{w.desc}</p></div></Anim>)}
          </div>
        </div>
      </section>

      {/* ══ EXPORT DESTINATIONS ══ */}
      <section style={{ padding: "120px 0", background: COLORS.bg, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, background: "repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(200,165,92,0.3) 40px,rgba(200,165,92,0.3) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(200,165,92,0.3) 40px,rgba(200,165,92,0.3) 41px)" }} />
        <div className="sw" style={{ position: "relative" }}>
          <Anim><div style={{ textAlign: "center", marginBottom: 48 }}><div className="tag" style={{ marginBottom: 16 }}>Global Reach</div><div className="al" style={{ margin: "0 auto 24px" }} /><h2 className="st">Exporting to<br /><span style={{ color: COLORS.accent }}>50+ Countries</span></h2></div></Anim>
          <Anim delay={200}><div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", maxWidth: 800, margin: "0 auto" }}>
            {["🇦🇪 UAE","🇸🇦 Saudi Arabia","🇶🇦 Qatar","🇴🇲 Oman","🇰🇼 Kuwait","🇧🇭 Bahrain","🇬🇧 UK","🇩🇪 Germany","🇫🇷 France","🇳🇱 Netherlands","🇺🇸 USA","🇨🇦 Canada","🇸🇬 Singapore","🇲🇾 Malaysia","🇯🇵 Japan","🇰🇷 South Korea","🇦🇺 Australia","🇳🇿 New Zealand","🇿🇦 South Africa","🇰🇪 Kenya","🇳🇬 Nigeria","🇱🇰 Sri Lanka","🇧🇩 Bangladesh","🇳🇵 Nepal"].map((c, i) => (
              <div key={i} className="gc" style={{ padding: "10px 18px", fontSize: 13, fontWeight: 500, animation: `fadeIn 0.5s ease ${i * 0.05}s both`, cursor: "default", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(200,165,92,0.4)"; e.currentTarget.style.background = "rgba(200,165,92,0.08)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.glassBorder; e.currentTarget.style.background = COLORS.glass; }}>{c}</div>
            ))}
          </div></Anim>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{ padding: "120px 0", background: COLORS.bgLight }}>
        <div className="sw">
          <Anim><div style={{ textAlign: "center", marginBottom: 64 }}><div className="tag" style={{ marginBottom: 16 }}>Get In Touch</div><div className="al" style={{ margin: "0 auto 24px" }} /><h2 className="st">Ready to<br /><span style={{ color: COLORS.accent }}>Start Trading?</span></h2></div></Anim>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 48, maxWidth: 900, margin: "0 auto" }}>
            <Anim delay={100}><div className="gc" style={{ padding: 36 }}>
              <h3 className="fh" style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, color: COLORS.accent }}>Quick Inquiry</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <input className="fi" placeholder="Your Name" value={fd.name} onChange={(e) => setFd({ ...fd, name: e.target.value })} />
                <input className="fi" placeholder="Email Address" value={fd.email} onChange={(e) => setFd({ ...fd, email: e.target.value })} />
                <input className="fi" placeholder="Phone Number" value={fd.phone} onChange={(e) => setFd({ ...fd, phone: e.target.value })} />
                <textarea className="fi" placeholder="Products, quantity, destination..." value={fd.msg} onChange={(e) => setFd({ ...fd, msg: e.target.value })} />
                <button className="btn1" style={{ width: "100%", justifyContent: "center" }}>Submit Inquiry →</button>
              </div>
            </div></Anim>
            <Anim delay={200}><div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div className="gc" style={{ padding: 28 }}><div style={{ fontSize: 11, letterSpacing: 2, color: COLORS.accent, textTransform: "uppercase", fontWeight: 700, marginBottom: 12, fontFamily: "'Syne',sans-serif" }}>Call Us</div><a href="tel:+917330970931" style={{ color: COLORS.text, textDecoration: "none", fontSize: 20, fontWeight: 600, display: "block", marginBottom: 6, fontFamily: "'Playfair Display',serif" }}>+91 7330 970 931</a><a href="tel:+919290541470" style={{ color: COLORS.textMuted, textDecoration: "none", fontSize: 17, fontFamily: "'Playfair Display',serif" }}>+91 9290 541 470</a></div>
              <div className="gc" style={{ padding: 28 }}><div style={{ fontSize: 11, letterSpacing: 2, color: COLORS.accent, textTransform: "uppercase", fontWeight: 700, marginBottom: 12, fontFamily: "'Syne',sans-serif" }}>WhatsApp</div><a href="https://wa.me/917330970931" target="_blank" rel="noopener noreferrer" className="btn2" style={{ width: "100%", justifyContent: "center" }}>💬 Chat Now on WhatsApp</a></div>
              <div className="gc" style={{ padding: 28 }}><div style={{ fontSize: 11, letterSpacing: 2, color: COLORS.accent, textTransform: "uppercase", fontWeight: 700, marginBottom: 12, fontFamily: "'Syne',sans-serif" }}>Location</div><p style={{ color: COLORS.textMuted, fontSize: 15, lineHeight: 1.7 }}>Srinivasa Enterprises<br />Hyderabad, Telangana, India</p></div>
            </div></Anim>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ padding: "60px 0 32px", background: COLORS.bg, borderTop: "1px solid rgba(200,165,92,0.08)" }}>
        <div className="sw">
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "start", gap: 40, marginBottom: 48 }}>
            <div style={{ maxWidth: 300 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg,${COLORS.accent},${COLORS.accentLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: COLORS.bg, fontSize: 15, fontFamily: "'Syne',sans-serif" }}>S</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 16 }}>Srinivasa Enterprises</div>
              </div>
              <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.8 }}>Premium agricultural import-export from India to the world.</p>
            </div>
            <div><div style={{ fontSize: 11, letterSpacing: 2, color: COLORS.accent, textTransform: "uppercase", fontWeight: 700, marginBottom: 16, fontFamily: "'Syne',sans-serif" }}>Quick Links</div><div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{NAV.map((n) => <button key={n.id} onClick={() => go(n.id)} style={{ background: "none", border: "none", color: COLORS.textMuted, cursor: "pointer", fontSize: 14, textAlign: "left", fontFamily: "'DM Sans',sans-serif" }} onMouseEnter={(e) => hov(e, COLORS.accent)} onMouseLeave={(e) => hov(e, COLORS.textMuted)}>{n.l}</button>)}</div></div>
            <div><div style={{ fontSize: 11, letterSpacing: 2, color: COLORS.accent, textTransform: "uppercase", fontWeight: 700, marginBottom: 16, fontFamily: "'Syne',sans-serif" }}>Contact</div><p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 2 }}>+91 7330 970 931<br />+91 9290 541 470<br />Hyderabad, India</p></div>
          </div>
          <div style={{ borderTop: "1px solid rgba(200,165,92,0.08)", paddingTop: 24, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
            <p style={{ fontSize: 12, color: COLORS.textMuted }}>© 2026 Srinivasa Enterprises. All rights reserved.</p>
            <div style={{ display: "flex", gap: 20 }}>{["Privacy Policy","Disclaimer"].map((t) => <span key={t} style={{ fontSize: 12, color: COLORS.textMuted, cursor: "pointer", transition: "color 0.3s" }} onMouseEnter={(e) => hov(e, COLORS.accent)} onMouseLeave={(e) => hov(e, COLORS.textMuted)}>{t}</span>)}</div>
          </div>
        </div>
      </footer>
    </>
  );
}
