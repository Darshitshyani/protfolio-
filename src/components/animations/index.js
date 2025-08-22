import { useEffect, useState } from "react";

const useInView = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useState(null);
console.log(ref,"dasd")
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, threshold]);

  return [ref, isInView];
};

export default useInView;
