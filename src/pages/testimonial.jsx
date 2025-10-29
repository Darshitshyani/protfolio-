import { memo, useState, useEffect, useRef } from 'react';
import Video from 'next-video';

// ✅ Use public/ folder paths or absolute URLs for images
const testimonials = [
    {
    name: "Steve Zimmernan",
    image: "/images/client1.png",
    url: "/video_denoised.mp4",
    position: "Founder, BLUESKY-NW",
    feedback:
      "Darshit redesigned our company website with a modern and user-friendly interface. The updated design improved usability and gave our platform a more professional look.",
  },
  {
    name: "Nikesh Bisht",
    image: "/images/client2.png", // moved to public/images/
    url: "https://res.cloudinary.com/doze8mibh/video/upload/v1761716976/blinqmobility_axyxpm.mp4",
    position: "Founder, Blinq mobility",
    feedback:
      "Darshit did an outstanding job redesigning the Blinq Mobility website. His modern design approach and attention to detail greatly enhanced our brand presence. Highly recommended!",
  },

  {
    name: "Sergio Palma",
    image: null,
    url: null,
    position: "Co-Founder, BLUESKY-NW",
    feedback:
      "Darshit redesigned our company website with a modern look and optimized performance. The site now loads faster and has received great feedback from clients.",
  },
  {
    name: "Sanjay Bodariya",
    image: null,
    url: null,
    position: "Diamonds Trader",
    feedback:
      "Darshit developed a streamlined bidding system for diamond trading, improving our workflow efficiency. His attention to detail and technical skills were impressive!",
  },
  {
    name: "Vishal Modi",
    image: null,
    url: null,
    position: "Founder, Valencia Lifesciences",
    feedback:
      "Darshit built our pharmaceutical company's static website with a clean, professional design. Delivered on time and exceeded our expectations!",
  },
  {
    name: "Rachana Rambhad",
    image: null,
    url: null,
    position: "Founder, Gabble.ai",
    feedback:
      "As a freelancer, Darshit implemented a TOEFL MCQ exam section in React for our platform. His code was modular and easy to maintain. Highly recommended!",
  },
  {
    name: "Mansukh Patoliya",
    image: null,
    url: null,
    position: "Founder, Neha Fiber",
    feedback:
      "Darshit created a professional and fast-loading website for our industrial fiber company. The site reflects our brand well, and he ensured it was SEO-friendly and device-compatible. Great experience working with him.",
  },
];

const Testimonial = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [displayedTestimonials, setDisplayedTestimonials] = useState([]);
  const [videoIndex, setVideoIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const SCROLL_SPEED = 0.8;
  // pause state handled via cancelling/starting RAF
  const startAnimation = () => {
    if (!animationFrameRef.current) animationFrameRef.current = requestAnimationFrame(animateScroll);
  };
  const pauseAnimation = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };
  const resumeAnimation = () => startAnimation();

  // use a function declaration so startAnimation/resume can call it
  function animateScroll() {
    const el = scrollContainerRef.current;
    if (!el) return;
    scrollPositionRef.current -= SCROLL_SPEED;
    // reset when one set scrolled out
    if (Math.abs(scrollPositionRef.current) >= el.scrollHeight / 2) {
      scrollPositionRef.current = 0;
    }
    el.style.transform = `translateY(${scrollPositionRef.current}px)`;
    animationFrameRef.current = requestAnimationFrame(animateScroll);
  }

   const playVideo = () => {
     setIsVideoPlaying(true);
   };
 
   const videodetails = testimonials[videoIndex];
 
   // ✅ Infinite scroll setup
   useEffect(() => {
     setDisplayedTestimonials([...testimonials, ...testimonials]);
 
     const scrollContainer = scrollContainerRef.current;
     if (!scrollContainer) return;
     // start the loop
     startAnimation();
 
     return () => {
       // clean up RAF on unmount
       pauseAnimation();
     };
   }, []);

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-slate-50 to-slate-100 font-sans pt-[120px]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-slate-800 mb-2">What Clients Say</h2>
        <p className="text-md text-center text-black-600 mb-12">
          Hear from those who have worked with me
        </p>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* 🎥 Video Section */}
          <div className="w-full lg:w-2/5 flex justify-center items-center h-[400px] md:h-[450px] lg:h-[600px]">
            <div className="w-full max-w-md aspect-video rounded-xl overflow-hidden shadow-xl bg-black h-full">
              {!isVideoPlaying ? (
                <div
                  className="w-full h-full flex flex-col justify-between bg-cover bg-center cursor-pointer"
                  style={{
                    backgroundImage: videodetails.image
                      ? `url(${videodetails.image})`
                      : "linear-gradient(135deg, #111827, #1f2937)",
                  }}
                  onClick={playVideo}
                >
                  <div className="w-full h-full bg-white/20 backdrop-blur-lg flex flex-col justify-between p-4 cursor-pointer">
                    <div></div>
                    <div className="w-full flex flex-col items-center justify-center rounded-full">
                      <svg
                        className="w-16 h-16 md:w-20 md:h-20 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        fill="none"
                        stroke="#fff"
                      >
                        <circle cx="50" cy="50" r="45" strokeWidth="2" />
                        <path fill="#fff" d="M40 30L70 50L40 70Z" />
                      </svg>
                    </div>
                    <div className="mb-5 text-start">
                      <p className="text-primary-main font-semibold text-common-white">
                        {videodetails?.name}
                      </p>
                      <p className="text-black-500">{videodetails?.position}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <Video
                    width="100%"
                    height="100%"
                    src={videodetails?.url || ""}
                    title="Testimonial video"
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 💬 Text Testimonials Section */}
          <div
            className="w-full mt-[50px] sm:mt-0 lg:w-3/5
              leading-[1.6em] font-[Arial]
              [--mask:linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_10%,rgba(0,0,0,1)_90%,rgba(0,0,0,0)_100%)]
              [-webkit-mask:var(--mask)]
              [mask:var(--mask)]"
          >
            <div className="h-[600px] overflow-hidden relative"
                 onMouseEnter={pauseAnimation}
                 onMouseLeave={resumeAnimation}
                 onTouchStart={pauseAnimation}
                 onTouchEnd={resumeAnimation}
              >
              <div
                ref={scrollContainerRef}
                className="md:grid md:grid-cols-2 gap-6 place-items-center w-full transition-all"
              >
                {displayedTestimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 mt-[20px] md:mt-0 rounded-xl h-[290px] border border-black-200 shadow-md relative hover:shadow-xl transition-shadow w-full max-w-xs md:max-w-none"
                  >
                    <div className="absolute -top-3 -left-1 text-6xl text-pink-600 font-serif">"</div>
                    <div className="flex flex-col h-full justify-between">
                      <p className="text-grey-700 text-base mb-4 z-10 relative">
                        {testimonial?.feedback}
                      </p>
                      <div className="border-t border-black-200 pt-3 flex items-center justify-between w-full">
                        <div>
                          <h4 className="font-semibold text-primary-main">
                            {testimonial?.name}
                          </h4>
                          <p className="text-black-600 text-sm">{testimonial?.position}</p>
                        </div>
                        {testimonial?.url && (
                          <span
                            className="flex items-center justify-center ml-3 text-primary-main cursor-pointer"
                            onClick={() => {
                              setVideoIndex(index);
                              setIsVideoPlaying(false);
                            }}
                          >
                            <svg
                              width="28"
                              height="28"
                              viewBox="0 0 100 100"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-7 h-7"
                            >
                              <circle cx="50" cy="50" r="45" stroke="#1E90FF" strokeWidth="6" fill="white" />
                              <polygon points="42,32 72,50 42,68" fill="#1E90FF" />
                            </svg>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Testimonial);
