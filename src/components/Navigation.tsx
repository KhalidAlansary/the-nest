
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-nest-primary rounded-full"></div>
            <span className="text-2xl font-bold text-nest-dark">The Nest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-nest-dark hover:text-nest-primary font-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-nest-dark hover:text-nest-primary font-medium transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-nest-dark hover:text-nest-primary font-medium transition-colors">
              Contact
            </Link>
            <Button className="bg-nest-primary hover:bg-nest-primary/90">
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-nest-dark focus:outline-none">
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-2 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="py-2 text-nest-dark hover:text-nest-primary font-medium transition-colors"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="py-2 text-nest-dark hover:text-nest-primary font-medium transition-colors"
                onClick={toggleMenu}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="py-2 text-nest-dark hover:text-nest-primary font-medium transition-colors"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Button className="bg-nest-primary hover:bg-nest-primary/90 w-full">
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
