import type { Metadata } from 'next';
import './bootstrap.css';
import './globals.scss';
import './skill-carousel.css';
import './custom-lightbox.css';

export const metadata: Metadata = {
  title: 'TAEGYU LEEM · Full Stack Developer',
  description: "TAEGYU LEEM's Resume & Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
