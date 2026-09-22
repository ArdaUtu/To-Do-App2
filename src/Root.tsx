/*
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import MainHeader from '../components/Navigation/MainHeader.tsx';
import Footer from '../components/Navigation/Footer.tsx';



function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function Root() {
  return (
      <ScrollToTop />
      <MainHeader />
      <Outlet />
      <Footer />
  );
}
*/