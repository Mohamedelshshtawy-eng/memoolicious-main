// import React, { useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// // import { motion } from "framer-motion";

// gsap.registerPlugin(ScrollTrigger, useGSAP);

// const ScrollGalleryPinned = () => {
//   const sectionRef = useRef(null);
//   const trackRef = useRef(null);

//   useGSAP(() => {
//     const section = sectionRef.current;
//     const track = trackRef.current;

//     if (!section || !track) return;

//     // انتظر تحميل الصور
//     const images = track.querySelectorAll("img");
//     let loadedCount = 0;
//     images.forEach((img) => {
//       if (img.complete) {
//         loadedCount++;
//       } else {
//         img.onload = () => {
//           loadedCount++;
//           if (loadedCount === images.length) setupScroll();
//         };
//         img.onerror = () => {
//           loadedCount++;
//           if (loadedCount === images.length) setupScroll();
//         };
//       }
//     });

//     if (loadedCount === images.length) setupScroll();

//     function setupScroll() {
//       const trackWidth = track.scrollWidth;
//       const sectionWidth = section.offsetWidth;
//       const scrollDistance = trackWidth - sectionWidth;

//       gsap.to(track, {
//         x: -scrollDistance,
//         ease: "none",
//         scrollTrigger: {
//           trigger: section,
//           start: "top top",
//           end: () => `+=${scrollDistance * 2}`,
//           scrub: 1,
//           pin: true,
//           anticipatePin: 1,
   
//         },
//       });
//     }

//     return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//   }, []);

//   return (
//     <>
//       <section
//         ref={sectionRef}
//         className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-amber-900 via-gray-900 to-black"
//       >
//         {/* <div
//           ref={trackRef}
//           className="absolute top-1/2 -translate-y-1/2 flex gap-8 will-change-transform px-8"
//           style={{ left: 0 }}
//         >
//           <img
//             src="/two.jpg"
//             alt="Image 3"
//             className="w-[400px] h-[300px] object-cover rounded-xl"
//           />
//           <img
//             src="/three.jpg"
//             alt="Image 3"
//             className="w-[400px] h-[300px] object-cover rounded-xl"
//           />
//           <img
//             src="/four.jpg"
//             alt="Image 3"
//             className="w-[400px] h-[300px] object-cover rounded-xl"
//           />
//           <img
//             src="/five.jpg"
//             alt="Image 3"
//             className="w-[400px] h-[300px] object-cover rounded-xl"
//           />
//           <img
//             src="/six.jpg"
//             alt="Image 3"
//             className="w-[400px] h-[300px] object-cover rounded-xl"
//           />
//           <img
//             src="/seven.jpg"
//             alt="Image 3"
//             className="w-[400px] h-[300px] object-cover rounded-xl"
//           />
//           <img
//             src="/eight.jpg"
//             alt="Image 3"
//             className="w-[400px] h-[300px] object-cover rounded-xl"
//           />
//           <img
//             src="/nine.jpg"
//             alt="Image 3"
//             className="w-[400px] h-[300px] object-cover rounded-xl"
//           />
//           <img
//             src="/lomelome.jpg"
//             alt="Image 3"
//             className="w-[400px] h-[300px] object-cover rounded-xl"
//           />
//           <img
//             src="/new1.jpg"
//             alt="Image 3"
//             className="w-[400px] h-[300px] object-cover rounded-xl"
//           />
//           <img
//             src="/new2.jpg"
//             alt="Image 3"
//             className="w-[400px] h-[300px] object-cover rounded-xl"
//           />
//           <img
//             src="/land22.jpg"
//             alt="Image 3"
//             className="w-[400px] h-[300px] object-cover rounded-xl"
//           />
//           <img
//             src="/eleven.jpg"
//             alt="Image 3"
//             className="w-[400px] h-[300px] object-cover rounded-xl"
//           />
//           <img
//             src="/nine.jpg"
//             alt="Image 3"
//             className="w-[400px] h-[300px] object-cover rounded-xl"
//           />
//         </div> */}
//         <div
//   ref={trackRef}
//   className="absolute top-1/2 -translate-y-1/2 flex gap-8 will-change-transform px-8"
//   style={{ left: 0 }}
// >
//   {[
//     "/two.jpg",
//     "/three.jpg",
//     "/four.jpg",
//     "/five.jpg",
//     "/six.jpg",
//     "/seven.jpg",
//     "/eight.jpg",
//     "/nine.jpg",
//     "/lomelome.jpg",
//     "/new1.jpg",
//     "/new2.jpg",
//     "/land22.jpg",
//     "/eleven.jpg",
//   ].map((src, i) => (
//     <img
//       key={i}
//       src={src}
//       alt={`Image ${i}`}
//       className="scroll-img"
//     />
//   ))}
// </div>

//       </section>
//     </>
//   );
// };

// export default ScrollGalleryPinned;





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