export type PollOption = {
  id: string;
  label: string;
  percent: number;
};

export type Poll = {
  id: string;
  community: string;
  question: string;
  time: string;
  totalVotes: string;
  comments: string;
  options: PollOption[];
};

export const POLLS: Poll[] = [
  {
    id: "1",
    community: "r/DeveloperJobs",
    question: "What stack are you using for your next side project?",
    time: "8h",
    totalVotes: "3.2k",
    comments: "210",
    options: [
      { id: "1", label: "React + Node", percent: 46 },
      { id: "2", label: "React Native + Expo", percent: 32 },
      { id: "3", label: "Next.js full‑stack", percent: 18 },
      { id: "4", label: "Something else", percent: 4 },
    ],
  },
  {
    id: "2",
    community: "r/TwenteisIndia",
    question: "Best time to code after a full‑time job?",
    time: "1d",
    totalVotes: "1.1k",
    comments: "98",
    options: [
      { id: "1", label: "Early morning", percent: 21 },
      { id: "2", label: "Evening", percent: 43 },
      { id: "3", label: "Late night", percent: 31 },
      { id: "4", label: "Weekends only", percent: 5 },
    ],
  },
];

export type FeedPost = {
  id: string;
  community: string;
  author: string;
  time: string;
  title: string;
  body?: string;
  votes: string;
  comments: string;
  shares: string;
  isPromoted?: boolean;
  hasImage?: boolean;
};

export const FEED_FALLBACK: FeedPost[] = [
  {
    id: "1",
    community: "r/DeveloperJobs",
    author: "u/frontend_guy",
    time: "11h",
    title: "Hi, I'm a software developer",
    body: "Ask me anything about getting started with React Native and Expo.",
    votes: "435",
    comments: "93",
    shares: "12",
  },
  {
    id: "2",
    community: "u/SpaXialAI • Promoted",
    author: "u/SpaXialAI",
    time: "Sponsored",
    title: "Stop grinding. Create more. AI that gets gameplay.",
    body: "",
    votes: "1.2k",
    comments: "210",
    shares: "58",
    isPromoted: true,
    hasImage: true,
  },
  {
    id: "3",
    community: "r/DeveloperJobs",
    author: "u/hiring_now",
    time: "10h",
    title: "[HIRING] Junior Developer – (Remote) – English Required",
    body: "1–2 years of experience • React / Node • Good communication • Available full‑time.",
    votes: "4.0k",
    comments: "320",
    shares: "94",
  },
  {
    id: "4",
    community: "r/TwenteisIndia",
    author: "u/daemon5921",
    time: "20h",
    title: "Girls' Ovulation is Crazyyy",
    body: "So so so yesterday night randomly I met a girl on Discord...",
    votes: "1.0k",
    comments: "290",
    shares: "73",
  },
];

