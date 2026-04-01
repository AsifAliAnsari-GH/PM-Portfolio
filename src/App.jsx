import React, { useEffect, useMemo, useRef, useState } from "react";

function Reveal({
  children,
  className = "",
  delay = 0,
  y = 14,
  scale = 1,
  duration = 420,
  once = true,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setVisible(false);
          setDone(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -32px 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={className}
      onTransitionEnd={() => {
        if (visible) setDone(true);
      }}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translate3d(0,0,0) scale(1)"
          : `translate3d(0, ${y}px, 0) scale(${scale})`,
        transition: `opacity ${duration}ms ease, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        transitionDelay: `${delay}ms`,
        willChange: done ? "auto" : "transform, opacity",
        backfaceVisibility: "hidden",
      }}
    >
      {children}
    </div>
  );
}

function MobileBottomNav({ navItems, activeSection, onNavigate }) {
  return (
    <div className="fixed bottom-3 inset-x-0 z-[1100] lg:hidden px-3">
      <div className="grid grid-cols-5 rounded-2xl border backdrop-blur-xl shadow-lg overflow-hidden bg-white/95 border-green-100">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-2 py-3 text-[11px] sm:text-xs font-semibold transition ${
                isActive ? "text-green-600 bg-green-50" : "text-gray-500"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [nameText, setNameText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  const fullName = "Asif Ali Ansari";

  const dropdownOptions = [
    "APM / PM Opportunity",
    "Product Case Study Discussion",
    "Mentorship / Networking",
  ];

  const navItems = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "products", label: "Projects" },
      { id: "experience", label: "Work" },
      { id: "education", label: "Study" },
      { id: "contact", label: "Connect" },
    ],
    []
  );

  const rotatingTexts = useMemo(
    () => [
      "building AI-driven products...",
      "turning ambiguity into product bets...",
      "bridging engineering and business...",
      "defining product vision...",
    ],
    []
  );

  const projects = useMemo(
    () => [
      {
        title: "AI Learning Assistant for Students",
        companyImage: "/company1_logo.png",
        tag: "0 → 1 Product Strategy",
        isNew: true,
        problem:
          "Students struggled to find the right learning path, practice material, and next action inside a fragmented academic workflow. This created confusion, low engagement, and weak completion momentum.",
        solution:
          "I framed the opportunity around activation and retention, then mapped the product into core user journeys such as onboarding, personalized recommendations, doubt resolution, and progress nudges.",
        impact:
          "This case sharpened the product strategy, clarified feature prioritization, and created a more focused MVP path centered on user value and measurable learning behavior.",
        metrics: [
          "North star: weekly active learners",
          "Primary KPI: activation to first meaningful session",
          "Guardrail: recommendation relevance and completion rate",
        ],
        pptLink: "",
        youtubeLink: "",
      },
      {
        title: "Content Discovery Recommendation System",
        companyImage: "/company2_logo.png",
        tag: "Personalization / Retention",
        isNew: false,
        problem:
          "Users found it difficult to discover relevant content quickly, which reduced session depth and weakened repeat usage over time.",
        solution:
          "I approached this as a product discovery problem, not only a technical one. I identified user friction points, framed recommendation trade-offs, and designed a direction balancing relevance, freshness, and business goals.",
        impact:
          "The project improved how product decisions were made around content prioritization, recommendation quality, and the relationship between personalization and retention.",
        metrics: [
          "Goal: reduce time-to-discovery",
          "Success metric: deeper session engagement",
          "Business lens: retention and repeat usage",
        ],
        pptLink: "",
        youtubeLink: "",
      },
      {
        title: "Churn Insights and Retention Prioritization",
        companyImage: "/company3_logo.png",
        tag: "Data-Informed Product Decisions",
        isNew: false,
        problem:
          "The business needed clearer visibility into why users dropped off and which retention opportunities should be prioritized first.",
        solution:
          "I translated churn analysis into product insight by identifying likely drop-off signals, segmenting user risk patterns, and converting those findings into practical retention hypotheses for roadmap prioritization.",
        impact:
          "This work showed how analytics can guide product decisions, especially when selecting what to improve first for retention, lifecycle engagement, and business efficiency.",
        metrics: [
          "Focus metric: churn-risk segments",
          "Decision metric: retention intervention priority",
          "Outcome lens: user lifecycle improvement",
        ],
        pptLink: "",
        youtubeLink: "",
      },
    ],
    []
  );

  const theme = {
    page: "bg-white text-black",
    nav: "bg-white/95 border-green-100",
    panel: "bg-white/90 border-green-100 text-black",
    panelSoft: "bg-white/80 border-green-100 text-black",
    card: "bg-white border-gray-200 text-black shadow-sm",
    cardSoft: "bg-white border-green-100 text-black",
    textMain: "text-gray-900",
    textSub: "text-gray-700",
    textMuted: "text-gray-500",
    accent: "text-green-600",
    accentBorder: "border-green-500",
    accentBorderSoft: "border-green-200",
    input:
      "border-b border-gray-300 text-gray-700 placeholder:text-gray-400 bg-transparent focus:border-green-500",
    buttonGhost:
      "border border-green-500 text-black bg-white hover:bg-green-500 hover:text-white",
    buttonCard:
      "bg-white border-green-200 text-black hover:border-green-500 hover:bg-green-50",
    timelineDot: "bg-white border-green-500",
    footer: "bg-white border-green-500 text-gray-700",
    sideNavActive: "bg-white border-black text-green-600",
    sideNavIdle:
      "bg-white/70 border-green-100 text-gray-500 hover:text-green-600 hover:border-green-300",
    backdrop: "bg-black/25",
    newBadge: "bg-green-500 text-white border border-green-400",
    modalClose:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100",
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    const offset = 88;
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top,
      behavior: reducedMotion ? "auto" : "smooth",
    });

    setActiveSection(id);
  };

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);

    updateMotion();
    media.addEventListener("change", updateMotion);
    return () => media.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
  const starCount = reducedMotion ? 12 : 30;

  const generatedStars = Array.from({ length: starCount }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 3 + 1.5}px`,
    animationDuration: `${Math.random() * 3 + 3.5}s`,
    animationDelay: `${Math.random() * 3}s`,
    opacity: Math.random() * 0.45 + 0.2,
  }));

  const generatedShootingStars = reducedMotion
    ? []
    : Array.from({ length: 4 }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 45 + 5}%`,
        left: `${Math.random() * 70}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${Math.random() * 2 + 3.2}s`,
        length: `${Math.random() * 120 + 90}px`,
      }));

  setStars(generatedStars);
  setShootingStars(generatedShootingStars);
}, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      setNameText(fullName);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      setNameText(fullName.slice(0, i + 1));
      i += 1;
      if (i >= fullName.length) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayText(rotatingTexts[0]);
      return;
    }

    let i = 0;
    const currentText = rotatingTexts[index];

    const interval = setInterval(() => {
      setDisplayText(currentText.slice(0, i + 1));
      i += 1;

      if (i > currentText.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % rotatingTexts.length);
        }, 1300);
      }
    }, 32);

    return () => clearInterval(interval);
  }, [index, rotatingTexts, reducedMotion]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const sections = ["home", "products", "experience", "education", "contact"];
        let current = "home";

        for (const section of sections) {
          const el = document.getElementById(section);
          if (!el) continue;

          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            current = section;
            break;
          }
        }

        setActiveSection(current);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowResumeModal(false);
        setSelectedProject(null);
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className={`min-h-screen font-mono relative overflow-x-hidden transition-colors duration-300 ${theme.page}`}
    >
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }

          @keyframes softTwinkle {
            0% { opacity: 0.18; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.25); }
            100% { opacity: 0.18; transform: scale(1); }
          }

          .star-animate {
            animation: softTwinkle 4.5s ease-in-out infinite;
          }
@keyframes shootingStar {
  0% {
    opacity: 0;
    transform: translate3d(0, 0, 0) rotate(25deg) scaleX(0.2);
  }
  10% {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotate(25deg) scaleX(1);
  }
  70% {
    opacity: 1;
    transform: translate3d(260px, 120px, 0) rotate(25deg) scaleX(1);
  }
  100% {
    opacity: 0;
    transform: translate3d(340px, 160px, 0) rotate(25deg) scaleX(0.6);
  }
}

.shooting-star {
  position: absolute;
  height: 2px;
  border-radius: 9999px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0),
    rgba(187, 247, 208, 0.75),
    rgba(34, 197, 94, 1),
    rgba(255, 255, 255, 0.95)
  );
  box-shadow:
    0 0 10px rgba(34, 197, 94, 0.55),
    0 0 18px rgba(187, 247, 208, 0.35);
  transform-origin: left center;
  animation: shootingStar linear infinite;
}

          @keyframes greenWave {
            0% {
              transform: scale(1);
              opacity: 0.65;
            }
            70% {
              transform: scale(1.22);
              opacity: 0;
            }
            100% {
              transform: scale(1.24);
              opacity: 0;
            }
          }

          .profile-wave-wrap {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 9999px;
          }

          .profile-wave-ring,
          .profile-wave-ring-delay,
          .profile-wave-ring-delay-2 {
            position: absolute;
            inset: -6px;
            border-radius: 9999px;
            border: 2px solid rgba(34, 197, 94, 0.72);
            pointer-events: none;
          }

          .profile-wave-ring {
            animation: greenWave 2.2s ease-out infinite;
          }

          .profile-wave-ring-delay {
            animation: greenWave 2.2s ease-out infinite 0.7s;
          }

          .profile-wave-ring-delay-2 {
            animation: greenWave 2.2s ease-out infinite 1.4s;
          }

          .profile-wave-core {
            position: absolute;
            inset: -2px;
            border-radius: 9999px;
            box-shadow:
              0 0 0 1px rgba(34, 197, 94, 0.22),
              0 0 18px rgba(34, 197, 94, 0.18),
              0 0 32px rgba(34, 197, 94, 0.08);
            pointer-events: none;
          }

          @media (prefers-reduced-motion: reduce) {
            html {
              scroll-behavior: auto;
            }

            .star-animate,
.shooting-star,
.profile-wave-ring,
.profile-wave-ring-delay,
.profile-wave-ring-delay-2 {
  animation: none !important;
}

            * {
              transition-duration: 0.01ms !important;
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
            }
          }
        `}
      </style>

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(187,247,208,0.24),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f8fffb_55%,#f6fff9_100%)]" />

        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full star-animate bg-green-500/90"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDuration: star.animationDuration,
              animationDelay: star.animationDelay,
              opacity: star.opacity,
              boxShadow: "0 0 10px rgba(34,197,94,0.35)",
            }}
          />
        ))
        }
        {shootingStars.map((star) => (
  <div
    key={star.id}
    className="shooting-star"
    style={{
      top: star.top,
      left: star.left,
      width: star.length,
      animationDelay: star.delay,
      animationDuration: star.duration,
    }}
  />
))}
      </div>

      <nav
        className={`fixed top-0 left-0 w-full z-50 border-b backdrop-blur-sm shadow-sm transition-colors duration-300 ${theme.nav}`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex justify-center items-center">
          <button
            onClick={() => scrollToSection("home")}
            className={`text-sm sm:text-xl md:text-3xl font-bold uppercase transition duration-200 tracking-[0.12em] sm:tracking-[0.18em] text-center ${theme.accent}`}
          >
            The Product Lens by Asif
          </button>
        </div>
      </nav>

      <div className="fixed right-3 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-40">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`px-3 py-2 rounded-md backdrop-blur-sm border transition text-sm ${
              activeSection === item.id ? theme.sideNavActive : theme.sideNavIdle
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <MobileBottomNav
        navItems={navItems}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {showResumeModal && (
        <div
          className={`fixed inset-0 z-[1000] backdrop-blur-sm flex items-center justify-center p-4 ${theme.backdrop}`}
          onClick={() => setShowResumeModal(false)}
        >
          <div
            className={`w-full max-w-sm border shadow-lg p-5 sm:p-6 rounded-xl relative transition-colors duration-300 ${theme.card}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowResumeModal(false)}
              aria-label="Close resume modal"
              className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold transition z-20 ${theme.modalClose}`}
            >
              ✕
            </button>

            <h2 className={`text-xl font-bold mb-5 ${theme.accent}`}>Resume</h2>

            <div className="flex flex-col gap-3">
              <a
                href="\resume (2).pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-3 text-center font-semibold transition ${theme.buttonGhost}`}
              >
                View Resume
              </a>

              <a
                href="\resume (2).pdf"
                download="Asif_Ali_Ansari_Product_Resume.pdf"
                className={`px-4 py-3 text-center font-semibold transition ${theme.buttonGhost}`}
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      )}

      {selectedProject && (
        <div
          className={`fixed inset-0 z-[1000] backdrop-blur-sm flex items-center justify-center p-4 ${theme.backdrop}`}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className={`w-full max-w-3xl max-h-[88vh] overflow-y-auto border shadow-lg p-4 sm:p-6 md:p-8 rounded-xl relative transition-colors duration-300 ${theme.card}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Close project modal"
              className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold transition z-20 ${theme.modalClose}`}
            >
              ✕
            </button>

            <div className="pr-12">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <p className={`text-xs uppercase tracking-[0.2em] ${theme.textMuted}`}>
                  {selectedProject.tag}
                </p>

                {selectedProject.isNew && (
                  <span
                    className={`text-[10px] uppercase tracking-[0.22em] px-2 py-1 rounded-full font-bold ${theme.newBadge}`}
                  >
                    New
                  </span>
                )}
              </div>

              <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 ${theme.accent}`}>
                {selectedProject.title}
              </h2>
            </div>

            <div className="space-y-5 sm:space-y-6">
              <div>
                <span className={`block text-xs font-bold uppercase tracking-wider mb-2 ${theme.textMuted}`}>
                  Problem
                </span>
                <p className={`leading-7 text-sm sm:text-base ${theme.textSub}`}>
                  {selectedProject.problem}
                </p>
              </div>

              <div>
                <span className={`block text-xs font-bold uppercase tracking-wider mb-2 ${theme.textMuted}`}>
                  Product Thinking / Solution
                </span>
                <p className={`leading-7 text-sm sm:text-base ${theme.textSub}`}>
                  {selectedProject.solution}
                </p>
              </div>

              <div>
                <span className={`block text-xs font-bold uppercase tracking-wider mb-2 ${theme.textMuted}`}>
                  Impact & Validation
                </span>
                <p className={`leading-7 text-sm sm:text-base ${theme.textSub}`}>
                  {selectedProject.impact}
                </p>
              </div>

              <div>
                <span className={`block text-xs font-bold uppercase tracking-wider mb-3 ${theme.textMuted}`}>
                  Success Metrics
                </span>
                <ul className={`list-disc pl-5 space-y-2 text-sm sm:text-base ${theme.textSub}`}>
                  {selectedProject.metrics.map((metric, idx) => (
                    <li key={idx}>{metric}</li>
                  ))}
                </ul>
              </div>

              <div
                className={`pt-5 sm:pt-6 border-t flex flex-col md:flex-row gap-3 sm:gap-4 ${theme.accentBorderSoft}`}
              >
                <a
                  href={selectedProject.pptLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 text-center px-5 py-3 font-semibold transition ${theme.buttonGhost}`}
                >
                  View Presentation
                </a>
                <a
                  href={selectedProject.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 text-center px-5 py-3 font-semibold transition ${theme.buttonGhost}`}
                >
                  Watch Walkthrough
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="relative z-10 px-4 sm:px-5 md:px-6 pt-0">
        <section
          id="home"
          className="relative min-h-screen max-w-5xl mx-auto flex flex-col justify-center items-center text-center pt-20 pb-12 md:pt-20"
        >
          <Reveal delay={40}>
            <div
              className={`mb-6 sm:mb-8 border px-3 sm:px-4 py-2 rounded-md shadow-sm text-[11px] sm:text-xs md:text-sm max-w-fit mx-auto transition-colors duration-300 ${theme.panel}`}
            >
              {displayText}
              {!reducedMotion && <span className="animate-pulse ml-1">|</span>}
            </div>
          </Reveal>

          <Reveal delay={70}>
            <div
              className={`rounded-full p-2 shadow-sm mb-6 sm:mb-8 border transition-colors duration-300 ${theme.panelSoft}`}
            >
              <div className="profile-wave-wrap">
                <div className="profile-wave-ring" />
                <div className="profile-wave-ring-delay" />
                <div className="profile-wave-ring-delay-2" />
                <div className="profile-wave-core" />
                <img
                  src="/Gemini_Generated_Image_gzhvn1gzhvn1gzhv.png"
                  alt="Asif Ali Ansari"
                  className={`relative z-10 w-28 h-28 sm:w-32 sm:h-32 md:w-44 md:h-44 rounded-full object-cover object-center border-2 bg-white ${theme.accentBorder}`}
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className={`text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.25em] mb-4 ${theme.accent}`}>
              APM / PRODUCT MANAGEMENT PORTFOLIO
            </p>
          </Reveal>

          <Reveal delay={130}>
            <h1
              className={`text-3xl sm:text-4xl md:text-6xl font-bold min-h-[56px] sm:min-h-[64px] md:min-h-[88px] px-3 sm:px-4 py-2 rounded transition-colors duration-300 ${theme.panelSoft}`}
            >
              {nameText}
              {!reducedMotion && nameText.length < fullName.length && (
                <span className="inline-block w-1 h-8 md:h-12 ml-2 animate-pulse align-middle bg-black" />
              )}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p
              className={`mt-5 text-base sm:text-lg md:text-xl max-w-3xl px-3 py-2 rounded leading-7 sm:leading-8 md:leading-9 transition-colors duration-300 ${theme.panelSoft} ${theme.textMain}`}
            >
              Aspiring Product Manager focused on AI, data-driven products, and
              turning ambiguous problems into clear product opportunities.
            </p>
          </Reveal>

          <Reveal delay={190}>
            <p
              className={`mt-4 max-w-2xl px-3 py-2 rounded text-sm sm:text-base leading-7 transition-colors duration-300 ${theme.panelSoft} ${theme.textSub}`}
            >
              I bring a technical foundation in AI and data science, and I’m building
              toward APM / PM roles where product thinking, user empathy, and execution matter.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div
              className={`grid grid-cols-1 sm:grid-cols-3 w-full sm:w-auto gap-3 mt-8 p-3 rounded-xl transition-colors duration-300 ${theme.panelSoft}`}
            >
              <button
                onClick={() => setShowResumeModal(true)}
                className={`w-full px-6 py-3 text-sm font-semibold transition text-center ${theme.buttonGhost}`}
              >
                Resume
              </button>

              <a
                href="https://linkedin.com/in/asifaliansari-pm"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full px-6 py-3 text-sm font-semibold transition text-center ${theme.buttonGhost}`}
              >
                LinkedIn
              </a>

              <a
                href="https://github.com/AsifAliAnsari-GH"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full px-6 py-3 text-sm font-semibold transition text-center ${theme.buttonGhost}`}
              >
                GitHub
              </a>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl mt-10 md:mt-14">
            <Reveal delay={80}>
              <div className={`p-5 text-left border transition-colors duration-300 ${theme.cardSoft}`}>
                <p className={`text-xs uppercase tracking-wider mb-2 ${theme.textMuted}`}>Focus</p>
                <p className={`font-semibold ${theme.textMain}`}>AI Products, Discovery, User Value</p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className={`p-5 text-left border transition-colors duration-300 ${theme.cardSoft}`}>
                <p className={`text-xs uppercase tracking-wider mb-2 ${theme.textMuted}`}>Strength</p>
                <p className={`font-semibold ${theme.textMain}`}>Technical Depth + Product Framing</p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className={`p-5 text-left border transition-colors duration-300 ${theme.cardSoft}`}>
                <p className={`text-xs uppercase tracking-wider mb-2 ${theme.textMuted}`}>Goal</p>
                <p className={`font-semibold ${theme.textMain}`}>APM / PM Roles in Product-Led Teams</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="products"
          className="min-h-screen max-w-6xl mx-auto py-16 md:py-24 flex flex-col justify-center"
        >
          <Reveal>
            <div
              className={`mb-10 md:mb-12 p-4 rounded-lg border self-start transition-colors duration-300 ${theme.panelSoft}`}
            >
              <p className={`text-xs uppercase tracking-[0.2em] mb-2 ${theme.textMuted}`}>
                Portfolio Highlights
              </p>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 ${theme.accent}`}>
                Product Case Studies
              </h2>
              <p className={`max-w-2xl leading-7 text-sm sm:text-base ${theme.textSub}`}>
                These projects show how I approach user problems through framing, prioritization,
                measurable outcomes, and thoughtful product execution.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            {projects.map((project, i) => (
              <Reveal key={i} delay={i * 60}>
                <button
                  onClick={() => setSelectedProject(project)}
                  className={`relative text-left border border-dashed p-5 sm:p-6 transition flex flex-col min-h-[unset] sm:min-h-[420px] w-full ${theme.buttonCard}`}
                >
                  {project.isNew && (
                    <span
                      className={`absolute top-4 right-4 text-[10px] uppercase tracking-[0.22em] px-2 py-1 rounded-full font-bold ${theme.newBadge}`}
                    >
                      New
                    </span>
                  )}

                  <div
                    className={`w-full h-24 sm:h-28 mb-5 border flex items-center justify-center transition-colors duration-300 ${theme.cardSoft}`}
                  >
                    <img
                      src={project.companyImage}
                      alt={`${project.title} logo`}
                      className="max-h-[70%] max-w-[70%] object-contain grayscale hover:grayscale-0 transition"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/160x80?text=Project+Logo";
                      }}
                    />
                  </div>

                  <p className={`text-xs uppercase tracking-[0.2em] mb-2 ${theme.textMuted}`}>
                    {project.tag}
                  </p>

                  <h3 className={`text-lg sm:text-xl font-bold mb-4 ${theme.accent}`}>
                    {project.title}
                  </h3>

                  <div className="mb-4">
                    <span className={`text-xs uppercase tracking-wider font-bold ${theme.textMuted}`}>
                      Problem
                    </span>
                    <p className={`text-sm mt-2 leading-6 line-clamp-4 ${theme.textSub}`}>
                      {project.problem}
                    </p>
                  </div>

                  <div className="mb-6">
                    <span className={`text-xs uppercase tracking-wider font-bold ${theme.textMuted}`}>
                      Solution
                    </span>
                    <p className={`text-sm mt-2 leading-6 line-clamp-4 ${theme.textSub}`}>
                      {project.solution}
                    </p>
                  </div>

                  <div className={`mt-auto text-xs font-bold ${theme.accent}`}>
                    Click to view full case study →
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          id="experience"
          className="min-h-screen max-w-4xl mx-auto py-16 md:py-24 flex flex-col justify-center"
        >
          <Reveal>
            <div
              className={`mb-10 md:mb-12 p-4 rounded-lg border self-start transition-colors duration-300 ${theme.panelSoft}`}
            >
              <p className={`text-xs uppercase tracking-[0.2em] mb-2 ${theme.textMuted}`}>
                Career Journey
              </p>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${theme.accent}`}>
                Experience
              </h2>
            </div>
          </Reveal>

          <div
            className={`border-l-2 pl-5 sm:pl-8 space-y-10 sm:space-y-12 p-4 sm:p-6 md:p-8 rounded-lg transition-colors duration-300 ${theme.panelSoft} ${theme.accentBorder}`}
          >
            <Reveal delay={40}>
              <div className="relative">
                <div
                  className={`absolute -left-[27px] sm:-left-[41px] top-1 w-3 h-3 sm:w-4 sm:h-4 border-2 rounded-full ${theme.timelineDot}`}
                />
                <h3 className={`text-lg sm:text-xl font-bold ${theme.textMain}`}>
                  Assistant Professor (Program Delivery)
                </h3>
                <p className={`font-semibold ${theme.accent}`}>
                  Kalvium @ Lovely Professional University
                </p>
                <p className={`text-sm mb-4 ${theme.textMuted}`}>Jan 2025 - Present</p>
                <ul className={`list-disc pl-5 text-sm space-y-2 leading-6 ${theme.textSub}`}>
                  <li>Led delivery across advanced CS and AI modules, helping learners move from theory to real-world product-oriented problem solving.</li>
                  <li>Mentored teams building scalable AI applications, sharpening collaboration across product thinking, user needs, and technical execution.</li>
                  <li>Helped bridge curriculum design with industry relevance through practical, outcome-focused learning experiences.</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="relative">
                <div
                  className={`absolute -left-[27px] sm:-left-[41px] top-1 w-3 h-3 sm:w-4 sm:h-4 border-2 rounded-full ${theme.timelineDot}`}
                />
                <h3 className={`text-lg sm:text-xl font-bold ${theme.textMain}`}>
                  Data Science Intern
                </h3>
                <p className={`font-semibold ${theme.accent}`}>AiVariant</p>
                <p className={`text-sm mb-4 ${theme.textMuted}`}>Sep 2024 - Jan 2025</p>
                <ul className={`list-disc pl-5 text-sm space-y-2 leading-6 ${theme.textSub}`}>
                  <li>Worked on content discovery and recommendation problems tied to user engagement, personalization, and experience quality.</li>
                  <li>Used exploratory analysis and modeling insights to support clearer product decisions and roadmap conversations.</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative">
                <div
                  className={`absolute -left-[27px] sm:-left-[41px] top-1 w-3 h-3 sm:w-4 sm:h-4 border-2 rounded-full ${theme.timelineDot}`}
                />
                <h3 className={`text-lg sm:text-xl font-bold ${theme.textMain}`}>
                  Data Science Intern
                </h3>
                <p className={`font-semibold ${theme.accent}`}>Eisystems Services</p>
                <p className={`text-sm mb-4 ${theme.textMuted}`}>Jul 2024 - Sep 2024</p>
                <ul className={`list-disc pl-5 text-sm space-y-2 leading-6 ${theme.textSub}`}>
                  <li>Analyzed churn and retention patterns to help identify where business and product teams should focus improvement efforts.</li>
                  <li>Automated recurring data workflows, improving reporting reliability and making insights easier to use in decision-making.</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="education"
          className="min-h-screen max-w-6xl mx-auto py-16 md:py-24 flex flex-col justify-center"
        >
          <Reveal>
            <div
              className={`mb-10 md:mb-12 p-4 rounded-lg border self-start transition-colors duration-300 ${theme.panelSoft}`}
            >
              <p className={`text-xs uppercase tracking-[0.2em] mb-2 ${theme.textMuted}`}>
                Foundation
              </p>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${theme.accent}`}>
                Education
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            <Reveal delay={40}>
              <div className={`border p-5 sm:p-6 transition-colors duration-300 ${theme.card}`}>
                <h3 className="font-bold text-lg mb-2">M.Tech in Data Science</h3>
                <p className={`font-semibold ${theme.accent}`}>Amity University</p>
                <p className={`text-sm mt-3 ${theme.textMuted}`}>Aug 2023 - Jun 2025</p>
                <p className={`text-sm mt-4 leading-6 ${theme.textSub}`}>
                  Built analytical and AI foundations that now support my move toward
                  product roles in intelligent systems.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className={`border p-5 sm:p-6 transition-colors duration-300 ${theme.card}`}>
                <h3 className="font-bold text-lg mb-2">Master of Computer Applications</h3>
                <p className={`font-semibold ${theme.accent}`}>Jamia Hamdard University</p>
                <p className={`text-sm mt-3 ${theme.textMuted}`}>Aug 2021 - Apr 2023</p>
                <p className={`text-sm mt-4 leading-6 ${theme.textSub}`}>
                  Strengthened my software, systems, and problem-solving base for
                  cross-functional product work.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className={`border p-5 sm:p-6 transition-colors duration-300 ${theme.card}`}>
                <h3 className="font-bold text-lg mb-2">Bachelor of Computer Applications</h3>
                <p className={`font-semibold ${theme.accent}`}>Jamia Hamdard University</p>
                <p className={`text-sm mt-3 ${theme.textMuted}`}>Aug 2018 - Apr 2021</p>
                <p className={`text-sm mt-4 leading-6 ${theme.textSub}`}>
                  Developed the technical curiosity and computing fundamentals that shaped
                  my path into AI and product.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="contact"
          className="min-h-screen max-w-3xl mx-auto py-16 md:py-24 pb-40 sm:pb-44 flex flex-col justify-center"
        >
          <Reveal>
            <div
              className={`p-4 rounded-lg border self-start mb-8 transition-colors duration-300 ${theme.panelSoft}`}
            >
              <p className={`text-xs uppercase tracking-[0.2em] mb-2 ${theme.textMuted}`}>
                Reach Out
              </p>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${theme.accent}`}>
                Let’s Build Something Useful
              </h2>
            </div>
          </Reveal>

          <Reveal delay={40}>
            <form
              className={`border p-5 sm:p-6 md:p-8 flex flex-col gap-5 sm:gap-6 transition-colors duration-300 ${theme.card}`}
            >
              <input
                type="text"
                placeholder="Your Name"
                className={`p-3 outline-none transition text-sm sm:text-base ${theme.input}`}
              />

              <div className="relative w-full">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className={`w-full p-3 text-left flex justify-between items-center transition text-sm sm:text-base ${theme.input}`}
                >
                  <span>{selectedPurpose || "What can I help you with?"}</span>
                  <span
                    className={`text-xs transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {isDropdownOpen && (
                  <div
                    className={`absolute top-full left-0 w-full mt-1 shadow-lg z-50 border transition-colors duration-300 ${theme.card}`}
                  >
                    {dropdownOptions.map((option, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSelectedPurpose(option);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left p-3 transition text-sm border-b last:border-b-0 border-gray-100 hover:bg-green-100 hover:text-green-700 text-gray-700"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <textarea
                placeholder="Tell me about the role, product problem, or collaboration opportunity..."
                rows="5"
                className={`p-3 outline-none resize-none transition text-sm sm:text-base ${theme.input}`}
              />

              <button
                type="button"
                className={`py-3 px-6 transition font-bold mt-2 ${theme.buttonGhost}`}
              >
                Send Message
              </button>
            </form>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <Reveal delay={60}>
              <a
                href="mailto:yourmail@example.com"
                className={`border p-4 transition block ${theme.cardSoft}`}
              >
                <p className={`text-xs uppercase tracking-wider mb-1 ${theme.textMuted}`}>Email</p>
                <p className={`font-semibold break-all ${theme.textSub}`}>yourmail@example.com</p>
              </a>
            </Reveal>

            <Reveal delay={100}>
              <a
                href="https://linkedin.com/in/asifaliansari-pm"
                target="_blank"
                rel="noopener noreferrer"
                className={`border p-4 transition block ${theme.cardSoft}`}
              >
                <p className={`text-xs uppercase tracking-wider mb-1 ${theme.textMuted}`}>LinkedIn</p>
                <p className={`font-semibold ${theme.textSub}`}>Connect professionally</p>
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer
        className={`relative z-20 text-center p-5 sm:p-6 pb-24 sm:pb-6 border-t text-xs sm:text-sm transition-colors duration-300 ${theme.footer}`}
      >
        Designed for Product. Built with intent.
      </footer>
    </div>
  );
}