'use client';

import { FormEvent, useState } from 'react';

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

type ContactStatus = { type: 'error' | 'success'; message: string } | null;

export function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [skillIndex, setSkillIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [contactStatus, setContactStatus] = useState<ContactStatus>(null);

  const selectSkill = (nextIndex: number) => {
    setSkillIndex((nextIndex + skillItems.length) % skillItems.length);
  };

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setContactStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          comments: formData.get('comments'),
        }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { error?: string; message?: string }
        | null;

      if (!response.ok) {
        setContactStatus({
          type: 'error',
          message: payload?.error ?? 'Your message could not be sent. Please try again.',
        });
        return;
      }

      form.reset();
      setContactStatus({
        type: 'success',
        message: payload?.message ?? 'Thanks! Your message has been sent.',
      });
    } catch {
      setContactStatus({
        type: 'error',
        message: 'Your message could not be sent. Check your connection and try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="wrapper noGap" id="wrapper">
      <header>
        <div className="menu">
          <button
            className="nav-icon"
            type="button"
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
          <nav className={`navbar-wrapper ${menuOpen ? 'is-open' : 'default-menu'}`}>
            <button
              className="closeMenu"
              type="button"
              aria-label="Close navigation"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>
            <ul className="nav navbar-nav">
              <li className="menuItem"><a href="#wrapper" onClick={() => setMenuOpen(false)}>Home</a></li>
              {sections.map(([label, id]) => (
                <li className="menuItem" key={id}>
                  <a href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <section className="banner row" id="banner">
          <div className="bannerText">
            <h1>Taegyu Leem</h1>
            <h3>Full Stack Developer</h3>
          </div>
          <div className="slides-container">
            <div className="slide">
              <img
                src="https://terryhome.s3.us-west-1.amazonaws.com/hero/landing_image_1.png"
                alt=""
              />
            </div>
          </div>
        </section>
      </header>

      <main>
        <section className="aboutus" id="aboutus">
          <div className="container">
            <div className="heading"><h2>About me</h2></div>
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
          </div>
        </section>

        <section className="skillset" id="skillset">
          <div className="container">
            <div className="heading"><h2 id="skills-header">Skills &amp; Expertise</h2></div>
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
          </div>
        </section>

        <section className="myexperties" id="experience">
          <div className="container">
            <div className="heading"><h2>Experience</h2></div>
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
          </div>
        </section>

        <section className="educationdiploma" id="education">
          <div className="container">
            <div className="heading"><h2>Education</h2></div>
            <div className="row media educations">
              <div className="left"><div className="expertiesico"><img src="https://terryhome.s3.us-west-1.amazonaws.com/logos/hackreactor.png" alt="Hack Reactor" /></div><div className="name"><h4>Hack Reactor</h4><h5>Full Stack Web Development</h5></div></div>
              <div className="right"><div className="expertiesico"><img src="https://terryhome.s3.us-west-1.amazonaws.com/logos/daelim.png" alt="Daelim University" /></div><div className="name"><h4>Daelim University</h4><h5>BS Mechanical Engineering</h5></div></div>
            </div>
          </div>
        </section>

        <section className="protfolio" id="ourwork">
          <div className="heading portfolio-heading"><h2>Portfolio</h2></div>
          <div className="row">
            <article className="portfolio-list one">
              <button className="portfolio-image-button" type="button" onClick={() => setGalleryIndex(0)} aria-label="Open Veeh portfolio gallery">
                <img src={gallery[0][1]} alt="Veeh landing page" className="hover-shadow cursor" />
              </button>
              <div className="right"><div className="project-name-container"><a href="https://www.veeh.co" target="_blank" rel="noreferrer">Veeh</a></div><p className="about-company">Veeh is an Alchemist Accelerator-backed B2B marketplace that helps advertisers hyper-target audiences through local businesses.</p></div>
            </article>
            <article className="portfolio-list two">
              <div className="left"><video controls><source src="https://terryhome.s3.us-west-1.amazonaws.com/Tensorflow_lite_project.mp4" type="video/mp4" /></video></div>
              <div className="right"><div className="project-name-container">Audience Detector</div><p className="about-company">Launched a machine-learning camera sensor device for audience demographic analytics.</p></div>
            </article>
          </div>
        </section>

        <section className="contactDetails" id="contact">
          <div className="container">
            <div className="heading"><h2>Get In Touch</h2><h3><a href="mailto:taegyuleem@gmail.com">taegyuleem@gmail.com</a></h3></div>
            <form className="conForm contact-form" onSubmit={submitContact}>
              <label htmlFor="name">Name</label>
              <input id="name" name="name" required maxLength={100} />
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required />
              <label htmlFor="comments">Message</label>
              <textarea id="comments" name="comments" required maxLength={5000} rows={6} />
              {contactStatus && <p role="status" className={contactStatus.type === 'error' ? 'error_message' : 'success_message'}>{contactStatus.message}</p>}
              <button className="submitBnt" type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Send message'}</button>
            </form>
          </div>
        </section>
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
