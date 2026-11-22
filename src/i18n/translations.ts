import type { Metadata } from 'next';
import type { Locale } from '@/types';

const SITE_URL = 'https://connections.tomer.dev';

export interface EditionCopy {
  metaTitle: string;
  metaDescription: string;
  title: string;
  instructions: string;
  loadingGame: string;
  loadingPuzzle: string;
  difficultyHeading: string;
  difficultyLabels: Record<number, string>;
  submit: (selectedCount: number) => string;
  mistakes: (mistakesCount: number) => string;
  invalidConnection: string;
  solvedGroups: string;
  victoryTitle: string;
  victoryMessage: string;
  playAnother: string;
  gameOverTitle: string;
  gameOverMessage: string;
  allConnectionsHeading: string;
  tryAgain: string;
  switchToLight: string;
  switchToDark: string;
  otherLanguageLabel: string;
  otherLanguageAriaLabel: string;
  otherLanguageHref: string;
  otherLanguageCode: Locale;
  selectDateAriaLabel: string;
  footerLine1: string;
  footerLine2: string;
}

const TRANSLATIONS: Record<Locale, EditionCopy> = {
  en: {
    metaTitle: 'Connections',
    metaDescription: 'A clone of the New York Times Connections word game',
    title: 'Connections',
    instructions:
      'Find groups of four items that share a common connection. Select four items and submit your guess. You have four mistakes allowed. The categories are ordered from easiest (yellow) to hardest (purple).',
    loadingGame: 'Loading game...',
    loadingPuzzle: 'Loading puzzle...',
    difficultyHeading: 'Difficulty Levels:',
    difficultyLabels: {
      0: 'Easy',
      1: 'Medium',
      2: 'Hard',
      3: 'Very Hard',
    },
    submit: (selectedCount) => `Submit (${selectedCount}/4)`,
    mistakes: (mistakesCount) => `Mistakes: ${mistakesCount}/4`,
    invalidConnection: 'Not a valid connection. Try again!',
    solvedGroups: 'Solved Groups:',
    victoryTitle: 'Victory!',
    victoryMessage: 'You solved all the connections!',
    playAnother: 'Play Another Puzzle',
    gameOverTitle: 'Game Over',
    gameOverMessage: 'You made too many mistakes',
    allConnectionsHeading: 'Here are all the connections:',
    tryAgain: 'Try Again',
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
    otherLanguageLabel: 'עברית',
    otherLanguageAriaLabel: 'Switch to Hebrew edition',
    otherLanguageHref: '/he',
    otherLanguageCode: 'he',
    selectDateAriaLabel: 'Select puzzle date',
    footerLine1: 'This is a clone of the New York Times Connections game.',
    footerLine2: 'Created for educational purposes only.',
  },
  he: {
    metaTitle: 'קשרים',
    metaDescription: 'משחק קשרים בעברית — מצאו ארבע קבוצות של ארבע מילים שיש ביניהן קשר משותף.',
    title: 'קשרים',
    instructions:
      'מצאו קבוצות של ארבע מילים שיש ביניהן קשר משותף. בחרו ארבע מילים ושלחו את הניחוש. מותרות עד ארבע טעויות. הקטגוריות מסודרות מהקלה ביותר (צהוב) ועד לקשה ביותר (סגול).',
    loadingGame: 'טוען משחק...',
    loadingPuzzle: 'טוען חידה...',
    difficultyHeading: 'רמות קושי:',
    difficultyLabels: {
      0: 'קל',
      1: 'בינוני',
      2: 'קשה',
      3: 'קשה מאוד',
    },
    submit: (selectedCount) => `שליחה (${selectedCount}/4)`,
    mistakes: (mistakesCount) => `טעויות: ${mistakesCount}/4`,
    invalidConnection: 'זה לא קשר תקין. נסו שוב!',
    solvedGroups: 'קבוצות שנפתרו:',
    victoryTitle: 'ניצחון!',
    victoryMessage: 'פתרתם את כל הקשרים!',
    playAnother: 'חידה נוספת',
    gameOverTitle: 'המשחק הסתיים',
    gameOverMessage: 'נגמרו הטעויות המותרות',
    allConnectionsHeading: 'אלה כל הקשרים:',
    tryAgain: 'משחק חדש',
    switchToLight: 'מעבר לערכת צבעים בהירה',
    switchToDark: 'מעבר לערכת צבעים כהה',
    otherLanguageLabel: 'English',
    otherLanguageAriaLabel: 'מעבר למהדורה האנגלית',
    otherLanguageHref: '/',
    otherLanguageCode: 'en',
    selectDateAriaLabel: 'בחירת תאריך חידה',
    footerLine1: 'גרסה בעברית בהשראת משחק Connections של הניו יורק טיימס.',
    footerLine2: 'נוצר למטרות לימוד והנאה בלבד.',
  },
};

export const getTranslations = (locale: Locale): EditionCopy => TRANSLATIONS[locale];

export const getEditionMetadata = (locale: Locale): Metadata => {
  const copy = getTranslations(locale);
  const canonical = locale === 'he' ? `${SITE_URL}/he` : `${SITE_URL}/`;

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/`,
        he: `${SITE_URL}/he`,
        'x-default': `${SITE_URL}/`,
      },
    },
  };
};
