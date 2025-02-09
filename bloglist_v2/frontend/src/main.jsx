import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserContextProvider } from './context/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <Router>
        <App />
      </Router>
    </UserContextProvider>
  </QueryClientProvider>
);
