// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
    User,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    AuthError, // Import AuthError for type checking
} from 'firebase/auth';
import { auth } from '../firebase'; // Import your initialized auth instance

// Define the type for the Auth Context value
interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    signup: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
    error: string | null;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the Auth Context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Auth Provider Component
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // Set to true initially
    const [error, setError] = useState<string | null>(null);

    // Listen for authentication state changes
    useEffect(() => {
        // onAuthStateChanged returns an unsubscribe function
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false); // Once the initial auth state is determined, set loading to false
        });
        return unsubscribe; // Clean up the listener when the component unmounts
    }, []); // Empty dependency array means this effect runs once on mount

    // --- Authentication Functions ---

    const signup = async (email: string, password: string) => {
        setError(null); // Clear previous errors
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err: any) { // Catch the error to set it in state
            console.error("Signup error:", err.code, err.message);
            setError(err.message || "Failed to create an account.");
            throw err; // Re-throw to allow components to handle specific UI updates
        }
    };

    const login = async (email: string, password: string) => {
        setError(null); // Clear previous errors
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
            console.error("Login error:", err.code, err.message);
            setError(err.message || "Failed to log in.");
            throw err;
        }
    };

    const loginWithGoogle = async () => {
        setError(null); // Clear previous errors
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (err: any) {
            console.error("Google login error:", err.code, err.message);
            setError(err.message || "Failed to sign in with Google.");
            throw err;
        }
    };

    const logout = async () => {
        setError(null); // Clear previous errors
        try {
            await signOut(auth);
        } catch (err: any) {
            console.error("Logout error:", err.code, err.message);
            setError(err.message || "Failed to log out.");
            throw err;
        }
    };

    // The value provided to the context consumers
    const value = {
        currentUser,
        loading,
        signup,
        login,
        loginWithGoogle,
        logout,
        error,
    };

    // Render children only after the initial authentication state has been determined
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};