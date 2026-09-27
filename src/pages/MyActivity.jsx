import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, HandCoins, UserCircle2, Vote } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function MyActivity() {
  const { user, myReportIds, myContributions, votedIssueIds } = useApp();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink">My Activity</h1>
      <p className="mt-2 text-ink/60">{user ? `Everything ${user.name.split(' ')[0]} has done on COMFIX.` : 'Sign in to track your reports, votes and contributions.'}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link to="/profile" className="rounded-lg border border-ink/10 bg-white/60 p-5 hover:border-teal/40">
          <UserCircle2 className="h-5 w-5 text-ink/60" />
          <p className="mt-2 font-display text-lg font-medium text-ink">Profile</p>
          <p className="mt-1 text-sm text-ink/60">Your household and community info.</p>
        </Link>
        <Link to="/my-reports" className="rounded-lg border border-ink/10 bg-white/60 p-5 hover:border-teal/40">
          <FileText className="h-5 w-5 text-teal" />
          <p className="mt-2 font-display text-lg font-medium text-ink">My Reports ({myReportIds.length})</p>
          <p className="mt-1 text-sm text-ink/60">Issues you've reported and their progress.</p>
        </Link>
        <Link to="/my-contributions" className="rounded-lg border border-ink/10 bg-white/60 p-5 hover:border-teal/40">
          <HandCoins className="h-5 w-5 text-route" />
          <p className="mt-2 font-display text-lg font-medium text-ink">My Contributions ({myContributions.length})</p>
          <p className="mt-1 text-sm text-ink/60">Projects you've helped fund.</p>
        </Link>
        <div className="rounded-lg border border-ink/10 bg-white/60 p-5">
          <Vote className="h-5 w-5 text-brick" />
          <p className="mt-2 font-display text-lg font-medium text-ink">Votes cast ({votedIssueIds.length})</p>
          <p className="mt-1 text-sm text-ink/60">Issues you've backed with a vote.</p>
        </div>
      </div>
    </div>
  );
}
