import { useAuthStore } from '../stores/authStore';
import { auditService } from '../services/auditService';

// Session timeout in minutes
const SESSION_TIMEOUT = 30;

export const security = {
  // Initialize security features
  init: () => {
    setupSessionTimeout();
    setupActivityTracking();
  },

  // Log user activity
  logActivity: async (
    action: string,
    resource: string,
    resourceId?: string,
    details?: string
  ) => {
    try {
      await auditService.logActivity(
        action as any,
        resource as any,
        resourceId,
        details,
        'success'
      );
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  }
};

// Setup session timeout
const setupSessionTimeout = () => {
  let timeout: NodeJS.Timeout;

  const resetTimeout = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      useAuthStore.getState().logout();
    }, SESSION_TIMEOUT * 60 * 1000);
  };

  // Reset timeout on user activity
  const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
  events.forEach(event => {
    document.addEventListener(event, resetTimeout);
  });

  // Initial timeout
  resetTimeout();
};

// Setup activity tracking
const setupActivityTracking = () => {
  // Track page navigation
  window.addEventListener('popstate', () => {
    security.logActivity('read', 'system', undefined, 'Page navigation');
  });

  // Track form submissions
  document.addEventListener('submit', (e) => {
    const form = e.target as HTMLFormElement;
    security.logActivity('create', 'system', undefined, `Form submission: ${form.id || 'unknown'}`);
  });
};