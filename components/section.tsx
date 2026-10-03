import type { ReactNode } from 'react';

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
  return (
    <section className={`content-section ${className}`.trim()} id={id}>
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
