import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";
import ScrollGalleryPinned from "./ScrollGalleryPinned";
import ScrollVelocity from "./ScrollVelocity";
import LogoLoop from "./loping";

const techLogos = [
  { src: "/plate1.jpg", alt: "photo", style: { height: "300px" } },
  { src: "/plate2.jpg", alt: "photo", style: { height: "300px" } },
  { src: "/plate3.jpg", alt: "photo", style: { height: "300px" } },
  { src: "/plate4.jpg", alt: "photo", style: { height: "300px" } },
  { src: "/plate5.jpg", alt: "photo", style: { height: "300px" } },
  { src: "/plate6.jpg", alt: "photo", style: { height: "300px" } },
  { src: "/plate12.jpg", alt: "photo", style: { height: "300px" } },
  { src: "/plate23.jpg", alt: "photo", style: { height: "300px" } },
  { src: "/plate55.jpg", alt: "photo", style: { height: "300px" } },
  { src: "/plate76.jpg", alt: "photo", style: { height: "300px" } },
  { src: "/plate78.jpg", alt: "photo", style: { height: "300px" } },
  { src: "/plate48.jpg", alt: "photo", style: { height: "300px" } },
  { src: "/plate87.jpg", alt: "photo", style: { height: "300px" } },
  { src: "/plate90.jpg", alt: "photo", style: { height: "300px" } },
  { src: "/plate767.jpg", alt: "photo", style: { height: "300px" } },
  { src: "/plate65.jpg", alt: "photo", style: { height: "300px" } },
  { src: "/plate88.jpg", alt: "photo", style: { height: "300px" } },
  { src: "/newplate2.jpg", alt: "photo", style: { height: "300px" } },
  { src: "/newplate3.jpg", alt: "photo", style: { height: "300px" } },
  { src: "/newplate6.jpg", alt: "photo", style: { height: "300px" } },
  { src: "/newplate7.jpg", alt: "photo", style: { height: "300px" } },
  { src: "/newplate8.jpg", alt: "photo", style: { height: "300px" } },
];

gsap.registerPlugin(useGSAP, SplitText);
const heroImages = [
  "/two.jpg",
  "/three.jpg",
  "/four.jpg",
  "/five.jpg",
  "/six.jpg",
];

const CONTACT_EMAIL = "chefmemo.inquiries@gmail.com";
const CONTACT_PHONE = "+971 50 190 2058";
const CONTACT_LOCATION = "Dubai · United Arab Emirates";
const CONTACT_SUBJECT = "Chef Memo · Private dining inquiry";
const CONTACT_TEMPLATE =
  "Hello Chef Aly,%0A%0AWe would love to host a private dining experience in the Emirates.%0AHere are the initial details:%0A• Date:%0A• Guest count:%0A• Preferred cuisine:%0A%0AThank you,%0A";

const EMAILJS_SERVICE_ID = "service_ihfr7yg";
const EMAILJS_TEMPLATE_ID = "template_f8tfamj";
const EMAILJS_PUBLIC_KEY = "wnkIab59AqvM0ez5H";

const PageLand = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const wordsSplit = SplitText.create(".h1-h1", {
      type: "words",
    });
    const words = wordsSplit.words;
    words.forEach((word, index) =>
      gsap.set(word, {
        x: index === 0 ? "-100px" : index === 3 ? "100px" : "0px",
        y: index === 1 ? "-100px" : index === 2 ? "100px" : "0px",
        opacity: 0,
      })
    );
    const images = document.querySelectorAll(".img-img img");
    images.forEach((image, index) =>
      gsap.set(image, { yPercent: index % 2 === 0 ? -100 : 100 })
    );
    const pargraphSplit = SplitText.create(".parg .p", {
      type: "lines",
    });
    const lines = pargraphSplit.lines;

    tl.to(images, {
      yPercent: 0,
      duration: 2,
      ease: "power3.inOut",
    });
    tl.to(words, {
      y: 0,
      x: 0,
      opacity: 1,
      duration: 4,
      stagger: {
        each: 1,
      },
      ease: "elastic.inOut",
    });
    tl.from(lines, {
      rotationX: -100,
      transformOrigin: "50% 50% -160px",
      opacity: 0,
      duration: 0.8,
      ease: "power3",
      stagger: 0.25,
    });
    tl.fromTo(
      "button",
      {
        opacity: 0,
        y: -100,
      },
      { opacity: 1, y: 0, duration: 1, ease: "elastic.inOut" }
    );
  }, [isMobile]);

  const handleBookClick = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleEmailClick = (event) => {
    event.preventDefault();
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      CONTACT_EMAIL
    )}&su=${encodeURIComponent(CONTACT_SUBJECT)}&body=${CONTACT_TEMPLATE}`;
    const opened = window.open(gmailUrl, "_blank", "noopener,noreferrer");

    if (!opened) {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        CONTACT_SUBJECT
      )}&body=${CONTACT_TEMPLATE}`;
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setFormStatus({
        type: "error",
        message:
          "Email service is not configured yet. Please add your EmailJS keys.",
      });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          user_name: formData.user_name,
          user_email: formData.user_email,
          message: formData.message,
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        }
      );

      setFormStatus({
        type: "success",
        message:
          "Thank you for reaching out. Chef Aly is always at your service.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setFormStatus({
        type: "error",
        message:
          "Something went wrong while sending. Please try again or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="container-image">
          {(isMobile ? heroImages.slice(0, 2) : heroImages).map(
            (src, index) => (
              <div className="img-img" key={`${src}-${index}`}>
                <img src={src} alt="" />
              </div>
            )
          )}
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
        <button className="button" onClick={handleBookClick}>
          Book Me
        </button>
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
      <div style={{ marginBottom: "0" }}>
        {" "}
        {/* إزالة أي margin إضافي */}
        <ScrollGalleryPinned />
      </div>
      <section
        className="min-h-screen flex items-center bg-linear-to-b from-black via-gray-900 to-black py-20"
        style={{ marginTop: "0" }}
      >
        <ScrollVelocity
          texts={[
            "🍴 FINE DINING",
            "👨‍🍳 MASTER CHEF",
            "🔥 FRESH & HOT",
            "⭐ MICHELIN STAR",
          ]}
          className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-orange-500 to-red-500 font-black"
          velocity={50}
          numCopies={6}
          parallaxClassName="w-full py-6"
        />
      </section>
      <div
        style={{
          height: "400px",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "black",
        }}
      >
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
      <section
        className="contact-section"
        id="contact-form"
        ref={formRef}
        aria-labelledby="contact-heading"
      >
        <div className="contact-content">
          <div className="contact-copy">
            <p className="eyebrow">Contact</p>
            <h2 id="contact-heading">Private dining in the Emirates</h2>
            <p className="lead">
              Share your occasion details and we’ll tailor a Chef Aly experience
              for Dubai, Abu Dhabi, and across the UAE. Expect a bespoke reply
              within 24 hours via Gmail.
            </p>
            <ul className="contact-meta">
              <li>
                <span>Location</span>
                <p>{CONTACT_LOCATION}</p>
              </li>
              <li>
                <span>Direct phone</span>
                <a href={`tel:${CONTACT_PHONE}`} className="contact-value">
                  {CONTACT_PHONE}
                </a>
              </li>
              <li>
                <span>Direct Gmail</span>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                    CONTACT_SUBJECT
                  )}&body=${CONTACT_TEMPLATE}`}
                  className="contact-value small"
                  onClick={handleEmailClick}
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <span>Response time</span>
                <p>Within 24 hours · Chef Aly concierge</p>
              </li>
            </ul>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                type="text"
                name="user_name"
                placeholder="Your full name"
                value={formData.user_name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="user_email"
                placeholder="you@example.com"
                value={formData.user_email}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Message
              <textarea
                name="message"
                placeholder="Share your date, guest count, and cuisine vision..."
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </label>
            {formStatus.message && (
              <p
                className={`form-status ${
                  formStatus.type === "success" ? "success" : "error"
                }`}
                role="status"
                aria-live="polite"
              >
                {formStatus.message}
              </p>
            )}
            <button
              type="submit"
              className="button secondary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send request"}
            </button>
          </form>
        </div>
      </section>
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Chef Memo · Crafted with passion.</p>
        <p>Private dining · Chef Aly · Worldwide service</p>
        <p>this web ccreated by mohamed elshshtawy</p>
      </footer>
    </>
  );
};

export default PageLand;
