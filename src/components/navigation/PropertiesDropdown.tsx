
import React from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';

interface PropertiesDropdownProps {
  linkClassName: string;
  toggleMenu?: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const PropertiesDropdown: React.FC<PropertiesDropdownProps> = ({
  linkClassName,
  toggleMenu,
  isAuthenticated,
  isAdmin
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={`${linkClassName} inline-flex items-center`}>
        Properties <ChevronDown className="ml-1 h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuItem asChild>
          <Link 
            to="/properties" 
            className="w-full cursor-pointer"
            onClick={toggleMenu}
          >
            Browse Properties
          </Link>
        </DropdownMenuItem>
        
        {/* Show Submit Property for authenticated users or admins */}
        {(isAuthenticated || isAdmin) && (
          <DropdownMenuItem asChild>
            <Link 
              to="/submit-property" 
              className="w-full cursor-pointer"
              onClick={toggleMenu}
            >
              Submit Property
            </Link>
          </DropdownMenuItem>
        )}
        
        {/* Admin specific menu item */}
        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link 
              to="/admin/properties" 
              className="w-full cursor-pointer"
              onClick={toggleMenu}
            >
              Approve Properties
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PropertiesDropdown;
