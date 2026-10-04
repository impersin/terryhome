'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef, type ReactNode } from 'react';

gsap.registerPlugin(ScrollTrigger);

type SectionHeadingPosition = 'center' | 'left';

interface SectionProps {
  children: ReactNode;
  className?: string;
  headingAccessory?: ReactNode;
  headingId?: string;
  id: string;
  position?: SectionHeadingPosition;
  title: string;
}

export function Section({
  children,
  className = '',
  headingAccessory,
  headingId,
  id,
  position = 'center',
  title,
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      const revealTargets = section.querySelectorAll<HTMLElement>(
        ':scope > .section-container > *',
      );

      gsap.from(revealTargets, {
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        y: 50,
        scrollTrigger: {
          once: true,
          start: 'top 75%',
          trigger: section,
        },
      });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section className={`content-section ${className}`.trim()} id={id} ref={sectionRef}>
      <div className="container section-container">
        <header className={`heading section-heading section-heading--${position}`}>
          <h2 id={headingId}>{title}</h2>
          {headingAccessory && <div className="section-heading-accessory">{headingAccessory}</div>}
        </header>
        {children}
      </div>
    </section>
  );
}
