import React, { useRef } from "react";
import ThreeBackground from "./ThreeBackground";

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleWatchDemo = () => {
    if (videoRef.current) {
      videoRef.current.play(); // 🔥 Play video on click
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <ThreeBackground videoRef={videoRef} />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <button className="mb-4 px-6 py-3 bg-blue-600 text-white rounded-full text-lg hover:bg-blue-700 transition">
          Shop Now
        </button>
        <button
          onClick={handleWatchDemo}
          className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-full text-lg hover:bg-blue-50 transition"
        >
          Watch Demo
        </button>
      </div>
    </section>
  );
};

export default Hero;
