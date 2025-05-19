
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface AuthButtonsProps {
  toggleMenu?: () => void;
  isMobile?: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ toggleMenu, isMobile = false }) => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out');
    navigate('/');
    if (toggleMenu) toggleMenu();
  };

  if (isAuthenticated) {
    return (
      <div className={`flex ${isMobile ? 'flex-col' : 'items-center'} ${isMobile ? 'space-y-3' : 'space-x-4'}`}>
        <div className={`flex items-center ${isMobile ? 'py-2' : ''} text-nest-dark`}>
          <User size={18} className="mr-2" />
          <span>{user?.username}</span>
          {isAdmin && <span className="ml-2 text-xs bg-nest-primary/20 text-nest-primary px-2 py-0.5 rounded">Admin</span>}
        </div>
        <Button 
          onClick={handleLogout}
          variant="outline" 
          className={`border-nest-primary text-nest-primary hover:bg-nest-primary/10 ${isMobile ? 'w-full' : ''}`}
        >
          Logout
        </Button>
      </div>
    );
  }
  
  return (
    <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center space-x-4'}`}>
      <Button 
        onClick={() => {
          navigate('/login');
          if (toggleMenu) toggleMenu();
        }} 
        className={`bg-nest-primary hover:bg-nest-primary/90 ${isMobile ? 'w-full mb-2' : ''}`}
      >
        <LogIn size={18} className="mr-2" /> Sign In
      </Button>
      <Button 
        onClick={() => {
          navigate('/signup');
          if (toggleMenu) toggleMenu();
        }} 
        variant="outline"
        className={`border-nest-primary text-nest-primary hover:bg-nest-primary/10 ${isMobile ? 'w-full' : ''}`}
      >
        Sign Up
      </Button>
    </div>
  );
};

export default AuthButtons;
