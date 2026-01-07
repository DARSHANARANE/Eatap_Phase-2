import { useEffect, useState } from "react";
import BannerSvg1 from "../assets/banner-illustration.svg";
import BannerSvg2 from "../assets/undraw_circuit-board_g7dc.svg";
import BannerSvg3 from "../assets/undraw_organizing-data_uns9.svg";
 const BannerCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 1000); // 1 minute

    return () => clearInterval(interval);
      }, []);
      const slides = [
      {
        title: "Welcome to Eatap",
        desc: "Smart food management made easy for everyone.",
        img: BannerSvg1,
      },
      {
        title: "Track Your Orders",
        desc: "Monitor food orders and analytics in real-time.",
      img: BannerSvg2,
      },
      {
        title: "Grow Your Business",
        desc: "Powerful tools to scale your food operations.",
        img: BannerSvg3,
      },
    ];
      const slide = slides[index];


  return (
    <div className="w-1/2 hidden md:flex flex-col justify-center px-12 text-white
                    bg-gradient-to-br from-indigo-600 to-pink-500
                    relative overflow-hidden transition-all duration-700">

      <img
        src={slide.img}
        alt="Banner Illustration"
        className="absolute bottom-0 right-0 w-72 opacity-20 transition-opacity duration-700"
      />

      <h1 className="text-3xl font-bold mb-4 relative z-10 transition-all duration-500">
        {slide.title}
      </h1>

      <p className="text-sm opacity-90 relative z-10 transition-all duration-500">
        {slide.desc}
      </p>
    </div>
  );
};

export default BannerCarousel;