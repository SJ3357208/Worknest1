import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Ensure this path is correct
import { Button, Input, Card } from '../components/ui'; // Ensure these paths are correct
import { useTranslation } from '../hooks/useTranslation'; // Ensure this path is correct
import { ExclamationTriangleIcon } from '../components/icons'; // Adjust path if you put it elsewhere // Ensure this path is correct


const LoginPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    // Destructure login, loginWithGoogle, currentUser, and error from useAuth
    const { login, loginWithGoogle, currentUser, loading: authLoading, error: authError } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Use a local error state only for form validation errors, not Firebase errors
    const [localError, setLocalError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // The 'from' path to redirect to after successful login
    const from = location.state?.from?.pathname || '/';

    // Redirect if user is already logged in
    useEffect(() => {
        if (currentUser) {
            navigate(from, { replace: true });
        }
    }, [currentUser, navigate, from]);

    // Handle email/password login submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null); // Clear any local errors

        if (!email.trim() || !password.trim()) {
            setLocalError(t('formErrorRequired')); // Use your translation key for required fields
            return;
        }

        setIsSubmitting(true);
        try {
            await login(email, password); // Call the login function from useAuth
            // No explicit navigate here, as useEffect handles successful login redirection
        } catch (err) {
            // The error is already set in AuthContext's error state, no need to set localError here
            // You can add additional logging if needed
            console.error("Login attempt failed:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle Google Sign-in
    const handleGoogleLogin = async () => {
        setLocalError(null); // Clear any local errors
        setIsSubmitting(true);
        try {
            await loginWithGoogle(); // Call the Google login function from useAuth
            // No explicit navigate here, as useEffect handles successful login redirection
        } catch (err) {
            console.error("Google login attempt failed:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show loading spinner if authentication status is being determined for the first time
    if (authLoading && !currentUser) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    // If currentUser exists, useEffect will handle the redirection, so this component doesn't need to render.
    if (currentUser) return null;

    return (
        <div className="min-h-[calc(100vh-18rem)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {t('loginPageTitle')}
                    </h2>
                </div>
                <Card className="p-8 shadow-2xl">
                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                        {(localError || authError) && ( // Display either local validation error or AuthContext error
                            <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start space-x-2">
                                <ExclamationTriangleIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-700">{localError || authError}</p>
                            </div>
                        )}
                        <div>
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 sr-only">
                                {t('loginFormLabelEmail')}
                            </label>
                            <Input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('loginFormLabelEmail')}
                                aria-label={t('loginFormLabelEmail')}
                                className={(localError || authError) ? 'border-red-500' : ''} // Apply error styling if any error exists
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 sr-only">
                                {t('loginFormLabelPassword')}
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t('loginFormLabelPassword')}
                                aria-label={t('loginFormLabelPassword')}
                                className={(localError || authError) ? 'border-red-500' : ''} // Apply error styling if any error exists
                            />
                        </div>

                        <div>
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="w-full"
                                disabled={isSubmitting || authLoading} // Disable if form is submitting or auth is broadly loading
                            >
                                {isSubmitting ? t('Loading...') : t('loginFormButton')}
                            </Button>
                        </div>
                    </form>

                    {/* Google Login Button */}
                    <div className="relative flex items-center justify-center my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative bg-white px-4 text-sm text-gray-500">
                            {t('orSeparator')} {/* You might need a translation key for 'Or' */}
                        </div>
                    </div>
                    
                    
                    <Button
                        onClick={handleGoogleLogin}
                        variant="secondary" // Assuming you have a secondary variant for buttons, adjust as needed
                        size="lg"
                        className="w-full bg-white text-black border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center space-x-3 shadow-sm" // Tailwind for Google style
                        disabled={isSubmitting || authLoading}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {t('Loading...')}
                            </span>
                        ) : (
                            <>
                                {/* Corrected: Use the GoogleIcon component */}
                                <img src="/assets/google-logo.svg" alt="Google logo" className="h-5 w-5" />
                                <span>{t('Log in with Google')}</span>
                            </>
                        )}
                    </Button>

                </Card>
                <p className="mt-4 text-center text-sm text-gray-600">
                    {t('loginFormLinkToRegister')}{' '}
                    <Link to="/register" state={{ from: location.state?.from }} className="font-medium text-blue-600 hover:text-blue-500">
                        {t('loginFormLinkRegisterNow')}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;