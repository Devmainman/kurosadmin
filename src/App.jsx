import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './context/AuthContext';

// Layout
import Layout from './components/layout/Layout';

// Auth Pages
import Login from './pages/auth/Login';
import Verify2FA from './pages/auth/Verify2FA';
import ForgotPassword from './pages/auth/ForgotPassword';

// Dashboard
import Dashboard from './pages/dashboard/Dashboard';

// Services
import Services from './pages/services/Services';
import ServiceForm from './pages/services/ServiceForm';
import ServiceDetail from './pages/services/ServiceDetail';

// Portfolio
import Portfolio from './pages/portfolio/Portfolio';
import PortfolioForm from './pages/portfolio/PortfolioForm';
import PortfolioDetail from './pages/portfolio/PortfolioDetail';

// Blog
import Blog from './pages/blog/Blog';
import BlogForm from './pages/blog/BlogForm';
import BlogDetail from './pages/blog/BlogDetail';

// Team
import Team from './pages/team/Team';
import TeamForm from './pages/team/TeamForm';
import TeamDetail from './pages/team/TeamDetail';

// Initiatives
import Initiatives from './pages/initiatives/Initiatives';
import InitiativeForm from './pages/initiatives/InitiativeForm';
import InitiativeDetail from './pages/initiatives/InitiativeDetail';

// Contacts
import Contacts from './pages/contacts/Contacts';
import ContactDetail from './pages/contacts/ContactDetail';

// Quotes
import Quotes from './pages/quotes/Quotes';
import QuoteDetail from './pages/quotes/QuoteDetail';

// Newsletter
import Newsletter from './pages/newsletter/Newsletter';

// Careers
import Careers from './pages/careers/Careers';
import CareerForm from './pages/careers/CareerForm';
import CareerDetail from './pages/careers/CareerDetail';

// Settings
import Settings from './pages/settings/Settings';
import Profile from './pages/profile/Profile';

// Private Route
import PrivateRoute from './components/common/PrivateRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                icon: '✅',
                style: {
                  background: '#10b981',
                },
              },
              error: {
                icon: '❌',
                style: {
                  background: '#ef4444',
                },
              },
            }}
          />
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/verify-2fa" element={<Verify2FA />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Routes */}
            <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              
              {/* Services */}
              <Route path="services" element={<Services />} />
              <Route path="services/new" element={<ServiceForm />} />
              <Route path="services/:id" element={<ServiceDetail />} />
              <Route path="services/:id/edit" element={<ServiceForm />} />
              
              {/* Portfolio */}
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="portfolio/new" element={<PortfolioForm />} />
              <Route path="portfolio/:id" element={<PortfolioDetail />} />
              <Route path="portfolio/:id/edit" element={<PortfolioForm />} />
              
              {/* Blog */}
              <Route path="blog" element={<Blog />} />
              <Route path="blog/new" element={<BlogForm />} />
              <Route path="blog/:id" element={<BlogDetail />} />
              <Route path="blog/:id/edit" element={<BlogForm />} />
              
              {/* Team */}
              <Route path="team" element={<Team />} />
              <Route path="team/new" element={<TeamForm />} />
              <Route path="team/:id" element={<TeamDetail />} />
              <Route path="team/:id/edit" element={<TeamForm />} />
              
              {/* Initiatives */}
              <Route path="initiatives" element={<Initiatives />} />
              <Route path="initiatives/new" element={<InitiativeForm />} />
              <Route path="initiatives/:id" element={<InitiativeDetail />} />
              <Route path="initiatives/:id/edit" element={<InitiativeForm />} />
              
              {/* Contacts */}
              <Route path="contacts" element={<Contacts />} />
              <Route path="contacts/:id" element={<ContactDetail />} />
              
              {/* Quotes */}
              <Route path="quotes" element={<Quotes />} />
              <Route path="quotes/:id" element={<QuoteDetail />} />
              
              {/* Newsletter */}
              <Route path="newsletter" element={<Newsletter />} />
              
              {/* Careers */}
              <Route path="careers" element={<Careers />} />
              <Route path="careers/new" element={<CareerForm />} />
              <Route path="careers/:id" element={<CareerDetail />} />
              <Route path="careers/:id/edit" element={<CareerForm />} />
              
              {/* Settings & Profile */}
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;