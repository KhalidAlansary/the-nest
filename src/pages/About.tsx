
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { CheckCircle } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Jessica Thompson',
      role: 'Founder & CEO',
      bio: 'With over 15 years in real estate, Jessica founded The Nest to revolutionize the rental experience.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVzaW5lc3MlMjBwZXJzb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      name: 'David Chen',
      role: 'CTO',
      bio: 'David leads our tech team, ensuring The Nest platform delivers a seamless experience for hosts and guests alike.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YnVzaW5lc3MlMjBwZXJzb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 3,
      name: 'Sophia Williams',
      role: 'Head of Customer Experience',
      bio: 'Sophia ensures every guest and host receives exceptional support throughout their journey with The Nest.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJ1c2luZXNzJTIwcGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-nest-accent text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About The Nest</h1>
            <p className="text-xl max-w-3xl mx-auto">
              We're on a mission to make finding your temporary home as simple and enjoyable as possible, 
              whether you need it for a day, a week, or a month.
            </p>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  Founded in 2018, The Nest was born from a simple idea: finding a temporary place to stay 
                  shouldn't be complicated or stressful. Our founder, Jessica Thompson, experienced firsthand 
                  the challenges of finding quality short-term accommodations while traveling for work.
                </p>
                <p className="text-gray-700 mb-4">
                  What started as a small platform connecting travelers with quality rentals has grown into 
                  a comprehensive service offering daily, weekly, and monthly rental options across major 
                  cities nationwide.
                </p>
                <p className="text-gray-700">
                  Today, The Nest helps thousands of guests find their perfect temporary home, while enabling 
                  property owners to maximize the value of their real estate investments with flexible rental options.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vZGVybiUyMGhvbWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=60" 
                  alt="The Nest Story" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="section-padding bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                At The Nest, we're guided by a set of core values that inform everything we do.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Quality & Trust',
                  description: 'We carefully vet all properties to ensure they meet our high standards for quality, comfort, and safety.'
                },
                {
                  title: 'Flexibility',
                  description: 'We understand that everyone's needs are different, which is why we offer flexible rental durations to suit your schedule.'
                },
                {
                  title: 'Transparency',
                  description: 'No hidden fees or surprises. We believe in clear, honest communication with our guests and property owners.'
                },
                {
                  title: 'Customer Service',
                  description: 'Our dedicated support team is available 24/7 to assist with any questions or issues that may arise.'
                },
                {
                  title: 'Innovation',
                  description: 'We continuously improve our platform to make finding and booking your rental as seamless as possible.'
                },
                {
                  title: 'Community',
                  description: 'We're building a community of guests and hosts who share our vision of a better rental experience.'
                }
              ].map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="text-nest-primary mr-2" size={24} />
                    <h3 className="text-xl font-bold">{value.title}</h3>
                  </div>
                  <p className="text-gray-700">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                The passionate individuals behind The Nest who work tirelessly to provide you with the best rental experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-nest-primary font-medium mb-3">{member.role}</p>
                    <p className="text-gray-700">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
