
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Featured Properties */}
        <FeaturedProperties />
        
        {/* How It Works */}
        <HowItWorks />
        
        {/* Call to Action */}
        <section className="section-padding bg-nest-accent text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Perfect Nest?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of happy renters who've found their ideal temporary home with us.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-nest-primary hover:bg-nest-primary/90" asChild>
                <Link to="/properties">Browse Properties</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-nest-accent" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <Testimonials />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
