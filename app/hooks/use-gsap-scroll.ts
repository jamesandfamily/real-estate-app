import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGsapScroll() {
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}

export function useGsapFadeIn(
  trigger: React.RefObject<HTMLElement | null>,
  options: {
    delay?: number;
    duration?: number;
    y?: number;
    stagger?: number;
  } = {}
) {
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!trigger.current) return;

    const elements = trigger.current.children;
    elementsRef.current = Array.from(elements) as HTMLElement[];

    gsap.fromTo(
      elementsRef.current,
      {
        opacity: 0,
        y: options.y || 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || 1,
        stagger: options.stagger || 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: trigger.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === trigger.current) {
          st.kill();
        }
      });
    };
  }, [trigger, options.delay, options.duration, options.y, options.stagger]);
}

export function useGsapParallax(
  elementRef: React.RefObject<HTMLElement | null>,
  speed: number = 0.5
) {
  useEffect(() => {
    if (!elementRef.current) return;

    gsap.to(elementRef.current, {
      y: () => -window.innerHeight * speed,
      ease: "none",
      scrollTrigger: {
        trigger: elementRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === elementRef.current) {
          st.kill();
        }
      });
    };
  }, [elementRef, speed]);
}

export function useGsapReveal(
  elementRef: React.RefObject<HTMLElement | null>,
  options: {
    direction?: "left" | "right" | "up" | "down";
    duration?: number;
    delay?: number;
  } = {}
) {
  useEffect(() => {
    if (!elementRef.current) return;

    const { direction = "up", duration = 1, delay = 0 } = options;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
    };

    switch (direction) {
      case "left":
        fromVars.x = -100;
        break;
      case "right":
        fromVars.x = 100;
        break;
      case "down":
        fromVars.y = 100;
        break;
      case "up":
      default:
        fromVars.y = 60;
    }

    gsap.fromTo(
      elementRef.current,
      fromVars,
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === elementRef.current) {
          st.kill();
        }
      });
    };
  }, [elementRef, options.direction, options.duration, options.delay]);
}
