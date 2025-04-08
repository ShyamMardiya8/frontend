import { CheckCircle2, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "../constatnt/Testimonal";
import { useEffect, useState } from "react";

const Testimonal = () => {
  const [index, setIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Update responsive view
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) setCardsPerView(1);      // mobile
      else if (width < 1024) setCardsPerView(2); // tablet
      else setCardsPerView(3);                  // desktop
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Max index (last slide start)
  const maxIndex = testimonials.length - cardsPerView;

  const handlePrev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  // Translate percentage for animation
  const translateX = `-${(index * 100) / cardsPerView}%`;

  return (
    <section className="px-4 py-12 max-w-7xl mx-auto overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">OUR HAPPY CUSTOMERS</h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={index === 0}
            className="p-2 rounded-full border hover:bg-gray-100 transition disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={index >= maxIndex}
            className="p-2 rounded-full border hover:bg-gray-100 transition disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${(testimonials.length * 100) / cardsPerView}%`,
            transform: `translateX(${translateX})`,
          }}
        >
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="p-2"
              style={{ width: `${100 / testimonials.length}%` }}
            >
              <div className="rounded-xl border p-6 shadow-sm bg-white h-full">
                <div className="flex items-center gap-1 text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
                </div>
                <h3 className="font-semibold mb-1 flex items-center gap-1">
                  {testimonial.name}
                  <CheckCircle2 className="text-green-500 w-4 h-4" />
                </h3>
                <p className="text-sm text-gray-600">{testimonial.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonal;
