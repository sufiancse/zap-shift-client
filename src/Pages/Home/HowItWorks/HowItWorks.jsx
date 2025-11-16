import bookingIcon from "../../../assets/bookingIcon.png";

const HowItWorks = () => {
  const slides = [
    {
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];
  return (
    <div className="m-5 sm:m-10 ">
      <h1 className="text-lg md:text-xl lg:text-3xl font-extrabold mb-6">
        How it Works
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 ">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-2 sm:p-3 md:p-4 lg:p-8 space-y-5"
          >
            <img src={bookingIcon} alt="" />
            <h2 className="font-bold text-sm md:text-base lg:text-lg">
              {slide.title}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg">
              {slide.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
