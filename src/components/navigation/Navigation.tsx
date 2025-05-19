
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import NavLinks from './NavLinks';
import AuthButtons from './AuthButtons';
import MobileMenu from './MobileMenu';

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
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <NavLinks className="flex space-x-8" />
            <AuthButtons />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-nest-dark focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>
    </nav>
  );
};

export default Navigation;
