"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

// Songs Array
export const songs = [
  { id: "1", name: "Drive Safe", file: "/drive.mp3" },
  { id: "2", name: "2Gunna", file: "/gunna.mp3" },
  { id: "3", name: "Scarface", file: "/scar.mp3" },
  { id: "4", name: "Hood Nights", file: "/hood.mp3" },
];

// Trip Array
const trips = [
  { price: "$10.50", ept: "EPT", service: "Nasty Service", restaurant: "Willy's", pickup: "123 Main St.", dropoff: "456 Elm St.", eta: "15 min" },
  { price: "$8.75", ept: "EPT", service: "Nasty Service", restaurant: "Chick-fil-A", pickup: "789 Oak St.", dropoff: "321 Pine St.", eta: "12 min" },
  { price: "$12.00", ept: "EPT", service: "Nasty Service", restaurant: "Zaxby’s", pickup: "555 Maple Ave.", dropoff: "888 Cedar Rd.", eta: "18 min" },
  { price: "$9.50", ept: "EPT", service: "Nasty Service", restaurant: "Chili's", pickup: "101 Birch Blvd.", dropoff: "202 Walnut St.", eta: "14 min" },
  { price: "$11.20", ept: "EPT", service: "Nasty Service", restaurant: "Iron Age", pickup: "303 Spruce Ln.", dropoff: "404 Aspen Ct.", eta: "17 min" },
  { price: "$7.80", ept: "EPT", service: "Nasty Service", restaurant: "Popeyes", pickup: "606 Poplar St.", dropoff: "707 Chestnut Ave.", eta: "10 min" },
  { price: "$13.50", ept: "EPT", service: "Nasty Service", restaurant: "Five Guys", pickup: "909 Willow Dr.", dropoff: "1010 Pine St.", eta: "20 min" },
  { price: "$10.00", ept: "EPT", service: "Nasty Service", restaurant: "Wendy's", pickup: "111 Elm St.", dropoff: "222 Oak St.", eta: "16 min" },
  { price: "$8.90", ept: "EPT", service: "Nasty Service", restaurant: "Domino's", pickup: "333 Cedar St.", dropoff: "444 Maple Rd.", eta: "13 min" },
  { price: "$12.75", ept: "EPT", service: "Nasty Service", restaurant: "P.F. Chang's", pickup: "555 Birch St.", dropoff: "666 Spruce Ave.", eta: "19 min" },
];

export default function Home() {
  const [isBlackout, setIsBlackout] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [randomTrip, setRandomTrip] = useState<typeof trips[0] | null>(null);

  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  // Persistent blackout timer
  useEffect(() => {
    const blackoutKey = "mac_beats_blackout_end#5";
    const now = Date.now();

    const storedEnd = localStorage.getItem(blackoutKey);
    if (storedEnd && now > parseInt(storedEnd)) {
      setIsBlackout(true);
      return;
    }

    // Set timer for blackout (10 seconds for testing, change to 2 hours later)
    const endTime = storedEnd ? parseInt(storedEnd) : now + 10_800_000; // 3 hours

    localStorage.setItem(blackoutKey, endTime.toString());

    const timer = setTimeout(() => {
      setIsBlackout(true);
    }, endTime - now);

    return () => clearTimeout(timer);
  }, []);

  // Random trip logic
  useEffect(() => {
    const pickRandomTrip = () => {
      const trip = trips[Math.floor(Math.random() * trips.length)];
      setRandomTrip(trip);
    };

    pickRandomTrip();
    const interval = setInterval(pickRandomTrip, 30000);
    return () => clearInterval(interval);
  }, []);

  // Play/Stop Handler
  const handleToggle = (songId: string, audio: HTMLAudioElement) => {
    if (playingId === songId) {
      audio.pause();
      audio.currentTime = 0;
      setPlayingId(null);
      setCurrentAudio(null);
    } else {
      if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      audio.currentTime = 0;
      audio.play();
      setPlayingId(songId);
      setCurrentAudio(audio);
    }
  };

  // Auto-play next song
  useEffect(() => {
    if (!audioRefs.current) return;

    audioRefs.current.forEach((audio, index) => {
      if (!audio) return;

      const onEnded = () => {
        const nextIndex = index + 1;
        if (nextIndex < songs.length) {
          const nextAudio = audioRefs.current[nextIndex];
          if (nextAudio) handleToggle(songs[nextIndex].id, nextAudio);
        } else {
          setPlayingId(null);
          setCurrentAudio(null);
        }
      };

      audio.addEventListener("ended", onEnded);
      return () => audio.removeEventListener("ended", onEnded);
    });
  }, [audioRefs.current, currentAudio]);

  // Blackout / Delivered screen
  if (isBlackout) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FF3008] text-white text-5xl font-bold flex-col p-4 text-center">
      <span className="mb-4 text-6xl animate-bounce">✅</span>
      <div className="mb-2">Delivered Successfully.</div>
      <div className="text-xl font-medium mt-2">
        Check back soon for more orders 🚗💵
      </div>
    </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 relative">
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4">
          <div className="bg-white text-black p-6 rounded-2xl shadow-2xl w-80 text-center border-[3px] border-red-600 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2">Attention</h2>
            <img src="/feet.gif" alt="drive safe gif" className="w-32 h-auto rounded-xl mb-3" />
            <p className="text-lg mb-4">
              Remember to always Drive Safe.  
              <span className="inline-block px-2">🍟</span> 🏎️💨
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition text-white font-semibold"
            >
              I Understand
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative flex flex-col items-center text-center bg-red-600 text-white py-16 px-6 sm:py-24">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-md">
          Drive Safe, Homie...
        </h1>
        <p className="mt-5 text-lg sm:text-xl font-light opacity-90">
          Jam out, ride safe — Hot 🔥 & fast deliveries only. 🏎️💨 🍔🎧
        </p>
        <p className="absolute bottom-2 text-[9px] sm:text-[10px] opacity-80 tracking-wide">
          * Don’t drop the Starbucks 😱 — keep it hot, no cold food allowed 🚫 *
        </p>
      </header>

      {/* Container for Trip + Songs */}
      <section className="pb-6 flex flex-col items-center gap-6 px-4 mt-6 relative z-0 w-full max-w-md mx-auto">
        {/* Trip Card */}
        <div className="relative w-full h-44">
          <AnimatePresence>
            {randomTrip && (
              <motion.div
                key={randomTrip.restaurant + randomTrip.pickup}
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="absolute w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex flex-col text-green-600"
              >
                <h2 className="text-lg font-semibold mb-2">This Trip</h2>
                <span className="self-end text-green-700 font-bold text-sm">
                  {randomTrip.price} + {randomTrip.ept} + {randomTrip.service}
                </span>
                <div className="mt-2 text-green-600 text-sm">
                  <p className="text-lg font-semibold">Restaurant: {randomTrip.restaurant}</p>
                  <p>Pickup: {randomTrip.pickup}</p>
                  <p>Dropoff: {randomTrip.dropoff}</p>
                  <p>ETA: {randomTrip.eta}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Songs */}
        {songs.map((song, index) => (
          <Card key={song.id} className="w-full shadow-md rounded-2xl border border-gray-200">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold mb-3">{song.name}</h2>
              <audio
                ref={(el) => {
                  audioRefs.current[index] = el;
                }}
                src={song.file}
                preload="auto"
              />
              <button
                onClick={() => {
                  const audio = audioRefs.current[index];
                  if (audio) handleToggle(song.id, audio);
                }}
                className="mt-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium transition"
              >
                {playingId === song.id ? "End Trip" : "Accept"}
              </button>
            </CardContent>
          </Card>
        ))}

        {/* Banner */}
        <div className="w-full bg-gray-100 text-gray-700 text-xs text-center rounded-xl p-2 mt-6 mb-6 shadow-sm">
          Drive Safe, Deliver Fast -- More Coming Soon
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col items-center justify-center border-t border-gray-200 bg-gray-50 px-4 py-6 text-center">
        <p className="text-red-600 text-xl font-semibold mb-2">Don't look at your phone while driving.</p>
        <p className="text-gray-600 text-medium">All deliveries must be made in a timely manner.</p>
        <p className="text-gray-400 text-medium mb-2">
          Copyright 2025 — lawyers on call like DoorDash  
          <span className="text-3xl align-middle">👨‍⚖️ <span className="inline-block px-2">🍔</span> 🚗💨 📞</span>
        </p>
      </footer>
    </div>
  );
}
