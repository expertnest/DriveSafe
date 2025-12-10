"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Songs Array
export const songs = [
  { id: "1", name: "Drive Safe", file: "/drive.mp3" },
  { id: "2Gunna", name: "2Gunna", file: "/gunna.mp3" },
  { id: "Scarface", name: "Scarface", file: "/scar.mp3" },
  { id: "Hood Nights", name: "Hood Nights", file: "/hood.mp3" },
];

// Trip Array with restaurant names separate from pickup
const trips = [
  { price: "$10.50", ept: "EPT", service: "Nasty Service", restaurant: "Willy's", pickup: "123 Main St.", dropoff: "456 Elm St.", eta: "15 min" },
  { price: "$8.75", ept: "EPT", service: "Chill Delivery", restaurant: "Chick-fil-A", pickup: "789 Oak St.", dropoff: "321 Pine St.", eta: "12 min" },
  { price: "$12.00", ept: "EPT", service: "Fast Lane", restaurant: "Zaxby’s", pickup: "555 Maple Ave.", dropoff: "888 Cedar Rd.", eta: "18 min" },
  { price: "$9.50", ept: "EPT", service: "Pro Delivery", restaurant: "Chili's", pickup: "101 Birch Blvd.", dropoff: "202 Walnut St.", eta: "14 min" },
  { price: "$11.20", ept: "EPT", service: "Quick Eats", restaurant: "Iron Age", pickup: "303 Spruce Ln.", dropoff: "404 Aspen Ct.", eta: "17 min" },
  { price: "$7.80", ept: "EPT", service: "Speedy", restaurant: "Popeyes", pickup: "606 Poplar St.", dropoff: "707 Chestnut Ave.", eta: "10 min" },
  { price: "$13.50", ept: "EPT", service: "VIP Service", restaurant: "Five Guys", pickup: "909 Willow Dr.", dropoff: "1010 Pine St.", eta: "20 min" },
  { price: "$10.00", ept: "EPT", service: "Green Delivery", restaurant: "Wendy's", pickup: "111 Elm St.", dropoff: "222 Oak St.", eta: "16 min" },
  { price: "$8.90", ept: "EPT", service: "Rapid Eats", restaurant: "Domino's", pickup: "333 Cedar St.", dropoff: "444 Maple Rd.", eta: "13 min" },
  { price: "$12.75", ept: "EPT", service: "Fresh & Fast", restaurant: "P.F. Chang's", pickup: "555 Birch St.", dropoff: "666 Spruce Ave.", eta: "19 min" },
];

export default function Home() {
  const [showPopup, setShowPopup] = useState(true);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [randomTrip, setRandomTrip] = useState<typeof trips[0] | null>(null);

  // Pick a random trip on client side only
  useEffect(() => {
    const trip = trips[Math.floor(Math.random() * trips.length)];
    setRandomTrip(trip);
  }, []);

  const handlePlay = (songId: string, audio: HTMLAudioElement) => {
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
    }
    if (playingId === songId) {
      audio.pause();
      setPlayingId(null);
      setCurrentAudio(null);
    } else {
      audio.play();
      setPlayingId(songId);
      setCurrentAudio(audio);
    }
  };

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
      <header className="flex flex-col items-center justify-center py-16 px-6 text-center sm:py-20 bg-red-600 text-white">
        <h1 className="text-5xl font-bold leading-tight">Drive Safe, Homie...</h1>
        <p className="mt-4 text-lg font-xs">
          Jam out, ride safe — safe and fast deliveries. 🏎️💨 🍔🎧
        </p>
      </header>

      {/* Songs Section */}
      <section className="pb-6 flex flex-col items-center gap-6 px-4 mt-6 relative z-0">
        {/* This Trip Card – restaurant separate line */}
        {randomTrip && (
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex flex-col text-green-600 mb-6">
            <h2 className="text-lg font-semibold mb-2">This Trip</h2>
            <span className="self-end text-green-700 font-bold text-sm">
              {randomTrip.price} + {randomTrip.ept} + {randomTrip.service}
            </span>
            <div className="mt-2 text-green-600 text-sm">
              <p>Restaurant: {randomTrip.restaurant}</p>
              <p>Pickup: {randomTrip.pickup}</p>
              <p>Dropoff: {randomTrip.dropoff}</p>
              <p>ETA: {randomTrip.eta}</p>
            </div>
          </div>
        )}

        {songs.map((song) => {
          const audioRef = useRef<HTMLAudioElement>(null);
          return (
            <Card key={song.id} className="w-full max-w-md shadow-md rounded-2xl border border-gray-200">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <h2 className="text-xl font-semibold mb-3">{song.name}</h2>
                <audio ref={audioRef} src={song.file} preload="auto" />
                <button
                  onClick={() => audioRef.current && handlePlay(song.id, audioRef.current)}
                  className="mt-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium transition"
                >
                  {playingId === song.id ? "Pause" : "Play"}
                </button>
              </CardContent>
            </Card>
          );
        })}

        {/* Coming Soon Banner Below Music Cards */}
        <div className="w-full max-w-md bg-gray-100 text-gray-700 text-xs text-center rounded-xl p-2 mt-6 mb-6 shadow-sm">
          Drive Safe, Deliver Fast -- More Coming Soon
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col items-center justify-center border-t border-gray-200 bg-gray-50 px-4 py-6 text-center">
        <p className="text-red-600 text-xl font-semibold mb-2">Don't look at your phone while driving.</p>
        <p className="text-gray-600 text-medium">All deliveries must be made in a timely manner.</p>
        <p className="text-gray-400 text-medium mb-2">
          Copyright 2025 — lawyers on call like DoorDash  
          <span className="text-3xl align-middle">
            👨‍⚖️ <span className="inline-block px-2">🍔</span> 🚗💨 📞
          </span>
        </p>
      </footer>
    </div>
  );
}
