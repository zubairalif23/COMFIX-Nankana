import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import IssueCard from '../components/IssueCard';

export default function MyReports() {
  const { issues, myReportIds, user } = useApp();
  const myReports = issues.filter((it) => myReportIds.includes(it.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink">My Reports</h1>
      <p className="mt-2 text-ink/60">{user ? `Issues reported by ${user.name}.` : 'Issues reported from this demo session.'}</p>

      {myReports.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-ink/20 p-10 text-center text-ink/50">
          You haven't reported any issues yet.
          <div className="mt-3"><Link to="/report" className="text-teal underline">Report your first issue</Link></div>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {myReports.map((it) => <IssueCard key={it.id} issue={it} />)}
        </div>
      )}
    </div>
  );
}
