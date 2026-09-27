import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';

import Home from './pages/Home';
import CommunityIssues from './pages/CommunityIssues';
import IssueDetails from './pages/IssueDetails';
import ReportIssue from './pages/ReportIssue';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import VendorMarketplace from './pages/VendorMarketplace';
import VendorQuotation from './pages/VendorQuotation';
import CommunityFunding from './pages/CommunityFunding';
import ContributionConfirmation from './pages/ContributionConfirmation';
import IssueTracking from './pages/IssueTracking';
import ResolvedIssue from './pages/ResolvedIssue';
import UserProfile from './pages/UserProfile';
import MyReports from './pages/MyReports';
import MyContributions from './pages/MyContributions';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import Help from './pages/Help';
import MyActivity from './pages/MyActivity';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issues" element={<CommunityIssues />} />
        <Route path="/issues/:id" element={<IssueDetails />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/vendors" element={<VendorMarketplace />} />
        <Route path="/issues/:id/quotation" element={<VendorQuotation />} />
        <Route path="/issues/:id/funding" element={<CommunityFunding />} />
        <Route path="/issues/:id/contribute-confirm" element={<ContributionConfirmation />} />
        <Route path="/issues/:id/tracking" element={<IssueTracking />} />
        <Route path="/issues/:id/resolved" element={<ResolvedIssue />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/my-reports" element={<MyReports />} />
        <Route path="/my-contributions" element={<MyContributions />} />
        <Route path="/my-activity" element={<MyActivity />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
