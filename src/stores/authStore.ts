import { create } from 'zustand';
import { User, Role } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
}

// Mock user data - in a real app this would come from an API
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@banisua.com.ng',
    role: 'admin' as Role,
    profileImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    email: 'doctor@banisua.com.ng',
    role: 'doctor' as Role,
    profileImage: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '3',
    name: 'Nurse Smith',
    email: 'nurse@banisua.com.ng',
    role: 'nurse' as Role,
    profileImage: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '4',
    name: 'John Miller',
    email: 'lab@banisua.com.ng',
    role: 'lab_technician' as Role,
    profileImage: 'https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '5',
    name: 'Emma Wilson',
    email: 'pharmacist@banisua.com.ng',
    role: 'pharmacist' as Role,
    profileImage: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '6',
    name: 'Jane Cooper',
    email: 'receptionist@banisua.com.ng',
    role: 'receptionist' as Role,
    profileImage: 'https://images.pexels.com/photos/5998474/pexels-photo-5998474.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  
  login: async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      const user = mockUsers.find(u => u.email === email);
      
      if (user && password === 'password') {
        // Simulating token generation
        const token = `token_${Math.random().toString(36).substr(2, 9)}`;
        
        set({ 
          isAuthenticated: true,
          user,
          token 
        });
        
        // Store in localStorage for persistence
        localStorage.setItem('auth', JSON.stringify({ user, token }));
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },
  
  logout: () => {
    localStorage.removeItem('auth');
    set({ 
      isAuthenticated: false,
      user: null,
      token: null 
    });
  },
  
  forgotPassword: async (email: string) => {
    try {
      // In a real app, this would send a password reset email
      const user = mockUsers.find(u => u.email === email);
      return !!user;
    } catch (error) {
      console.error('Forgot password error:', error);
      return false;
    }
  },
  
  resetPassword: async (token: string, password: string) => {
    try {
      // In a real app, this would verify the token and reset the password
      return true;
    } catch (error) {
      console.error('Reset password error:', error);
      return false;
    }
  }
}));

// Initialize from localStorage if available
try {
  const storedAuth = localStorage.getItem('auth');
  if (storedAuth) {
    const { user, token } = JSON.parse(storedAuth);
    useAuthStore.setState({ 
      isAuthenticated: true,
      user,
      token 
    });
  }
} catch (error) {
  console.error('Error restoring auth state:', error);
}