// src/router.js
import { inputPage } from './pages/input';
import { resultsPage } from './pages/results';

export function router() {
  const routes = {
    '/input': inputPage,
    '/results': resultsPage,
  };

  function handleRoute() {
    const path = window.location.pathname; // Get the path without the hash
    const route = routes[path] || routes['/input']; // Default to input page
    route(); // Call the appropriate page handler
  }

  // Listen for back/forward navigation
  window.addEventListener('popstate', handleRoute);

  // Handle the current route when the page loads
  handleRoute();
}

// Function to change route programmatically (e.g., after form submission)
export function navigateTo(route) {
  window.history.pushState({}, '', route); // Change the URL without reloading
  router(); // Re-render based on the new route
}
