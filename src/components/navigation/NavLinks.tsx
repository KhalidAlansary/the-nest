
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import MyPropertiesDropdown from './MyPropertiesDropdown';

interface NavLinksProps {
  toggleMenu?: () => void;
  className?: string;
  linkClassName?: string;
  isMobile?: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ 
  toggleMenu, 
  className = '', 
  linkClassName = 'text-nest-dark hover:text-nest-primary font-medium transition-colors',
  isMobile = false
}) => {
  const { isAdmin, isAuthenticated } = useAuth();
  
  return (
    <div className={`${className} items-center gap-5`}>
      <Link 
        to="/" 
        className={linkClassName}
        onClick={toggleMenu}
      >
        Home
      </Link>
      
      {/* Properties Link */}
      <Link 
        to="/properties" 
        className={linkClassName}
        onClick={toggleMenu}
      >
        Browse Properties
      </Link>

      {/* My Properties Dropdown - Only show when authenticated */}
      {isAuthenticated && (
        <MyPropertiesDropdown
          linkClassName={linkClassName}
          toggleMenu={toggleMenu}
          isMobile={isMobile}
        />
      )}

      <Link 
        to="/furnish-your-home" 
        className={linkClassName}
        onClick={toggleMenu}
      >
        Furnish Your Nest
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
    </div>
  );
};

export default NavLinks;
