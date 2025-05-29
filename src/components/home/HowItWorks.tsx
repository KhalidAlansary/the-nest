import React from "react";
import { Search, Home, Calendar, Key } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: Search,
    title: "Search",
    description:
      "Search for rentals based on your preferences, duration needs, and budget.",
  },
  {
    id: 2,
    icon: Calendar,
    title: "Book",
    description:
      "Choose your stay duration - daily, weekly, or monthly - and book securely online.",
  },
  {
    id: 3,
    icon: Key,
    title: "Stay",
    description: "Enjoy your comfortable stay with our 24/7 customer support.",
  },
  {
    id: 4,
    icon: Home,
    title: "Return",
    description:
      "Come back to The Nest for your next stay, with loyalty rewards and benefits.",
  },
];

const HowItWorks = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Renting with The Nest is simple and straightforward. Follow these
            steps to find your perfect temporary home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-nest-primary/10 flex items-center justify-center">
                  <step.icon size={32} className="text-nest-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>

              {step.id < steps.length && (
                <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2">
                  <div className="w-12 h-1 bg-gray-200"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
