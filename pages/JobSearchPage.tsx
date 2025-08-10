
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Job, JobFilters, JobType, JobCategory } from '../types';
import { JOB_TYPE_OPTIONS, JOB_CATEGORY_OPTIONS } from '../constants';
import { Button, Input, Select, Card, LoadingSpinner } from '../components/ui';
import { 
  BuildingOfficeIcon, MapPinIcon, BriefcaseIcon, TagIcon, CurrencyRupeeIcon, CalendarDaysIcon, MagnifyingGlassIcon 
} from '../components/icons';
import { useTranslation } from '../hooks/useTranslation';

interface JobSearchPageProps {
  jobs: Job[];
}

const JobSearchPage: React.FC<JobSearchPageProps> = ({ jobs: initialJobs }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(initialJobs);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<JobFilters>({
    keyword: '',
    location: '',
    jobType: JobType.ANY,
    jobCategory: JobCategory.ANY,
  });

  useEffect(() => {
    setFilteredJobs(initialJobs);
  }, [initialJobs]);

  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value as JobType | JobCategory | string }));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    let result = initialJobs;
    if (filters.keyword) {
      const keywordLower = filters.keyword.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(keywordLower) ||
        job.description.toLowerCase().includes(keywordLower) ||
        job.employer.toLowerCase().includes(keywordLower)
      );
    }
    if (filters.location) {
      result = result.filter(job => job.location.toLowerCase().includes(filters.location.toLowerCase()));
    }
    if (filters.jobType !== JobType.ANY) {
      result = result.filter(job => job.type === filters.jobType);
    }
    if (filters.jobCategory !== JobCategory.ANY) {
      result = result.filter(job => job.category === filters.jobCategory);
    }
    
    setTimeout(() => {
      setFilteredJobs(result);
      setIsLoading(false);
    }, 300);
  }, [filters, initialJobs]);

  const handleViewDetails = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">{t('jobSearchPageTitle')}</h1>
      
      <Card className="p-6 mb-8 bg-white shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">{t('filterKeywordLabel')}</label>
            <Input type="text" name="keyword" id="keyword" placeholder={t('filterKeywordPlaceholderJobs')} value={filters.keyword} onChange={handleFilterChange} aria-label={t('filterKeywordLabel')} />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">{t('filterLocationLabel')}</label>
            <Input type="text" name="location" id="location" placeholder={t('filterLocationPlaceholder')} value={filters.location} onChange={handleFilterChange} aria-label={t('filterLocationLabel')} />
          </div>
          <div>
            <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">{t('filterJobTypeLabel')}</label>
            <Select name="jobType" id="jobType" options={JOB_TYPE_OPTIONS} value={filters.jobType} onChange={handleFilterChange} aria-label={t('filterJobTypeLabel')} />
          </div>
          <div>
            <label htmlFor="jobCategory" className="block text-sm font-medium text-gray-700 mb-1">{t('filterJobCategoryLabel')}</label>
            <Select name="jobCategory" id="jobCategory" options={JOB_CATEGORY_OPTIONS} value={filters.jobCategory} onChange={handleFilterChange} aria-label={t('filterJobCategoryLabel')} />
          </div>
        </div>
      </Card>

      {isLoading ? <LoadingSpinner /> : (
        filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <Card key={job.id} className="flex flex-col justify-between transform hover:scale-105 transition-transform duration-200">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">{job.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center"><BuildingOfficeIcon className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" /> {job.employer}</p>
                    <p className="flex items-center"><MapPinIcon className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" /> {job.location}</p>
                    <p className="flex items-center"><BriefcaseIcon className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" /> {t(JOB_TYPE_OPTIONS.find(opt => opt.value === job.type)?.labelKey || job.type)}</p>
                    <p className="flex items-center"><TagIcon className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" /> {t(JOB_CATEGORY_OPTIONS.find(opt => opt.value === job.category)?.labelKey || job.category)}</p>
                    {job.salary && <p className="flex items-center"><CurrencyRupeeIcon className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" /> {job.salary}</p>}
                    <p className="text-gray-700 mt-2 text-sm line-clamp-3">{job.description}</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                  <p className="text-xs text-gray-500 flex items-center"><CalendarDaysIcon className="w-4 h-4 mr-1"/> {t('jobCardPosted')}: {job.postedDate?.toDate 
  ? job.postedDate.toDate().toLocaleDateString() 
  : new Date(job.postedDate).toLocaleDateString()}</p>
                  <Button size="sm" variant="outline" onClick={() => handleViewDetails(job.id)}>{t('jobCardViewDetails')}</Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <MagnifyingGlassIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-500">{t('jobSearchNoResults')}</p>
          </div>
        )
      )}
    </div>
  );
};

export default JobSearchPage;
