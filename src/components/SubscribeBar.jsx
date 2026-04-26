/* SubscribeBar.jsx — universal newsletter bar for all DOT tools */

const LOGGER_URL =
  "https://script.google.com/macros/s/AKfycbxtCPP6q6wqCUYlSEtNdyQxFF_22K94lvgP4MJytXYX-kWqpCYkZnXG7tYV5fSZThYj/exec";

import { useState } from "react";

export default function SubscribeBar({ app = "[toolname]" }) {
  const [email,   setEmail]   = useState("");
  const [status,  setStatus]  = useState("idle"); // idle | sending | done | error

  async function handleSubmit() {
    if (!email.trim()) return;
    setStatus("sending");
    try {
      await fetch(LOGGER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          app,
          ts: new Date().toISOString(),
        }),
        mode: "no-cors",
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const bar = {
    background: "#111110",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: "1.25rem clamp(16px,4vw,2rem)",
    display: "flex", alignItems: "center",
    gap: "12px", flexWrap: "wrap",
  };
  const label = {
    fontSize: 13, fontWeight: 300,
    color: "rgba(255,255,255,0.55)", flexShrink: 0,
  };
  const input = {
    flex: 1, minWidth: 200,
    background: "#1a1a18",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8, padding: "8px 12px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 13, fontWeight: 300,
    color: "#f0ede8", WebkitTextFillColor: "#f0ede8",
    outline: "none",
  };
  const btn = {
    background: "#861442", color: "#fff",
    border: "none", borderRadius: 8,
    padding: "8px 18px 11px",
    fontSize: 13, fontWeight: 500,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    cursor: "pointer", whiteSpace: "nowrap",
  };

  if (status === "done") {
    return (
      <div style={{ ...bar, justifyContent: "center" }}>
        <span style={{ ...label, color: "#4caf8a" }}>
          ✓ You're on the list — talk soon.
        </span>
      </div>
    );
  }

  return (
    <div style={bar} className="no-print">
      <span style={label}>Get the Let's Make Some Noise newsletter →</span>
      <input
        style={input}
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSubmit()}
      />
      <button style={btn} onClick={handleSubmit} disabled={status === "sending"}>
        {status === "sending" ? "…" : "Subscribe"}
      </button>
      {status === "error" && (
        <span style={{ fontSize: 12, color: "#c0705a", width: "100%" }}>
          Something went wrong — please try again.
        </span>
      )}
    </div>
  );
}
