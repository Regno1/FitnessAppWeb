import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

import Navbar           from './components/common/Navbar';
import ProtectedRoute   from './components/common/ProtectedRoute';

import LoginPage            from './pages/auth/LoginPage';
import RegisterPage         from './pages/auth/RegisterPage';
import CallbackPage         from './pages/auth/CallbackPage';
import Dashboard            from './pages/dashboard/Dashboard';
import ActivitiesPage       from './pages/activity/ActivitiesPage';
import ActivityDetailsPage  from './pages/activity/ActivityDetailsPage';
import LogActivityPage      from './pages/activity/LogActivityPage';
import RecommendationPage   from './pages/recommendations/RecommendationPage';
import ProfilePage          from './pages/profile/ProfilePAge';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/callback" element={<CallbackPage />} />

        {/* Protected routes — redirects to /login if not authenticated */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard"              element={<Dashboard />} />
          <Route path="/activities"             element={<ActivitiesPage />} />
          <Route path="/activities/log"         element={<LogActivityPage />} />
          <Route path="/activities/:id"         element={<ActivityDetailsPage />} />
          <Route path="/recommendations"        element={<RecommendationPage />} />
          <Route path="/profile"                element={<ProfilePage />} />
        </Route>

        {/* Default — redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;