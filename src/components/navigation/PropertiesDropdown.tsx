
import React from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface PropertiesDropdownProps {
  linkClassName: string;
  toggleMenu?: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isMobile?: boolean;
}

const PropertiesDropdown: React.FC<PropertiesDropdownProps> = ({
  linkClassName,
  toggleMenu,
  isAuthenticated,
  isAdmin,
  isMobile = false
}) => {
  // Use Collapsible component for mobile view
  if (isMobile) {
    return (
      <Collapsible className="w-full py-2">
        <CollapsibleTrigger className={`${linkClassName} flex items-center justify-between w-full`}>
          <span>Properties</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-4 border-l-2 border-gray-200 mt-2 space-y-3 flex flex-col">
          <Link 
            to="/properties" 
            className={`${linkClassName} block py-2`}
            onClick={toggleMenu}
          >
            Browse Properties
          </Link>
          
          {/* Show Submit Property for authenticated users or admins */}
          {(isAuthenticated || isAdmin) && (
            <Link 
              to="/submit-property" 
              className={`${linkClassName} block py-2`}
              onClick={toggleMenu}
            >
              Submit Property
            </Link>
          )}
          
          {/* Show My Rentals for authenticated users */}
          {isAuthenticated && (
            <Link 
              to="/my-rentals" 
              className={`${linkClassName} block py-2`}
              onClick={toggleMenu}
            >
              My Rentals
            </Link>
          )}
          
          {/* Admin specific menu item */}
          {isAdmin && (
            <Link 
              to="/admin/properties" 
              className={`${linkClassName} block py-2`}
              onClick={toggleMenu}
            >
              Approve Properties
            </Link>
          )}
        </CollapsibleContent>
      </Collapsible>
    );
  }
  
  // Desktop view uses the dropdown
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
        
        {/* Show My Rentals for authenticated users */}
        {isAuthenticated && (
          <DropdownMenuItem asChild>
            <Link 
              to="/my-rentals" 
              className="w-full cursor-pointer"
              onClick={toggleMenu}
            >
              My Rentals
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
