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
import { CloudArrowUpIcon, XCircleIcon, ExclamationTriangleIcon } from '../components/icons';
import { useAuth } from '../contexts/AuthContext';

// Import storage functions
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

interface PostHomePageProps {
    addHome: (home: Omit<Home, 'id' | 'postedDate' | 'userEmail'>) => Promise<void>;
}

const PostHomePage: React.FC<PostHomePageProps> = ({ addHome }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [formData, setFormData] = useState({
        title: '',
        address: '',
        rent: '',
        propertyType: PropertyType.APARTMENT,
        bedrooms: '1',
        bathrooms: '1',
        areaSqFt: '', // Store as string for input
        description: '',
        foodPreference: FoodPreference.ANY,
        communityPreference: CommunityPreference.OPEN_TO_ALL,
        contact: '',
    });
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [errors, setErrors] = useState<Partial<Record<keyof typeof formData | 'images', string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
        setSubmitMessage(null);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);

            const currentFiles = [...imageFiles, ...filesArray];

            const largeFiles = filesArray.filter(file => file.size > 5 * 1024 * 1024); // 5MB limit
            if (largeFiles.length > 0) {
                const largeFileNames = largeFiles.map(file => file.name).join(', ');
                setErrors(prev => ({ ...prev, images: t('formErrorImageSizeExceeded', { files: largeFileNames, size: '5MB' }) }));
                return;
            }

            setImageFiles(currentFiles);

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
            setSubmitMessage(null);
        }
    };

    const handleRemoveImage = (indexToRemove: number) => {
        setImageFiles(prev => prev.filter((_, index) => index !== indexToRemove));
        setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
        if (imageFiles.length - 1 >= 5 && errors.images) {
            setErrors(prev => ({ ...prev, images: undefined }));
        }
    };

    const validateForm = () => {
        const newErrors: Partial<Record<keyof typeof formData | 'images', string>> = {};
        if (!formData.title.trim()) newErrors.title = t('formErrorRequired');
        if (!formData.address.trim()) newErrors.address = t('formErrorRequired');
        if (!formData.rent.trim()) newErrors.rent = t('formErrorRequired');
        else if (isNaN(Number(formData.rent)) || Number(formData.rent) <= 0) newErrors.rent = t('formErrorPositiveNumber');
        if (!formData.description.trim()) newErrors.description = t('formErrorRequired');
        if (!formData.contact.trim()) newErrors.contact = t('formErrorRequired');

        if (imageFiles.length < 5) newErrors.images = t('formErrorMinImages', { count: 5 });

        // Validation for areaSqFt when it's provided (it's optional, so only validate if not empty)
        if (formData.areaSqFt.trim() && (isNaN(Number(formData.areaSqFt)) || Number(formData.areaSqFt) < 0)) {
            newErrors.areaSqFt = t('formErrorNumber');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitMessage(null);
        if (!validateForm()) {
            setSubmitMessage({ type: 'error', text: t('formErrorValidationFailed') });
            return;
        }

        if (!currentUser) {
            setSubmitMessage({ type: 'error', text: t('formErrorAuthRequired') });
            return;
        }

        setIsSubmitting(true);
        const imageUrls: string[] = [];

        try {
            for (const file of imageFiles) {
                if (file.size > 5 * 1024 * 1024) {
                    throw new Error(t('formErrorImageSizeExceeded', { files: file.name, size: '5MB' }));
                }

                const storageRef = ref(storage, `home_images/${currentUser.uid}/${file.name}_${Date.now()}`);
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);
                imageUrls.push(downloadURL);
            }

            const newHome: Omit<Home, 'id'> = {
                ...formData,
              rent: parseInt(formData.rent, 10),
             bedrooms: parseInt(formData.bedrooms, 10),
             bathrooms: parseInt(formData.bathrooms, 10),
             areaSqFt: formData.areaSqFt.trim() !== '' ? parseInt(formData.areaSqFt, 10) : null,
             propertyType: formData.propertyType as PropertyType,
             foodPreference: formData.foodPreference as FoodPreference,
             communityPreference: formData.communityPreference as CommunityPreference,
             contact: formData.contact,
             imageUrls,
             postedDate: new Date().toISOString(),
             userEmail: currentUser.email || ""
            };
            await addHome(newHome);

            setSubmitMessage({ type: 'success', text: t('formSuccessHomePosted') });
            setFormData({
                title: '', address: '', rent: '', propertyType: PropertyType.APARTMENT,
                bedrooms: '1', bathrooms: '1', areaSqFt: '', description: '',
                foodPreference: FoodPreference.ANY, communityPreference: CommunityPreference.OPEN_TO_ALL,
                contact: '',
            });
            setImageFiles([]);
            setImagePreviews([]);
            setTimeout(() => navigate('/homes'), 1500);
        } catch (error: any) {
            console.error("Failed to post home:", error);
            setSubmitMessage({ type: 'error', text: error.message || t('formErrorHomePostFailed') });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">{t('postHomePageTitle')}</h1>
            <Card className="p-6 sm:p-8 bg-white shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {submitMessage && (
                        <div className={`p-3 rounded-md flex items-start space-x-2 ${submitMessage.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
                            <ExclamationTriangleIcon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${submitMessage.type === 'success' ? 'text-green-500' : 'text-red-500'}`} />
                            <p className="text-sm">{submitMessage.text}</p>
                        </div>
                    )}
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
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelContact')}</label>
                        <Input type="text" name="contact" id="contact" value={formData.contact} onChange={handleChange} placeholder={t('formPlaceholderContact')} required aria-describedby="contact-error" />
                        {errors.contact && <p id="contact-error" className="text-xs text-red-600 mt-1">{errors.contact}</p>}
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
                                <p className="text-xs text-gray-500">{t('formImageRequirements', { min: 5, max: '5MB' })}</p>
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
                        {imageFiles.length > 0 && (
                            <p className="text-sm text-gray-600 mt-2">{t('formImagesSelected', { count: imageFiles.length })}</p>
                        )}
                    </div>

                    <div className="pt-2">
                        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? t('Loading...') : t('formButtonPostHome')}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default PostHomePage;
