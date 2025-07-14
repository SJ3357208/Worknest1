
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Job, JobType, JobCategory } from '../types';
import { Button, Input, Select, Textarea, Card } from '../components/ui';
import { POST_JOB_TYPE_OPTIONS, POST_JOB_CATEGORY_OPTIONS } from '../constants';
import { useTranslation } from '../hooks/useTranslation';

interface PostJobPageProps {
  addJob: (job: Omit<Job, 'id' | 'postedDate'>) => void;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.title.trim()) newErrors.title = t('formErrorRequired');
    if (!formData.employer.trim()) newErrors.employer = t('formErrorRequired');
    if (!formData.location.trim()) newErrors.location = t('formErrorRequired');
    if (!formData.description.trim()) newErrors.description = t('formErrorRequired');
    if (!formData.contact.trim()) newErrors.contact = t('formErrorRequired');
    // Type and Category will have default values from select, so usually don't need specific validation unless "select one" is an option
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newJob: Omit<Job, 'id' | 'postedDate'> = {
      ...formData,
      type: formData.type as JobType, // Ensure correct enum type
      category: formData.category as JobCategory, // Ensure correct enum type
    };
    addJob(newJob);
    alert(t('formSuccessJobPosted')); // Simple success message
    navigate('/jobs');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">{t('postJobPageTitle')}</h1>
      <Card className="p-6 sm:p-8 bg-white shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelTitle')}</label>
            <Input type="text" name="title" id="title" value={formData.title} onChange={handleChange} placeholder={t('formPlaceholderTitleJob')} required aria-describedby="title-error"/>
            {errors.title && <p id="title-error" className="text-xs text-red-600 mt-1">{errors.title}</p>}
          </div>
          <div>
            <label htmlFor="employer" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelEmployer')}</label>
            <Input type="text" name="employer" id="employer" value={formData.employer} onChange={handleChange} placeholder={t('formPlaceholderEmployer')} required aria-describedby="employer-error"/>
            {errors.employer && <p id="employer-error" className="text-xs text-red-600 mt-1">{errors.employer}</p>}
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelLocation')}</label>
            <Input type="text" name="location" id="location" value={formData.location} onChange={handleChange} placeholder={t('formPlaceholderLocation')} required aria-describedby="location-error"/>
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
            <Textarea name="description" id="description" value={formData.description} onChange={handleChange} placeholder={t('formPlaceholderDescriptionJob')} required aria-describedby="description-error"/>
            {errors.description && <p id="description-error" className="text-xs text-red-600 mt-1">{errors.description}</p>}
          </div>
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelSalary')}</label>
            <Input type="text" name="salary" id="salary" value={formData.salary} onChange={handleChange} placeholder={t('formPlaceholderSalary')} />
          </div>
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">{t('formLabelContact')}</label>
            <Input type="text" name="contact" id="contact" value={formData.contact} onChange={handleChange} placeholder={t('formPlaceholderContact')} required aria-describedby="contact-error"/>
            {errors.contact && <p id="contact-error" className="text-xs text-red-600 mt-1">{errors.contact}</p>}
          </div>
          <div className="pt-2">
            <Button type="submit" variant="primary" size="lg" className="w-full">
              {t('formButtonPostJob')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PostJobPage;
