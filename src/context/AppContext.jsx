import React, { createContext, useContext, useState, useMemo } from 'react';
import { INITIAL_ISSUES, CURRENT_USER, VENDORS } from '../data/mockData';

const AppContext = createContext(null);

let idCounter = 2000;
export function nextId(prefix) {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

export function AppProvider({ children }) {
  const [issues, setIssues] = useState(INITIAL_ISSUES);
  const [user, setUser] = useState(null); // null = logged out
  const [votedIssueIds, setVotedIssueIds] = useState([]);
  const [myContributions, setMyContributions] = useState([]);
  const [myReportIds, setMyReportIds] = useState(['is-1001', 'is-1006']);
  const [toast, setToast] = useState(null);

  function showToast(text) {
    setToast(text);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 3200);
  }

  function loginAsDemo() {
    setUser(CURRENT_USER);
  }

  function logout() {
    setUser(null);
  }

  function addIssue(issue) {
    const id = nextId('is');
    const newIssue = {
      id,
      votes: 0,
      voteThreshold: 100,
      households: 1,
      status: 'Reported',
      reporter: user ? user.name : 'Demo User',
      createdAt: new Date().toISOString(),
      progressUpdates: [{ date: new Date().toISOString(), text: 'Issue reported, awaiting community votes.' }],
      ...issue,
    };
    setIssues((prev) => [newIssue, ...prev]);
    setMyReportIds((prev) => [id, ...prev]);
    return newIssue;
  }

  function voteIssue(issueId) {
    if (votedIssueIds.includes(issueId)) return;
    setVotedIssueIds((prev) => [...prev, issueId]);
    setIssues((prev) =>
      prev.map((it) => {
        if (it.id !== issueId) return it;
        const votes = it.votes + 1;
        const households = it.households + 1;
        const crossedThreshold = votes >= it.voteThreshold && it.status === 'Voting';
        const startedVoting = it.status === 'Reported';
        return {
          ...it,
          votes,
          households,
          status: crossedThreshold ? 'Community Approved' : startedVoting ? 'Voting' : it.status,
          progressUpdates: crossedThreshold
            ? [...it.progressUpdates, { date: new Date().toISOString(), text: `Vote threshold reached — ${votes} households in favour.` }]
            : it.progressUpdates,
        };
      })
    );
  }

  function selectVendor(issueId, vendorId) {
    setIssues((prev) =>
      prev.map((it) =>
        it.id === issueId
          ? {
              ...it,
              vendorId,
              status: 'Vendor Selected',
              progressUpdates: [...it.progressUpdates, { date: new Date().toISOString(), text: `${VENDORS.find((v) => v.id === vendorId)?.name} selected by community.` }],
            }
          : it
      )
    );
  }

  function submitQuotation(issueId, quotation) {
    setIssues((prev) =>
      prev.map((it) => (it.id === issueId ? { ...it, quotation: { ...quotation, approved: false } } : it))
    );
  }

  function approveQuotation(issueId) {
    setIssues((prev) =>
      prev.map((it) =>
        it.id === issueId
          ? {
              ...it,
              status: 'Funding',
              quotation: { ...it.quotation, approved: true },
              funding: { required: it.quotation.materials + it.quotation.labor, collected: 0, contributors: 0 },
              progressUpdates: [...it.progressUpdates, { date: new Date().toISOString(), text: 'Community approved the vendor quotation.' }],
            }
          : it
      )
    );
  }

  function contribute(issueId, amount) {
    let updatedIssue = null;
    setIssues((prev) =>
      prev.map((it) => {
        if (it.id !== issueId) return it;
        const collected = it.funding.collected + amount;
        const fullyFunded = collected >= it.funding.required;
        updatedIssue = {
          ...it,
          funding: { ...it.funding, collected, contributors: it.funding.contributors + 1 },
          status: fullyFunded ? 'In Progress' : it.status,
          progressUpdates: fullyFunded
            ? [...it.progressUpdates, { date: new Date().toISOString(), text: 'Funding goal reached, work scheduled to begin.' }]
            : it.progressUpdates,
        };
        return updatedIssue;
      })
    );
    setMyContributions((prev) => [
      { id: nextId('c'), issueId, amount, date: new Date().toISOString() },
      ...prev,
    ]);
    return updatedIssue;
  }

  function markResolved(issueId) {
    setIssues((prev) =>
      prev.map((it) =>
        it.id === issueId
          ? {
              ...it,
              status: 'Resolved',
              resolvedDate: new Date().toISOString(),
              progressUpdates: [...it.progressUpdates, { date: new Date().toISOString(), text: 'Issue marked resolved by reporting household.' }],
            }
          : it
      )
    );
  }

  const value = useMemo(
    () => ({
      issues,
      user,
      votedIssueIds,
      myContributions,
      myReportIds,
      toast,
      showToast,
      loginAsDemo,
      logout,
      addIssue,
      voteIssue,
      selectVendor,
      submitQuotation,
      approveQuotation,
      contribute,
      markResolved,
    }),
    [issues, user, votedIssueIds, myContributions, myReportIds, toast]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
