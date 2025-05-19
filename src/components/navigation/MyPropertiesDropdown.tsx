
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface MyPropertiesDropdownProps {
  linkClassName?: string;
  toggleMenu?: () => void;
  isMobile?: boolean;
}

const MyPropertiesDropdown: React.FC<MyPropertiesDropdownProps> = ({ 
  linkClassName,
  toggleMenu,
  isMobile = false
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: "Submit Property", path: "/submit-property", description: "Submit a new property for approval" },
    { title: "My Submissions", path: "/my-submissions", description: "View your pending and approved property submissions" },
    { title: "My Rentals", path: "/my-rentals", description: "Manage your rental properties" },
    { title: "Requests", path: "/requests", description: "View maintenance and cleaning requests" },
  ];

  // For mobile, we need a different UI
  if (isMobile) {
    return (
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={`${linkClassName} flex items-center justify-between w-full`}
        >
          My Properties
          {isOpen ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
        </button>
        
        {isOpen && (
          <div className="pl-4 mt-2 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={linkClassName}
                onClick={() => {
                  setIsOpen(false);
                  if (toggleMenu) toggleMenu();
                }}
              >
                {item.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  // For desktop, use NavigationMenu
  return (
    <NavigationMenu className="p-0">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`${linkClassName} bg-transparent hover:bg-transparent focus:bg-transparent`}>
            My Properties
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.path}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      onClick={() => {
                        if (toggleMenu) toggleMenu();
                      }}
                    >
                      <div className="text-sm font-medium leading-none">{item.title}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {item.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MyPropertiesDropdown;
