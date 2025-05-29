import React from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AuthButtonsProps {
  toggleMenu?: () => void;
  isMobile?: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
  toggleMenu,
  isMobile = false,
}) => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out");
    navigate("/");
    if (toggleMenu) toggleMenu();
  };

  if (isAuthenticated) {
    if (isMobile) {
      // Mobile layout with vertical stacking
      return (
        <div className="flex flex-col space-y-3">
          <div className="flex items-center py-2 text-nest-dark">
            <User size={18} className="mr-2" />
            <span>{user?.username}</span>
            {isAdmin && (
              <span className="ml-2 text-xs bg-nest-primary/20 text-nest-primary px-2 py-0.5 rounded">
                Admin
              </span>
            )}
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-nest-primary text-nest-primary hover:bg-nest-primary/10"
          >
            <LogOut size={18} className="mr-2" /> Logout
          </Button>
        </div>
      );
    }

    // Desktop layout with popover
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2 px-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-nest-primary/20 text-nest-primary">
                {user?.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>{user?.username}</span>
            {isAdmin && (
              <span className="ml-1 text-xs bg-nest-primary/20 text-nest-primary px-2 py-0.5 rounded">
                Admin
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-nest-primary text-nest-primary hover:bg-nest-primary/10"
          >
            <LogOut size={18} className="mr-2" /> Logout
          </Button>
        </PopoverContent>
      </Popover>
    );
  }

  // Not authenticated layout remains the same
  return (
    <div
      className={`flex ${isMobile ? "flex-col space-y-2" : "items-center space-x-4"}`}
    >
      <Button
        onClick={() => {
          navigate("/login");
          if (toggleMenu) toggleMenu();
        }}
        className={`bg-nest-primary hover:bg-nest-primary/90 ${isMobile ? "w-full mb-2" : ""}`}
      >
        <LogIn size={18} className="mr-2" /> Sign In
      </Button>
      <Button
        onClick={() => {
          navigate("/signup");
          if (toggleMenu) toggleMenu();
        }}
        variant="outline"
        className={`border-nest-primary text-nest-primary hover:bg-nest-primary/10 ${isMobile ? "w-full" : ""}`}
      >
        Sign Up
      </Button>
    </div>
  );
};

export default AuthButtons;
