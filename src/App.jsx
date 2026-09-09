import React, { useEffect, useState } from "react";
import { portfolio as p } from "./data";
import "./styles.css";

const Arrow = () => <span className="arrow">↗</span>;

function SectionLabel({ n, children }) {
  return (
    <div className="section-label">
      <span>{n}</span>
      {children}
    </div>
  );
}

function ProjectVisual({ type }) {
  return (
    <div className={`project-visual ${type}`}>
      <div className="visual-grid" />

      {type === "blood" && (
        <div className="dashboard">
          <div className="dash-top">
            <i />
            <i />
            <i />
            <b>DONOR HUB</b>
          </div>

          <div className="dash-cards">
            <span />
            <span />
            <span />
          </div>

          <div className="dash-lines">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      )}

      {type === "ebuddy" && (
        <div className="orbital">
          <div className="orbit o1" />
          <div className="orbit o2" />

          <div className="core">
            <small>EB</small>
            <b>₹</b>
          </div>
        </div>
      )}

      {type === "food" && (
        <div className="plate">
          <div className="food-center" />
          <div className="food-dot d1" />
          <div className="food-dot d2" />
          <div className="food-dot d3" />
        </div>
      )}

      {type === "ai" && (
        <div className="ai-brain">
          <span>AI</span>
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      )}

      <div className="visual-caption">
        {type === "ai"
          ? "PREDICTION ENGINE"
          : type === "ebuddy"
          ? "SMART BILLING"
          : type === "food"
          ? "DIGITAL DINING"
          : "DONOR MANAGEMENT"}
      </div>
    </div>
  );
}

function App() {
  const [menu, setMenu] = useState(false);
  const [cursor, setCursor] = useState({
    x: -100,
    y: -100,
  });

  const [activeProject, setActiveProject] = useState(null);

  /*
   * Custom cursor
   * Disabled automatically on touch devices.
   */
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const move = (e) => {
      setCursor({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("pointermove", move);

    return () => {
      window.removeEventListener("pointermove", move);
    };
  }, []);

  /*
   * Scroll reveal animation
   */
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => {
        el.classList.add("visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => {
    setMenu(false);
  };

  /*
   * Open project with keyboard
   */
  const handleProjectKeyDown = (event, link) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="site">

      {/* CUSTOM CURSOR */}
      <div
        className="cursor"
        style={{
          transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)`,
        }}
      />

      {/* BACKGROUND */}
      <div className="noise" />
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />

      {/* NAVIGATION */}
      <header className="nav">

        <a
          className="logo"
          href="#home"
          onClick={closeMenu}
        >
          <span>NK</span>
          <b>{p.shortName}</b>
        </a>

        <button
          className="hamburger"
          onClick={() => setMenu(!menu)}
          aria-label="Toggle navigation menu"
          aria-expanded={menu}
        >
          <span />
          <span />
        </button>

        <nav className={menu ? "open" : ""}>
          {[
            "about",
            "skills",
            "projects",
            "experience",
            "contact",
          ].map((x) => (
            <a
              key={x}
              href={`#${x}`}
              onClick={closeMenu}
            >
              {x}
            </a>
          ))}

          <a
            className="resume-mini"
            href={p.resume}
            target="_blank"
            rel="noreferrer"
          >
            Resume <Arrow />
          </a>
        </nav>
      </header>

      <main>

        {/* ================= HERO ================= */}

        <section
          id="home"
          className="hero wrap"
        >
          <div className="hero-copy reveal">

            <div className="eyebrow">
              <span className="pulse" />
              {p.hero.eyebrow}
            </div>

            <h1>
              {p.hero.headlineTop}
              <br />
              <em>{p.hero.headlineAccent}</em>
              <br />
              {p.hero.headlineBottom}
            </h1>

            <p>{p.hero.description}</p>

            <div className="hero-buttons">

              <a
                className="btn btn-main"
                href="#projects"
              >
                Explore work <Arrow />
              </a>

              <a
                className="btn btn-line"
                href={p.resume}
                target="_blank"
                rel="noreferrer"
              >
                View resume <Arrow />
              </a>

            </div>

            <div className="hero-links">

              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>

              <a
                href={p.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>

              <a href={`mailto:${p.email}`}>
                Email
              </a>

            </div>

          </div>

          {/* PORTRAIT */}

          <div className="portrait-wrap reveal">

            <div className="portrait-glow" />

            <div className="portrait-card">

              <div className="portrait-image">
                <img
                  src="/assets/profile.png"
                  alt="Naveen Kumar S"
                />
              </div>

              <div className="portrait-info">

                <span>BASED IN</span>
                <b>{p.location}</b>

                <span>FOCUS</span>
                <b>FULL STACK · AI / ML</b>

              </div>

            </div>

            <div className="floating-card">
              <span>01</span>
              <b>
                BUILD
                <br />
                IMPACT.
              </b>
            </div>

          </div>
        </section>

        {/* ================= MARQUEE ================= */}

        <div className="marquee">
          <div>
            {[
              "FULL STACK",
              "MACHINE LEARNING",
              "REACT.JS",
              "NODE.JS",
              "PYTHON",
              "OPEN SOURCE",
              "FULL STACK",
              "MACHINE LEARNING",
            ].map((x, i) => (
              <React.Fragment key={i}>
                <b>{x}</b>
                <i>✦</i>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ================= ABOUT ================= */}

        <section
          id="about"
          className="section wrap"
        >

          <SectionLabel n="01">
            ABOUT ME
          </SectionLabel>

          <div className="about-grid">

            <div className="reveal">

              <span className="kicker">
                {p.about.kicker}
              </span>

              <h2>
                {p.about.title}
                <br />
                <em>{p.about.accent}</em>
              </h2>

            </div>

            <div className="about-copy reveal">

              {p.about.paragraphs.map((x, i) => (
                <p key={i}>{x}</p>
              ))}

              <div className="stats">

                {p.stats.map(([a, b]) => (
                  <div key={b}>
                    <strong>{a}</strong>
                    <span>{b}</span>
                  </div>
                ))}

              </div>

            </div>

          </div>
        </section>

        {/* ================= SKILLS ================= */}

        <section
          id="skills"
          className="section skills-section"
        >

          <div className="wrap">

            <SectionLabel n="02">
              TOOLKIT
            </SectionLabel>

            <div className="section-top reveal">

              <h2>
                My <em>stack.</em>
              </h2>

              <p>
                Technologies I use to turn ideas
                into reliable, responsive products.
              </p>

            </div>

            <div className="skills-grid">

              {p.skills.map(
                ([num, title, desc]) => (
                  <div
                    className="skill reveal"
                    key={title}
                  >

                    <small>{num}</small>

                    <h3>{title}</h3>

                    <p>{desc}</p>

                    <span className="skill-arrow">
                      ↗
                    </span>

                  </div>
                )
              )}

            </div>

          </div>
        </section>

        {/* ================= PROJECTS ================= */}

        <section
          id="projects"
          className="section wrap projects-section"
        >

          <SectionLabel n="03">
            SELECTED WORK
          </SectionLabel>

          <div className="section-top reveal">

            <h2>
              Built to be
              <br />
              <em>useful.</em>
            </h2>

            <p>
              Four projects spanning full-stack
              development, community platforms
              and machine learning.
            </p>

          </div>

          <div className="projects">

            {p.projects.map((x, i) => (

              /*
               * IMPORTANT:
               * Entire project card is clickable.
               * We use div instead of nested anchor elements
               * so there are no invalid nested links.
               */
              <div
                className={`project-card reveal ${
                  activeProject === i ? "active" : ""
                }`}
                key={x.title}
                role="link"
                tabIndex={0}
                aria-label={`Open ${x.title} project`}
                onClick={() => {
                  window.open(
                    x.link,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
                onKeyDown={(event) =>
                  handleProjectKeyDown(
                    event,
                    x.link
                  )
                }
                onMouseEnter={() =>
                  setActiveProject(i)
                }
                onMouseLeave={() =>
                  setActiveProject(null)
                }
                onTouchStart={() =>
                  setActiveProject(i)
                }
              >

                {/* PROJECT CONTENT */}

                <div className="project-copy">

                  <div className="project-num">
                    {x.number}
                  </div>

                  <div className="project-meta">
                    {x.meta}
                  </div>

                  <h3>
                    {x.title}
                    <br />
                    <em>{x.accent}</em>
                  </h3>

                  <p>{x.description}</p>

                  <div className="tags">
                    {x.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>

                  {/* Visual link-style indicator.
                      Card itself handles navigation. */}
                  <span className="project-link">
                    {x.linkText} <Arrow />
                  </span>

                </div>

                {/* PROJECT VISUAL */}

                <ProjectVisual
                  type={x.visual}
                />

              </div>
            ))}

          </div>
        </section>

        {/* ================= EXPERIENCE ================= */}

        <section
          id="experience"
          className="section skills-section"
        >

          <div className="wrap">

            <SectionLabel n="04">
              EXPERIENCE · EDUCATION
            </SectionLabel>

            <div className="timeline">

              <div className="timeline-row reveal">

                <span>
                  {p.experience.period}
                </span>

                <div>

                  <h3>
                    {p.experience.company}
                  </h3>

                  <b>
                    {p.experience.role}
                  </b>

                  <p>
                    {p.experience.description}
                  </p>

                </div>

              </div>

              {p.education.map((x) => (

                <div
                  className="timeline-row reveal"
                  key={x.title}
                >

                  <span>{x.period}</span>

                  <div>

                    <h3>{x.title}</h3>

                    <b>{x.detail}</b>

                    <p>{x.place}</p>

                  </div>

                </div>

              ))}

            </div>

          </div>
        </section>

        {/* ================= BEYOND CODE ================= */}

        <section className="section wrap">

          <SectionLabel n="05">
            BEYOND CODE
          </SectionLabel>

          <div className="beyond-grid">

           <div className="cert reveal">

  <span>
    {p.certification.org}
  </span>

  <h3>
    <a
      href="https://www.coursera.org/account/accomplishments/professional-cert/LUEC8BQ90SV4?utm_source=ln&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button&utm_product=prof"
      target="_blank"
      rel="noreferrer"
    >
      {p.certification.title} ↗
    </a>
  </h3>

  <p>
    {p.certification.place}
  </p>

</div>

            <div className="cert reveal">

              <span>NSS</span>

              <h3>
                Community
                <br />
                Leadership
              </h3>

              <p>{p.leadership}</p>

            </div>

          </div>
        </section>

        {/* ================= CONTACT ================= */}

        <section
          id="contact"
          className="contact"
        >

          <div className="wrap">

            <SectionLabel n="06">
              CONTACT
            </SectionLabel>

            <div className="contact-content reveal">

              <span className="kicker">
                Have an opportunity or an
                interesting idea?
              </span>

              <h2>
                Let's build
                <br />
                <em>something.</em>
              </h2>

              <a
                className="big-email"
                href={`mailto:${p.email}`}
              >
                {p.email} <Arrow />
              </a>

            </div>

            <footer>

              <span>
                © 2026 {p.name}
              </span>

              <div>

                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>

                <a
                  href={p.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>

                <a
                  href={p.resume}
                  target="_blank"
                  rel="noreferrer"
                >
                  Resume
                </a>

              </div>

            </footer>

          </div>
        </section>

      </main>
    </div>
  );
}

export default App;