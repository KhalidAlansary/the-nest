
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out');
    navigate('/');
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
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-nest-dark">
                  <User size={18} className="mr-2" />
                  <span>{user?.username}</span>
                </div>
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  className="border-nest-primary text-nest-primary hover:bg-nest-primary/10"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button 
                  onClick={() => navigate('/login')} 
                  className="bg-nest-primary hover:bg-nest-primary/90"
                >
                  <LogIn size={18} className="mr-2" /> Sign In
                </Button>
                <Button 
                  onClick={() => navigate('/signup')} 
                  variant="outline"
                  className="border-nest-primary text-nest-primary hover:bg-nest-primary/10"
                >
                  Sign Up
                </Button>
              </div>
            )}
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
              
              {isAuthenticated ? (
                <>
                  <div className="py-2 flex items-center text-nest-dark">
                    <User size={18} className="mr-2" />
                    <span>{user?.username}</span>
                  </div>
                  <Button 
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }} 
                    variant="outline" 
                    className="border-nest-primary text-nest-primary hover:bg-nest-primary/10 w-full"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => {
                      navigate('/login');
                      toggleMenu();
                    }} 
                    className="bg-nest-primary hover:bg-nest-primary/90 w-full mb-2"
                  >
                    <LogIn size={18} className="mr-2" /> Sign In
                  </Button>
                  <Button 
                    onClick={() => {
                      navigate('/signup');
                      toggleMenu();
                    }} 
                    variant="outline"
                    className="border-nest-primary text-nest-primary hover:bg-nest-primary/10 w-full"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
