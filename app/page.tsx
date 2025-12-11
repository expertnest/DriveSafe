"use client";
import React from "react";

// ===============================
// EVERYTHING BELOW IS COMMENTED OUT
// ===============================

// import React, { useState, useRef, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { motion, AnimatePresence } from "framer-motion";

// // Songs Array
// export const songs = [
//   { id: "1", name: "Drive Safe", file: "/drive.mp3" },
//   { id: "2", name: "2Gunna", file: "/gunna.mp3" },
//   { id: "3", name: "Scarface", file: "/scar.mp3" },
//   { id: "4", name: "Hood Nights", file: "/hood.mp3" },
// ];

// // Trip Array
// const trips = [
//   { price: "$10.50", ept: "EPT", service: "Nasty Service", restaurant: "Willy's", pickup: "123 Main St.", dropoff: "456 Elm St.", eta: "15 min" },
//   { price: "$8.75", ept: "EPT", service: "Nasty Service", restaurant: "Chick-fil-A", pickup: "789 Oak St.", dropoff: "321 Pine St.", eta: "12 min" },
//   { price: "$12.00", ept: "EPT", service: "Nasty Service", restaurant: "Zaxby’s", pickup: "555 Maple Ave.", dropoff: "888 Cedar Rd.", eta: "18 min" },
//   { price: "$9.50", ept: "EPT", service: "Nasty Service", restaurant: "Chili's", pickup: "101 Birch Blvd.", dropoff: "202 Walnut St.", eta: "14 min" },
//   { price: "$11.20", ept: "EPT", service: "Nasty Service", restaurant: "Iron Age", pickup: "303 Spruce Ln.", dropoff: "404 Aspen Ct.", eta: "17 min" },
//   { price: "$7.80", ept: "EPT", service: "Nasty Service", restaurant: "Popeyes", pickup: "606 Poplar St.", dropoff: "707 Chestnut Ave.", eta: "10 min" },
//   { price: "$13.50", ept: "EPT", service: "Nasty Service", restaurant: "Five Guys", pickup: "909 Willow Dr.", dropoff: "1010 Pine St.", eta: "20 min" },
//   { price: "$10.00", ept: "EPT", service: "Nasty Service", restaurant: "Wendy's", pickup: "111 Elm St.", dropoff: "222 Oak St.", eta: "16 min" },
//   { price: "$8.90", ept: "EPT", service: "Nasty Service", restaurant: "Domino's", pickup: "333 Cedar St.", dropoff: "444 Maple Rd.", eta: "13 min" },
//   { price: "$12.75", ept: "EPT", service: "Nasty Service", restaurant: "P.F. Chang's", pickup: "555 Birch St.", dropoff: "666 Spruce Ave.", eta: "19 min" },
// ];

// export default function Home() {
//   const [isBlackout, setIsBlackout] = useState(false);
//   const [showPopup, setShowPopup] = useState(true);
//   const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
//   const [playingId, setPlayingId] = useState<string | null>(null);
//   const [randomTrip, setRandomTrip] = useState<typeof trips[0] | null>(null);

//   const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

//   // Persistent blackout timer
//   useEffect(() => {
//     const blackoutKey = "mac_beats_blackout_end#5";
//     const now = Date.now();

//     const storedEnd = localStorage.getItem(blackoutKey);
//     if (storedEnd && now > parseInt(storedEnd)) {
//       setIsBlackout(true);
//       return;
//     }

//     const endTime = storedEnd ? parseInt(storedEnd) : now + 10_800_000; // 3 hours

//     localStorage.setItem(blackoutKey, endTime.toString());

//     const timer = setTimeout(() => {
//       setIsBlackout(true);
//     }, endTime - now);

//     return () => clearTimeout(timer);
//   }, []);

//   // Random trip logic
//   useEffect(() => {
//     const pickRandomTrip = () => {
//       const trip = trips[Math.floor(Math.random() * trips.length)];
//       setRandomTrip(trip);
//     };

//     pickRandomTrip();
//     const interval = setInterval(pickRandomTrip, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   // Play/Stop Handler
//   const handleToggle = (songId: string, audio: HTMLAudioElement) => {
//     if (playingId === songId) {
//       audio.pause();
//       audio.currentTime = 0;
//       setPlayingId(null);
//       setCurrentAudio(null);
//     } else {
//       if (currentAudio && currentAudio !== audio) {
//         currentAudio.pause();
//         currentAudio.currentTime = 0;
//       }
//       audio.currentTime = 0;
//       audio.play();
//       setPlayingId(songId);
//       setCurrentAudio(audio);
//     }
//   };

//   // Auto-play next song
//   useEffect(() => {
//     if (!audioRefs.current) return;

//     audioRefs.current.forEach((audio, index) => {
//       if (!audio) return;

//       const onEnded = () => {
//         const nextIndex = index + 1;
//         if (nextIndex < songs.length) {
//           const nextAudio = audioRefs.current[nextIndex];
//           if (nextAudio) handleToggle(songs[nextIndex].id, nextAudio);
//         } else {
//           setPlayingId(null);
//           setCurrentAudio(null);
//         }
//       };

//       audio.addEventListener("ended", onEnded);
//       return () => audio.removeEventListener("ended", onEnded);
//     });
//   }, [audioRefs.current, currentAudio]);

//   if (isBlackout) {
//     return <DeliveredScreen />;
//   }

//   return (
//     <div>full app removed</div>
//   );
// }

// ===============================
// ONLY SUCCESS SCREEN ACTIVE
// ===============================

export default function Home() {
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
