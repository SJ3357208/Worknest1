
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types'; // Adjust path if needed

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simplified mock password storage - NOT FOR PRODUCTION
const WORKNEST_USERS_KEY = 'worknest_users';
const WORKNEST_CURRENT_USER_KEY = 'worknest_current_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start as true until initial check is done

  useEffect(() => {
    // Check for logged-in user in localStorage on initial load
    try {
      const storedUserJson = localStorage.getItem(WORKNEST_CURRENT_USER_KEY);
      if (storedUserJson) {
        const user = JSON.parse(storedUserJson) as User;
        // Basic validation if user object is as expected
        if (user && user.email) {
            setCurrentUser(user);
        } else {
            localStorage.removeItem(WORKNEST_CURRENT_USER_KEY); // Clear invalid data
        }
      }
    } catch (error) {
      console.error("Error loading current user from localStorage:", error);
      localStorage.removeItem(WORKNEST_CURRENT_USER_KEY); // Clear potentially corrupted data
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500)); 

    try {
        const usersJson = localStorage.getItem(WORKNEST_USERS_KEY);
        const users = usersJson ? JSON.parse(usersJson) : [];
        const lowercasedEmail = email.toLowerCase();
        const userRecord = users.find((u: { email: string, passHash: string}) => u.email.toLowerCase() === lowercasedEmail);

        // In a real app, 'pass' would be hashed and compared with a stored hash.
        // Here, we're doing a direct (and insecure) comparison for mock purposes.
        if (userRecord && userRecord.passHash === pass) { // Mock "passHash" is just the plain password
            const userToSet: User = { email: userRecord.email };
            setCurrentUser(userToSet);
            localStorage.setItem(WORKNEST_CURRENT_USER_KEY, JSON.stringify(userToSet));
            setIsLoading(false);
            return { success: true };
        } else {
            setIsLoading(false);
            return { success: false, error: 'loginErrorInvalid' }; // Translation key for error
        }
    } catch (error) {
        console.error("Login error:", error);
        setIsLoading(false);
        return { success: false, error: 'An unexpected error occurred.' }; // Generic error
    }
  };

  const register = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
        let usersJson = localStorage.getItem(WORKNEST_USERS_KEY);
        let users = usersJson ? JSON.parse(usersJson) : [];
        const lowercasedEmail = email.toLowerCase();

        if (users.find((u: {email: string}) => u.email.toLowerCase() === lowercasedEmail)) {
            setIsLoading(false);
            return { success: false, error: 'registerErrorEmailExists' }; // Translation key
        }

        // In a real app, hash the password here. We're storing it as is (insecurely).
        users.push({ email: lowercasedEmail, passHash: pass }); // Storing plain pass as "passHash" for mock
        localStorage.setItem(WORKNEST_USERS_KEY, JSON.stringify(users));

        // Auto-login after registration
        const userToSet: User = { email: lowercasedEmail };
        setCurrentUser(userToSet);
        localStorage.setItem(WORKNEST_CURRENT_USER_KEY, JSON.stringify(userToSet));
        
        setIsLoading(false);
        return { success: true };
    } catch (error) {
        console.error("Registration error:", error);
        setIsLoading(false);
        return { success: false, error: 'An unexpected error occurred during registration.' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(WORKNEST_CURRENT_USER_KEY);
    // Optionally, navigate to home or login page after logout via useNavigate in component
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
