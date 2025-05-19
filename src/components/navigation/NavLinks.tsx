
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import MyPropertiesDropdown from './MyPropertiesDropdown';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
        <>
          {!isMobile ? (
            <DropdownMenu>
              <DropdownMenuTrigger className={`${linkClassName} flex items-center gap-1`}>
                Admin <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-white">
                <DropdownMenuItem asChild>
                  <Link
                    to="/admin/properties"
                    className="w-full"
                    onClick={toggleMenu}
                  >
                    Manage Properties
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/admin/furnish-requests"
                    className="w-full"
                    onClick={toggleMenu}
                  >
                    Furnish Requests
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div>
              <div 
                className={`${linkClassName} flex items-center cursor-pointer`}
                role="button"
                tabIndex={0}
              >
                Admin <ChevronDown size={16} className="ml-1" />
              </div>
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
            </div>
          )}
        </>
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
