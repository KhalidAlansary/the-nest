import React from "react";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";

interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, toggleMenu }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-4 py-2 border-t border-gray-200">
      <div className="flex flex-col space-y-3">
        <NavLinks
          toggleMenu={toggleMenu}
          linkClassName="py-2 text-nest-dark hover:text-nest-primary font-medium transition-colors block w-full"
          className="flex flex-col space-y-3 w-full"
          isMobile={true}
        />
        <div className="mt-4 pt-4 border-t border-gray-200">
          <AuthButtons toggleMenu={toggleMenu} isMobile={true} />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
