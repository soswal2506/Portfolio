"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, type MouseEvent } from "react";

export function FaceEmoji() {
  const [hovered, setHovered] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (0.5 - y) * 10,
      y: (x - 0.5) * 10,
    });
  }

  return (
    <div
      className="group relative w-fit"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMove}
    >
      <motion.div
        animate={{
          y: hovered ? -6 : 0,
          rotateX: hovered ? tilt.x : 0,
          rotateY: hovered ? tilt.y : 0,
          scale: hovered ? 1.03 : 1,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative"
      >
        <div className="relative h-[176px] w-[176px] overflow-hidden rounded-[28px] bg-[#1a223a] shadow-soft">
          {imgOk ? (
            <Image
              src="/profile-photo.jpg"
              alt="Shubh profile photo"
              fill
              sizes="176px"
              className="anime-photo object-cover transition-transform duration-300 group-hover:scale-110"
              onError={() => setImgOk(false)}
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#12182c] text-center text-[10px] leading-4 text-zinc-300">
              Add
              <br />
              public/profile-photo.jpg
            </div>
          )}
          <div className="anime-tint pointer-events-none absolute inset-0" />
          <div className="anime-lines pointer-events-none absolute inset-0" />
          <div className="anime-sheen pointer-events-none absolute inset-y-0 -left-1/2 w-1/2" />
        </div>

        <div className="pointer-events-none absolute -right-6 -top-5 text-3xl drop-shadow-[0_8px_14px_rgba(0,0,0,0.4)]">
          <motion.span
            className="inline-block origin-bottom-left"
            animate={
              hovered
                ? { rotate: [0, 24, -8, 20, -4, 0], y: [0, -1, 0], scale: [1, 1.06, 1] }
                : { rotate: 0, y: 0 }
            }
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            👋
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}
