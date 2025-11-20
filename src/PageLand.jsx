import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";
import ScrollGalleryPinned from "./ScrollGalleryPinned";
import ScrollVelocity from "./ScrollVelocity";
import LogoLoop from "./loping";

const techLogos = [
  { src: '/plate1.jpg', alt: 'photo', style: { height: '300px' }},
  { src: '/plate2.jpg', alt: 'photo', style: { height: '300px' }},
  { src: '/plate3.jpg', alt: 'photo', style: { height: '300px' }},
  { src: '/plate4.jpg', alt: 'photo', style: { height: '300px' }},
  { src: '/plate5.jpg', alt: 'photo', style: { height: '300px' }},
  { src: '/plate6.jpg', alt: 'photo', style: { height: '300px' }},
  { src: '/plate12.jpg', alt: 'photo', style: { height: '300px' }},
  { src: '/plate23.jpg', alt: 'photo', style: { height: '300px' }},
  { src: '/plate55.jpg', alt: 'photo' ,style: { height: '300px' }},
  { src: '/plate76.jpg', alt: 'photo' ,style: { height: '300px' }},
  { src: '/plate78.jpg', alt: 'photo' ,style: { height: '300px' }},
  { src: '/plate48.jpg', alt: 'photo', style: { height: '300px' }},
  { src: '/plate87.jpg', alt: 'photo', style: { height: '300px' }},
  { src: '/plate90.jpg', alt: 'photo', style: { height: '300px' }},
  { src: '/plate767.jpg', alt: 'photo', style: { height: '300px' }},
  { src: '/plate65.jpg', alt: 'photo', style: { height: '300px' }},
  { src: '/plate88.jpg', alt: 'photo', style: { height: '300px' }},
  { src: '/newplate2.jpg', alt: 'photo', style: { height: '300px' }},
  { src: '/newplate3.jpg', alt: 'photo', style: { height: '300px' }},
  { src: '/newplate6.jpg', alt: 'photo', style: { height: '300px' }},
  { src: '/newplate7.jpg', alt: 'photo', style: { height: '300px' }},
  { src: '/newplate8.jpg', alt: 'photo', style: { height: '300px' }},

];


gsap.registerPlugin(useGSAP,SplitText);
const heroImages = ["/two.jpg", "/three.jpg", "/four.jpg", "/five.jpg", "/six.jpg"];

const PageLand = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 });
    tl.fromTo(
      ".container",
      { clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" }, // البداية
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // النهاية
        duration: 2, // المدة بالثواني

        ease: "power3.inOut", // الانسيابيه
      }
    );
     const wordsSplit = SplitText.create(".h1-h1",{
      type:"words",
     })
     const words = wordsSplit.words
     words.forEach((word,index)=>gsap.set(word,{
        x:index===0 ? "-100px" : index===3 ? "100px" :"0px",
        y:index===1 ? "-100px" : index===2? "100px": "0px",
        opacity:0
     }))
    const images = document.querySelectorAll(".img-img img");
    images.forEach((image, index) =>
      gsap.set(image, { yPercent: index % 2 === 0 ? -100 : 100 })
    );
    const pargraphSplit = SplitText.create(".parg .p",{
      type:"lines"
    })
    const lines = pargraphSplit.lines
    
    tl.to(images, {
      yPercent: 0,
      duration: 2,
      ease: "power3.inOut",
    });
    tl.to(words,{
      y:0,
      x:0,
      opacity:1,
      duration:4,
      stagger:{
        each:1,

      },
      ease:"elastic.inOut"
    })
    tl.from(lines,{
      rotationX: -100,
    transformOrigin: "50% 50% -160px",
    opacity: 0,
    duration: 0.8, 
    ease: "power3",
    stagger: 0.25
    })
    tl.fromTo("button",{
     opacity:0,
     y:-100
    },{opacity:1,
      y:0,
      duration:1,
      ease:"elastic.inOut"
    })
  }, [isMobile]);

  return (
    <>
      <div className="container">
        <div className="container-image">
          {(isMobile ? heroImages.slice(0, 2) : heroImages).map((src, index) => (
            <div className="img-img" key={`${src}-${index}`}>
              <img src={src} alt="" />
            </div>
          ))}
        </div>
        <div className="h1">
          <h1 className="h1-h1">Welcome to Chef Memo</h1>
        </div>
        <div className="parg">
          <p className="p">
            In our kitchen, love is the secret ingredient. Our dishes tell a
            story of passion and devotion in every bite. From our delightful
            appetizers to our enchanting desserts, every meal is prepared with
            care to make your gatherings more special
          </p>
        </div>
        <button className="button">Book Me</button>
      </div>
       {/* <ScrollGalleryPinned/>      
      <section className='min-h-screen flex items-center bg-gradient-to-b from-black via-gray-900 to-black py-20'>
        <ScrollVelocity 
          texts={["🍴 FINE DINING", "👨‍🍳 MASTER CHEF", "🔥 FRESH & HOT", "⭐ MICHELIN STAR"]} 
          className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 font-black"
          velocity={50}
          numCopies={6}
          parallaxClassName="w-full py-6"
        />
      </section> */}
      <div style={{ marginBottom: '0' }}> {/* إزالة أي margin إضافي */}
  <ScrollGalleryPinned/>
</div>
<section className='min-h-screen flex items-center bg-linear-to-b from-black via-gray-900 to-black py-20' style={{ marginTop: '0' }}>
  <ScrollVelocity 
         texts={["🍴 FINE DINING", "👨‍🍳 MASTER CHEF", "🔥 FRESH & HOT", "⭐ MICHELIN STAR"]} 
         className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-orange-500 to-red-500 font-black"
          velocity={50}
          numCopies={6}
          parallaxClassName="w-full py-6"
        />
</section>
     <div style={{ height: '400px', position: 'relative', overflow: 'hidden',backgroundColor:"black"}}>
      {/* Basic horizontal loop */}
      <LogoLoop
        logos={techLogos}
        speed={120}
        direction="left"
        logoHeight={48}
        gap={100}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Technology partners"
      />
      </div>
    </>
  );
};

export default PageLand;
