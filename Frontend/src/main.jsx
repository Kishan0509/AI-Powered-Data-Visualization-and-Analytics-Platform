import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="166298855303-spbp6dm6atigvs0js965c3mcic6ufsac.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
