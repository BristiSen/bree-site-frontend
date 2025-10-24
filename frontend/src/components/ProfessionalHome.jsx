// src/components/ProfessionalHome.jsx
import React, { useState } from "react";

const LINKEDIN = import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com";
const PRO_MESSAGES_API = import.meta.env.VITE_PRO_MESSAGES_URL || "";

export default function ProfessionalHome() {
  const [uploadName, setUploadName] = useState("");
  const [uploadPreviewUrl, setUploadPreviewUrl] = useState(null);
  const [msgName, setMsgName] = useState("");
  const [msgEmail, setMsgEmail] = useState("");
  const [msgMessage, setMsgMessage] = useState("");
  const [sending, setSending] = useState(false);

  function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploadName(f.name);
    const url = URL.createObjectURL(f);
    setUploadPreviewUrl(url);
    // NOTE: you might later POST the file to a backend or Apps Script endpoint
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (!msgName || !msgEmail || !msgMessage) {
      alert("Please fill all fields.");
      return;
    }
    if (!PRO_MESSAGES_API) {
      alert("Messages endpoint not configured yet. Add VITE_PRO_MESSAGES_URL when ready.");
      return;
    }
    try {
      setSending(true);
      const res = await fetch(PRO_MESSAGES_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: msgName, email: msgEmail, message: msgMessage }),
      });
      const data = await res.json();
      if (data?.status === "success" || data?.success) {
        alert("Message sent — thank you!");
        setMsgName(""); setMsgEmail(""); setMsgMessage("");
      } else {
        alert("Couldn't send message. Check logs or endpoint.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while sending message.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#071029] to-[#0a2540] text-white p-8 rounded-2xl shadow-2xl">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">
        {/* Left / Intro */}
        <section className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-2xl font-semibold text-[#04202f]">BS</div>
            <div>
              <h1 className="text-3xl font-bold">Bristi Sen</h1>
              <p className="text-sm text-gray-300">Engineering student • Writer • Researcher</p>
            </div>
          </div>

          <p className="text-gray-200">
            Hello — I’m Bristi. I craft software, write fiction, and love building polished products that people want to use. Welcome to my professional space.
          </p>

          <div className="flex space-x-3">
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-yellow-400 bg-yellow-500 text-[#071029] rounded-lg shadow hover:scale-[1.01] transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="inline-block"><path d="M4.98 3.5a2.12 2.12 0 110 4.24 2.12 2.12 0 010-4.24zM3.5 9h3v11h-3zM10.5 9h2.9v1.5h.04c.4-.76 1.37-1.56 2.82-1.56 3.02 0 3.58 1.99 3.58 4.58V20h-3v-5.1c0-1.21-.02-2.77-1.69-2.77-1.69 0-1.95 1.32-1.95 2.68V20h-3z" fill="#071029"/></svg>
              LinkedIn
            </a>

            <button className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5" onClick={() => window.scrollTo({ top: 400, behavior: "smooth" })}>Contact</button>
          </div>
        </section>

        {/* Right / CV & Contact */}
        <aside className="bg-[#071827] p-6 rounded-xl shadow-inner space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-yellow-300">Resume / CV</h3>
            <p className="text-sm text-gray-300">Upload a CV to preview here (private). When you're ready we can wire upload to a secure storage or Apps Script.</p>
            <div className="mt-3 flex items-center gap-3">
              <input id="cvUpload" type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" />
              <label htmlFor="cvUpload" className="cursor-pointer px-4 py-2 bg-yellow-500 text-[#071029] rounded-lg">Choose file</label>
              <div className="text-sm text-gray-300">{uploadName || "No file chosen"}</div>
            </div>

            {uploadPreviewUrl && (
              <div className="mt-4 border border-white/5 rounded p-2 bg-black/40">
                <p className="text-xs text-gray-300">Preview (client-side):</p>
                <a href={uploadPreviewUrl} target="_blank" rel="noreferrer" className="text-yellow-300 underline text-sm">Open uploaded file</a>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-yellow-300">Professional messages</h3>
            <p className="text-sm text-gray-300 mb-3">If someone wants to reach out professionally — they can message you here.</p>

            <form onSubmit={sendMessage} className="space-y-3">
              <input className="w-full p-3 rounded bg-white/5" placeholder="Your name" value={msgName} onChange={(e) => setMsgName(e.target.value)} />
              <input className="w-full p-3 rounded bg-white/5" placeholder="Your email" value={msgEmail} onChange={(e) => setMsgEmail(e.target.value)} />
              <textarea className="w-full p-3 rounded bg-white/5" placeholder="Message" rows="4" value={msgMessage} onChange={(e) => setMsgMessage(e.target.value)} />
              <div className="flex justify-end">
                <button type="submit" disabled={sending} className="px-4 py-2 bg-yellow-500 text-[#071029] rounded-lg">
                  {sending ? "Sending…" : "Send message"}
                </button>
              </div>
            </form>
          </div>

          <div className="text-xs text-gray-400">Note: The messages endpoint URL is configured via <code className="text-yellow-300">VITE_PRO_MESSAGES_URL</code> in your .env (set & redeploy when you have the endpoint).</div>
        </aside>
      </div>
    </main>
  );
}
