import { useState } from "react";
import SubscribeBar from "./components/SubscribeBar";

/* ─── Palette / tokens ────────────────────────────────────────────── */
const C = {
  bg:        "#1a1a18",
  surface:   "#242422",
  surface2:  "#2e2e2b",
  bar:       "#111110",
  text:      "#f0ede8",
  muted:     "#c8c4bc",
  dim:       "#5a5a56",
  border:    "rgba(255,255,255,0.08)",
  border2:   "rgba(255,255,255,0.14)",
  accent:    "#861442",
  accent2:   "#be3650",
  radius:    "10px",
};

/* ─── Google Sheet logger URL ─────────────────────────────────────── */
const LOGGER_URL =
  "https://script.google.com/macros/s/AKfycbxtCPP6q6wqCUYlSEtNdyQxFF_22K94lvgP4MJytXYX-kWqpCYkZnXG7tYV5fSZThYj/exec";

/* ─── Inline styles ───────────────────────────────────────────────── */
const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${C.bg}; color: ${C.text};
         font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 300; }

  .dot-inner { max-width: 860px; margin: 0 auto; width: 100%; }

  /* ── Top Bar ── */
  .dot-topbar {
    background: ${C.bar};
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 7px clamp(16px,4vw,2rem);
    display: flex; align-items: center; gap: 10px;
  }
  .dot-topbar-label {
    font-size: 12px; font-weight: 400; letter-spacing: 0.08em;
    text-transform: uppercase; color: rgba(255,255,255,0.35);
  }

  /* ── Hero ── */
  .dot-hero {
    background: ${C.bar};
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 2.25rem clamp(16px,4vw,2rem) 2rem;
  }
  .dot-hero-inner {
    display: flex; align-items: center; gap: 1.5rem;
  }
  .dot-hero-text h1 {
    font-family: 'Fraunces', Georgia, serif;
    font-size: clamp(36px,6vw,52px); line-height: 1.1; color: #fff;
  }
  .dot-hero-text h1 strong { font-weight: 700; color: #fff; }
  .dot-hero-text h1 em     { font-style: italic; font-weight: 300; color: ${C.accent2}; }
  .dot-hero-desc {
    margin-top: 0.6rem; font-size: 14px; font-weight: 300;
    color: rgba(255,255,255,0.6); line-height: 1.7;
  }

  /* ── Input Zone ── */
  .dot-input-zone {
    background: ${C.bar};
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 2rem clamp(16px,4vw,2rem);
  }
  .dot-input-card {
    background: ${C.bg};
    border: 1.5px solid rgba(134,20,66,0.5);
    border-radius: ${C.radius};
    padding: 1.5rem;
  }
  .dot-input-row {
    display: flex; gap: 10px; align-items: flex-end; flex-wrap: wrap;
  }
  @media (max-width:600px) { .dot-input-row { flex-direction: column; } }

  .dot-label {
    font-size: 11px; font-weight: 500; letter-spacing: 0.14em;
    text-transform: uppercase; color: ${C.accent2}; margin-bottom: 6px;
  }
  .dot-input {
    width: 100%; background: ${C.bar};
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 8px; padding: 10px 14px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px; font-weight: 300;
    color: ${C.text}; -webkit-text-fill-color: ${C.text};
    outline: none; transition: border 0.2s;
  }
  .dot-input::placeholder { color: ${C.dim}; }
  .dot-input:focus { border-color: ${C.accent}; }

  .btn-primary {
    background: ${C.accent}; color: #fff;
    border: none; border-radius: ${C.radius};
    padding: 10px 22px 13px; font-size: 14px; font-weight: 500;
    font-family: 'Plus Jakarta Sans', sans-serif;
    cursor: pointer; white-space: nowrap; transition: opacity 0.2s;
  }
  .btn-primary:hover { opacity: 0.88; }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  .btn-ghost {
    background: transparent;
    border: 1px solid ${C.border2};
    border-radius: ${C.radius};
    padding: 9px 18px 12px; font-size: 13px; font-weight: 400;
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: ${C.text}; cursor: pointer; transition: color 0.2s, border-color 0.2s;
  }
  .btn-ghost:hover { color: ${C.accent2}; border-color: ${C.accent2}; }

  /* ── Report Zone ── */
  .dot-report-zone {
    background: ${C.bg};
    padding: 2rem clamp(16px,4vw,2rem);
  }
  .dot-card {
    background: ${C.surface};
    border: 1px solid ${C.border};
    border-radius: ${C.radius};
    padding: 1.5rem; margin-bottom: 1rem;
  }
  .dot-card-label {
    font-size: 11px; font-weight: 500; letter-spacing: 0.14em;
    text-transform: uppercase; color: ${C.accent2}; margin-bottom: 10px;
  }
  .dot-card-body {
    font-size: 14px; font-weight: 300; line-height: 1.8; color: ${C.text};
  }
  .dot-divider {
    height: 1px; background: rgba(255,255,255,0.07); margin: 20px 0;
  }

  /* ── Loading dots ── */
  .dot-loading { display: flex; gap: 6px; align-items: center; padding: 1rem 0; }
  .dot-loading span {
    width: 7px; height: 7px; border-radius: 50%;
    background: ${C.accent};
    animation: dot-pulse 1.2s ease-in-out infinite;
  }
  .dot-loading span:nth-child(2) { animation-delay: 0.2s; }
  .dot-loading span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes dot-pulse {
    0%,100% { opacity:.25; transform:scale(1); }
    50%      { opacity:1;   transform:scale(1.5); }
  }

  /* ── Fade-up animation ── */
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(12px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .dot-anim { animation: fadeUp 0.5s ease both; }

  /* ── Footer rule ── */
  .dot-footer-rule {
    width: 100%; height: 1.5px;
    background: rgba(134,20,66,0.5);
  }

  /* ── Footer ── */
  .dot-footer {
    background: ${C.bar};
    padding: 1.25rem clamp(16px,4vw,2rem);
    font-size: 11px; font-weight: 400;
    color: rgba(255,255,255,0.25); text-align: center;
  }
  .dot-footer a {
    color: rgba(255,255,255,0.3); text-decoration: none;
    transition: color 0.2s;
  }
  .dot-footer a:hover { color: ${C.accent2}; }

  /* ── Modal overlay ── */
  .dot-modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.72);
    display: flex; align-items: center; justify-content: center;
    z-index: 999; padding: 1rem;
  }
  .dot-modal {
    background: ${C.surface};
    border: 1px solid ${C.border2};
    border-radius: 14px;
    padding: 2rem; max-width: 420px; width: 100%;
  }
  .dot-modal h2 {
    font-family: 'Fraunces', Georgia, serif;
    font-size: 22px; font-weight: 300; color: #fff; margin-bottom: 0.5rem;
  }
  .dot-modal p {
    font-size: 14px; font-weight: 300;
    color: rgba(255,255,255,0.6); line-height: 1.7; margin-bottom: 1.25rem;
  }
  .dot-modal-disclaimer {
    font-size: 11px; color: ${C.dim};
    margin-top: 0.75rem; line-height: 1.5;
  }
  .dot-modal-close {
    margin-top: 0.75rem; background: none; border: none;
    color: ${C.dim}; font-size: 12px; cursor: pointer;
    text-decoration: underline; display: block; margin-left: auto;
  }
  .dot-modal-close:hover { color: ${C.muted}; }

  /* ── Error msg ── */
  .dot-error {
    font-size: 13px; color: #c0705a;
    margin-top: 8px;
  }

  /* ── Hidden h1 for SEO ── */
  .dot-seo-h1 {
    position: absolute; width: 1px; height: 1px;
    padding: 0; margin: -1px; overflow: hidden;
    clip: rect(0,0,0,0); white-space: nowrap; border: 0;
  }

  @media print { .no-print { display: none !important; } }
`;

/* ─── DOT Logo SVG (dark) ─────────────────────────────────────────── */
function DotLogo() {
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
      <rect x="0"  y="0"  width="24" height="24" fill="#861442"/>
      <rect x="30" y="0"  width="24" height="24" fill="#ffffff" opacity="0.6"/>
      <rect x="0"  y="30" width="24" height="24" fill="#ffffff" opacity="0.25"/>
      <rect x="30" y="30" width="24" height="24" fill="#861442" opacity="0.25"/>
    </svg>
  );
}

/* ─── Email Modal ─────────────────────────────────────────────────── */
function EmailModal({ onSuccess, onClose }) {
  const [email, setEmail]     = useState("");
  const [name, setName]       = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  async function handleSubmit() {
    if (!email.trim()) { setError("Email is required."); return; }
    setLoading(true); setError("");
    try {
      await fetch(LOGGER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name:  name.trim(),
          app:   "[toolname]",        // ← update per tool
          ts:    new Date().toISOString(),
        }),
        mode: "no-cors",
      });
      onSuccess(email.trim());
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="dot-modal-overlay" onClick={onClose}>
      <div className="dot-modal" onClick={e => e.stopPropagation()}>
        <h2>[Gate headline]</h2>
        <p>[One sentence about what they're unlocking and why it's worth it.]</p>

        <div style={{ marginBottom: "10px" }}>
          <div className="dot-label">Your name</div>
          <input
            className="dot-input"
            placeholder="First name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <div className="dot-label">Email address</div>
          <input
            className="dot-input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
          />
        </div>

        {error && <div className="dot-error">{error}</div>}

        <button
          className="btn-primary"
          style={{ width: "100%", marginTop: "6px" }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Sending…" : "[CTA — e.g. Get My Results]"}
        </button>

        <div className="dot-modal-disclaimer">
          By submitting, you understand you'll be subscribed to the Let's Make Some Noise
          newsletter. You may unsubscribe any time.
        </div>

        <button className="dot-modal-close" onClick={onClose}>
          No thanks
        </button>
      </div>
    </div>
  );
}

/* ─── Main App ────────────────────────────────────────────────────── */
export default function App() {
  // ── State ──────────────────────────────────────────────────────────
  const [input,       setInput]       = useState("");
  const [loading,     setLoading]     = useState(false);
  const [result,      setResult]      = useState(null);
  const [error,       setError]       = useState("");
  const [showModal,   setShowModal]   = useState(false);
  const [subscribed,  setSubscribed]  = useState(false);

  // ── Handlers ───────────────────────────────────────────────────────
  async function handleRun() {
    if (!input.trim()) { setError("Please enter something first."); return; }
    setError(""); setLoading(true); setResult(null);

    try {
      const res = await fetch("/api/anthropic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model:      "claude-sonnet-4-6",
          max_tokens: 3000,
          system:     "[SYSTEM PROMPT — replace with prompt.js import]",
          messages:   [{ role: "user", content: input.trim() }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") ?? "";

      // TODO: parse `text` into structured result object
      setResult({ raw: text });

      // Show email gate if not yet subscribed
      if (!subscribed) setShowModal(true);

    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubscribed(email) {
    setSubscribed(true);
    setShowModal(false);
    // TODO: unlock gated content
  }

  // ── Render ─────────────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>

      {/* SEO hidden h1 */}
      <h1 className="dot-seo-h1">[Tool Name] — [Short SEO phrase]</h1>

      {/* ── Top Bar ── */}
      <div className="dot-topbar no-print">
        <DotLogo />
        <span className="dot-topbar-label">Data on Tap</span>
      </div>

      {/* ── Hero ── */}
      <div className="dot-hero no-print">
        <div className="dot-inner dot-hero-inner">
          {/* Left: icon + title */}
          <div className="dot-hero-text">
            <h1>
              <strong>[TOOL</strong> <em>Name]</em>
            </h1>
            <div className="dot-hero-desc">
              [One or two sentences describing what this tool does and who it's for.]
            </div>
          </div>
          {/* Right: hero image — swap /[toolname]-hero.png */}
          {/* <img src="/[toolname]-hero.png" alt="[Tool Name]"
               style={{width:160,borderRadius:10,flexShrink:0}} /> */}
        </div>
      </div>

      {/* ── Input Zone ── */}
      <div className="dot-input-zone no-print">
        <div className="dot-inner">
          <div className="dot-input-card">
            <div className="dot-label">[Input label]</div>
            <div className="dot-input-row">
              <input
                className="dot-input"
                style={{ flex: 1 }}
                placeholder="[Placeholder hint for the user…]"
                value={input}
                onChange={e => { setInput(e.target.value); setError(""); }}
                onKeyDown={e => e.key === "Enter" && handleRun()}
              />
              <button
                className="btn-primary"
                onClick={handleRun}
                disabled={loading}
              >
                {loading ? "Running…" : "[Button label]"}
              </button>
            </div>
            {error && <div className="dot-error">{error}</div>}
          </div>
        </div>
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div className="dot-report-zone">
          <div className="dot-inner">
            <div className="dot-loading">
              <span/><span/><span/>
            </div>
          </div>
        </div>
      )}

      {/* ── Report Zone ── */}
      {result && !loading && (
        <div className="dot-report-zone">
          <div className="dot-inner">

            {/* TODO: replace with real structured output cards */}
            <div className="dot-card dot-anim">
              <div className="dot-card-label">Result</div>
              <div className="dot-card-body" style={{ whiteSpace: "pre-wrap" }}>
                {result.raw}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── Subscribe Bar ── */}
      <SubscribeBar />

      {/* ── Footer Rule ── */}
      <div className="dot-footer-rule" />

      {/* ── Footer ── */}
      <div className="dot-footer">
        © {new Date().getFullYear()} [Tool Name] · Data on Tap ·{" "}
        <a href="https://monicapoling.com/data-on-tap" target="_blank" rel="noopener noreferrer">
          monicapoling.com/data-on-tap
        </a>
      </div>

      {/* ── Email Modal ── */}
      {showModal && (
        <EmailModal
          onSuccess={handleSubscribed}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
