import React from 'react';
import { ThemeProvider } from 'next-themes';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { RoleSwitcherBanner } from './components/layout/RoleSwitcherBanner';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PilotFeedbackModal } from './components/ui/PilotFeedbackModal';
import { MessageSquarePlus } from 'lucide-react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Public pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { SignupPage } from './pages/public/SignupPage';
import { AdminApplicationPage } from './pages/public/AdminApplicationPage';
import ThemeDemoPage from './pages/public/ThemeDemoPage';

// Student pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { BrowseItemsPage } from './pages/student/BrowseItemsPage';
import { ReportLostPage } from './pages/student/ReportLostPage';
import { ReportFoundPage } from './pages/student/ReportFoundPage';
import { ItemDetailPage } from './pages/student/ItemDetailPage';
import { MyActivityPage } from './pages/student/MyActivityPage';
import { StudentNotificationsPage } from './pages/student/StudentNotificationsPage';
import { StudentProfilePage } from './pages/student/StudentProfilePage';
import { StudentHelpPage } from './pages/StudentHelpPage';

// College Admin pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminClaimsPage } from './pages/admin/AdminClaimsPage';
import { AdminStudentsPage } from './pages/admin/AdminStudentsPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminGuidePage } from './pages/admin/AdminGuidePage';
import { AdminNotificationsPage } from './pages/admin/AdminNotificationsPage';
import { AdminProfilePage } from './pages/admin/AdminProfilePage';

// Foundly Owner pages
import { OwnerDashboard } from './pages/owner/OwnerDashboard';
import { OwnerCollegesPage } from './pages/owner/OwnerCollegesPage';
import { OwnerAdminRequestsPage } from './pages/owner/OwnerAdminRequestsPage';
import { OwnerAdminsPage } from './pages/owner/OwnerAdminsPage';
import { OwnerAnalyticsPage } from './pages/owner/OwnerAnalyticsPage';
import { OwnerHealthPage } from './pages/owner/OwnerHealthPage';
import { OwnerActivityPage } from './pages/owner/OwnerActivityPage';
import { OwnerRolloutPage } from './pages/owner/OwnerRolloutPage';
import { OwnerPilotPage } from './pages/owner/OwnerPilotPage';

const AppContent: React.FC = () => {
  const { currentPath, perspective } = useRouter();
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = React.useState(false);

  // Setup Lenis smooth scroll and sync with GSAP
  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // Route dispatcher with role-based access control
  const renderCurrentView = () => {
    // Dynamic item route matcher: /student/item/:id
    if (currentPath.startsWith('/student/item/')) {
      return (
        <ProtectedRoute allowedRoles={['student', 'college_admin', 'foundly_owner']}>
          <ItemDetailPage />
        </ProtectedRoute>
      );
    }

    switch (currentPath) {
      // Public routes
      case '/':
        return <LandingPage />;
      case '/login':
        return <LoginPage />;
      case '/signup':
        return <SignupPage />;
      case '/admin-application':
        return <AdminApplicationPage />;
      case '/demo':
        return <ThemeDemoPage />;

      // Protected Student routes (/student/*)
      case '/student':
        return (
          <ProtectedRoute allowedRoles={['student', 'college_admin', 'foundly_owner']}>
            <StudentDashboard />
          </ProtectedRoute>
        );
      case '/student/browse':
        return (
          <ProtectedRoute allowedRoles={['student', 'college_admin', 'foundly_owner']}>
            <BrowseItemsPage />
          </ProtectedRoute>
        );
      case '/student/report-lost':
        return (
          <ProtectedRoute allowedRoles={['student', 'college_admin', 'foundly_owner']}>
            <ReportLostPage />
          </ProtectedRoute>
        );
      case '/student/report-found':
        return (
          <ProtectedRoute allowedRoles={['student', 'college_admin', 'foundly_owner']}>
            <ReportFoundPage />
          </ProtectedRoute>
        );
      case '/student/activity':
        return (
          <ProtectedRoute allowedRoles={['student', 'college_admin', 'foundly_owner']}>
            <MyActivityPage />
          </ProtectedRoute>
        );
      case '/student/notifications':
        return (
          <ProtectedRoute allowedRoles={['student', 'college_admin', 'foundly_owner']}>
            <StudentNotificationsPage />
          </ProtectedRoute>
        );
      case '/student/profile':
        return (
          <ProtectedRoute allowedRoles={['student', 'college_admin', 'foundly_owner']}>
            <StudentProfilePage />
          </ProtectedRoute>
        );
      case '/help':
        return (
          <ProtectedRoute allowedRoles={['student', 'college_admin', 'foundly_owner']}>
            <StudentHelpPage />
          </ProtectedRoute>
        );

      // Protected College Admin routes (/admin/*)
      case '/admin':
        return (
          <ProtectedRoute allowedRoles={['college_admin', 'foundly_owner']}>
            <AdminDashboard />
          </ProtectedRoute>
        );
      case '/admin/reports':
        return (
          <ProtectedRoute allowedRoles={['college_admin', 'foundly_owner']}>
            <AdminReportsPage />
          </ProtectedRoute>
        );
      case '/admin/claims':
        return (
          <ProtectedRoute allowedRoles={['college_admin', 'foundly_owner']}>
            <AdminClaimsPage />
          </ProtectedRoute>
        );
      case '/admin/students':
        return (
          <ProtectedRoute allowedRoles={['college_admin', 'foundly_owner']}>
            <AdminStudentsPage />
          </ProtectedRoute>
        );
      case '/admin/analytics':
        return (
          <ProtectedRoute allowedRoles={['college_admin', 'foundly_owner']}>
            <AdminAnalyticsPage />
          </ProtectedRoute>
        );
      case '/admin/guide':
        return (
          <ProtectedRoute allowedRoles={['college_admin', 'foundly_owner']}>
            <AdminGuidePage />
          </ProtectedRoute>
        );
      case '/admin/notifications':
        return (
          <ProtectedRoute allowedRoles={['college_admin', 'foundly_owner']}>
            <AdminNotificationsPage />
          </ProtectedRoute>
        );
      case '/admin/profile':
        return (
          <ProtectedRoute allowedRoles={['college_admin', 'foundly_owner']}>
            <AdminProfilePage />
          </ProtectedRoute>
        );

      // Protected Foundly Owner routes (/owner/*)
      case '/owner':
        return (
          <ProtectedRoute allowedRoles={['foundly_owner']}>
            <OwnerDashboard />
          </ProtectedRoute>
        );
      case '/owner/colleges':
        return (
          <ProtectedRoute allowedRoles={['foundly_owner']}>
            <OwnerCollegesPage />
          </ProtectedRoute>
        );
      case '/owner/rollout':
        return (
          <ProtectedRoute allowedRoles={['foundly_owner']}>
            <OwnerRolloutPage />
          </ProtectedRoute>
        );
      case '/owner/pilot':
        return (
          <ProtectedRoute allowedRoles={['foundly_owner']}>
            <OwnerPilotPage />
          </ProtectedRoute>
        );
      case '/owner/admin-requests':
        return (
          <ProtectedRoute allowedRoles={['foundly_owner']}>
            <OwnerAdminRequestsPage />
          </ProtectedRoute>
        );
      case '/owner/admins':
        return (
          <ProtectedRoute allowedRoles={['foundly_owner']}>
            <OwnerAdminsPage />
          </ProtectedRoute>
        );
      case '/owner/analytics':
        return (
          <ProtectedRoute allowedRoles={['foundly_owner']}>
            <OwnerAnalyticsPage />
          </ProtectedRoute>
        );
      case '/owner/health':
        return (
          <ProtectedRoute allowedRoles={['foundly_owner']}>
            <OwnerHealthPage />
          </ProtectedRoute>
        );
      case '/owner/activity':
        return (
          <ProtectedRoute allowedRoles={['foundly_owner']}>
            <OwnerActivityPage />
          </ProtectedRoute>
        );

      default:
        // Safe fallback according to route prefix
        if (currentPath.startsWith('/student')) {
          return (
            <ProtectedRoute allowedRoles={['student', 'college_admin', 'foundly_owner']}>
              <StudentDashboard />
            </ProtectedRoute>
          );
        }
        if (currentPath.startsWith('/admin') && currentPath !== '/admin-application') {
          return (
            <ProtectedRoute allowedRoles={['college_admin', 'foundly_owner']}>
              <AdminDashboard />
            </ProtectedRoute>
          );
        }
        if (currentPath.startsWith('/owner')) {
          return (
            <ProtectedRoute allowedRoles={['foundly_owner']}>
              <OwnerDashboard />
            </ProtectedRoute>
          );
        }
        return <LandingPage />;
    }
  };

  const isPublicLayout = 
    currentPath === '/' || 
    currentPath === '/login' || 
    currentPath === '/signup' || 
    currentPath === '/admin-application';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#121212] text-slate-900 dark:text-slate-100 font-sans antialiased transition-colors duration-300">
      {/* Role Switcher Toolbar for Phase 2 UI & Permission Verification */}
      <RoleSwitcherBanner />

      {/* Global Navbar */}
      <Navbar />

      {/* Main Content Area */}
      {isPublicLayout ? (
        <main className="flex-1 flex flex-col">
          {renderCurrentView()}
        </main>
      ) : (
        <div className="flex-1 flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 gap-6">
          {/* Role Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <Sidebar />
          </aside>

          {/* Primary View */}
          <main className="flex-1 min-w-0">
            {renderCurrentView()}
          </main>
        </div>
      )}

      {/* Footer - hidden on landing page which has its own cinematic footer */}
      {currentPath !== '/' && (
      <footer className="border-t border-slate-200/80 bg-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 tracking-tight">Foundly</span>
            <span>— College-Specific Lost & Found Network</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Phase 2: Supabase Auth & RLS Architecture</span>
            <span>•</span>
            <span>Multi-College Isolation Active</span>
          </div>
        </div>
      </footer>
      )}

      {/* Floating Pilot Feedback Trigger */}
      <button
        onClick={() => setIsFeedbackModalOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-indigo-600/90 text-white hover:bg-indigo-500 hover:scale-110 transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] backdrop-blur-md"
        title="Submit Pilot Feedback"
      >
        <MessageSquarePlus className="w-6 h-6" />
      </button>

      <PilotFeedbackModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <ToastProvider>
        <AuthProvider>
          <NotificationProvider>
            <RouterProvider>
              <AppContent />
            </RouterProvider>
          </NotificationProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
