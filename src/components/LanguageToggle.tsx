"use client";

import React from 'react';
import Link from 'next/link';
import type { Locale } from '@/types';
import { getTranslations } from '@/i18n/translations';

interface LanguageToggleProps {
  locale: Locale;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ locale }) => {
  const copy = getTranslations(locale);

  return (
    <Link
      href={copy.otherLanguageHref}
      prefetch={false}
      aria-label={copy.otherLanguageAriaLabel}
      className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800 px-3 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <svg
        className="h-4 w-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
      </svg>
      <span lang={copy.otherLanguageCode}>{copy.otherLanguageLabel}</span>
    </Link>
  );
};

export default LanguageToggle;
