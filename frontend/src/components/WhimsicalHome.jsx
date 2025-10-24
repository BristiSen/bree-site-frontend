import React, { useState, useEffect } from "react";
import "./index.css"; 
import "./flip.css"; // ✅ NEW IMPORT — ensures flip styles apply

export default function WhimsicalHome({ onToggleFlip }) {

  // Curtain states
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [showCurtain, setShowCurtain] = useState(true);

  // Comments
  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState("");
  const [commentComment, setCommentComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  // Newsletter
  const [newsletterName, setNewsletterName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // SPARKLES
  const curtainSparkles = Array.from({ length: 50 }, () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 5 + 2}px`,
    duration: `${Math.random() * 2 + 1.5}s`,
  }));


  // Load Comments when toggled on
  useEffect(() => {
    if (!showComments) return;
    const API = import.meta.env.VITE_APP_SCRIPT_COMMENT_URL;
    fetch(API)
      .then(res => res.json())
      .then(data => {
        if (data?.status === "success") setComments(data.comments.reverse());
      })
      .catch(console.error);
  }, [showComments]);


  const handleCurtainClick = () => {
    setCurtainOpen(true);
    setTimeout(() => setShowCurtain(false), 2600);
  };


  const submitComment = async (e) => {
    e.preventDefault();
    if (!commentName.trim() || !commentComment.trim()) {
      alert("Write something yaar! 😅");
      return;
    }

    const API = import.meta.env.VITE_APP_SCRIPT_COMMENT_URL;
    const res = await fetch(API, {
      method: "POST",
      body: JSON.stringify({
        name: commentName,
        comment: commentComment,
      }),
    }).then(r => r.json());

    if (res?.status === "success") {
      alert("Comment dropped like ✨");
      setCommentName("");
      setCommentComment("");
      setComments(prev => [{ name: commentName, comment: commentComment }, ...prev]);
    }
  };


  const submitNewsletter = async (e) => {
    e.preventDefault();
    if (!newsletterName.trim() || !email.trim()) return;

    const API = import.meta.env.VITE_APP_SCRIPT_NEWSLETTER_URL;
    const res = await fetch(API, {
      method: "POST",
      body: JSON.stringify({ name: newsletterName, email, topic }),
    }).then(r => r.json());

    if (res?.status === "success") {
      setNewsletterSubmitted(true);
      setNewsletterName("");
      setEmail("");
      setTopic("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-pink-100 to-pink-50 text-purple-900 font-sans relative">

      {/* 🔄 Flip Button to Professional Side */}
      <button className="flip-toggle-btn" onClick={onToggleFlip}>
        On the Flip Side ✨
      </button>

      {/* 🎭 Curtain */}
      {showCurtain && (
        <div className={`curtain-wrapper ${curtainOpen ? "open" : ""}`} onClick={handleCurtainClick}>
          <div className="curtain-panel curtain-left" />
          <div className="curtain-panel curtain-right" />
          {curtainSparkles.map((s, i) => (
            <div key={i} className="curtain-sparkle" style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDuration: s.duration }} />
          ))}
          <div className="curtain-text text-white text-2xl md:text-3xl font-bold select-none">
            Tap to enter the glitter realm ✨
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="flex flex-col items-center justify-center py-12 space-y-4">
        <img src="/profile-placeholder.jpg" alt="Bree" className="w-32 h-32 rounded-full border-4 border-purple-300 shadow-lg" />
        <h1 className="text-4xl font-bold tracking-wide">Hi, this is Bree!</h1>
        <p className="text-purple-700 text-lg text-center max-w-md">
          Welcome to the glitter-gel-pen internet dimension 💅✨
        </p>
      </header>

      {/* PODCAST */}
      <section className="px-8 py-12 bg-white rounded-3xl shadow-xl max-w-5xl mx-auto my-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-pink-400">🎙️ In case you wanna hear me yap</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-pink-50 rounded-2xl shadow-md hover:shadow-lg">
            <h3 className="text-xl font-bold mb-2">Wing It 🎧</h3>
            <p className="text-purple-800 mb-4">Episode 0: wing it, we're soaring ✨</p>
            <a href="#" className="px-4 py-2 bg-pink-300 rounded-lg text-white block text-center">Listen Now</a>
          </div>
          <div className="p-6 bg-pink-50 rounded-2xl shadow-md hover:shadow-lg">
            <h3 className="text-xl font-bold mb-2">Storyteller 🎧</h3>
            <p className="text-purple-800 mb-4">For dry eyes & chaotic attention spans 💖</p>
            <a href="#" className="px-4 py-2 bg-pink-300 rounded-lg text-white block text-center">Listen Now</a>
          </div>
        </div>
      </section>


      {/* WRITING */}
      <section className="px-8 py-12 max-w-5xl mx-auto my-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-pink-400">📚 Wanna read me yap?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-purple-50 rounded-2xl shadow-md hover:shadow-lg">
            <h3 className="text-xl font-bold mb-2">Romance✨Chaos✨Magic</h3>
            <p className="text-purple-800 mb-4">Enter my worlds of drama & dragons 💅</p>
            <a href="#" className="px-4 py-2 bg-purple-300 text-white rounded-lg shadow block text-center">Read Now</a>
          </div>
          <div className="p-6 bg-purple-50 rounded-2xl shadow-md hover:shadow-lg">
            <h3 className="text-xl font-bold mb-2">Write-ups & Poetry</h3>
            <p className="text-purple-800 mb-4">Overthinking but make it ✨art✨</p>
            <a href="#" className="px-4 py-2 bg-purple-300 text-white rounded-lg text-center block">Read Now</a>
          </div>
        </div>
      </section>


      {/* COMMENTS */}
      <section className="px-8 py-12 max-w-5xl mx-auto my-8 bg-pink-50 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-pink-400">💬 Your turn to yap!</h2>
        <form onSubmit={submitComment} className="flex flex-col space-y-4">
          <input type="text" placeholder="Your name" value={commentName} onChange={(e)=>setCommentName(e.target.value)} className="p-4 rounded-lg border border-purple-300" />
          <textarea placeholder="Comment..." value={commentComment} onChange={(e)=>setCommentComment(e.target.value)} className="p-4 rounded-lg border border-purple-300" />
          <button type="submit" className="self-end px-6 py-2 bg-pink-300 text-white rounded-lg shadow">Submit</button>
        </form>

        <button onClick={() => setShowComments(!showComments)} className="mt-4 px-4 py-2 bg-purple-300 text-white rounded-lg shadow">
          {showComments ? "Hide comments" : "Read comments"}
        </button>

        {showComments && (
          <div className="mt-6 space-y-2">
            {comments.length < 1 ? <p>No comments yet! 🌟</p> :
              comments.map((c, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow">
                  <strong>{c.name}</strong>: {c.comment}
                </div>
              ))
            }
          </div>
        )}
      </section>


      {/* NEWSLETTER */}
      <section className="px-8 py-12 max-w-5xl mx-auto my-8 bg-purple-50 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-purple-400">📬 Join My Newsletter</h2>

        {newsletterSubmitted ? (
          <p className="text-center text-purple-800 text-lg font-medium">
            Mission accomplished ✅ You’re subscribed! 💌
          </p>
        ) : (
          <form onSubmit={submitNewsletter} className="flex flex-col space-y-4">
            <input type="text" placeholder="Your Name" value={newsletterName} onChange={(e)=>setNewsletterName(e.target.value)} className="p-4 rounded-lg border border-purple-300" />
            <input type="email" placeholder="Your Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="p-4 rounded-lg border border-purple-300" />
            <input type="text" placeholder="Topic suggestion? 👀 (optional)" value={topic} onChange={(e)=>setTopic(e.target.value)} className="p-4 rounded-lg border border-purple-300" />
            <button className="self-end px-6 py-2 bg-purple-300 text-white rounded-lg shadow">Sign Up</button>
          </form>
        )}
      </section>


      {/* FOOTER */}
      <footer className="text-center py-8 text-purple-700 text-sm">
        <p>Made with ❤️ by Bree.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://www.instagram.com/sen_bristi_?igsh=Y2U2a3kwYmtyOHc1" className="hover:text-pink-400">Instagram</a>
          <a href="#" className="hover:text-pink-400">Spotify</a>
          <a href="#" className="hover:text-pink-400">Wattpad</a>
        </div>
      </footer>

    </div>
  );
}
