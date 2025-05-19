
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';
import PropertiesDropdown from './PropertiesDropdown';

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
  const { isAdmin, isAuthenticated } = useAuth();
  
  return (
    <div className={className}>
      <Link 
        to="/" 
        className={linkClassName}
        onClick={toggleMenu}
      >
        Home
      </Link>
      
      {/* Properties Dropdown */}
      <PropertiesDropdown 
        linkClassName={linkClassName} 
        toggleMenu={toggleMenu}
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
      />
      
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
