
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui';
import { BriefcaseIcon, HomeModernIcon, PlusIcon } from '../components/icons';
import { useTranslation } from '../hooks/useTranslation';
import { APP_NAME_KEY } from '../constants';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-[calc(100vh-18rem)] flex flex-col items-center justify-start py-12 px-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-lg shadow-sm">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">{t('landingWelcome.prefix')}<span className="text-blue-600">{t(APP_NAME_KEY)}</span>{t('landingWelcome.suffix')}</h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          {t('landingSubtitle')}
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        <Link to="/jobs" className="block group">
          <Card className="p-8 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-white">
            <BriefcaseIcon className="w-16 h-16 text-blue-600 mx-auto mb-4 group-hover:text-blue-700 transition-colors" />
            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">{t('landingFindJobTitle')}</h2>
            <p className="text-gray-600 text-center">{t('landingFindJobDesc')}</p>
          </Card>
        </Link>
        <Link to="/homes" className="block group">
          <Card className="p-8 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-white">
            <HomeModernIcon className="w-16 h-16 text-emerald-500 mx-auto mb-4 group-hover:text-emerald-600 transition-colors" />
            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">{t('landingFindHomeTitle')}</h2>
            <p className="text-gray-600 text-center">{t('landingFindHomeDesc')}</p>
          </Card>
        </Link>
      </div>

      {/* New section for Posting Listings */}
      <div className="mt-16 w-full max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8">
          {t('landingPostListingPrompt')}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Post a Job Card */}
          <Link to="/post-job" className="block group">
            <Card className="p-8 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-white">
              <PlusIcon className="w-16 h-16 text-green-500 mx-auto mb-4 group-hover:text-green-600 transition-colors" />
              <h3 className="text-2xl font-semibold text-gray-800 text-center mb-2">{t('landingPostJobTitle')}</h3>
              <p className="text-gray-600 text-center">{t('landingPostJobDesc')}</p>
            </Card>
          </Link>

          {/* Post a Home Card */}
          <Link to="/post-home" className="block group">
            <Card className="p-8 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-white">
              <PlusIcon className="w-16 h-16 text-green-500 mx-auto mb-4 group-hover:text-green-600 transition-colors" />
              <h3 className="text-2xl font-semibold text-gray-800 text-center mb-2">{t('landingPostHomeTitle')}</h3>
              <p className="text-gray-600 text-center">{t('landingPostHomeDesc')}</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;