
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Adjust path if needed
import { LoadingSpinner } from './ui'; // Adjust path if needed

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Show a loading spinner while checking authentication status
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
            <LoadingSpinner />
        </div>
    );
  }

  if (!currentUser) {
    // User not logged in, redirect to login page
    // Pass the current location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is logged in, render the requested component
  return children;
};

export default ProtectedRoute;
