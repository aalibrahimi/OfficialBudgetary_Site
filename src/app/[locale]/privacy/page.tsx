// src/app/[locale]/privacy/page.tsx
import { Navbar } from '@/MyComponents/navbar';
import { Footer } from '@/MyComponents/Footer';
import React from 'react';
import PrivacyPolicyPage from '@/MyComponents/documents/privatePrivacy';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <PrivacyPolicyPage />
    </div>
  );
};

export default PrivacyPage;