import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import CustomEase from "gsap/CustomEase";
import "./preloader.css";
import ScrollGalleryPinned from "../ScrollGalleryPinned";
import PageLand from "../PageLand";


gsap.registerPlugin(SplitText, CustomEase);

export default function Preloader() {
  const preloaderRef = useRef(null);
  const [finsihed,setFinished] = useState(false)

  useLayoutEffect(() => {
    if (!preloaderRef.current) return;

    const ctx = gsap.context(() => {
      CustomEase.create("hop", "0.9,0,0.1,1");

      const createSplit = (selector, type, className) => {
        return new SplitText(selector, {
          type: type,
          [`${type}Class`]: className,
          mask: type,
        });
      };

      // Splits
      const splitPreLoaderHeader = createSplit(
        ".preloader-header a",
        "chars",
        "char"
      );
      const splitPreloaderCopy = createSplit(
        ".preloader-copy p",
        "lines",
        "line"
      );
      const splitHeader = createSplit(".header-row h1", "lines", "line");

      const chars = splitPreLoaderHeader.chars;
      const lines = splitPreloaderCopy.lines;
      const headerLines = splitHeader.lines;
      const initialChar = chars[0];
      const lastChar = chars[chars.length - 1];

      chars.forEach((char, index) =>
        gsap.set(char, { yPercent: index % 2 === 0 ? -100 : 100 })
      );
      gsap.set(lines, { yPercent: 100 });
      gsap.set(headerLines, { yPercent: 100 });

      chars.forEach((char) => (char.style.display = "inline-block"));
      gsap.set(chars, { transformOrigin: "center center" });

      const preloadImage = gsap.utils.toArray(".preloader-image .img");
      const preloadImagesInner = gsap.utils.toArray(
        ".preloader-image .img img"
      );

      const tl = gsap.timeline({ delay: 0.25 ,onComplete:()=>{
        setFinished(true)
      }});

      tl.to(".progress-bar", { scaleX: 1, duration: 4, ease: "power3.inOut" })
        .set(".progress-bar", { transformOrigin: "right" })
        .to(".progress-bar", { scaleX: 0, duration: 1, ease: "power3.in" });

      preloadImage.forEach((img, index) => {
        tl.to(
          img,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "hop",
            duration: 1,
            delay: index * 0.75,
          },
          "-=5"
        );
      });

      preloadImagesInner.forEach((img, index) => {
        tl.to(
          img,
          {
            scale: 1,
            duration: 1.5,
            ease: "hop",
            delay: index * 0.75,
          },
          "-=5.25"
        );
      });

      tl.to(
        lines,
        {
          yPercent: 0,
          duration: 2,
          ease: "hop",
          stagger: 0.1,
        },
        "-=5.5"
      );

      tl.to(
        chars,
        {
          yPercent: 0,
          duration: 1,
          ease: "hop",
          stagger: 0.025,
        },
        "-=4"
      );

      tl.to(
        ".preloader-image",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          ease: "hop",
        },
        "-=1.5"
      );

      tl.to(
        lines,
        {
          y: "-125%",
          duration: 2,
          ease: "hop",
          stagger: 0.1,
        },
        "-=2"
      );

      tl.to(
        chars,
        {
          yPercent: (index) => {
            if (index === 0 || index === chars.length - 1) return 0;
            return index % 2 === 0 ? 100 : -100;
          },
          duration: 1,
          ease: "hop",
          stagger: 0.025,
          delay: 0.5,
          onStart: () => {
            const initialMask = initialChar.parentElement;
            const lastMask = lastChar.parentElement;

            if (initialMask?.classList.contains("char-mask"))
              initialMask.style.overflow = "visible";
            if (lastMask?.classList.contains("char-mask"))
              lastMask.style.overflow = "visible";

            const viewportWidth = window.innerWidth;
            const centerX = viewportWidth / 2;
            const initialRect = initialChar.getBoundingClientRect();
            const lastRect = lastChar.getBoundingClientRect();

            gsap.to([initialChar, lastChar], {
              duration: 1,
              ease: "hop",
              delay: 0.5,
              x: (i) =>
                i === 0
                  ? centerX - initialRect.left - initialRect.width
                  : centerX - lastRect.left,
            });
          },
          onComplete: () => {
            gsap.set(".preloader-header", { mixBlendMode: "difference" });
            gsap.to(".preloader-header", {
              y: "2rem",
              scale: 0.35,
              duration: 1.75,
              ease: "hop",
            });
          },
        },
        "-=2.5"
      );

      tl.to(".preloader", {
        clipPath: "polygon(0% 0%,100% 0%,100% 0%,0% 0%)",
        duration: 1.75,
        ease: "hop",
      });

      tl.to(".header-row .line", {
        yPercent: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
      });

      tl.to(".divder", {
        scaleX: 1,
        ease: "power4.out",
        duration: 1,
        stagger: 0.1,
      });

      tl.to(".header-row .line", {
        yPercent: 100,
        duration: 1,
        delay: 4,
        ease: "power4.out",
        stagger: 0.1,
      });

      tl.to(".divder", {
        scaleX: 0,
        ease: "power4.out",
        duration: 1,
        stagger: 0.1,
      });
      tl.to(".hero",{
        display:"none"
      })
    }, preloaderRef);

    return () => ctx.revert(); // cleanup مهم جداً
  }, []);

  return (
    <div ref={preloaderRef}>
     {!finsihed && (
     <>
       <div className="preloader">
        <div className="progress-bar"></div>

        <div className="preloader-image">
          <div className="img">
            <img src="/two.jpg" />
          </div>
          <div className="img">
            <img src="/three.jpg" />
          </div>
          <div className="img">
            <img src="/four.jpg" />
          </div>
          <div className="img">
            <img src="/landpage.jpg" />
          </div>
        </div>

        <div className="preloader-copy">
          <p>
            Embark on an unforgettable culinary journey. Where fresh ingredients
            are transformed into artistic masterpieces on your plate. Our chef
            blends creativity with authentic flavors to deliver a unique dining
            experience that matches your refined taste.
          </p>
        </div>
      </div>

      <div className="preloader-header">
        <a href="#">Chef Aly</a>
      </div>

      <section className="hero">
        {[
          "A place where stories begin with a bite... and our chef is the storyteller.",
          "Not just a meal, but an emotion... where creativity touches your heart from the very first bite.",
          "For connoisseurs only... where food becomes a memory and taste becomes a tale.",
        ].map((t, i) => (
          <div key={i} className="header-row">
            <div className="divder"></div>
            <h1>{t}</h1>
          </div>
        ))}
      </section>
     </>
     )}
        {finsihed && <PageLand/>}
    </div>
  );
}
