

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Home } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { useAuth } from '../contexts/AuthContext';
import { Card, Button } from '../components/ui';
import {
    MapPinIcon, HomeModernIcon, CurrencyRupeeIcon, BedIcon, UserGroupIcon, HeartIcon, CalendarDaysIcon, MagnifyingGlassIcon, ArrowLeftIcon, UserCircleIcon, ExclamationTriangleIcon, ChevronLeftIcon, ChevronRightIcon, TrashIcon
} from '../components/icons';
import { PROPERTY_TYPE_OPTIONS, FOOD_PREFERENCE_OPTIONS, COMMUNITY_PREFERENCE_OPTIONS } from '../constants';

interface HomeDetailsPageProps {
    homes: Home[];
    deleteHome: (homeId: string) => void;
}

const HomeDetailsPage: React.FC<HomeDetailsPageProps> = ({ homes, deleteHome }) => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const home = homes.find(h => h.id === id);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Reset to the first image whenever the listing changes
        setCurrentIndex(0);
    }, [id]);

    const handleDelete = () => {
        if (!home) return;
        if (window.confirm(t('deleteConfirmationHome'))) {
            deleteHome(home.id);
            alert(t('deleteSuccess'));
            navigate('/homes');
        }
    };

    if (!home) {
        return (
            <div className="text-center py-10">
                <MagnifyingGlassIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-700">{t('detailsNotFoundHome')}</h2>
                <p className="text-lg text-gray-500 mt-2">{t('detailsNotFoundMessage')}</p>
                <Button onClick={() => navigate('/homes')} className="mt-6">
                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                    {t('backToSearch')}
                </Button>
            </div>
        );
    }

    const handleLoginRedirect = () => {
        navigate('/login', { state: { from: location } });
    }

    const handlePrevious = () => {
        if (home.imageUrls) {
            const isFirst = currentIndex === 0;
            const newIndex = isFirst ? home.imageUrls.length - 1 : currentIndex - 1;
            setCurrentIndex(newIndex);
        }
    };

    const handleNext = () => {
        if (home.imageUrls) {
            const isLast = currentIndex === home.imageUrls.length - 1;
            const newIndex = isLast ? 0 : currentIndex + 1;
            setCurrentIndex(newIndex);
        }
    };


    return (
        <div className="max-w-5xl mx-auto">
            <Button onClick={() => navigate(-1)} variant="outline" size="sm" className="mb-6 flex items-center">
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                {t('backToSearch')}
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Main Content */}
                <div className="md:col-span-2">
                    <Card>
                        {home.imageUrls && home.imageUrls.length > 0 ? (
                            <div className="p-2 sm:p-4">
                                <div className="relative">
                                    <img src={home.imageUrls[currentIndex]} alt={home.title} className="w-full h-96 object-cover rounded-lg mb-2 shadow-lg" />
                                    {home.imageUrls.length > 1 && (
                                        <>
                                            <button onClick={handlePrevious} className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors focus:outline-none focus:ring-2 focus:ring-white">
                                                <ChevronLeftIcon className="w-6 h-6" />
                                            </button>
                                            <button onClick={handleNext} className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors focus:outline-none focus:ring-2 focus:ring-white">
                                                <ChevronRightIcon className="w-6 h-6" />
                                            </button>
                                        </>
                                    )}
                                </div>
                                <div className="grid grid-cols-5 gap-2 mt-2">
                                    {home.imageUrls.map((url, index) => (
                                        <img
                                            key={index}
                                            src={url}
                                            alt={`${home.title} thumbnail ${index + 1}`}
                                            className={`w-full h-24 object-cover rounded-md cursor-pointer transition-all duration-200 ${currentIndex === index ? 'ring-4 ring-blue-500 shadow-md' : 'hover:opacity-80'}`}
                                            onClick={() => setCurrentIndex(index)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-72 bg-gray-200 flex items-center justify-center rounded-t-lg">
                                <HomeModernIcon className="w-24 h-24 text-gray-400" />
                            </div>
                        )}

                        <div className="p-6 sm:p-8">
                            <h1 className="text-3xl font-bold text-blue-700 mb-2">{t(home.title)}</h1>
                            <p className="flex items-center text-lg text-gray-600 mb-4"><MapPinIcon className="w-5 h-5 mr-2 text-emerald-600" />{home.address}</p>

                            <div className="border-t border-gray-200 my-6"></div>

                            <h2 className="text-xl font-semibold text-gray-800 mb-3">{t('fullDescription')}</h2>
                            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{home.description}</p>
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="md:col-span-1 space-y-6">
                    <Card className="p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">{t('keyInfo')}</h2>
                        <div className="space-y-3 text-sm text-gray-700">
                            <p className="flex items-start text-xl font-bold text-emerald-700">
                                <CurrencyRupeeIcon className="w-6 h-6 mr-2 flex-shrink-0" />
                                {home.rent.toLocaleString('en-IN')}
                                <span className="text-sm font-normal text-gray-500 ml-1 mt-1">{t('homeCardRentSuffix')}</span>
                            </p>
                            <p className="flex items-start"><HomeModernIcon className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0 mt-0.5" /> {t(PROPERTY_TYPE_OPTIONS.find(opt => opt.value === home.propertyType)?.labelKey || home.propertyType)}</p>
                            <p className="flex items-start"><BedIcon className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0 mt-0.5" />
                                {home.bedrooms === 0 ? t('bedrooms.0') : t('homeCardBedroomsBHK', { count: home.bedrooms.toString() })}
                            </p>
                            <p className="flex items-start"><HeartIcon className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0 mt-0.5" /> {t('homeCardFoodPrefix')}: {t(FOOD_PREFERENCE_OPTIONS.find(opt => opt.value === home.foodPreference)?.labelKey || home.foodPreference)}</p>
                            <p className="flex items-start"><UserGroupIcon className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0 mt-0.5" /> {t('homeCardCommunityPrefix')}: {t(COMMUNITY_PREFERENCE_OPTIONS.find(opt => opt.value === home.communityPreference)?.labelKey || home.communityPreference)}</p>
                            <p className="flex items-start"><CalendarDaysIcon className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0 mt-0.5" /> {t('jobCardPosted')}: {new Date(home.postedDate).toLocaleDateString()}</p>
                        </div>
                    </Card>

                    <Card className="p-6 bg-blue-50 border border-blue-200">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">{t('contactOwner')}</h2>
                        {currentUser ? (
                            <div className="p-3 bg-white rounded-md">
                                <p className="text-gray-800 font-medium break-words">{home.contact}</p>
                            </div>
                        ) : (
                            <div className="text-center p-4 bg-white rounded-md">
                                <UserCircleIcon className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600 mb-3">{t('loginToViewContact')}</p>
                                <Button size="sm" onClick={handleLoginRedirect}>{t('loginButton')}</Button>
                            </div>
                        )}
                    </Card>

                    {currentUser?.email === home.userEmail && (
                        <Card className="p-4 bg-red-50 border border-red-200">
                            <Button variant="danger-outline" size="sm" className="w-full flex items-center justify-center" onClick={handleDelete}>
                                <TrashIcon className="w-4 h-4 mr-2" />
                                {t('deleteListing')}
                            </Button>
                        </Card>
                    )}

                    <Card className="p-4 bg-yellow-50 border border-yellow-200">
                        <div className="flex items-start">
                            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5 mr-3" />
                            <p className="text-xs text-yellow-800">
                                <strong>Disclaimer:</strong> Always be cautious when sharing personal information or making payments. Verify the legitimacy of the owner and property independently before visiting.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default HomeDetailsPage;