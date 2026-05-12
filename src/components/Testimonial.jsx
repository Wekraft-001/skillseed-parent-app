import React, { useState, useEffect, useRef } from "react";
import { Quote, ChevronLeft, ChevronRight, User } from "lucide-react";

const testimonials = [
  {
    content:
      "WeKraft exceeded our expectations. The courses are fantastic and the toolkits adds a fun, hands-on element. Highly Recommended!",
    author: {
      name: "Honorine Kamizi",
      location: "Parent - Nyagatare City",
    },
  },
  {
    content:
      "We are thrilled with Wekraft. Our child is thriving and the toolkit brings learning to life with hands-on projects. 5 stars!",
    author: {
      name: "Mugisha D'Amour",
      location: "Parent - Nyanza City",
    },
  },
  {
    content:
      "Our child's journey with Wekraft has been incredible. They love the courses and projects. We're impressed with their progress!",
    author: {
      name: "Agakiza Christa",
      location: "Parent - Remera, Kigali",
    },
  },
  {
    content:
      "Wekraft is a game-changer for kids. Excellent instructors, engaging courses, and the toolkit keeps them excited to learn!",
    author: {
      name: "Thomas Iradukunda",
      location: "Parent - Kigali, Rwanda",
    },
  },
];

// Generates a consistent soft color per name
const getAvatarColor = (name) => {
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const intervalRef = useRef(null);

  const total = testimonials.length;

  const goTo = (index, dir = "next") => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 300);
  };

  const next = () => goTo((current + 1) % total, "next");
  const prev = () => goTo((current - 1 + total) % total, "prev");

  // Auto-advance every 5 seconds
  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 5000);
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  // Pause on manual interaction, then resume
  const handleManual = (fn) => {
    clearInterval(intervalRef.current);
    fn();
    startInterval();
  };

  const testimonial = testimonials[current];

  return (
    <section className="bg-gradient-to-br from-[#0A1F44] to-[#1a3a6e] py-10 px-4">
      <div className="container mx-auto max-w-4xl">

        {/* Section heading */}
        <div className="text-center mb-10">
          <span className="inline-block bg-[#FFC107]/20 text-[#FFC107] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            What Parents Are Saying
          </h2>
          <p className="text-blue-200 mt-3 text-sm md:text-base">
            Real stories from families across Rwanda
          </p>
        </div>

        {/* Card */}
        <div className="relative">
          <div
            className={`bg-white rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-300 ${
              isAnimating
                ? direction === "next"
                  ? "opacity-0 translate-x-6"
                  : "opacity-0 -translate-x-6"
                : "opacity-100 translate-x-0"
            }`}
          >
            {/* Quote icon */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-[#FFC107]/15 rounded-full flex items-center justify-center">
                <Quote className="w-7 h-7 text-[#FFC107]" />
              </div>
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-[#FFC107]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Content */}
            <p className="text-gray-700 text-lg md:text-xl text-center leading-relaxed font-medium mb-8 max-w-2xl mx-auto">
              "{testimonial.content}"
            </p>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0 ${getAvatarColor(
                  testimonial.author.name
                )}`}
              >
                {getInitials(testimonial.author.name)}
              </div>
              <div className="text-left">
                <p className="font-bold text-[#0A1F44] text-base">
                  {testimonial.author.name}
                </p>
                <p className="text-gray-500 text-sm">
                  {testimonial.author.location}
                </p>
              </div>
            </div>
          </div>

          {/* Prev / Next buttons */}
          <button
            onClick={() => handleManual(prev)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 md:-translate-x-7 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#0A1F44] hover:bg-[#FFC107] hover:text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleManual(next)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 md:translate-x-7 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#0A1F44] hover:bg-[#FFC107] hover:text-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2.5 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => handleManual(() => goTo(i, i > current ? "next" : "prev"))}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-[#FFC107] w-8 h-2.5"
                  : "bg-white/30 hover:bg-white/60 w-2.5 h-2.5"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <p className="text-center text-blue-300 text-xs mt-4 tracking-widest uppercase">
          {current + 1} / {total}
        </p>

      </div>
    </section>
  );
};

export default Testimonials;