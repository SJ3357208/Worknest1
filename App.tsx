import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Job, Home
} from './types';
// Removed MOCK_JOBS, MOCK_HOMES as we'll use Firestore
import { APP_NAME_KEY } from './constants';
import { Button, LoadingSpinner } from './components/ui';
import {
    BriefcaseIcon, HomeModernIcon, LanguageIcon, ChevronDownIcon, PlusIcon, UserCircleIcon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon
} from './components/icons';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useTranslation } from './hooks/useTranslation';
import { LanguageCode } from './translations';

// Import Firestore functions and the 'db' instance
import { collection, query, orderBy, onSnapshot, addDoc, deleteDoc, doc, DocumentData } from 'firebase/firestore';
import { db } from './firebase'; // Import the initialized Firestore instance

// Import page components
import LandingPage from './pages/LandingPage';
import JobSearchPage from './pages/JobSearchPage';
import HomeSearchPage from './pages/HomeSearchPage';
import PostJobPage from './pages/PostJobPage';
import PostHomePage from './pages/PostHomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import JobDetailsPage from './pages/JobDetailsPage';
import HomeDetailsPage from './pages/HomeDetailsPage';


// Navbar Component (No changes needed here for Firestore integration)
const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { currentLanguage, changeLanguage } = useLanguage();
    const { currentUser, logout, isLoading: authIsLoading } = useAuth();

    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isPostDropdownOpen, setIsPostDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);


    const getLinkClass = (path: string) => {
        return location.pathname.startsWith(path) && (path !== '/' || location.pathname === '/')
            ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
            : 'text-gray-600 hover:text-blue-600';
    };

    const handleLanguageChange = (lang: LanguageCode) => {
        changeLanguage(lang);
        setIsLangDropdownOpen(false);
    };

    const handleLogout = () => {
        logout();
        setIsUserDropdownOpen(false);
        navigate('/'); // Navigate to home page after logout
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
                        <img
                            src="/assets/logo.png"
                            alt={t(APP_NAME_KEY)}
                            className="w-10 h-10 object-contain"
                        />
                        <span className="text-2xl sm:text-3xl font-bold text-blue-600">{t(APP_NAME_KEY)}</span>
                    </Link>
                    <div className="flex items-center space-x-2 md:space-x-4">
                        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
                            <Link to="/jobs" className={`px-3 py-2 rounded-md text-base lg:text-lg ${getLinkClass('/jobs')}`}>
                                {t('navFindJobs')}
                            </Link>
                            <Link to="/homes" className={`px-3 py-2 rounded-md text-base lg:text-lg ${getLinkClass('/homes')}`}>
                                {t('navFindHomes')}
                            </Link>
                        </div>

                        {/* Post New Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsPostDropdownOpen(!isPostDropdownOpen)}
                                title={t('navPostNew')}
                                className="text-gray-500 hover:text-blue-600 flex items-center p-2 rounded-md hover:bg-gray-100"
                                aria-haspopup="true"
                                aria-expanded={isPostDropdownOpen}
                            >
                                <PlusIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                <span className="ml-1 hidden sm:inline text-sm sm:text-base">{t('navPostNew')}</span>
                                <ChevronDownIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1 text-gray-500" />
                            </button>
                            {isPostDropdownOpen && (
                                <div
                                    className="absolute right-0 mt-2 py-1 w-40 sm:w-48 bg-white rounded-md shadow-xl z-20 ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    onMouseLeave={() => setIsPostDropdownOpen(false)}
                                >
                                    <Link
                                        to="/post-job"
                                        onClick={() => setIsPostDropdownOpen(false)}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        role="menuitem"
                                    >
                                        {t('navPostJob')}
                                    </Link>
                                    <Link
                                        to="/post-home"
                                        onClick={() => setIsPostDropdownOpen(false)}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        role="menuitem"
                                    >
                                        {t('navPostHome')}
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Language Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                                title={t('languageTooltip')}
                                className="text-gray-500 hover:text-blue-600 flex items-center p-2 rounded-md hover:bg-gray-100"
                                aria-haspopup="true"
                                aria-expanded={isLangDropdownOpen}
                            >
                                <LanguageIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                                <ChevronDownIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1 text-gray-500 hidden sm:inline-block" />
                            </button>
                            {isLangDropdownOpen && (
                                <div
                                    className="absolute right-0 mt-2 py-1 w-36 sm:w-40 bg-white rounded-md shadow-xl z-20 ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="language-menu-button"
                                    onMouseLeave={() => setIsLangDropdownOpen(false)}
                                >
                                    {['en', 'hi', 'te'].map((langCode) => (
                                        <a
                                            key={langCode}
                                            href="#"
                                            onClick={(e) => { e.preventDefault(); handleLanguageChange(langCode as LanguageCode); }}
                                            className={`block px-4 py-2 text-sm ${currentLanguage === langCode ? 'font-semibold text-blue-600 bg-blue-50' : 'text-gray-700'} hover:bg-gray-100 hover:text-gray-900`}
                                            role="menuitem"
                                        >
                                            {t(`language${langCode.charAt(0).toUpperCase() + langCode.slice(1)}` as any)}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Auth Section */}
                        {authIsLoading ? (
                            <div className="p-2"><div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div></div>
                        ) : currentUser ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                    className="flex items-center text-gray-600 hover:text-blue-600 p-1 rounded-full hover:bg-gray-100"
                                    aria-haspopup="true"
                                    aria-expanded={isUserDropdownOpen}
                                    title={currentUser.email}
                                >
                                    <UserCircleIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                                </button>
                                {isUserDropdownOpen && (
                                    <div
                                        className="absolute right-0 mt-2 py-1 w-48 bg-white rounded-md shadow-xl z-20 ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        role="menu"
                                        aria-orientation="vertical"
                                        onMouseLeave={() => setIsUserDropdownOpen(false)}
                                    >
                                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                            <p className="font-medium">{t('navWelcome')},</p>
                                            <p className="truncate">{currentUser.email}</p>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                                            role="menuitem"
                                        >
                                            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
                                            {t('navLogout')}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-1 sm:space-x-2">
                                <Link to="/login" title={t('navLogin')} className="text-gray-500 hover:text-blue-600 p-2 rounded-md hover:bg-gray-100 flex items-center">
                                    <ArrowRightOnRectangleIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                    <span className="ml-1 hidden lg:inline text-sm sm:text-base">{t('navLogin')}</span>
                                </Link>
                                <Link to="/register" title={t('navRegister')} className="text-gray-500 hover:text-blue-600 p-2 rounded-md hover:bg-gray-100 hidden sm:flex items-center">
                                    <UserCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 opacity-75" />
                                    <span className="ml-1 hidden lg:inline text-sm sm:text-base">{t('navRegister')}</span>
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button (Optional - for future expansion if nav links grow) */}
                        <div className="md:hidden">
                            {/* Could add a hamburger icon here to toggle mobile menu for find jobs/homes */}
                        </div>
                    </div>
                </div>
                {/* Mobile navigation links (if hamburger is implemented) */}
                <div className="md:hidden py-2 px-4 border-t border-gray-200 flex flex-col space-y-2">
                    <Link to="/jobs" className={`block px-3 py-2 rounded-md text-base ${getLinkClass('/jobs')}`}>
                        {t('navFindJobs')}
                    </Link>
                    <Link to="/homes" className={`block px-3 py-2 rounded-md text-base ${getLinkClass('/homes')}`}>
                        {t('navFindHomes')}
                    </Link>
                    {!currentUser && (
                        <Link to="/register" className={`block px-3 py-2 rounded-md text-base ${getLinkClass('/register')}`}>
                            {t('navRegister')}
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

// Footer Component (No changes needed here)
const Footer: React.FC = () => {
    const { t } = useTranslation();
    return (
        <footer className="bg-gray-800 text-white py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p>&copy; {new Date().getFullYear()} {t(APP_NAME_KEY)}. {t('footerRights')}</p>
                <p className="text-sm text-gray-400 mt-1">{t('footerTagline')}</p>
            </div>
        </footer>
    );
};


// Main App Component structure
const AppContent: React.FC = () => {
    // State to hold jobs and homes fetched from Firestore
    const [jobs, setJobs] = useState<Job[]>([]);
    const [homes, setHomes] = useState<Home[]>([]);
    const { currentUser, isLoading: authLoading } = useAuth();

    // --- Firestore Data Fetching (Jobs) ---
    useEffect(() => {
        const q = query(collection(db, 'jobs'), orderBy('postedDate', 'desc')); // Order by date, newest first
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const jobsData: Job[] = snapshot.docs.map(doc => ({
                id: doc.id, // Firestore document ID
                postedDate: doc.data().postedDate, // Ensure this is a string in YYYY-MM-DD format in Firestore
                userEmail: doc.data().userEmail,
                ...doc.data()
            } as Job)); // Cast to Job type
            setJobs(jobsData);
        }, (error) => {
            console.error("Error fetching jobs: ", error);
            // Optionally handle error state here
        });

        // Cleanup subscription on component unmount
        return () => unsubscribe();
    }, []); // Empty dependency array means this runs once on mount

    // --- Firestore Data Fetching (Homes) ---
    useEffect(() => {
        const q = query(collection(db, 'homes'), orderBy('postedDate', 'desc')); // Order by date, newest first
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const homesData: Home[] = snapshot.docs.map(doc => ({
                id: doc.id, // Firestore document ID
                postedDate: doc.data().postedDate, // Ensure this is a string in YYYY-MM-DD format in Firestore
                userEmail: doc.data().userEmail,
                ...doc.data()
            } as Home)); // Cast to Home type
            setHomes(homesData);
        }, (error) => {
            console.error("Error fetching homes: ", error);
            // Optionally handle error state here
        });

        // Cleanup subscription on component unmount
        return () => unsubscribe();
    }, []); // Empty dependency array means this runs once on mount


    // --- Firestore Add Functions ---
    const addJob = useCallback(async (newJob: Omit<Job, 'id' | 'postedDate' | 'userEmail'>) => {
        if (!currentUser) {
            console.error("No user logged in to post a job.");
            return;
        }
        try {
            const jobToAdd = {
                ...newJob,
                postedDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
                userEmail: currentUser.email,
                userId: currentUser.uid, // Store user UID for security rules and ownership checks
            };
            await addDoc(collection(db, 'jobs'), jobToAdd);
            console.log("Job added successfully to Firestore!");
        } catch (e) {
            console.error("Error adding job to Firestore: ", e);
        }
    }, [currentUser]); // Recreate if currentUser changes

    const addHome = useCallback(async (newHome: Omit<Home, 'id' | 'postedDate' | 'userEmail'>) => {
        if (!currentUser) {
            console.error("No user logged in to post a home.");
            return;
        }
        try {
            const homeToAdd = {
                ...newHome,
                postedDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
                userEmail: currentUser.email,
                userId: currentUser.uid, // Store user UID for security rules and ownership checks
            };
            await addDoc(collection(db, 'homes'), homeToAdd);
            console.log("Home added successfully to Firestore!");
        } catch (e) {
            console.error("Error adding home to Firestore: ", e);
        }
    }, [currentUser]); // Recreate if currentUser changes

    // --- Firestore Delete Functions ---
    const deleteJob = useCallback(async (jobId: string) => {
        if (!currentUser) {
            console.error("No user logged in to delete a job.");
            return;
        }
        try {
            // Before deleting, you might want to add a check to ensure the currentUser.uid matches the job's userId
            // This will be enforced by Firestore Security Rules later, but a client-side check is good too.
            const jobRef = doc(db, 'jobs', jobId);
            await deleteDoc(jobRef);
            console.log(`Job with ID ${jobId} deleted successfully from Firestore!`);
        } catch (e) {
            console.error("Error deleting job from Firestore: ", e);
        }
    }, [currentUser]);

    const deleteHome = useCallback(async (homeId: string) => {
        if (!currentUser) {
            console.error("No user logged in to delete a home.");
            return;
        }
        try {
            // Similar to jobs, consider adding a client-side ownership check
            const homeRef = doc(db, 'homes', homeId);
            await deleteDoc(homeRef);
            console.log(`Home with ID ${homeId} deleted successfully from Firestore!`);
        } catch (e) {
            console.error("Error deleting home from Firestore: ", e);
        }
    }, [currentUser]);


    const LocationWatcher = () => {
        const location = useLocation();
        useEffect(() => {
            window.scrollTo(0, 0);
        }, [location.pathname]);
        return null;
    };

    if (authLoading && !sessionStorage.getItem('auth_checked_once')) {
        return (
            <div className="flex flex-col min-h-screen justify-center items-center bg-gray-50">
                <LoadingSpinner />
            </div>
        );
    }
    sessionStorage.setItem('auth_checked_once', 'true');


    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <LocationWatcher />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    {/* Pass jobs and homes fetched from Firestore */}
                    <Route path="/jobs" element={<JobSearchPage jobs={jobs} />} />
                    {/* JobDetailsPage will now find the job from the 'jobs' array passed down */}
                    <Route path="/jobs/:id" element={<JobDetailsPage jobs={jobs} deleteJob={deleteJob} />} />
                    <Route path="/homes" element={<HomeSearchPage homes={homes} />} />
                    {/* HomeDetailsPage will now find the home from the 'homes' array passed down */}
                    <Route path="/homes/:id" element={<HomeDetailsPage homes={homes} deleteHome={deleteHome} />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route
                        path="/post-job"
                        element={
                            <ProtectedRoute>
                                {/* Pass the new addJob function */}
                                <PostJobPage addJob={addJob} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/post-home"
                        element={
                            <ProtectedRoute>
                                {/* Pass the new addHome function */}
                                <PostHomePage addHome={addHome} />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

// AppWithProviders wraps the AppContent with all necessary context providers
const AppWithProviders: React.FC = () => {
    return (
        <LanguageProvider>
            <AuthProvider>
                <HashRouter>
                    <AppContent />
                </HashRouter>
            </AuthProvider>
        </LanguageProvider>
    );
};

export default AppWithProviders;