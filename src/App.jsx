import React, { useEffect } from 'react';
import Home from './pages/Home';
import posthog from 'posthog-js';

function App() {
  useEffect(() => {
    const posthogApiKey = import.meta.env.VITE_POSTHOG_API_KEY;
    if (posthogApiKey) {
      posthog.init(posthogApiKey, { api_host: 'https://app.posthog.com' });
    } else {
      console.error('PostHog API key is missing');
    }
  }, []);

  return (
    <div>
      <Home />
    </div>
  );
}

export default App;