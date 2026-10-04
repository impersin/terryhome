'use client';

import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useLayoutEffect, useRef, useState } from 'react';
import { Section } from './section';

gsap.registerPlugin(SplitText);

const skillItems = [
  ['React · Redux', 'https://terryhome.s3.us-west-1.amazonaws.com/skills/react_redux.png'],
  ['Node · Express', 'https://terryhome.s3.us-west-1.amazonaws.com/skills/node.png'],
  ['Python · Django REST', 'https://terryhome.s3.us-west-1.amazonaws.com/skills/Python_django.png'],
  ['HTML5 · CSS · JS', 'https://terryhome.s3.us-west-1.amazonaws.com/skills/html_css_js.png'],
  ['MongoDB · SQL', 'https://terryhome.s3.us-west-1.amazonaws.com/skills/mongo_sql.png'],
  ['Bootstrap · jQuery', 'https://terryhome.s3.us-west-1.amazonaws.com/skills/bootstrap_jquery.png'],
] as const;

const gallery = [
  ['Landing Page', 'https://terryhome.s3.us-west-1.amazonaws.com/portfolio/test_port.png'],
  ['Search Result Page', 'https://terryhome.s3.us-west-1.amazonaws.com/portfolio/test_port_2.png'],
  ['Publisher Detail Page', 'https://terryhome.s3.us-west-1.amazonaws.com/portfolio/test_port_3.png'],
  ['Advertiser Dashboard', 'https://terryhome.s3.us-west-1.amazonaws.com/portfolio/test_port_4.png'],
  ['Inquiry Review & Submit', 'https://terryhome.s3.us-west-1.amazonaws.com/portfolio/test_port_5.png'],
] as const;

const sections = [
  ['About Me', 'aboutus'],
  ['Skills', 'skillset'],
  ['Experience', 'experience'],
  ['Education', 'education'],
  ['Portfolio', 'ourwork'],
  ['Contact', 'contact'],
] as const;

export function PortfolioPage() {
  const menuPanelRef = useRef<HTMLElement>(null);
  const menuLinksRef = useRef<(HTMLLIElement | null)[]>([]);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroDescriptionRef = useRef<HTMLHeadingElement>(null);
  const heroCtaRef = useRef<HTMLAnchorElement>(null);
  const heroVisualRef = useRef<HTMLDivElement>(null);
  const [skillIndex, setSkillIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

  const selectSkill = (nextIndex: number) => {
    setSkillIndex((nextIndex + skillItems.length) % skillItems.length);
  };

  useLayoutEffect(() => {
    if (!menuPanelRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const menuLinks = menuLinksRef.current.filter(
      (link): link is HTMLLIElement => link !== null,
    );
    const timeline = gsap.timeline();
    const heroHeading = heroHeadingRef.current;
    const heroDescription = heroDescriptionRef.current;
    const heroCta = heroCtaRef.current;
    const heroVisual = heroVisualRef.current;
    const canAnimateHero = !prefersReducedMotion
      && heroHeading
      && heroDescription
      && heroCta
      && heroVisual;
    const headingSplitText = canAnimateHero ? new SplitText(heroHeading, { type: 'chars' }) : null;
    const descriptionSplitText = canAnimateHero ? new SplitText(heroDescription, { type: 'chars' }) : null;

    if (headingSplitText && descriptionSplitText && heroCta && heroVisual) {
      gsap.set([headingSplitText.chars,descriptionSplitText.chars ], { autoAlpha: 0 });
      gsap.set(heroCta, { autoAlpha: 0, y: 16 });
      gsap.set(heroVisual, { autoAlpha: 0, scale: 1.02, y: 200 });
    }

    timeline.fromTo(
      menuPanelRef.current,
      { autoAlpha: 0, y: -12 },
      { autoAlpha: 1, duration: prefersReducedMotion ? 0 : 0.3, ease: 'power3.out', y: 0 },
    );
    timeline.fromTo(
      menuLinks,
      { autoAlpha: 0, y: -8 },
      {
        autoAlpha: 1,
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: 'power3.out',
        stagger: prefersReducedMotion ? 0 : 0.09,
        y: 0,
      },
      prefersReducedMotion ? 0 : 0.09,
    );
    if (headingSplitText && descriptionSplitText && heroCta && heroVisual) {
      timeline.to(headingSplitText.chars, {
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power1.in',
        stagger: 0.05,
      }, '-=0.5');

      timeline.to(descriptionSplitText.chars, {
        autoAlpha: 1,
        duration: 0.35,
        ease: 'power1.in',
        stagger: 0.012,
      }, '-=0.8');

      const ctaAndImagePosition = '>';
      timeline.to(heroCta, {
        autoAlpha: 1,
        duration: 0.45,
        ease: 'power3.out',
        y: 0,
      }, '-=0.5');
      timeline.to(heroVisual, {
        autoAlpha: 1,
        duration: 0.8,
        ease: 'power3.out',
        scale: 1,
        y: 0,
      }, '-=0.5');
    }

    return () => {
      timeline.kill();
      descriptionSplitText?.revert();
      headingSplitText?.revert();
    };
  }, []);

  return (
    <div className="wrapper noGap" id="wrapper">
      <header>
        <div className="menu">
          <nav className="navbar-wrapper" ref={menuPanelRef}>
              <div className="container">
                <div className="navwrapper">
                  <div className="navbar navbar-inverse navbar-static-top">
                    <div className="container">
                      <div className="navArea">
                        <ul className="nav navbar-nav">
                          <li className="menuItem"><a href="#wrapper">Home</a></li>
                          {sections.map(([label, id], index) => (
                            <li className="menuItem" key={id} ref={(element) => { menuLinksRef.current[index] = element; }}>
                              <a href={`#${id}`}>{label}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </nav>
        </div>
        <section className="banner row" id="banner">
          <div className="bannerText">
            <p className="hero-kicker">✦ Software Engineer</p>
            <h1 ref={heroHeadingRef}>Hello, I&apos;m <span>Taegyu.</span></h1>
            <h3 ref={heroDescriptionRef}>I turn complex ideas into simple, intuitive, and meaningful digital experiences.</h3>
            <a className="hero-cta" href="#aboutus" ref={heroCtaRef}>Learn more about me <span aria-hidden="true">→</span></a>
          </div>
          <div className="slides-container" ref={heroVisualRef}>
            <div className="slide">
              <div className="patternOverlay" aria-hidden="true" />
              <img
                src="https://terryhome.s3.us-west-1.amazonaws.com/hero/landing_image_1.png"
                alt=""
              />
            </div>
          </div>
        </section>
      </header>

      <main>
        <Section className="aboutus" id="aboutus" title="About me">
            <div className="row">
              <div id="profile-img" className="col-lg-4 col-md-4 col-sm-4 col-xs-12 pull-right media">
                <img src="https://terryhome.s3.us-west-1.amazonaws.com/aboutme_img.jpg" alt="Taegyu Leem" />
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-xs-12 pull-left media">
                <p id="about-me">
                  I’ve been a software engineer with focus on frontend for over 3 years. I care deeply about making people’s lives more enjoyable and easy to navigate online.
                  <br /><br />Before becoming a software engineer, I had a unique career as a professional teppanyaki chef for 8 years.
                  <br /><br />After finishing Hack Reactor, I became employee #1 at Veeh and worked directly with three founders through the Alchemist Accelerator program.
                  <br /><br />Right now, I’m excited to apply my skill set to build more complicated applications and become a more seasoned full-stack software engineer.
                </p>
                <a href="/resume/Resume_Fall2020.pdf" download className="btn btn-primary btn-lg">Resume</a>
              </div>
            </div>
        </Section>

        <Section className="skillset" headingId="skills-header" id="skillset" title="Skills">
            <div id="carousel">
              <div
                id="skill-carousel-container"
                style={{ transform: `rotateY(${-skillIndex * 60}deg)` }}
              >
                {skillItems.map(([name, image], index) => (
                  <button
                    className="skill-card"
                    key={name}
                    type="button"
                    aria-pressed={skillIndex === index}
                    onClick={() => selectSkill(index)}
                    style={{
                      transform: `rotateY(${index * 60}deg) translateZ(300px)`,
                      opacity: skillIndex === index ? 1 : 0.1,
                    }}
                  >
                    <img src={image} alt="" />
                    <span className="skill-title">{name}</span>
                  </button>
                ))}
              </div>
              <div className="tc-btn-container">
                <button className="tc-prev" type="button" onClick={() => selectSkill(skillIndex - 1)}>Previous</button>
                <button className="tc-next" type="button" onClick={() => selectSkill(skillIndex + 1)}>Next</button>
              </div>
            </div>
            <div className="skills-mobile-grid" role="list">
              {skillItems.map(([name, image]) => (
                <div className="skills-mobile-card" key={name} role="listitem">
                  <img src={image} alt="" />
                  <span>{name}</span>
                </div>
              ))}
            </div>
        </Section>

        <Section className="myexperties" id="experience" title="Experience">
            <div className="row media">
              <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3"><div id="exp-date" className="expertiesico">Oct, 2017<br />Present</div></div>
              <div className="expertiesdesc col-xs-12 col-sm-9 col-md-9 col-lg-9">
                <h4>Veeh</h4><h5>Software Engineer</h5>
                <ul id="responsibility" className="exp-list">
                  <li>Worked directly with founders as employee #1.</li>
                  <li>Owned the React and Redux front end for a two-sided marketplace.</li>
                  <li>Launched a machine-learning camera sensor for audience demographics.</li>
                  <li>Built internal tools, APIs, deployment, backup, and migration processes.</li>
                </ul>
              </div>
            </div>
        </Section>

        <Section className="educationdiploma" id="education" title="Education">
            <div className="row media educations">
              <div className="left"><div className="expertiesico"><img src="https://terryhome.s3.us-west-1.amazonaws.com/logos/hackreactor.png" alt="Hack Reactor" /></div><div className="name"><h4>Hack Reactor</h4><h5>Full Stack Web Development</h5></div></div>
              <div className="right"><div className="expertiesico"><img src="https://terryhome.s3.us-west-1.amazonaws.com/logos/daelim.png" alt="Daelim University" /></div><div className="name"><h4>Daelim University</h4><h5>BS Mechanical Engineering</h5></div></div>
            </div>
        </Section>

        <Section className="protfolio" id="ourwork" title="Portfolio">
          <div className="row">
            <div className="portfolio-list one">
              <div className="column">
                <div className="left">
                  <button className="portfolio-image-button" type="button" onClick={() => setGalleryIndex(0)} aria-label="Open Veeh portfolio gallery">
                    <img src={gallery[0][1]} alt="Veeh landing page" className="hover-shadow cursor" />
                  </button>
                </div>
                <div className="right">
                  <div className="project-name-container">Veeh</div>
                  <div className="about-company">Veeh is an Alchemist Accelerator-backed B2B marketplace with $40,000+ monthly transactions that helps advertisers hyper-target audiences through local businesses.</div>
                </div>
              </div>
            </div>
            <div className="portfolio-list two">
              <div className="column">
                <div className="left"><video controls><source src="https://terryhome.s3.us-west-1.amazonaws.com/Tensorflow_lite_project.mp4" type="video/mp4" /></video></div>
                <div className="right">
                  <div className="project-name-container">Audience Detector</div>
                  <div className="about-company">Launched a machine-learning camera sensor device for audience demographic analytics.</div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section className="contactDetails" id="contact" title="Get In Touch">
          <div className="contact-cta">
            <p>Have a project or idea you&apos;d like to discuss?</p>
            <a
              className="contact-email"
              href="mailto:taegyuleem@gmail.com?subject=Portfolio%20inquiry"
            >
              Send an email <span aria-hidden="true">→</span>
            </a>
            <p className="contact-note">Opens your preferred email app.</p>
          </div>
        </Section>
      </main>

      <footer className="footer" id="footer">
        <a href="https://github.com/impersin" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/impersin/" target="_blank" rel="noreferrer">LinkedIn</a>
        <p><a href="#wrapper">Back to top</a></p>
      </footer>

      {galleryIndex !== null && (
        <div className="modal portfolio-modal" role="dialog" aria-modal="true" aria-label="Veeh portfolio gallery" onMouseDown={(event) => { if (event.currentTarget === event.target) setGalleryIndex(null); }}>
          <div className="modal-content">
            <button className="close cursor" type="button" onClick={() => setGalleryIndex(null)} aria-label="Close gallery">×</button>
            <img src={gallery[galleryIndex][1]} alt={gallery[galleryIndex][0]} />
            <button className="prev" type="button" onClick={() => setGalleryIndex((galleryIndex - 1 + gallery.length) % gallery.length)} aria-label="Previous image">‹</button>
            <button className="next" type="button" onClick={() => setGalleryIndex((galleryIndex + 1) % gallery.length)} aria-label="Next image">›</button>
            <div className="caption-container"><div id="caption">{gallery[galleryIndex][0]}</div></div>
            <div className="thumbnail-container">
              {gallery.map(([label, image], index) => <button className={`gallery-thumbnail ${galleryIndex === index ? 'active' : ''}`} type="button" key={image} onClick={() => setGalleryIndex(index)}><img src={image} alt={label} /></button>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
