import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Job, JobType, JobCategory } from '../types';
import { Button, Input, Select, Textarea, Card } from '../components/ui';
import { POST_JOB_TYPE_OPTIONS, POST_JOB_CATEGORY_OPTIONS } from '../constants';
import { useTranslation } from '../hooks/useTranslation';
import { ExclamationTriangleIcon } from '../components/icons'; // Assuming this path for icons

interface PostJobPageProps {
    addJob: (job: Omit<Job, 'id' | 'postedDate' | 'userEmail'>) => Promise<void>; // addJob is now async
}

const PostJobPage: React.FC<PostJobPageProps> = ({ addJob }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        employer: '',
        location: '',
        type: JobType.FULL_TIME,
        category: JobCategory.OTHER,
        description: '',
        salary: '',
        contact: '',
    });
    const [errors, setErrors] = useState<Partial<typeof formData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status
    const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null); // For user feedback

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
        setSubmitMessage(null); // Clear messages on input change
    };

    const validateForm = () => {
        const newErrors: Partial<typeof formData> = {};
        if (!formData.title.trim()) newErrors.title = t('formErrorRequired');
        if (!formData.employer.trim()) newErrors.employer = t('formErrorRequired');
        if (!formData.location.trim()) newErrors.location = t('formErrorRequired');
        if (!formData.description.trim()) newErrors.description = t('formErrorRequired');
        if (!formData.contact.trim()) newErrors.contact = t('formErrorRequired');

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => { // Made async
        e.preventDefault();
        setSubmitMessage(null); // Clear previous messages
        if (!validateForm()) {
            setSubmitMessage({ type: 'error', text: t('formErrorValidationFailed') }); // Generic validation error message
            return;
        }

        setIsSubmitting(true); // Set submitting state
        try {
            const newJob: Omit<Job, 'id' | 'postedDate' | 'userEmail'> = {
                ...formData,
                type: formData.type as JobType,
                category: formData.category as JobCategory,
            };
            await addJob(newJob); // Await the async addJob function
            setSubmitMessage({ type: 'success', text: t('formSuccessJobPosted') });
            // Optionally clear form here:
            setFormData({
                title: '', employer: '', location: '', type: JobType.FULL_TIME,
                category: JobCategory.OTHER, description: '', salary: '', contact: '',
            });
            // Navigate after a short delay to allow message to be seen
            setTimeout(() => navigate('/jobs'), 1500);
        } catch (error) {
            console.error("Failed to post job:", error);
            setSubmitMessage({ type: 'error', text: t('formErrorJobPostFailed') }); // Specific error message
        } finally {
            setIsSubmitting(false); // Reset submitting state
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">{t('postJobPageTitle')}</h1>
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
                        <Input type="text" name="title" id="title" value={formData.title} onChange={handleChange} placeholder={t('formPlaceholderTitleJob')} required aria-describedby="title-error" />
                        {errors.title && <p id="title-error" className="text-xs text-red-600 mt-1">{errors.title}</p>}
                    </div>
                    <div>
                        <label htmlFor="employer" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelEmployer')}</label>
                        <Input type="text" name="employer" id="employer" value={formData.employer} onChange={handleChange} placeholder={t('formPlaceholderEmployer')} required aria-describedby="employer-error" />
                        {errors.employer && <p id="employer-error" className="text-xs text-red-600 mt-1">{errors.employer}</p>}
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelLocation')}</label>
                        <Input type="text" name="location" id="location" value={formData.location} onChange={handleChange} placeholder={t('formPlaceholderLocation')} required aria-describedby="location-error" />
                        {errors.location && <p id="location-error" className="text-xs text-red-600 mt-1">{errors.location}</p>}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelJobType')}</label>
                            <Select name="type" id="type" options={POST_JOB_TYPE_OPTIONS} value={formData.type} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelJobCategory')}</label>
                            <Select name="category" id="category" options={POST_JOB_CATEGORY_OPTIONS} value={formData.category} onChange={handleChange} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelDescription')}</label>
                        <Textarea name="description" id="description" value={formData.description} onChange={handleChange} placeholder={t('formPlaceholderDescriptionJob')} required aria-describedby="description-error" />
                        {errors.description && <p id="description-error" className="text-xs text-red-600 mt-1">{errors.description}</p>}
                    </div>
                    <div>
                        <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelSalary')}</label>
                        <Input type="text" name="salary" id="salary" value={formData.salary} onChange={handleChange} placeholder={t('formPlaceholderSalary')} />
                    </div>
                    <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelContact')}</label>
                        <Input type="text" name="contact" id="contact" value={formData.contact} onChange={handleChange} placeholder={t('formPlaceholderContact')} required aria-describedby="contact-error" />
                        {errors.contact && <p id="contact-error" className="text-xs text-red-600 mt-1">{errors.contact}</p>}
                    </div>
                    <div className="pt-2">
                        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? t('Loading...') : t('formButtonPostJob')}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default PostJobPage;