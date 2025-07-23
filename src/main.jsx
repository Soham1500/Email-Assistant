// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn
} from '@clerk/clerk-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <SignedIn>
                  <App />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
