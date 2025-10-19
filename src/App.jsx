import React, { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [showCurtain, setShowCurtain] = useState(true);

  // COMMENTS
  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [showComments, setShowComments] = useState(false); // NEW: toggle display

  // NEWSLETTER
  const [newsletterName, setNewsletterName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Sparkles/confetti
  const curtainSparkles = Array.from({ length: 50 }, (_, i) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 5 + 2}px`,
    duration: `${Math.random() * 2 + 1.5}s`,
  }));

  // Fetch comments from backend
  useEffect(() => {
    if (showComments) {
      fetch("http://localhost:3001/comments")
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setComments(data.comments);
        })
        .catch((err) => console.error("Failed to fetch comments:", err));
    }
  }, [showComments]);

  const handleCurtainClick = () => {
    setCurtainOpen(true);
    setTimeout(() => setShowCurtain(false), 3000);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentName.trim() || !commentInput.trim()) {
      alert("Please fill out both your name and comment! 😅");
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/add-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: commentName.trim(), comment: commentInput.trim() }),
      });
      if (!res.ok) throw new Error("Failed to submit comment");

      // Optimistic UI: add comment immediately
      setComments([{ name: commentName.trim(), comment: commentInput.trim() }, ...comments]);
      setCommentName("");
      setCommentInput("");
      alert("Comment submitted successfully! 🎉");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while submitting your comment. Try again! ❌");
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterName.trim() || !email.trim()) {
      alert("Please enter your name and email! 😅");
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/add-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newsletterName.trim(), email: email.trim(), topic: topic.trim() }),
      });
      if (!res.ok) throw new Error("Failed to submit newsletter");

      setNewsletterSubmitted(true);
      setNewsletterName("");
      setEmail("");
      setTopic("");
      alert("Yay! You're now signed up for the newsletter! 💌");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while signing up. Try again! ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-pink-100 to-pink-50 text-purple-900 font-sans relative">
      {/* CURTAIN */}
      {showCurtain && (
        <div className={`curtain-wrapper ${curtainOpen ? "open" : ""}`} onClick={handleCurtainClick}>
          <div className="curtain-panel curtain-left velvet-left" />
          <div className="curtain-panel curtain-right velvet-right" />
          {curtainSparkles.map((s, idx) => (
            <div key={idx} className="curtain-sparkle" style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDuration: s.duration }} />
          ))}
          <div className="curtain-text absolute text-white text-3xl font-bold select-none">
            These are weird magic curtains. You click, they slide. Crazy stuff. 🎬
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="flex flex-col items-center justify-center py-12 space-y-4">
        <img src="/profile-placeholder.jpg" alt="Bree" className="w-32 h-32 rounded-full border-4 border-purple-300 shadow-lg" />
        <h1 className="text-4xl font-bold tracking-wide">Hi, this is Bristi!</h1>
        <p className="text-purple-700 text-lg text-center max-w-md">
          Very glitter-gel-pen engineer of me to welcome you into my pastel-pink corner of the internet. ✨
        </p>
      </header>

      {/* PODCAST SECTION */}
      <section className="px-8 py-12 bg-white rounded-3xl shadow-xl max-w-5xl mx-auto my-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-pink-400">🎙️ In case you wanna hear me yap~</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-pink-50 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-bold mb-2">Wing It</h3>
            <p className="text-purple-800 mb-4">Episode 0: wing it, we're going soaring</p>
            <a href="#" className="inline-block px-4 py-2 bg-pink-300 text-white rounded-lg shadow hover:bg-pink-400 transition duration-300">Listen Now</a>
          </div>
          <div className="p-6 bg-pink-50 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-bold mb-2">Storyteller: Audiobook Series</h3>
            <p className="text-purple-800 mb-4">In case you also switch to listening when your eyes dehydrate from the reading~</p>
            <a href="#" className="inline-block px-4 py-2 bg-pink-300 text-white rounded-lg shadow hover:bg-pink-400 transition duration-300">Listen Now</a>
          </div>
        </div>
      </section>

      {/* WRITING SECTION */}
      <section className="px-8 py-12 max-w-5xl mx-auto my-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-pink-400">📚 In case you wanna read me yap, instead</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-purple-50 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-bold mb-2">Romance, Fantasy and Mythology</h3>
            <p className="text-purple-800 mb-4">Dive into worlds of drama, passion, and more than a little chaos ✨</p>
            <a href="#" className="inline-block px-4 py-2 bg-purple-300 text-white rounded-lg shadow hover:bg-purple-400 transition duration-300">Read Now</a>
          </div>
          <div className="p-6 bg-purple-50 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-bold mb-2">Concise write-ups and poetry</h3>
            <p className="text-purple-800 mb-4">Random musings, philosophy, life observations and well, metaphors 💫</p>
            <a href="#" className="inline-block px-4 py-2 bg-purple-300 text-white rounded-lg shadow hover:bg-purple-400 transition duration-300">Read Now</a>
          </div>
        </div>
      </section>

      {/* COMMENT SECTION */}
      <section className="px-8 py-12 max-w-5xl mx-auto my-8 bg-pink-50 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-pink-400">💬 Your turn to yap back!</h2>
        <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-4">
          <input type="text" value={commentName} onChange={(e) => setCommentName(e.target.value)} placeholder="Your name" className="p-4 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-300" required />
          <textarea value={commentInput} onChange={(e) => setCommentInput(e.target.value)} placeholder="Write your comment..." className="p-4 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-300" required />
          <button type="submit" className="self-end px-6 py-2 bg-pink-300 text-white rounded-lg shadow hover:bg-pink-400 transition duration-300">Submit</button>
        </form>

        {/* Toggle comments button */}
        <div className="mt-4 text-center">
          <button onClick={() => setShowComments(!showComments)} className="px-4 py-2 bg-purple-300 text-white rounded-lg shadow hover:bg-purple-400 transition duration-300">
            {showComments ? "Hide comments" : "Read what others have to say"}
          </button>
        </div>

        {/* Comment list */}
        {showComments && (
          <div className="mt-6 space-y-2">
            {comments.length === 0 ? (
              <p className="text-center text-purple-700">No comments yet. Be the first! 🌟</p>
            ) : (
              comments.map((c, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow">
                  <strong>{c.name}</strong>: {c.comment}
                </div>
              ))
            )}
          </div>
        )}
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="px-8 py-12 max-w-5xl mx-auto my-8 bg-purple-50 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-purple-400">📬 Join My Newsletter</h2>
        {newsletterSubmitted ? (
          <p className="text-center text-purple-800 text-lg font-medium">
            Thank you for signing up to be pestered by me! 💖
          </p>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-4">
            <input type="text" value={newsletterName} onChange={(e) => setNewsletterName(e.target.value)} placeholder="Your name" className="p-4 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="p-4 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300" required />
            <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Your topic suggestion (optional)" className="p-4 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300" />
            <button type="submit" className="self-end px-6 py-2 bg-purple-300 text-white rounded-lg shadow hover:bg-purple-400 transition duration-300">Sign Up</button>
          </form>
        )}
      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 text-purple-700 text-sm">
        <p>Made with ❤️ by Bree. Find me at:</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://www.instagram.com/sen_bristi_?igsh=Y2U2a3kwYmtyOHc1" className="hover:text-pink-400">Instagram</a>
          <a href="#" className="hover:text-pink-400">Spotify</a>
          <a href="#" className="hover:text-pink-400">Wattpad</a>
        </div>
      </footer>
    </div>
  );
}
