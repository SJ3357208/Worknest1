

import React from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { Job } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { useAuth } from '../contexts/AuthContext';
import { Card, Button } from '../components/ui';
import {
    BuildingOfficeIcon, MapPinIcon, BriefcaseIcon, TagIcon, CurrencyRupeeIcon, CalendarDaysIcon, MagnifyingGlassIcon, ArrowLeftIcon, UserCircleIcon, ExclamationTriangleIcon, TrashIcon
} from '../components/icons';
import { JOB_TYPE_OPTIONS, JOB_CATEGORY_OPTIONS } from '../constants';

interface JobDetailsPageProps {
    jobs: Job[];
    deleteJob: (jobId: string) => void;
}

const JobDetailsPage: React.FC<JobDetailsPageProps> = ({ jobs, deleteJob }) => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const job = jobs.find(j => j.id === id);

    const handleDelete = () => {
        if (!job) return;
        if (window.confirm(t('deleteConfirmationJob'))) {
            deleteJob(job.id);
            alert(t('deleteSuccess'));
            navigate('/jobs');
        }
    };

    if (!job) {
        return (
            <div className="text-center py-10">
                <MagnifyingGlassIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-700">{t('detailsNotFoundJob')}</h2>
                <p className="text-lg text-gray-500 mt-2">{t('detailsNotFoundMessage')}</p>
                <Button onClick={() => navigate('/jobs')} className="mt-6">
                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                    {t('backToSearch')}
                </Button>
            </div>
        );
    }

    const handleLoginRedirect = () => {
        navigate('/login', { state: { from: location } });
    }

    return (
        <div className="max-w-5xl mx-auto">
            <Button onClick={() => navigate(-1)} variant="outline" size="sm" className="mb-6 flex items-center">
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                {t('backToSearch')}
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Main Content */}
                <div className="md:col-span-2">
                    <Card className="p-6 sm:p-8">
                        <h1 className="text-3xl font-bold text-blue-700 mb-2">{job.title}</h1>
                        <p className="flex items-center text-lg text-gray-600 mb-4"><BuildingOfficeIcon className="w-5 h-5 mr-2 text-emerald-600" />{job.employer}</p>

                        <div className="border-t border-gray-200 my-6"></div>

                        <h2 className="text-xl font-semibold text-gray-800 mb-3">{t('fullDescription')}</h2>
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{job.description}</p>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="md:col-span-1 space-y-6">
                    <Card className="p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">{t('keyInfo')}</h2>
                        <div className="space-y-3 text-sm text-gray-700">
                            {job.salary &&
                                <p className="flex items-start"><CurrencyRupeeIcon className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0 mt-0.5" /> <strong>{job.salary}</strong></p>
                            }
                            <p className="flex items-start"><MapPinIcon className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0 mt-0.5" /> {job.location}</p>
                            <p className="flex items-start"><BriefcaseIcon className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0 mt-0.5" /> {t(JOB_TYPE_OPTIONS.find(opt => opt.value === job.type)?.labelKey || job.type)}</p>
                            <p className="flex items-start"><TagIcon className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0 mt-0.5" /> {t(JOB_CATEGORY_OPTIONS.find(opt => opt.value === job.category)?.labelKey || job.category)}</p>
                            <p className="flex items-start"><CalendarDaysIcon className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0 mt-0.5" /> {t('jobCardPosted')}: {new Date(job.postedDate).toLocaleDateString()}</p>
                        </div>
                    </Card>

                    <Card className="p-6 bg-blue-50 border border-blue-200">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">{t('contactEmployer')}</h2>
                        {currentUser ? (
                            <div className="p-3 bg-white rounded-md">
                                <p className="text-gray-800 font-medium break-words">{job.contact}</p>
                            </div>
                        ) : (
                            <div className="text-center p-4 bg-white rounded-md">
                                <UserCircleIcon className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600 mb-3">{t('loginToViewContact')}</p>
                                <Button size="sm" onClick={handleLoginRedirect}>{t('loginButton')}</Button>
                            </div>
                        )}
                    </Card>

                    {currentUser?.email === job.userEmail && (
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
                                <strong>Disclaimer:</strong> Always be cautious when sharing personal information or making payments. Verify the legitimacy of the employer independently.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default JobDetailsPage;