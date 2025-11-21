

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ScrollGalleryPinned = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 0px)", () => {
      const ctx = gsap.context(() => {
        const horizontalAnimation = gsap.to(track, {
          x: () => -Math.max(track.scrollWidth - section.offsetWidth, 0),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () =>
              `+=${Math.max(track.scrollWidth - section.offsetWidth, 1)}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            markers: false,
          },
        });

        return () => horizontalAnimation.scrollTrigger?.kill();
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden bg-linear-to-br from-amber-900 via-gray-900 to-black"
      >
        <div className="h-full w-full">
          <div
            ref={trackRef}
            className="absolute top-1/2 -translate-y-1/2 flex gap-4 px-4 will-change-transform md:gap-8 md:px-8"
            style={{ left: 0 }}
          >
            {[
              "/two.jpg",
              "/three.jpg",
              "/four.jpg",
              "/five.jpg",
              "/six.jpg",
              "/seven.jpg",
              "/eight.jpg",
              "/nine.jpg",
              "/lomelome.jpg",
              "/new1.jpg",
              "/new2.jpg",
              "/land22.jpg",
              "/eleven.jpg",
            ].map((src, i) => (
              <img key={i} src={src} alt={`Image ${i}`} className="scroll-img" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ScrollGalleryPinned;