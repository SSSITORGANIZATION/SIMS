import React, { useEffect, useState } from "react";
import pic1 from "../assets/pic1.webp";

import pic3 from "../assets/pic3.webp";
import pic4 from "../assets/pic4.webp";


import wp1 from "../assets/WP1.webp";
import wp2 from "../assets/W2.webp";
import wp3 from "../assets/W3.webp";

export default function Home() {
  const images = [pic1, pic3, pic4, wp1, wp2, wp3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

 return (
  <div className="slider-wrapper">
    <div
      className="slider-track"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {images.map((img, index) => (
  <img
    key={index}
    src={img}
    alt="SSSIT Computer Education"
    width="1200"
    height="600"
    fetchPriority={index === 0 ? "high" : "low"}
    loading={index === 0 ? "eager" : "lazy"}
    decoding="async"
  />
))}

    </div>
  </div>
);

}

