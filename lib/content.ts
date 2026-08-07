import { IMG, type Asset } from './assets'

export const SITE = {
  name: 'Spark',
  parent: 'Fanbase',
  tagline: 'Break The Story',
  description:
    'Spark is where the culture speaks first. It is a news network where creators go to break what is happening now.',
  city: 'Atlanta',
} as const

/** Real headlines from the product. Used in the top wire strip. */
export const WIRE = [
  '4+ hour TSA delays at Hartsfield-Jackson',
  'APS board to vote on wiping $280K in student meal debt',
  'Fulton soup kitchen raises $2 million in 24hr',
] as const

export const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'About', href: '/about' },
] as const

/* ------------------------------------------------------------------ home */

export type Surface = {
  title: string
  /** When set, the card title renders as the red status chip from the design. */
  chip?: boolean
  body: string
  image: Asset
  alt: string
}

export const SURFACES: Surface[] = [
  {
    title: 'Feed',
    body: 'Unravel the conversation through posting, photo, and video.',
    image: IMG.cardFeed,
    alt: 'The Spark feed on iPhone showing posts from across the city',
  },
  {
    title: 'BREAKING',
    chip: true,
    body: 'Automatically identifies real time, relevant events, from breaking news to cultural moments.',
    image: IMG.cardBreaking,
    alt: 'A breaking post in the Spark feed with live video from the scene',
  },
  {
    title: 'Map',
    body: 'Discover events as they are happening nearby.',
    image: IMG.cardMap,
    alt: 'The Spark live map on iPhone with activity pinned across the city',
  },
]

export type Audience = {
  id: 'neighbors' | 'creators' | 'newsrooms'
  title: string
  body: string
  points: string[]
  background: string
}

export const AUDIENCES: Audience[] = [
  {
    id: 'neighbors',
    title: 'Neighbors',
    body: 'Know what is happening on your street before it reaches a newsroom.',
    points: ['Live local feed', 'Events near you', 'Breaking alerts'],
    background: 'var(--surf)',
  },
  {
    id: 'creators',
    title: 'Creators',
    body: 'Get paid for the coverage you already do.',
    points: ['Creator Studio', 'Partner+ ad program', 'Subscriptions'],
    background: 'var(--sky)',
  },
  {
    id: 'newsrooms',
    title: 'Newsroom',
    body: 'Source your next story and highlight what is happening in your community.',
    points: ['Breaking badge', 'Community notes', 'Cited sources'],
    background: 'var(--lav)',
  },
]

/** Launch collateral. Every claim maps to a shipped product surface. */
export const TRUST = [
  {
    title: 'Community notes',
    body: 'Anyone can request a note on a post. Context lands next to the claim, not three days later in a correction.',
  },
  {
    title: 'Cited sources',
    body: 'Every Morning Digest shows what it read and when it was last updated, so you can go check it yourself.',
  },
  {
    title: 'Opposite sides',
    body: 'Contested stories are shown from both directions by default, before you form the opinion.',
  },
] as const

/* --------------------------------------------------------------- features */

export type Feature = {
  id: string
  eyebrow: string
  title: string
  body: string
  points: string[]
  image: Asset
  alt: string
  /** Phone art is portrait and gets a device frame; wide art is shown as a panel. */
  shape: 'device' | 'panel'
}

export const FEATURES: Feature[] = [
  {
    id: 'feeds',
    eyebrow: 'Feeds',
    title: 'For You, and only the people you chose',
    body: 'Two feeds, and you decide which one you are in. For You is the live picture of your city as it moves. Following is exactly the accounts you picked, in order, with nothing inserted.',
    points: [
      'For You surfaces what is happening near you now',
      'Following stays strictly to the accounts you chose',
      'Breaking badges mark a story the moment it turns',
    ],
    image: IMG.cardFeed,
    alt: 'The Spark feed on iPhone with the For You and Following tabs',
    shape: 'panel',
  },
  {
    id: 'posting',
    eyebrow: 'Posting',
    title: 'Short-form text and video, from where it happened',
    body: 'Post in a few words or a few seconds. The people standing in the story file first, so coverage starts before anyone has written it up.',
    points: [
      'Text, photo, and video in one composer',
      'Polls, location, and GIF when they help',
      'Quote and repost to move a story forward',
    ],
    image: IMG.cardBreaking,
    alt: 'A video post in the Spark feed showing a live local incident',
    shape: 'panel',
  },
  {
    id: 'topics',
    eyebrow: 'Topics and discovery',
    title: 'Follow a story, not just an account',
    body: 'Spark groups posts into the events they belong to, so you can subscribe to a story and get every update in one place instead of scrolling for it.',
    points: [
      'Subscribe to a topic and follow it to the end',
      'Filter by Politics, Business, Entertainment, Health and wellness, Science',
      'Morning Digest turns the day into one brief with both sides',
    ],
    image: IMG.digest,
    alt: 'A Morning Digest topic brief on iPhone with a subscribe to topic control',
    shape: 'device',
  },
  {
    id: 'profiles',
    eyebrow: 'Profiles and credentials',
    title: 'Know who is telling you',
    body: 'A profile carries what you need to weigh a post: who the account is, what they cover, and whether the platform has verified them.',
    points: [
      'Verified badge shown only in its published state',
      'Role and interest badges say what an account covers',
      'Creator Studio for the people who report here full time',
    ],
    image: IMG.profile,
    alt: 'A Spark profile showing a verified badge and what the account covers',
    shape: 'device',
  },
  {
    id: 'search',
    eyebrow: 'Search and trending',
    title: 'Search the live world',
    body: 'Ask what is happening anywhere and get what is being reported right now, not the best-indexed page from last week.',
    points: [
      'Filter by Top, Latest, People, Videos, Photos',
      'Trending shows what the city is actually on',
      'The map answers where, the moment you ask',
    ],
    image: IMG.cardMap,
    alt: 'Spark search and the live map on iPhone with trending topics',
    shape: 'panel',
  },
]

export const REFERRAL = {
  eyebrow: 'Getting in',
  title: 'Invite only, on purpose',
  body: 'Spark is growing one neighbourhood at a time. An invite code creates your account. No code yet means the waitlist, and we open it city by city.',
  points: [
    'Redeem a code to create an account',
    'Join the waitlist if you do not have one',
    'Members get invites to pass on',
  ],
} as const

/* ------------------------------------------------------------------ about */

export const ABOUT = {
  lede: 'Spark is a news network where you are at the center of everything.',
  story: [
    'Most local news reaches you after the fact, flattened into one account of what happened. By then the moment has passed, the argument has already run, and you were never in the room for either.',
    'Spark starts from the opposite end. The people standing in a story file first. Their posts group into the event they belong to, land on a map at the block they came from, and turn into a brief that lays out every side before you pick one.',
    'The result is a live picture of a city that you can read in ten seconds or follow all day, built by the people who live in it.',
  ],
  community: {
    title: 'Who it is for',
    body: 'Spark is for the people already paying attention: neighbours who want to know what the sirens were about, newsrooms whose audience is arguing about the story right now, and creators who cover this city and should be paid for it.',
  },
  values: [
    {
      title: 'Fast is only worth it if it is true',
      body: 'Speed and accountability are the same product decision. Community notes land next to the claim, and every brief shows what it read.',
    },
    {
      title: 'Every angle, one story',
      body: 'Contested stories carry both arguments by default. You get the strongest version of each before you decide.',
    },
    {
      title: 'The city writes it',
      body: 'Coverage starts with the people who were there. Spark is the network that carries it, not the voice that replaces it.',
    },
  ],
  fanbase: {
    title: 'A Fanbase product',
    body: 'Spark is built by Fanbase, and shares its account system. If you already have a Fanbase account you can bring it with you.',
  },
  press: {
    title: 'Press and partnerships',
    body: 'For press enquiries, partnership questions, or newsroom access, get in touch and we will point you to the right person.',
    contact: 'press@spark.com',
  },
} as const

/* ----------------------------------------------------------------- footer */

export const FOOTER_COLUMNS = [
  {
    heading: 'Product',
    links: [
      { label: 'Feeds', href: '/features#feeds' },
      { label: 'Morning Digest', href: '/features#topics' },
      { label: 'Pulse map', href: '/features#search' },
      { label: 'Search', href: '/features#search' },
      { label: 'Creator Studio', href: '/features#profiles' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/about#press' },
      { label: 'Brand', href: '/about' },
      { label: 'Press', href: '/about#press' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Help', href: '/about#press' },
      { label: 'Learning Hub', href: '/features#profiles' },
      { label: 'Community notes', href: '/features#topics' },
      { label: 'Report a problem', href: '/about#press' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Terms', href: '/about' },
      { label: 'Privacy', href: '/about' },
      { label: 'Cookies', href: '/about' },
      { label: 'Guidelines', href: '/about' },
    ],
  },
] as const

export const SOCIALS = ['X', 'Instagram', 'TikTok', 'YouTube', 'LinkedIn'] as const

/* ------------------------------------------------- landing feature switcher */

/**
 * The landing "How Spark works" section. The phone follows whichever card is
 * active as you scroll, so the copy and the screen always agree.
 */
export type SwitchStep = {
  id: string
  title: string
  body: string
  /** Rendered as the red status chip instead of a text title. */
  chip?: boolean
  image: Asset
  alt: string
}

export const SWITCH_STEPS: SwitchStep[] = [
  {
    id: 'feed',
    title: 'Feed',
    body: 'Unravel the conversation through posting, photo, and video.',
    image: IMG.cardFeed,
    alt: 'The Spark feed on iPhone showing posts from across the city',
  },
  {
    id: 'breaking',
    title: 'BREAKING',
    chip: true,
    body: 'Automatically identifies real time, relevant events, from breaking news to cultural moments.',
    image: IMG.cardBreaking,
    alt: 'A breaking post in the Spark feed with live video from the scene',
  },
  {
    id: 'map',
    title: 'Map',
    body: 'Discover events as they are happening nearby.',
    image: IMG.cardMap,
    alt: 'The Spark live map on iPhone with activity pinned across the city',
  },
]
