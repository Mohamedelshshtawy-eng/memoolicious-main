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
  const containerRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const container = containerRef.current;

    if (!section || !track || !container) return;

    // إعدادات مختلفة للجوال والكمبيوتر
    const isMobile = window.innerWidth < 768;
    
    // حساب الأبعاد بناءً على نوع الجهاز
    const trackWidth = track.scrollWidth;
    const sectionWidth = section.offsetWidth;
    const scrollDistance = trackWidth - sectionWidth;

    // إعدادات الـ ScrollTrigger للجوال
    const scrollConfig = isMobile ? {
      trigger: section,
      start: "top top",
      end: () => `+=${scrollDistance * 1.5}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      pinSpacing: false, // مهم للجوال - يمنع المسافات الزائدة
      markers: false // ضع true للت debugging
    } : {
      trigger: section,
      start: "top top",
      end: () => `+=${scrollDistance * 2}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      markers: false
    };

    // animation للـ horizontal scroll
    const horizontalAnimation = gsap.to(track, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: scrollConfig
    });

    // حل إضافي للجوال - تفعيل الـ scroll العمودي
    if (isMobile) {
      // جعل الـ section تأخذ مساحة أقل
      gsap.set(section, {
        minHeight: "60vh" // بدل 100vh لتقليل المساحة
      });

      // تفعيل الـ scroll العمودي داخل الـ section
      section.style.overflow = "visible";
    }

    return () => {
      horizontalAnimation.scrollTrigger?.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-screen md:h-screen w-full overflow-hidden bg-gradient-to-br from-amber-900 via-gray-900 to-black"
        style={{ 
          minHeight: "60vh", // تقليل الارتفاع للجوال
          height: "100vh" // الارتفاع الكامل للكمبيوتر
        }}
      >
        <div ref={containerRef} className="h-full w-full">
          <div
            ref={trackRef}
            className="absolute top-1/2 -translate-y-1/2 flex gap-4 md:gap-8 will-change-transform px-4 md:px-8"
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
              <img
                key={i}
                src={src}
                alt={`Image ${i}`}
                className="scroll-img"
                style={{
                  width: window.innerWidth < 768 ? "280px" : "400px",
                  height: window.innerWidth < 768 ? "200px" : "300px"
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ScrollGalleryPinned;