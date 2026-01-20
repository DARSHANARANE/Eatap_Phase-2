import { useEffect, useState } from "react";
import "../index.css";
import BannerSvg1 from "../assets/new-form.svg";
import BannerSvg2 from "../assets/track.svg";
import BannerSvg3 from "../assets/growth.svg";

const slides = [
  {
    title: "Welcome to Eatap",
    desc: "Smart food management made easy. Track, manage and scale faster with simple tools.",
    img: BannerSvg1,
  },
  {
    title: "Track Your Orders",
    desc: "Monitor orders, revenue and analytics in real-time with a clean dashboard experience.",
    img: BannerSvg2,
  },
  {
    title: "Grow Your Business",
    desc: "Powerful features to automate operations and scale your food business smoothly.",
    img: BannerSvg3,
  },
];

const AUTO_MS = 4500;

const BannerCarousel = () => {
  const [index, setIndex] = useState(0);
  const [keyAnim, setKeyAnim] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
      setKeyAnim((k) => k + 1);
    }, AUTO_MS);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <div className="w-1/2 hidden md:flex relative overflow-hidden rounded-l-[32px] text-white">
      {/* ✅ Gradient Background */}
      <div className="absolute inset-0 heroBg" />

      {/* ✅ Moving Waves */}
      <div className="absolute bottom-0 left-0 w-full waveWrap z-[2]">
        <svg className="wave wave1" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 V120 H0 Z"
            className="shape-fill"
          />
        </svg>

        <svg className="wave wave2" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,70 C250,10 450,130 650,70 C850,10 1050,130 1200,70 V120 H0 Z"
            className="shape-fill2"
          />
        </svg>
      </div>

      {/* ✅ ONLY ONE IMAGE (Bottom Right) - SAME SIZE FOR ALL */}
      <img
        key={slide.img}
        src={slide.img}
        alt="Banner Bottom"
        className="absolute bottom-0 left-1/2 p-10 mr-10
             -translate-x-1/2
             w-[330px] h-[330px] object-contain
             opacity-95 drop-shadow-2xl z-[3]
             animate-[imgFade_0.7s_ease-out]"
      />

      {/* ✅ Glass Border */}
      <div className="absolute inset-0 rounded-l-[32px] border border-white/10 z-[4]" />

      {/* ✅ CONTENT */}
      <div className="relative z-10 w-full px-12 py-14 flex flex-col justify-between">
        <div className="max-w-md" key={keyAnim}>
          <p className="text-xs font-semibold tracking-[0.30em] uppercase text-white/60 mb-4">
            Eatap Platform
          </p>

          <h1 className="text-[44px] font-extrabold leading-[1.15] tracking-tight animate-[fadeSlide_0.7s_ease-out]">
            <span className="bg-gradient-to-r from-pink-300 via-white to-purple-300 bg-clip-text text-transparent">
              {slide.title}
            </span>
          </h1>

          <p className="mt-5 text-[15px] leading-7 text-white/75 animate-[fadeSlide_0.7s_ease-out]">
            {slide.desc}
          </p>
        </div>

        {/* ✅ DOTS */}
        {/* <div className="mt-12 flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setIndex(i);
                setKeyAnim((k) => k + 1);
              }}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === i
                  ? "w-12 bg-gradient-to-r from-pink-400 to-purple-400 shadow-md shadow-purple-500/30"
                  : "w-3 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default BannerCarousel;
