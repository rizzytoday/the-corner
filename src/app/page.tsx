"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [readingMode, setReadingMode] = useState(true);
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [finalSubmitted, setFinalSubmitted] = useState(false);
  const [count, setCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Fetch real count from API
    fetch("/api/waitlist")
      .then((r) => r.json())
      .then((d) => { if (d.count) setCount(d.count); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    // Always open in warm mode — ignore localStorage
    document.documentElement.className = "warm-mode";
  }, []);

  const toggleMode = () => {
    setReadingMode((v) => {
      const next = !v;
      localStorage.setItem("the-corner-clean", String(!next));
      document.documentElement.className = next ? "warm-mode" : "clean-mode";
      return next;
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    which: "hero" | "final"
  ) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const form = e.currentTarget;
    const email = (form.querySelector('input[type="email"]') as HTMLInputElement)?.value;
    const writerCheckbox = form.querySelector('input[type="checkbox"]') as HTMLInputElement;
    const is_writer = writerCheckbox?.checked ?? false;

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, is_writer }),
      });
      const data = await res.json();
      if (data.count) setCount(data.count);
    } catch {
      // Still show success — we'll get the email next time
    }

    if (which === "hero") setHeroSubmitted(true);
    else setFinalSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div className={readingMode ? "warm-mode" : "clean-mode"}>
      {/* MASTHEAD */}
      <header className="masthead">
        <div className="masthead-top">
          <span>Est. 2025 &nbsp;&middot;&nbsp; Human-Verified</span>
          <span className="badge">No AI Content Inside</span>
          <span className="masthead-right">
            <span>Issue 000 &nbsp;&middot;&nbsp; Founding Edition</span>
            <button className="mode-toggle-inline" onClick={toggleMode} aria-label="Toggle mode" title={readingMode ? "Switch to clean" : "Switch to warm"}>
              {readingMode ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
              )}
            </button>
          </span>
        </div>
        <div className="masthead-title">
          <h1>The Corner</h1>
          <p className="tagline">
            Human Soul &nbsp;&middot;&nbsp; No AI Inside &nbsp;&middot;&nbsp;
            Pure Signal
          </p>
        </div>
        <div className="masthead-rule">
          <hr />
          <Typewriter
            text="Where every word is verified human — written by anyone, read by everyone"
            speed={35}
            grow
          />
          <hr />
        </div>
        <div className="trending-bar">
          <span className="trending-live">Trending</span>
          <a href="#">AI Content Crisis</a>
          <span className="trending-time">2h ago</span>
          <a href="#">Creator Economy Shift</a>
          <span className="trending-time">4h ago</span>
          <a href="#">Solana DeFi Summer</a>
          <span className="trending-time">5h ago</span>
          <a href="#">Mindful Tech Movement</a>
          <span className="trending-time">6h ago</span>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="trust-pill">
          <span className="dot" />
          Open Platform — Join Now
        </div>
        <h2>
          Write. Get verified.
          <br />
          <em>Get paid.</em> All human.
        </h2>
        <p>
          An open publishing platform where anyone can write and every piece
          is AI-verified as human-written. Subscribe to individual writers you love.
          In a world drowning in generated text, this is the corner that&apos;s still real.
        </p>

        <div className="form-wrap">
          <h3>Get early access</h3>
          <p>
            Be a founding member. Writers get verified first. Readers
            get free access to launch content.
          </p>
          {!heroSubmitted ? (
            <form onSubmit={(e) => handleSubmit(e, "hero")}>
              <div className="form-row">
                <input type="email" placeholder="your@email.com" required />
                <button type="submit">Join Waitlist</button>
              </div>
              <div className="form-toggle">
                <input type="checkbox" id="writer-hero" />
                <label htmlFor="writer-hero">
                  <span className="checkbox-box" />
                  I&apos;m a writer — I want to contribute
                </label>
              </div>
            </form>
          ) : (
            <p className="success-msg show">
              You&apos;re on the list. We&apos;ll be in touch.
            </p>
          )}
          <div className="counter">
            <span className="count">{count}</span>
            <span>people already signed up</span>
          </div>
          <div className="payment-methods">
            <span className="pay-badge">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1" /><path d="M1 5.5h12" stroke="currentColor" strokeWidth="1" /></svg>
              Card
            </span>
            <span className="pay-sep" />
            <span className="pay-badge">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1" /><path d="M7 4v3l2 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" /></svg>
              USDC
            </span>
            <span className="pay-sep" />
            <span className="pay-badge">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L2 5l5 3 5-3-5-4zM2 9l5 3 5-3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
              SOL
            </span>
            <span className="pay-sep" />
            <span className="pay-badge">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L1.5 7 7 13 12.5 7 7 1z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" /><path d="M1.5 7h11" stroke="currentColor" strokeWidth="0.75" /></svg>
              ETH
            </span>
          </div>
        </div>
      </section>

      {/* TOPICS */}
      <div className="topics-wrap">
      <section className="topics">
        <p className="topics-label">Every corner of the internet, written by humans</p>
        <div className="topics-grid">
          {["Blockchain", "Software Engineering", "Media & Culture", "Health & Nutrition", "Builders & Makers", "Meditation & Mindfulness", "Design", "AI & Machine Learning", "Startups", "Living & Lifestyle", "Finance & Markets", "Open Source", "Psychology", "Creative Writing", "Web3 & DeFi", "Science", "Productivity", "Philosophy"].map((topic) => (
            <span key={topic} className="topic-tag">{topic}</span>
          ))}
        </div>
      </section>
      </div>

      {/* WHAT YOU'LL SEE */}
      <section className="articles">
        <div className="section-label">What It Looks Like Inside</div>
        <div className="articles-grid">
          <article className="article-card featured">
            <span className="article-topic">Blockchain</span>
            <h3>Why On-Chain Payments Will Replace Creator Paywalls by 2027</h3>
            <p>Micropayments on Solana are already faster than Stripe. The next wave of creator platforms won&apos;t ask for your credit card.</p>
            <div className="article-meta">
              <span className="avatar">MC</span>
              <span className="article-author">Maya Chen</span>
              <span className="article-badge">Verified Human</span>
            </div>
          </article>
          <article className="article-card">
            <span className="article-topic">Software</span>
            <h3>I Replaced My Entire SaaS Stack With Open Source. Here&apos;s What Broke.</h3>
            <p>Auth, payments, email, analytics. All self-hosted. The savings are real. The pain is too.</p>
            <div className="article-meta">
              <span className="avatar">DK</span>
              <span className="article-author">David Kuresh</span>
              <span className="article-badge">Verified Human</span>
            </div>
          </article>
          <article className="article-card card-you">
            <span className="article-topic">Your Corner</span>
            <h3>Your Next Article Goes Here</h3>
            <p>Write about what you know. AI verifies it&apos;s really you. Your subscribers get notified. You get paid.</p>
            <div className="article-meta">
              <span className="avatar avatar-you">?</span>
              <span className="article-author">You</span>
              <span className="article-badge">Verified Human</span>
            </div>
          </article>
          <div className="article-card card-model">
            <span className="article-topic">How It Works</span>
            <h3>1 Free Article Per Writer</h3>
            <p>Readers browse free. After one article, they subscribe to keep reading you. Card, USDC, SOL, or ETH.</p>
            <div className="card-model-visual">
              <span className="model-step">Read free</span>
              <span className="model-arrow">&rarr;</span>
              <span className="model-step">Subscribe</span>
              <span className="model-arrow">&rarr;</span>
              <span className="model-step model-you">You earn 85-90%</span>
            </div>
          </div>
          <div className="article-card card-verify">
            <span className="article-topic">Trust Layer</span>
            <h3>Every Post Gets Verified</h3>
            <p>Our AI scans every submission before publishing. Keystroke analysis, writing fingerprint, multi-signal detection. If it&apos;s not human, it doesn&apos;t go live.</p>
            <div className="verify-visual">
              <span className="verify-badge">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" /><path d="M5 8l2.5 2.5L11 6" stroke="var(--red)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Human Verified
              </span>
            </div>
          </div>
          <div className="article-card article-more card-cta">
            <span className="more-count">&rarr;</span>
            <span className="more-label">Be the first to publish</span>
            <span className="more-topics">Join the waitlist. Writers get early access.</span>
          </div>
        </div>
        <p className="articles-note">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ verticalAlign: '-2px', marginRight: '6px' }}>
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1" />
            <path d="M5 7l2 2 3-3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Every piece AI-verified human. Writers earn directly from subscribers.
        </p>
      </section>

      <div className="section-divider" />

      {/* MANIFESTO */}
      <section className="manifesto">
        <div className="section-label">Why Now</div>
        <div className="manifesto-grid">
          <Typewriter
            as="blockquote"
            text={`\u201CIn November 2024, AI-generated articles on the web surpassed human-written articles for the first time. By 2026, AI will outwrite humans entirely.\u201D`}
            speed={30}
          />
          <div className="manifesto-stat">
            <span className="num">51%</span>
            <p className="label">of readers cannot reliably detect AI content — they respond to the label, not the quality</p>
          </div>
          <div className="manifesto-stat">
            <span className="num">0</span>
            <p className="label">publishing platforms verify every post as human-written before it goes live. We do.</p>
          </div>
          <div className="manifesto-stat">
            <span className="num">&ndash;30%</span>
            <p className="label">drop in freelance writing contracts since AI tools proliferated. Great writers are looking for a home.</p>
          </div>
          <div className="manifesto-stat">
            <span className="num">&infin;</span>
            <p className="label">AI-generated posts flooding every platform. The Corner is the one place you know it&apos;s real.</p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* HOW IT WORKS */}
      <section className="how">
        <div className="how-inner">
          <div className="section-label">How It Works</div>
          <Typewriter as="h2" text="Two sides. One promise." speed={50} />
          <div className="how-cols">
            <div className="how-col">
              <div className="sub">For Readers</div>
              <h3>Subscribe to writers, not platforms</h3>
              <ul>
                <li><span className="n">1</span><span>Browse any writer&apos;s profile and read one free article to get a feel for their work</span></li>
                <li><span className="n">2</span><span>Subscribe to individual writers you love — only pay for what you actually read</span></li>
                <li><span className="n">3</span><span>Every piece is AI-verified human-written before it reaches you. No exceptions.</span></li>
                <li><span className="n">4</span><span>Pay with card, USDC, SOL, or ETH — your choice, always transparent</span></li>
              </ul>
            </div>
            <div className="how-divider" />
            <div className="how-col">
              <div className="sub">For Writers</div>
              <h3>Publish freely. Earn from your readers.</h3>
              <ul>
                <li><span className="n">1</span><span>Sign up and start writing — no applications, no gatekeepers, open to everyone</span></li>
                <li><span className="n">2</span><span>Every post passes AI verification to confirm it&apos;s human-written</span></li>
                <li><span className="n">3</span><span>Build your subscriber base — readers pay you directly for your work</span></li>
                <li><span className="n">4</span><span>Get paid in USD or crypto (USDC, SOL, ETH) — you keep 85-90% of every subscription</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="trust">
        <div className="section-label">The Promise</div>
        <div className="trust-grid">
          <div className="trust-item">
            <svg className="icon" width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 14l3 3 5-5" stroke="var(--red)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h4>AI-Verified Human</h4>
            <p>Every post passes AI detection before publishing. If it&apos;s not human, it doesn&apos;t go live.</p>
          </div>
          <div className="trust-item">
            <svg className="icon" width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="4" y="6" width="20" height="16" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 11h10M9 14h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M17 18l2.5-2.5L22 18" stroke="var(--red)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h4>Open to Everyone</h4>
            <p>No applications, no gatekeepers. Anyone can publish — the AI gate ensures quality is real.</p>
          </div>
          <div className="trust-item">
            <svg className="icon" width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="5" y="8" width="18" height="13" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 8V6a5 5 0 0110 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="14" cy="14" r="2" fill="var(--red)" />
            </svg>
            <h4>Writers Keep 85-90%</h4>
            <p>Subscribers pay writers directly. Card or crypto — USDC, SOL, ETH. Transparent, always.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <div className="final-cta-wrap">
      <section className="final-cta">
        <Typewriter as="h2" text="Be here before the first issue." speed={45} />
        <p>Founding members get early access. Writers get verified first. Readers shape the platform.</p>
        <div className="form-wrap">
          {!finalSubmitted ? (
            <form onSubmit={(e) => handleSubmit(e, "final")}>
              <div className="form-row">
                <input type="email" placeholder="your@email.com" required />
                <button type="submit">I&apos;m In</button>
              </div>
              <div className="form-toggle">
                <input type="checkbox" id="writer-final" />
                <label htmlFor="writer-final">
                  <span className="checkbox-box" />
                  I want to write for The Corner
                </label>
              </div>
            </form>
          ) : (
            <p className="success-msg show">You&apos;re in. Talk soon.</p>
          )}
        </div>
      </section>
      </div>

      {/* Mobile floating mode toggle */}
      <button className="mode-toggle-float" onClick={toggleMode} aria-label="Toggle mode">
        {readingMode ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
        )}
      </button>

      {/* FOOTER */}
      <footer>
        <p>
          <strong>The Corner</strong> &nbsp;&middot;&nbsp; Human-written. AI-verified. &nbsp;&middot;&nbsp; Open publishing platform &nbsp;&middot;&nbsp; &copy; 2025
        </p>
      </footer>

      {/* old fixed toggle removed — now in masthead */}
    </div>
  );
}

/* ── Typewriter Component ── */
function Typewriter({
  text,
  speed = 40,
  as: Tag = "span",
  grow = false,
}: {
  text: string;
  speed?: number;
  as?: "span" | "h2" | "blockquote";
  grow?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          obs.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered) return;
    setShowCursor(true);
    setVisibleCount(0);
    let i = 0;
    const tick = () => {
      i++;
      setVisibleCount(i);
      if (i < text.length) {
        // spaces are instant, characters use the speed delay
        const nextDelay = text[i] === " " ? 0 : speed;
        setTimeout(tick, nextDelay);
      } else {
        // typing done — keep cursor blinking briefly then hide
        setTimeout(() => setShowCursor(false), 1800);
      }
    };
    const firstDelay = text[0] === " " ? 0 : speed;
    setTimeout(tick, firstDelay);
  }, [triggered, text, speed]);

  return (
    <Tag ref={ref as React.Ref<never>} className={triggered ? "typewriter-active" : "typewriter-pending"}>
      <span>{triggered ? text.slice(0, visibleCount) : ""}</span>
      <span className="tw-cursor" style={{ visibility: showCursor ? "visible" : "hidden" }} />
      {!grow && <span style={{ visibility: "hidden" }}>{triggered ? text.slice(visibleCount) || "\u200B" : text}</span>}
    </Tag>
  );
}
