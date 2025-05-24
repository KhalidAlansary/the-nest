
import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Mohamed Sokkar',
    role: 'Business Traveler',
    comment: 'The Nest made finding a comfortable monthly rental for my work assignment so easy. The property was exactly as described and the host was incredibly responsive.',
    rating: 5,
    image: 'mohammed_sokkar.jpg'
  },
  {
    id: 2,
    name: 'Mohammed Hassan',
    role: 'Vacation Renter',
    comment: 'We booked a weekly stay for our family vacation and couldn\'t have been happier. The booking process was seamless and the beachfront property exceeded our expectations.',
    rating: 5,
    image: 'mohamed_hassan.jpg'
  },
  {
    id: 3,
    name: 'Mohammed Hisham',
    role: 'Weekend Getaway',
    comment: 'The daily rental option was perfect for our weekend getaway. The Nest provided an exceptional property with all the amenities we needed for a relaxing stay.',
    rating: 4,
    image: 'mohamed_hisham.jpg'
  }
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-nest-primary/5">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">What Our Guests Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what guests have to say about their experience with The Nest.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg p-6 shadow-md relative">
              <div className="absolute top-6 right-6 text-nest-primary opacity-20">
                <Quote size={32} />
              </div>
              
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={`${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} mr-1`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-700">{testimonial.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
