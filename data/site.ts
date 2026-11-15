// All personal info and links live here. Replace the TODO values.
export const site = {
  name: "Taylor Moed",
  handle: "taylor.moed",
  location: "Houston, TX",
  status: "Open to 2027 new-grad roles",

  email: "taylor.moed.dev@gmail.com",
  github: "https://github.com/TaylorMoed",
  linkedin: "https://www.linkedin.com/in/TaylorMoed",

  // PDFs live in public/resumes/. The Resume buttons show these as a menu.
  resumes: [
    { label: "Software Engineering", href: "/resumes/Taylor_Moed_Software_Engineer.pdf" },
    { label: "Data Engineering", href: "/resumes/Taylor_Moed_Data_Engineering.pdf" },
  ],

  // Set to e.g. "/photo.jpg" once you add an image to public/
  photo: "/headshot-linkedin.jpg" as string | null,

  // Headline: the highlighted words get a hand-drawn underline
  headline: { before: "Hi, I\u2019m Taylor. I build full-stack apps and", highlight: "computer-vision", after: "projects." },
  timezone: "America/Chicago",
  intro:
    "Computer Science senior at Prairie View A&M (Data Science concentration, May 2027). I take products from data model to deployed UI with React, TypeScript, Node.js and PostgreSQL.",

  about: [
    "I’m a CS senior at Prairie View A&M University with a Data Science concentration, graduating in May 2027. I like projects where software meets the physical world — like teaching a camera to read a chessboard — and building tools people actually use day to day.",
    "For nearly three years I worked part-time on the sales floor at Adidas while taking a full course load, which taught me to manage my time and stay reliable under pressure.",
    "Coursework: Data Structures & Algorithms, Software Engineering, Operating Systems, Database Systems, Machine Learning, Information Retrieval.",
  ],

  skills: [
    { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "Java", "C/C++", "SQL", "Swift"] },
    { label: "Frameworks & libraries", items: ["React", "Node.js", "SwiftUI", "Pandas", "scikit-learn", "OpenCV"] },
    { label: "Backend & data", items: ["REST APIs", "PostgreSQL", "Supabase", "OCR"] },
    { label: "Tools", items: ["Git", "GitHub", "Vercel", "VS Code", "Xcode"] },
  ],

  experience: [
    {
      role: "AI Trainer",
      company: "Handshake AI",
      dates: "Jan 2026 – Aug 2026",
      points: [
        "Stress-tested frontier AI models on computer science and coding problems, grading responses for correctness, reasoning, and code quality against strict evaluation rubrics.",
        "Authored hard prompts and expert reference solutions designed to break models, surfacing failure modes that fed directly into AI training data.",
      ],
    },
    {
      role: "Sales Floor Associate",
      company: "Adidas",
      dates: "Aug 2023 – Jun 2026",
      points: [
        "Delivered fast, accurate service in a high-volume retail store, matching customers to products by fit, use case, and live inventory.",
        "Kept the floor stocked and launch-ready to brand standards through product launches and holiday peaks, the store’s highest-traffic periods.",
        "Held a part-time role for nearly three years while carrying a full-time Computer Science course load.",
      ],
    },
  ],

  contact:
    "I’m looking for full-time software and data engineering roles starting after May 2027, in Houston, Austin or remote.",
};
