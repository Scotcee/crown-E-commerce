import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignupPage from './pages/sign-in-and-sign-up-page/sign-in-and-sign-up-page.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      setCurrentUser(user); // Update currentUser state
      if (user) {
        await createUserProfileDocument(user); // Pass user to createUserProfileDocument
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribeFromAuth();
  }, []);

  return (
    <>
      <Header currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/signin" element={<SignInAndSignupPage />} />
      </Routes>
    </>
  );
};

export default App;
