import { useEffect, useRef, useState } from "react";
import styles from "./custom-cursor.module.css";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const outlineScaleRef = useRef(0.57);

  useEffect(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;

    if (!dot || !outline) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let isSelecting = false;

    // Update cursor position with hardware acceleration
    const handleMouseMove = (e: MouseEvent) => {
      // Don't update position during text selection
      if (isSelecting || window.getSelection()?.toString()) {
        return;
      }

      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows cursor immediately - center the 8px dot
      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    // Smooth outline animation with improved performance
    const animateOutline = () => {
      // Don't animate outline during text selection
      if (!isSelecting && !window.getSelection()?.toString()) {
        // Increased speed from 0.15 to 0.25 for faster response
        const delay = 0.25;
        outlineX += (mouseX - outlineX) * delay;
        outlineY += (mouseY - outlineY) * delay;

        // Animate scale smoothly
        const targetScale = isHovering ? 1 : 0.57;
        const scaleDelay = 0.3;
        outlineScaleRef.current += (targetScale - outlineScaleRef.current) * scaleDelay;

        if (outline) {
          // Center the outline on cursor and include scale in transform
          outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%) scale(${outlineScaleRef.current})`;
        }
      }

      requestAnimationFrame(animateOutline);
    };

    // Handle hover states
    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.hasAttribute("role") && target.getAttribute("role") === "button" ||
        target.classList.contains("interactive")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.hasAttribute("role") && target.getAttribute("role") === "button" ||
        target.classList.contains("interactive")
      ) {
        setIsHovering(false);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Handle text selection
    const handleSelectStart = () => {
      isSelecting = true;
      setIsVisible(false);
    };

    const handleSelectEnd = () => {
      isSelecting = false;
      // Small delay to prevent flicker
      setTimeout(() => {
        if (!window.getSelection()?.toString()) {
          setIsVisible(true);
        }
      }, 50);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("mouseup", handleSelectEnd);

    animateOutline();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("mouseup", handleSelectEnd);
    };
  }, [isHovering]);

  return (
    <>
      <div
        ref={dotRef}
        className={`${styles.cursorDot} ${isHovering ? styles.hover : ""} ${!isVisible ? styles.hidden : ""}`}
      />
      <div
        ref={outlineRef}
        className={`${styles.cursorOutline} ${isHovering ? styles.hover : ""} ${!isVisible ? styles.hidden : ""}`}
      />
    </>
  );
}
