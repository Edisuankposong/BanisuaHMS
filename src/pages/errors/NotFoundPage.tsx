import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-primary-500 mb-4">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </div>
      <h1 className="text-5xl font-bold text-gray-900 mb-2">404</h1>
      <h2 className="text-2xl font-medium text-gray-700 mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        We're sorry, the page you requested could not be found. Please go back to the homepage.
      </p>
      <Link to="/dashboard">
        <Button variant="primary" size="lg">
          Go to Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;