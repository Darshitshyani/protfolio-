/**
 * Real, attributed client testimonials.
 *
 * Single source of truth so the home-page section and /testimonial can never
 * drift apart. Every quote below is verbatim from the existing testimonial
 * page — do not edit the wording, and do not add an entry without a real
 * person and company behind it.
 */

export type Testimonial = {
  name: string;
  position: string;
  feedback: string;
  /** Public-folder path, or null when there is no headshot. */
  image: string | null;
  /** Public-folder path to a video testimonial, or null. */
  video: string | null;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Steve Zimmernan",
    position: "Founder, BLUESKY-NW",
    feedback:
      "Darshit redesigned our company website with a modern and user-friendly interface. The updated design improved usability and gave our platform a more professional look.",
    image: "/images/client1.png",
    video: "/video_denoised.mp4",
  },
  {
    name: "Nikesh Bisht",
    position: "Founder, Blinq Mobility",
    feedback:
      "Darshit did an outstanding job redesigning the Blinq Mobility website. His modern design approach and attention to detail greatly enhanced our brand presence. Highly recommended!",
    image: "/images/client2.png",
    video: "/blinqmobility.mp4",
  },
  {
    name: "Rachana Rambhad",
    position: "Founder, Gabble.ai",
    feedback:
      "As a freelancer, Darshit implemented a TOEFL MCQ exam section in React for our platform. His code was modular and easy to maintain. Highly recommended!",
    image: null,
    video: null,
  },
  {
    name: "Sanjay Bodariya",
    position: "Diamonds Trader",
    feedback:
      "Darshit developed a streamlined bidding system for diamond trading, improving our workflow efficiency. His attention to detail and technical skills were impressive!",
    image: null,
    video: null,
  },
  {
    name: "Mansukh Patoliya",
    position: "Founder, Neha Fiber",
    feedback:
      "Darshit created a professional and fast-loading website for our industrial fiber company. The site reflects our brand well, and he ensured it was SEO-friendly and device-compatible. Great experience working with him.",
    image: null,
    video: null,
  },
  {
    name: "Sergio Palma",
    position: "Co-Founder, BLUESKY-NW",
    feedback:
      "Darshit redesigned our company website with a modern look and optimized performance. The site now loads faster and has received great feedback from clients.",
    image: null,
    video: null,
  },
  {
    name: "Vishal Modi",
    position: "Founder, Valencia Lifesciences",
    feedback:
      "Darshit built our pharmaceutical company's static website with a clean, professional design. Delivered on time and exceeded our expectations!",
    image: null,
    video: null,
  },
];

/** Initials for the avatar fallback when there is no headshot. */
export const initialsOf = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
