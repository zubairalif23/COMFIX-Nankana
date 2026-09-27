import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Toast from './Toast';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toast />
    </div>
  );
}
