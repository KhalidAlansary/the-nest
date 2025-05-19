
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import MyPropertiesDropdown from './MyPropertiesDropdown';
import { ChevronDown } from 'lucide-react';

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

      {/* Admin Dropdown - Only show when user is admin */}
      {isAdmin && (
        <div className="relative group">
          <div 
            className={`${linkClassName} flex items-center cursor-pointer`}
            role="button"
            tabIndex={0}
          >
            Admin <ChevronDown size={16} className="ml-1" />
          </div>
          {!isMobile && (
            <div className="absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 hidden group-hover:block">
              <div className="py-1 divide-y divide-gray-100">
                <Link
                  to="/admin/properties"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  Manage Properties
                </Link>
                <Link
                  to="/admin/furnish-requests"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  Furnish Requests
                </Link>
              </div>
            </div>
          )}
          {isMobile && (
            <div className="pl-4 mt-2 space-y-2">
              <Link
                to="/admin/properties"
                className={`${linkClassName} block`}
                onClick={toggleMenu}
              >
                Manage Properties
              </Link>
              <Link
                to="/admin/furnish-requests"
                className={`${linkClassName} block`}
                onClick={toggleMenu}
              >
                Furnish Requests
              </Link>
            </div>
          )}
        </div>
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
