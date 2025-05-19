
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface NavLinksProps {
  toggleMenu?: () => void;
  className?: string;
  linkClassName?: string;
}

const NavLinks: React.FC<NavLinksProps> = ({ 
  toggleMenu, 
  className = '', 
  linkClassName = 'text-nest-dark hover:text-nest-primary font-medium transition-colors'
}) => {
  const { isAdmin } = useAuth();
  
  return (
    <div className={className}>
      <Link 
        to="/" 
        className={linkClassName}
        onClick={toggleMenu}
      >
        Home
      </Link>
      <Link 
        to="/properties" 
        className={linkClassName}
        onClick={toggleMenu}
      >
        Properties
      </Link>
      <Link 
        to="/about" 
        className={linkClassName}
        onClick={toggleMenu}
      >
        About Us
      </Link>
      <Link 
        to="/contact" 
        className={linkClassName}
        onClick={toggleMenu}
      >
        Contact
      </Link>
      <Link 
        to="/submit-property" 
        className={linkClassName}
        onClick={toggleMenu}
      >
        Submit Property
      </Link>
      
      {/* Admin link - only visible to admin users */}
      {isAdmin && (
        <Link 
          to="/admin/properties" 
          className={linkClassName}
          onClick={toggleMenu}
        >
          Admin
        </Link>
      )}
    </div>
  );
};

export default NavLinks;
