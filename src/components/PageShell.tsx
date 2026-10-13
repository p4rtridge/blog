import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import site from '../../blog.config.json';

const sections = ['blog', 'about'] as const;

type Section = (typeof sections)[number];

type Props = {
  seoTitle: string;
  seoDescription?: string;
  current?: Section;
  children: React.ReactNode;
};

export function PageShell({ seoTitle, seoDescription, current, children }: Props) {
  const router = useRouter();
  const path = router.asPath === '/' ? '' : router.asPath;
  const canonical = `${site.url.replace(/\/$/, '')}${path}`;
  const ogImage = `${site.url.replace(/\/$/, '')}/api/og?title=${encodeURIComponent(seoTitle)}${seoDescription ? `&description=${encodeURIComponent(seoDescription)}` : ''}`;

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={canonical}
        openGraph={{ images: [{ url: ogImage }] }}
      />
      <div className="px-[clamp(20px,9vw,160px)] pb-40 pt-[clamp(48px,11vh,112px)]">
        <div className="mx-auto max-w-[80ch]">
          <header className="flex flex-wrap items-baseline justify-between gap-x-[3ch] gap-y-3">
            <Link href="/" className="font-pixel text-[28px] leading-none text-ink">
              {site.name}
            </Link>
            <nav className="flex gap-[2.5ch]">
              {sections.map((section) => (
                <Link
                  key={section}
                  href={`/${section}`}
                  aria-current={section === current ? 'page' : undefined}
                  className="faint-link aria-[current=page]:text-ink aria-[current=page]:underline aria-[current=page]:decoration-1 aria-[current=page]:underline-offset-[5px]"
                >
                  {section === 'about' ? 'About' : 'Blog'}
                </Link>
              ))}
            </nav>
          </header>
          {children}
        </div>
      </div>
    </>
  );
}
