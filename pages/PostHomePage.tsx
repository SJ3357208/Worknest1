

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, PropertyType, FoodPreference, CommunityPreference } from '../types';
import { Button, Input, Select, Textarea, Card } from '../components/ui';
import {
    POST_PROPERTY_TYPE_OPTIONS,
    POST_FOOD_PREFERENCE_OPTIONS,
    POST_COMMUNITY_PREFERENCE_OPTIONS,
    POST_BEDROOM_OPTIONS,
    POST_BATHROOM_OPTIONS
} from '../constants';
import { useTranslation } from '../hooks/useTranslation';
import { CloudArrowUpIcon, XCircleIcon } from '../components/icons';

interface PostHomePageProps {
    addHome: (home: Omit<Home, 'id' | 'postedDate' | 'userEmail'>) => void;
}

const PostHomePage: React.FC<PostHomePageProps> = ({ addHome }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        address: '',
        rent: '', // Store as string for input, convert to number on submit
        propertyType: PropertyType.APARTMENT,
        bedrooms: '1', // Store as string for select, convert to number
        bathrooms: '1', // Store as string for select, convert to number
        areaSqFt: '', // Optional, store as string
        description: '',
        foodPreference: FoodPreference.ANY,
        communityPreference: CommunityPreference.OPEN_TO_ALL,
        contact: '',
    });
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [errors, setErrors] = useState<Partial<Record<keyof typeof formData | 'images', string>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setImageFiles(prevFiles => [...prevFiles, ...filesArray]);

            filesArray.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreviews(prevPreviews => [...prevPreviews, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });

            if (errors.images) {
                setErrors(prev => ({ ...prev, images: undefined }));
            }
        }
    };

    const handleRemoveImage = (indexToRemove: number) => {
        setImageFiles(prev => prev.filter((_, index) => index !== indexToRemove));
        setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
    };


    const validateForm = () => {
        const newErrors: Partial<Record<keyof typeof formData | 'images', string>> = {};
        if (!formData.title.trim()) newErrors.title = t('formErrorRequired');
        if (!formData.address.trim()) newErrors.address = t('formErrorRequired');
        if (!formData.rent.trim()) newErrors.rent = t('formErrorRequired');
        else if (isNaN(Number(formData.rent)) || Number(formData.rent) <= 0) newErrors.rent = t('formErrorPositiveNumber');
        if (!formData.description.trim()) newErrors.description = t('formErrorRequired');
        if (!formData.contact.trim()) newErrors.contact = t('formErrorRequired');
        if (imageFiles.length < 5) newErrors.images = t('formErrorMinImages');

        if (formData.areaSqFt.trim() && (isNaN(Number(formData.areaSqFt)) || Number(formData.areaSqFt) < 0)) {
            newErrors.areaSqFt = t('formErrorNumber');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const newHome: Omit<Home, 'id' | 'postedDate' | 'userEmail'> = {
            ...formData,
            rent: parseInt(formData.rent, 10),
            bedrooms: parseInt(formData.bedrooms, 10),
            bathrooms: parseInt(formData.bathrooms, 10),
            areaSqFt: formData.areaSqFt ? parseInt(formData.areaSqFt, 10) : undefined,
            propertyType: formData.propertyType as PropertyType,
            foodPreference: formData.foodPreference as FoodPreference,
            communityPreference: formData.communityPreference as CommunityPreference,
            imageUrls: imagePreviews,
        };
        addHome(newHome);
        alert(t('formSuccessHomePosted'));
        navigate('/homes');
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">{t('postHomePageTitle')}</h1>
            <Card className="p-6 sm:p-8 bg-white shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelTitle')}</label>
                        <Input type="text" name="title" id="title" value={formData.title} onChange={handleChange} placeholder={t('formPlaceholderTitleHome')} required aria-describedby="title-error" />
                        {errors.title && <p id="title-error" className="text-xs text-red-600 mt-1">{errors.title}</p>}
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelAddress')}</label>
                        <Input type="text" name="address" id="address" value={formData.address} onChange={handleChange} placeholder={t('formPlaceholderAddress')} required aria-describedby="address-error" />
                        {errors.address && <p id="address-error" className="text-xs text-red-600 mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="rent" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelRent')}</label>
                            <Input type="number" name="rent" id="rent" value={formData.rent} onChange={handleChange} placeholder={t('formPlaceholderRent')} required min="1" aria-describedby="rent-error" />
                            {errors.rent && <p id="rent-error" className="text-xs text-red-600 mt-1">{errors.rent}</p>}
                        </div>
                        <div>
                            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelPropertyType')}</label>
                            <Select name="propertyType" id="propertyType" options={POST_PROPERTY_TYPE_OPTIONS} value={formData.propertyType} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelBedrooms')}</label>
                            <Select name="bedrooms" id="bedrooms" options={POST_BEDROOM_OPTIONS} value={formData.bedrooms} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelBathrooms')}</label>
                            <Select name="bathrooms" id="bathrooms" options={POST_BATHROOM_OPTIONS} value={formData.bathrooms} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="areaSqFt" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelAreaSqFt')}</label>
                            <Input type="number" name="areaSqFt" id="areaSqFt" value={formData.areaSqFt} onChange={handleChange} placeholder={t('formPlaceholderAreaSqFt')} min="0" aria-describedby="areaSqFt-error" />
                            {errors.areaSqFt && <p id="areaSqFt-error" className="text-xs text-red-600 mt-1">{errors.areaSqFt}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelDescription')}</label>
                        <Textarea name="description" id="description" value={formData.description} onChange={handleChange} placeholder={t('formPlaceholderDescriptionHome')} required aria-describedby="description-error" />
                        {errors.description && <p id="description-error" className="text-xs text-red-600 mt-1">{errors.description}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="foodPreference" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelFoodPreference')}</label>
                            <Select name="foodPreference" id="foodPreference" options={POST_FOOD_PREFERENCE_OPTIONS} value={formData.foodPreference} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="communityPreference" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelCommunityPreference')}</label>
                            <Select name="communityPreference" id="communityPreference" options={POST_COMMUNITY_PREFERENCE_OPTIONS} value={formData.communityPreference} onChange={handleChange} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelImages')}</label>
                        <div className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 ${errors.images ? 'border-red-500' : 'border-gray-300'} border-dashed rounded-md`}>
                            <div className="space-y-1 text-center">
                                <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                        <span>{t('formImageUploadPrompt')}</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/png, image/jpeg" onChange={handleImageChange} />
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500">{t('formImageTypeHint')}</p>
                            </div>
                        </div>
                        {errors.images && <p id="images-error" className="text-xs text-red-600 mt-1">{errors.images}</p>}
                        {imagePreviews.length > 0 && (
                            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="relative group">
                                        <img src={preview} alt={`Preview ${index + 1}`} className="h-24 w-full object-cover rounded-md" />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-0 right-0 -mt-2 -mr-2 bg-white rounded-full p-0.5 text-gray-500 hover:text-red-600 opacity-75 group-hover:opacity-100 transition-opacity"
                                            aria-label="Remove image"
                                        >
                                            <XCircleIcon className="h-6 w-6" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                    <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelContact')}</label>
                        <Input type="text" name="contact" id="contact" value={formData.contact} onChange={handleChange} placeholder={t('formPlaceholderContact')} required aria-describedby="contact-error" />
                        {errors.contact && <p id="contact-error" className="text-xs text-red-600 mt-1">{errors.contact}</p>}
                    </div>

                    <div className="pt-2">
                        <Button type="submit" variant="primary" size="lg" className="w-full">
                            {t('formButtonPostHome')}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default PostHomePage;