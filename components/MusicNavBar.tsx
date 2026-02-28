"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/track";

const TRACK_URL = "/music/Linkin_Park_-_What_Ive_Done_2007_(mp3.pm).mp3";
const START_AT_SECONDS = 65;

function MusicNoteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <circle cx="12" cy="12" r="9.2" />
      <path d="M7 9.2c3.8-1.2 7.3-.9 10.3.8" strokeLinecap="round" />
      <path d="M7.8 12.1c3-1 5.9-.7 8.3.7" strokeLinecap="round" />
      <path d="M8.8 14.9c2.2-.7 4.2-.5 5.9.5" strokeLinecap="round" />
    </svg>
  );
}

export function MusicNavBar() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(TRACK_URL);
    audio.loop = false;
    audio.volume = 0.25;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const onToggle = async () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      track({ event_name: "button_click", element_id: "music_pause", page: pathname });
      return;
    }

    try {
      if (!hasStartedRef.current) {
        audioRef.current.currentTime = START_AT_SECONDS;
        hasStartedRef.current = true;
      }
      await audioRef.current.play();
      setPlaying(true);
      track({ event_name: "button_click", element_id: "music_play", page: pathname });
    } catch {
      setPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex h-10 w-10 items-center justify-center transition-transform duration-200 ${
        playing
          ? "icon-control-active music-playing text-[#1DB954] hover:scale-105"
          : "text-[color:var(--ink-0)] hover:scale-105 hover:text-[#1DB954]"
      }`}
      aria-label={playing ? "Pause music" : "Play music"}
      title="Play music"
    >
      <span className={`icon-control ${playing ? "icon-control-music-active" : "icon-control-music"}`}>
        <MusicNoteIcon />
      </span>
    </button>
  );
}
