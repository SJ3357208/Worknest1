import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Ensure this path is correct
import { Button, Input, Card } from '../components/ui'; // Ensure these paths are correct
import { useTranslation } from '../hooks/useTranslation'; // Ensure this path is correct
import { ExclamationTriangleIcon } from '../components/icons'; // Ensure this path is correct

const RegisterPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    // Destructure signup, currentUser, loading, and error from useAuth
    const { signup, currentUser, loading: authLoading, error: authError } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // Use a local error state only for form validation errors, not Firebase errors
    const [localError, setLocalError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const from = location.state?.from?.pathname || '/'; // Default to homepage after registration

    // Redirect if user is already logged in (e.g. after successful registration)
    useEffect(() => {
        if (currentUser) {
            navigate(from, { replace: true });
        }
    }, [currentUser, navigate, from]);

    const validateForm = () => {
        setLocalError(null); // Clear previous local errors

        if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
            setLocalError(t('formErrorRequired'));
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setLocalError(t('formErrorEmail'));
            return false;
        }
        if (password.length < 6) {
            setLocalError(t('formErrorPasswordLength'));
            return false;
        }
        if (password !== confirmPassword) {
            setLocalError(t('formErrorPasswordMatch'));
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Clear AuthContext error before new submission
        // (AuthContext's signup function will internally clear it too but good practice)
        // You might want to add a `clearError` function to AuthContext if you want to explicitly clear it from components.
        // For now, let's rely on AuthContext's internal error management upon new auth calls.

        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await signup(email, password); // Call the signup function from useAuth
            // No explicit navigate or alert here, as useEffect handles successful registration redirection
        } catch (err) {
            // The error is already set in AuthContext's error state (authError), no need to set localError here
            console.error("Registration attempt failed:", err);
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
                        {t('registerPageTitle')}
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
                            <label htmlFor="email-address" className="sr-only">{t('registerFormLabelEmail')}</label>
                            <Input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('registerFormLabelEmail')}
                                aria-label={t('registerFormLabelEmail')}
                                className={(localError || authError) ? 'border-red-500' : ''} // Apply error styling if any error exists
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">{t('registerFormLabelPassword')}</label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t('registerFormLabelPassword')}
                                aria-label={t('registerFormLabelPassword')}
                                className={(localError || authError) ? 'border-red-500' : ''} // Apply error styling if any error exists
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="sr-only">{t('registerFormLabelConfirmPassword')}</label>
                            <Input
                                id="confirm-password"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder={t('registerFormLabelConfirmPassword')}
                                aria-label={t('registerFormLabelConfirmPassword')}
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
                                {isSubmitting ? t('Loading...') : t('registerFormButton')}
                            </Button>
                        </div>
                    </form>
                </Card>
                <p className="mt-4 text-center text-sm text-gray-600">
                    {t('registerFormLinkToLogin')}{' '}
                    <Link to="/login" state={{ from: location.state?.from }} className="font-medium text-blue-600 hover:text-blue-500">
                        {t('registerFormLinkLoginNow')}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;