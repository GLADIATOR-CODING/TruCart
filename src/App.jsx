import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { SubscriptionsProvider } from './context/SubscriptionsContext';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSkeleton from './components/LoadingSkeleton';
import { getUserProfile } from './services/firestore';

// Lazy-loaded pages for code splitting (React.lazy + Suspense)
const Home = lazy(() => import('./pages/Home'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const RestaurantPage = lazy(() => import('./pages/RestaurantPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname + location.search}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="min-h-screen"
        style={{ background: 'var(--bg)' }}
      >
        <Suspense fallback={<LoadingSkeleton />}>
          <Routes location={location}>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><AppWithOnboarding><Home /></AppWithOnboarding></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
            <Route path="/restaurant/:id" element={<ProtectedRoute><RestaurantPage /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Wrapper that checks onboarding status from Firestore.
 * Shows onboarding for first-time users, then the main app.
 */
function AppWithOnboarding({ children }) {
  const { user } = useAuth();
  const [onboarded, setOnboarded] = useState(null); // null = loading

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const profile = await getUserProfile(user.uid);
        setOnboarded(profile?.onboardingComplete ?? false);
      } catch {
        setOnboarded(true); // fail open
      }
    })();
  }, [user]);

  if (onboarded === null) return <LoadingSkeleton />;

  if (!onboarded) {
    return <Onboarding onComplete={() => setOnboarded(true)} />;
  }

  return children;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Router>
          <AuthProvider>
            <FavoritesProvider>
              <SubscriptionsProvider>
                <AnimatedRoutes />
              </SubscriptionsProvider>
            </FavoritesProvider>
          </AuthProvider>
        </Router>
      </ToastProvider>
    </ErrorBoundary>
  );
}
