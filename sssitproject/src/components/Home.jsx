import React, { useEffect, useState, useRef } from "react";
import pic1 from "../assets/pic1.webp";

import pic3 from "../assets/pic3.webp";
import pic4 from "../assets/pic4.webp";


import wp1 from "../assets/WP1.webp";
import wp2 from "../assets/W2.webp";
import wp3 from "../assets/W3.webp";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const observerRef = useRef();

  const images = [pic1, pic3, pic4, wp1, wp2, wp3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            if (src && !loadedImages.has(src)) {
              img.src = src;
              img.onload = () => {
                setLoadedImages((prev) => new Set([...prev, src]));
                observerRef.current.unobserve(img);
              };
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadedImages]);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => new Set([...prev, images[index]]));
  };

  return (
    <div className="slider-wrapper">
      <div
        className="slider-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => {
          const isCurrent = index === currentIndex;
          const isNext = index === (currentIndex + 1) % images.length;
          const isPrev = index === (currentIndex - 1 + images.length) % images.length;
          const shouldLoad = isCurrent || isNext || isPrev || loadedImages.has(img);

          return (
            <img
              key={index}
              src={shouldLoad ? img : undefined}
              data-src={!shouldLoad ? img : undefined}
              alt={`SSSIT Computer Education - Slide ${index + 1}`}
              width="1200"
              height="600"
              loading={shouldLoad ? (isCurrent ? "eager" : "lazy") : "lazy"}
              fetchPriority={isCurrent ? "high" : "auto"}
              decoding="async"
              onLoad={() => handleImageLoad(index)}
              ref={!shouldLoad ? (el) => el && observerRef.current?.observe(el) : undefined}
              style={{
                objectFit: "cover",
                opacity: shouldLoad ? 1 : 0,
                transition: "opacity 0.3s ease-in-out"
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

