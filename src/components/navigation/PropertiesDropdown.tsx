import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
  isMobile = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      title: "Browse Properties",
      path: "/properties",
      description: "View our available properties",
    },
    ...(isAuthenticated || isAdmin
      ? [
          {
            title: "Submit Property",
            path: "/submit-property",
            description: "Submit a new property listing",
          },
        ]
      : []),
    ...(isAuthenticated
      ? [
          {
            title: "My Rentals",
            path: "/my-rentals",
            description: "Manage your rental properties",
          },
        ]
      : []),
    ...(isAdmin
      ? [
          {
            title: "Approve Properties",
            path: "/admin/properties",
            description: "Review and approve property submissions",
          },
        ]
      : []),
  ];

  // For mobile, we need a different UI
  if (isMobile) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${linkClassName} flex items-center justify-between w-full`}
        >
          Properties
          {isOpen ? (
            <ChevronUp size={16} className="ml-1" />
          ) : (
            <ChevronDown size={16} className="ml-1" />
          )}
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

  // For desktop, use NavigationMenu like MyPropertiesDropdown
  return (
    <NavigationMenu className="p-0">
      <NavigationMenuList className="h-auto">
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`${linkClassName} bg-transparent hover:bg-transparent focus:bg-transparent p-0 h-auto`}
          >
            Properties
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    onClick={() => {
                      if (toggleMenu) toggleMenu();
                    }}
                  >
                    <div className="text-sm font-medium leading-none">
                      {item.title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {item.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default PropertiesDropdown;
