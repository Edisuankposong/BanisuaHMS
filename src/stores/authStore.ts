import { create } from 'zustand';
import { User, Role } from '../types';

// Mock user data - in a real app this would come from an API
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Babajide Ogunleye',
    email: 'admin@banisua.com',
    role: 'admin' as Role,
    profileImage: 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '2',
    name: 'Dr. Olayinka Adeyemi',
    email: 'doctor@banisua.com',
    role: 'doctor' as Role,
    profileImage: 'https://images.pexels.com/photos/7578803/pexels-photo-7578803.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '3',
    name: 'Nurse Chidinma Okoro',
    email: 'nurse@banisua.com',
    role: 'nurse' as Role,
    profileImage: 'https://images.pexels.com/photos/7580386/pexels-photo-7580386.jpeg?auto=compress&cs=tinysrgb&w=150'
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