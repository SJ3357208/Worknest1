
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input, Card } from '../components/ui';
import { useTranslation } from '../hooks/useTranslation';
import { ExclamationTriangleIcon } from '../components/icons';

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, currentUser, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/'; // Default to homepage after registration

  useEffect(() => {
    if (currentUser) {
      // If user is already logged in (e.g. from this session's registration), redirect them
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, from]);

  const validateForm = () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError(t('formErrorRequired'));
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t('formErrorEmail'));
      return false;
    }
    if (password.length < 6) {
      setError(t('formErrorPasswordLength'));
      return false;
    }
    if (password !== confirmPassword) {
      setError(t('formErrorPasswordMatch'));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validateForm()) return;

    setIsSubmitting(true);
    const result = await register(email, password);
    setIsSubmitting(false);

    if (result.success) {
      alert(t('registerSuccess')); // This alert shows the new "You are now logged in" message.
      // The useEffect hook will handle the redirect once currentUser state is updated.
    } else {
      setError(t(result.error || 'An unexpected error occurred.'));
    }
  };
  
  if (isLoading && !currentUser) {
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
        </div>
    );
  }
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
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start space-x-2">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
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
              />
            </div>
            <div>
              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting || isLoading}
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
