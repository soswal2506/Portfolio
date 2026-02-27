"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function Cursor() {
  const [enabled, setEnabled] = useState(true);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer:fine)");
    setEnabled(fine.matches);
    const onChange = () => setEnabled(fine.matches);
    fine.addEventListener?.("change", onChange);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - 9);
      y.set(e.clientY - 9);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      fine.removeEventListener?.("change", onChange);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{ translateX: sx, translateY: sy }}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[18px] w-[18px] rounded-full bg-[#D7BDA0]/70 blur-[0.2px] mix-blend-screen"
    />
  );
}
