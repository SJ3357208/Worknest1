

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, HomeFilters, PropertyType, FoodPreference, CommunityPreference } from '../types';
import {
    PROPERTY_TYPE_OPTIONS, BEDROOM_OPTIONS, FOOD_PREFERENCE_OPTIONS, COMMUNITY_PREFERENCE_OPTIONS
} from '../constants';
import { Button, Input, Select, Card, LoadingSpinner } from '../components/ui';
import {
    MapPinIcon, HomeModernIcon, CurrencyRupeeIcon, BedIcon, UserGroupIcon, HeartIcon, CalendarDaysIcon, MagnifyingGlassIcon
} from '../components/icons';
import { useTranslation } from '../hooks/useTranslation';

interface HomeSearchPageProps {
    homes: Home[];
}

const HomeSearchPage: React.FC<HomeSearchPageProps> = ({ homes: initialHomes }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [filteredHomes, setFilteredHomes] = useState<Home[]>(initialHomes);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState<HomeFilters>({
        location: '',
        propertyType: PropertyType.ANY,
        bedrooms: 'any',
        rentMin: '',
        rentMax: '',
        foodPreference: FoodPreference.ANY,
        communityPreference: CommunityPreference.ANY,
    });

    useEffect(() => {
        setFilteredHomes(initialHomes);
    }, [initialHomes]);

    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value as PropertyType | FoodPreference | CommunityPreference | string }));
    }, []);

    useEffect(() => {
        setIsLoading(true);
        let result = initialHomes;
        if (filters.location) {
            result = result.filter(home => home.address.toLowerCase().includes(filters.location.toLowerCase()));
        }
        if (filters.propertyType !== PropertyType.ANY) {
            result = result.filter(home => home.propertyType === filters.propertyType);
        }
        if (filters.bedrooms !== 'any') {
            const numBedrooms = parseInt(filters.bedrooms);
            if (filters.bedrooms === '4+') {
                result = result.filter(home => home.bedrooms >= 4);
            } else {
                result = result.filter(home => home.bedrooms === numBedrooms);
            }
        }
        if (filters.rentMin) {
            result = result.filter(home => home.rent >= parseInt(filters.rentMin));
        }
        if (filters.rentMax) {
            result = result.filter(home => home.rent <= parseInt(filters.rentMax));
        }
        if (filters.foodPreference !== FoodPreference.ANY) {
            result = result.filter(home => home.foodPreference === filters.foodPreference);
        }
        if (filters.communityPreference !== CommunityPreference.ANY) {
            result = result.filter(home => home.communityPreference === filters.communityPreference);
        }

        setTimeout(() => {
            setFilteredHomes(result);
            setIsLoading(false);
        }, 300);
    }, [filters, initialHomes]);

    const handleViewDetails = (homeId: string) => {
        navigate(`/homes/${homeId}`);
    };

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">{t('homeSearchPageTitle')}</h1>

            <Card className="p-6 mb-8 bg-white shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
                    <div>
                        <label htmlFor="location_home" className="block text-sm font-medium text-gray-700 mb-1">{t('filterLocationLabel')}</label>
                        <Input type="text" name="location" id="location_home" placeholder={t('filterLocationPlaceholder')} value={filters.location} onChange={handleFilterChange} aria-label={t('filterLocationLabel')} />
                    </div>
                    <div>
                        <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">{t('filterPropertyTypeLabel')}</label>
                        <Select name="propertyType" id="propertyType" options={PROPERTY_TYPE_OPTIONS} value={filters.propertyType} onChange={handleFilterChange} aria-label={t('filterPropertyTypeLabel')} />
                    </div>
                    <div>
                        <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">{t('filterBedroomsLabel')}</label>
                        <Select name="bedrooms" id="bedrooms" options={BEDROOM_OPTIONS} value={filters.bedrooms} onChange={handleFilterChange} aria-label={t('filterBedroomsLabel')} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="rentMin" className="block text-sm font-medium text-gray-700 mb-1">{t('filterRentMinLabel')}</label>
                            <Input type="number" name="rentMin" id="rentMin" placeholder={t('filterRentMinPlaceholder')} value={filters.rentMin} onChange={handleFilterChange} min="0" aria-label={t('filterRentMinLabel')} />
                        </div>
                        <div>
                            <label htmlFor="rentMax" className="block text-sm font-medium text-gray-700 mb-1">{t('filterRentMaxLabel')}</label>
                            <Input type="number" name="rentMax" id="rentMax" placeholder={t('filterRentMaxPlaceholder')} value={filters.rentMax} onChange={handleFilterChange} min="0" aria-label={t('filterRentMaxLabel')} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="foodPreference" className="block text-sm font-medium text-gray-700 mb-1">{t('filterFoodPreferenceLabel')}</label>
                        <Select name="foodPreference" id="foodPreference" options={FOOD_PREFERENCE_OPTIONS} value={filters.foodPreference} onChange={handleFilterChange} aria-label={t('filterFoodPreferenceLabel')} />
                    </div>
                    <div>
                        <label htmlFor="communityPreference" className="block text-sm font-medium text-gray-700 mb-1">{t('filterCommunityPreferenceLabel')}</label>
                        <Select name="communityPreference" id="communityPreference" options={COMMUNITY_PREFERENCE_OPTIONS} value={filters.communityPreference} onChange={handleFilterChange} aria-label={t('filterCommunityPreferenceLabel')} />
                    </div>
                </div>
            </Card>

            {isLoading ? <LoadingSpinner /> : (
                filteredHomes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredHomes.map(home => (
                            <Card key={home.id} className="flex flex-col justify-between transform hover:scale-105 transition-transform duration-200">
                                {home.imageUrls && home.imageUrls.length > 0 ? (
                                    <img src={home.imageUrls[0]} alt={home.title} className="w-full h-48 object-cover" />
                                ) : (
                                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                        <HomeModernIcon className="w-16 h-16 text-gray-400" />
                                    </div>
                                )}
                                <div className="p-6 flex-grow">
                                    <h3 className="text-xl font-semibold text-blue-600 mb-2">{home.title}</h3>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <p className="flex items-center"><MapPinIcon className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" /> {home.address}</p>
                                        <p className="flex items-center"><CurrencyRupeeIcon className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" /> {home.rent.toLocaleString('en-IN')} {t('homeCardRentSuffix')}</p>
                                        <p className="flex items-center"><HomeModernIcon className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" /> {t(PROPERTY_TYPE_OPTIONS.find(opt => opt.value === home.propertyType)?.labelKey || home.propertyType)}</p>
                                        <p className="flex items-center"><BedIcon className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                                            {home.bedrooms === 0 ? t('bedrooms.0') : t('homeCardBedroomsBHK', { count: home.bedrooms.toString() })}
                                        </p>
                                        <p className="flex items-center"><HeartIcon className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" /> {t('homeCardFoodPrefix')}: {t(FOOD_PREFERENCE_OPTIONS.find(opt => opt.value === home.foodPreference)?.labelKey || home.foodPreference)}</p>
                                        <p className="flex items-center"><UserGroupIcon className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" /> {t('homeCardCommunityPrefix')}: {t(COMMUNITY_PREFERENCE_OPTIONS.find(opt => opt.value === home.communityPreference)?.labelKey || home.communityPreference)}</p>
                                        <p className="text-gray-700 mt-2 text-sm line-clamp-3">{home.description}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                                    <p className="text-xs text-gray-500 flex items-center"><CalendarDaysIcon className="w-4 h-4 mr-1" /> {t('homeCardPosted')}: {new Date(home.postedDate).toLocaleDateString()}</p>
                                    <Button size="sm" variant="outline" onClick={() => handleViewDetails(home.id)}>{t('jobCardViewDetails')}</Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <MagnifyingGlassIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-xl text-gray-500">{t('homeSearchNoResults')}</p>
                    </div>
                )
            )}
        </div>
    );
};

export default HomeSearchPage;