/** DOX Interactive — Constants & Configuration */

export const FRAME_COUNT = 193;
export const FRAME_PATH = "/frames/frame_";
export const FRAME_EXT = ".png";

/** Preload batch sizes for progressive loading */
export const PRELOAD_BATCH_INITIAL = 20; // First 20 frames loaded immediately
export const PRELOAD_BATCH_SIZE = 30; // Subsequent batches

/** Hero text timeline — keyed to scroll progress (0–1) */
export interface HeroTextSegment {
  id: string;
  text: string;
  subtitle?: string;
  startProgress: number;
  endProgress: number;
}

export const HERO_TEXT_TIMELINE: HeroTextSegment[] = [
  {
    id: "intro",
    text: "DOX INTERACTIVE",
    subtitle: "Interactive Entertainment Studio",
    startProgress: 0,
    endProgress: 0.2,
  },
  {
    id: "door",
    text: "Every world begins with a door.",
    startProgress: 0.2,
    endProgress: 0.4,
  },
  {
    id: "stories",
    text: "Stories become worlds.",
    startProgress: 0.4,
    endProgress: 0.65,
  },
  {
    id: "worlds",
    text: "Worlds become memories.",
    startProgress: 0.65,
    endProgress: 0.85,
  },
  {
    id: "build",
    text: "We build both.",
    startProgress: 0.85,
    endProgress: 1.0,
  },
];

/** Philosophy statements */
export const PHILOSOPHY_STATEMENTS = [
  { highlight: "We don't build levels.", follow: "We build experiences." },
  { highlight: "Every mechanic", follow: "matters." },
  { highlight: "Every sound", follow: "matters." },
  { highlight: "Every frame", follow: "matters." },
];

/** Released games data */
export interface GameData {
  id: string;
  title: string;
  tagline: string;
  description: string;
  platforms: string[];
  color: string;
  gradient: string;
  image: string;
  link: string;
}

export const RELEASED_GAMES: GameData[] = [
  {
    id: "game-1",
    title: "LATENCY BREAKER",
    tagline: "Ping the system. Burn the servers. Survive the network.",
    description:
      "A relentless, top-down 2D cyber-shooter where speed is your armor and data is your only ammunition. Step into the shoes of a rogue operative and dismantle corrupt microservices from the inside out. Balance raw bandwidth consumption and survive escalating threat levels.",
    platforms: ["PC", "Web"],
    color: "#4a9eff",
    gradient: "linear-gradient(135deg, #020710 0%, #061530 50%, #020710 100%)",
    image: "/games/LATENCYBREAK-POSTER.jpeg",
    link: "https://dox-interactive.itch.io/latency-breaker",
  },
  {
    id: "game-2",
    title: "NEON RUSH",
    tagline: "Hover, Dodge, Reboot. Plunge into the neon grid.",
    description:
      "A high-octane 3-lane endless hoverboard runner that tests your reflexes in a sprawling metropolitan rail suspended high in the clouds. Dodge laser barriers, evade patrol drones, collect Energy Cubes, and unlock distinct cyber-runners in a stylized cyberpunk cityscape.",
    platforms: ["PC", "Mobile", "Web"],
    color: "#ff007f",
    gradient: "linear-gradient(135deg, #10020a 0%, #30061d 50%, #10020a 100%)",
    image: "/games/NEONRUSH-POSTER.jpeg",
    link: "https://dox-interactive.itch.io/neon-rush",
  },
  {
    id: "game-3",
    title: "EVOLVE",
    tagline: "Adapt. Mutate. Survive.",
    description:
      "A rogue-lite survival shooter where you don't just upgrade your weapons—you rewrite your bio-digital DNA. Stack over 15 mutations and purchase tactical hardware, but beware the Corruption Event that twists your powers into dangerous curses.",
    platforms: ["PC", "Mobile", "Web"],
    color: "#39ff14",
    gradient: "linear-gradient(135deg, #020c02 0%, #062406 50%, #020c02 100%)",
    image: "/games/EVOLVE-POSTER1.jpeg",
    link: "https://www.instagram.com/dox_interactive?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
];

/** Process / How We Build */
export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "vision",
    number: "01",
    title: "Vision",
    description:
      "Every project begins with an emotion. We define the feeling before the feature.",
    icon: "◇",
  },
  {
    id: "design",
    number: "02",
    title: "Design",
    description:
      "Form follows function. Every pixel, every interaction is deliberate and meaningful.",
    icon: "△",
  },
  {
    id: "development",
    number: "03",
    title: "Development",
    description:
      "Engineered for performance. Built with precision. Optimized for every platform.",
    icon: "□",
  },
  {
    id: "polish",
    number: "04",
    title: "Polish",
    description:
      "The difference between good and unforgettable lives in the details.",
    icon: "○",
  },
];

/** Trust metrics */
export interface TrustMetric {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export const TRUST_METRICS: TrustMetric[] = [
  { id: "released", value: 3, suffix: "", label: "Released Games" },
  { id: "development", value: 2, suffix: "", label: "In Development" },
  { id: "independent", value: 100, suffix: "%", label: "Independent" },
  { id: "community", value: 10, suffix: "K+", label: "Growing Community" },
];

/** Navigation links */
export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Games", href: "#games" },
  { label: "Future", href: "#future" },
  { label: "About", href: "#process" },
  { label: "Contact", href: "#cta" },
];
