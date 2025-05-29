
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import MyPropertiesDropdown from './MyPropertiesDropdown';
import { ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
      
      {/* Properties Dropdown */}
      {!isMobile ? (
        <NavigationMenu className="p-0">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={`${linkClassName} bg-transparent hover:bg-transparent focus:bg-transparent`}>
                Properties
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/properties"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => {
                          if (toggleMenu) toggleMenu();
                        }}
                      >
                        <div className="text-sm font-medium leading-none">Browse Properties</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          View our available properties
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {isAuthenticated && (
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/my-bookings"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          onClick={() => {
                            if (toggleMenu) toggleMenu();
                          }}
                        >
                          <div className="text-sm font-medium leading-none">My Bookings</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            View your booking history
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      ) : (
        <div>
          <div 
            className={`${linkClassName} flex items-center cursor-pointer`}
            role="button"
            tabIndex={0}
          >
            Properties <ChevronDown size={16} className="ml-1" />
          </div>
          <div className="pl-4 mt-2 space-y-2">
            <Link
              to="/properties"
              className={`${linkClassName} block`}
              onClick={toggleMenu}
            >
              Browse Properties
            </Link>
            {isAuthenticated && (
              <Link
                to="/my-bookings"
                className={`${linkClassName} block`}
                onClick={toggleMenu}
              >
                My Bookings
              </Link>
            )}
          </div>
        </div>
      )}

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
