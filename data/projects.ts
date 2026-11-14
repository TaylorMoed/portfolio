export type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  links: { label: string; href: string }[];
  // Image/GIF in public/ (e.g. "/projects/mofish.gif"). Until set, a placeholder shows.
  image?: string;
  // Looping demo clip (MP4 in public/). Plays muted; `image` is shown until it loads.
  video?: string;
  placeholder: string;
  theme: "dark" | "blue" | "sand" | "night";
};

// TODO: replace "#" links with real repo / demo URLs
export const projects: Project[] = [
  {
    title: "MoFish — Chess Analysis System",
    image: "/projects/mofish-poster.jpg",
    video: "/projects/mofish.mp4",
    category: "Computer vision",
    description:
      "A desktop app that finds a chessboard on your screen with OpenCV, reads the pieces, and tracks the game move by move. Stockfish suggests the best moves, and a coach panel explains them in plain English.",
    tags: ["Python", "OpenCV", "Stockfish", "Qt"],
    links: [
      { label: "Code", href: "#" },
      { label: "Demo video", href: "#" },
    ],
    placeholder: "Demo GIF: MoFish tracking a game with move arrows",
    theme: "dark",
  },
  {
    title: "Kickelo — Sneaker Inventory Platform",
    image: "/projects/kickelo-poster.jpg",
    video: "/projects/kickelo.mp4",
    category: "Full-stack",
    description:
      "Inventory and reselling platform for sneaker and apparel resellers. Barcode + OCR scanning looks up products through third-party APIs and fills in item details automatically; React dashboards show inventory analytics.",
    tags: ["React", "TypeScript", "Supabase", "PostgreSQL"],
    links: [
      { label: "Code", href: "#" },
      { label: "Live demo", href: "#" },
    ],
    placeholder: "Screenshot: inventory dashboard with analytics charts + barcode scan view",
    theme: "blue",
  },
  {
    title: "Blockwise — Time-Blocking Planner",
    image: "/projects/blockwise-poster.jpg",
    video: "/projects/blockwise.mp4",
    category: "macOS app",
    description:
      "A native macOS weekly planner. Add a block in seconds and it lands on a color-coded calendar, while a smart scheduler moves flexible blocks around fixed classes and shifts.",
    tags: ["Swift", "SwiftUI", "macOS"],
    links: [{ label: "Code", href: "#" }],
    placeholder: "Demo: adding a block to the weekly calendar",
    theme: "sand",
  },
  {
    title: "Astronomical Image Classifier",
    category: "Machine learning · In progress",
    description:
      "Image-classification pipeline that preprocesses astronomical images and predicts their category with confidence scores, with a reproducible training and evaluation setup.",
    tags: ["Python", "scikit-learn"],
    links: [{ label: "Code", href: "#" }],
    placeholder: "Image grid: sample galaxies/nebulae with predicted labels + confidence",
    theme: "night",
  },
];
