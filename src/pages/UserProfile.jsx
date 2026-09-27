import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircle2, Home, Vote, HandCoins, FileText, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { pkr } from '../utils/currency';

export default function UserProfile() {
  const { user, logout, myReportIds, myContributions, votedIssueIds, issues } = useApp();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <UserCircle2 className="mx-auto h-12 w-12 text-ink/30" />
        <h1 className="mt-4 font-display text-2xl font-semibold text-ink">You're not signed in</h1>
        <p className="mt-2 text-ink/60">Sign in to see your reports, votes and contributions.</p>
        <div className="mt-6 flex justify-center gap-2">
          <Link to="/login" className="rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-ink/90">Sign In</Link>
          <Link to="/signup" className="rounded-md border border-ink/20 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-ink/5">Create Account</Link>
        </div>
      </div>
    );
  }

  const myReports = issues.filter((it) => myReportIds.includes(it.id));
  const totalContributed = myContributions.reduce((sum, c) => sum + c.amount, 0);

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-ink text-paper">
          <UserCircle2 className="h-9 w-9" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">{user.name}</h1>
          <p className="text-sm text-ink/60">{user.email}</p>
        </div>
        <button onClick={handleLogout} className="ml-auto flex items-center gap-1.5 rounded-md border border-ink/20 px-3 py-2 text-sm font-medium text-ink hover:bg-ink/5">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-lg border border-ink/10 bg-white/60 p-4 text-sm">
        <Home className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
        <div>
          <p className="text-ink/80">{user.household}</p>
          <p className="text-ink/50">{user.community} · member since {new Date(user.joined).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <SummaryCard icon={FileText} value={myReports.length} label="Reports" />
        <SummaryCard icon={Vote} value={votedIssueIds.length} label="Votes cast" />
        <SummaryCard icon={HandCoins} value={pkr(totalContributed)} label="Contributed" />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link to="/my-reports" className="rounded-lg border border-ink/10 bg-white/60 p-5 hover:border-teal/40">
          <FileText className="h-5 w-5 text-teal" />
          <p className="mt-2 font-display text-lg font-medium text-ink">My Reports</p>
          <p className="mt-1 text-sm text-ink/60">Issues you've reported and their progress.</p>
        </Link>
        <Link to="/my-contributions" className="rounded-lg border border-ink/10 bg-white/60 p-5 hover:border-teal/40">
          <HandCoins className="h-5 w-5 text-route" />
          <p className="mt-2 font-display text-lg font-medium text-ink">My Contributions</p>
          <p className="mt-1 text-sm text-ink/60">Projects you've helped fund.</p>
        </Link>
      </div>
    </div>
  );
}

function SummaryCard({ icon: Icon, value, label }) {
  return (
    <div className="rounded-lg border border-ink/10 bg-white/60 p-4 text-center">
      <Icon className="mx-auto h-4 w-4 text-ink/40" />
      <p className="mt-1.5 font-display text-lg font-semibold text-ink">{value}</p>
      <p className="text-xs text-ink/50">{label}</p>
    </div>
  );
}
