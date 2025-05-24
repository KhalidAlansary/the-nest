
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-nest-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-nest-primary rounded-full"></div>
              <span className="text-2xl font-bold text-white">The Nest</span>
            </Link>
            <p className="text-gray-300">Find your perfect rental home - whether it's for a day, a week, or a month.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-nest-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-nest-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-nest-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-nest-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-nest-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-nest-primary transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-nest-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-nest-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+20 1067668951</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>youssifhussein669@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1" />
                <span>Fifth Settlement<br />New Cairo</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">Subscribe to get updates on new properties and special offers.</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nest-primary"
              />
              <button 
                type="submit"
                className="bg-nest-primary hover:bg-nest-primary/90 text-white px-4 py-2 rounded font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} The Nest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
