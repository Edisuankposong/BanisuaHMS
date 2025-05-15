import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import ErrorBoundary from './components/ErrorBoundary';
// ... other imports

function App() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <ErrorBoundary>
      <Router>
        {/* Rest of your routing logic */}
      </Router>
    </ErrorBoundary>
  );
}

export default App;