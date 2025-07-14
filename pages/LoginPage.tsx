import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input, Card } from '../components/ui';
import { useTranslation } from '../hooks/useTranslation';
import { ExclamationTriangleIcon } from '../components/icons';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, currentUser, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (currentUser) {
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError(t('formErrorRequired')); // Generic error for empty fields for now
      return;
    }
    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(t(result.error || 'loginErrorInvalid'));
    }
  };

  if (isLoading && !currentUser) { // Show loading if auth is resolving and no user yet
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
        </div>
    );
  }
  if (currentUser) return null; // Already handled by useEffect redirect

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
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start space-x-2">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
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
                className={error ? 'border-red-500' : ''}
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
                className={error ? 'border-red-500' : ''}
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
                {isSubmitting ? t('Loading...') : t('loginFormButton')}
              </Button>
            </div>
          </form>
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