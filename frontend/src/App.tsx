import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout & Security
import { MainLayout } from './components/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { ExercisesPage } from './pages/ExercisesPage';
import { UsersPage } from './pages/UsersPage';

// Styles
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Public Routes: Anyone can see the login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* 2. Protected Routes: Must be logged in to see these */}
        <Route element={<ProtectedRoute />}>
          {/* MainLayout provides the persistent Header and Sidebar */}
          <Route path="/" element={<MainLayout />}>
            
            {/* The "Index" route is the Landing Page (the Hub) */}
            <Route index element={<LandingPage />} />
            
            {/* These are your specific "Applications" */}
            <Route path="exercises" element={<ExercisesPage />} />
            <Route path="users" element={<UsersPage />} />
            
            {/* You can add 'cars' or 'workouts' here later */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
