export interface SocialLink {
    label: string;
    href: string;
    icon: string;
    isExternal: boolean;
}

export interface Goal {
    text: string;
}

export interface Project {
    title: string;
    description: string;
    icon: string;
    borderColor: string;
    flickering?: boolean;
}

export const SOCIAL_LINKS: SocialLink[] = [
    { label: "GitHub", href: "https://github.com/Abhinoob1501", icon: "✩", isExternal: true },
    { label: "Twitter", href: "https://x.com/Abhi_noob_", icon: "✩", isExternal: true },
    { label: "Discord", href: "https://discord.gg/GWu74z5M", icon: "✩", isExternal: true },
    { label: "Email", href: "mailto:abhinavpratapsingh1501@gmail.com", icon: "✩", isExternal: false },
    { label: "Resume", href: "/resume", icon: "✩", isExternal: false },
];

export const ABOUT_HIGHLIGHTS = [
    { text: "Ex ML Intern at IIT-D specializing in fairness-aware models & NLP", color: "text-green-300" },
    { text: "Built compilers, conversational AI, and full-stack applications", color: "text-green-300" },
    { text: "Passionate about NLP, Generative AI, and system programming", color: "text-green-300" },
    { text: "AI Team Lead — AWS Cloud Club", color: "text-green-300" },
    { text: "📍 Delhi, India • Open to remote opportunities", color: "text-purple-400" },
];

export const PROJECTS: Project[] = [
    {
        title: "Compiler-BUBBLE",
        description: "A light weight compiler to run my own language bubble",
        icon: "☾",
        borderColor: "border-gray-800",
        flickering: true,
    },
    {
        title: "GPTree",
        description: "Chatgpt if we had a tree structure to map our minds while working",
        icon: "☾",
        borderColor: "border-blue-900",
    },
    {
        title: "AI context sharer chrome extension",
        description: "Sharing AI context seamlessly across platforms",
        icon: "☾",
        borderColor: "border-purple-800",
    },
    {
        title: "Research Work on Fairness in ML",
        description: "In Progress...",
        icon: "☾",
        borderColor: "border-green-800",
    },
];

export const SHORT_TERM_GOALS: Goal[] = [
    { text: "Land an Intern ship again (PLEASE HIRE ME)" },
    { text: "Make some cool projects" },
    { text: "Maintain my gpa" },
    { text: "Stay fit" },
];

export const LONG_TERM_GOALS: Goal[] = [
    { text: "Land dream tech job" },
    { text: "be happy??" },
];

export const MARQUEE_SKILLS_TOP = [
    "🤖 PYTORCH 🤖",
    "🧠 MACHINE LEARNING & NLP 🧠",
    "⚡ GENERATIVE AI & LANGCHAIN ⚡",
    "📊 FAIRNESS-AWARE MODELS 📊",
    "🚀 BUILDING WITH NEXT.JS & RAG 🚀",
];

export const MARQUEE_SKILLS_BOTTOM = [
    "⚡ NEXT.JS ⚡",
    "💻 REACT & NODE.JS 💻",
    "🛠️ EXPRESS & MONGODB 🛠️",
    "🎨 TAILWIND CSS 🎨",
    "🚀 FULL-STACK DEVELOPMENT 🚀",
];

export const HASHTAGS = [
    { tag: "#MachineLearning", bgColor: "bg-cyan-800/30", borderColor: "border-cyan-800", textColor: "text-cyan-300" },
    { tag: "#FullStack", bgColor: "bg-purple-800/30", borderColor: "border-purple-800", textColor: "text-purple-300" },
    { tag: "#OpenSource", bgColor: "bg-green-800/30", borderColor: "border-green-800", textColor: "text-green-300" },
    { tag: "#Innovation", bgColor: "bg-yellow-800/30", borderColor: "border-yellow-800", textColor: "text-yellow-300" },
];
