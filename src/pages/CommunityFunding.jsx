import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Users, HandCoins } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';
import { pkr } from '../utils/currency';

const QUICK_AMOUNTS = [500, 1000, 2500, 5000];

export default function CommunityFunding() {
  const { id } = useParams();
  const { issues, contribute } = useApp();
  const navigate = useNavigate();
  const issue = issues.find((it) => it.id === id);
  const [amount, setAmount] = useState(1000);

  if (!issue) return <div className="mx-auto max-w-2xl px-4 py-16 text-center text-ink/60">Issue not found.</div>;
  if (!issue.funding) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-ink/60">This issue hasn't reached community funding yet.</p>
        <Link to={`/issues/${issue.id}`} className="mt-4 inline-block rounded-md bg-ink px-4 py-2 text-sm font-semibold text-paper">View Issue</Link>
      </div>
    );
  }

  const { required, collected, contributors } = issue.funding;
  const remaining = Math.max(0, required - collected);
  const fullyFunded = collected >= required;

  function handleContribute(e) {
    e.preventDefault();
    if (amount <= 0) return;
    contribute(issue.id, Number(amount));
    navigate(`/issues/${issue.id}/contribute-confirm`, { state: { amount: Number(amount) } });
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:px-6">
      <Link to={`/issues/${issue.id}`} className="text-sm text-teal hover:underline">← Back to Issue</Link>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink">Community Funding</h1>
      <p className="mt-2 text-ink/60">for "{issue.title}" · {issue.location.area}</p>

      <div className="mt-6 rounded-lg border border-ink/10 bg-white/60 p-6">
        <ProgressBar value={collected} max={required} colorClass="bg-moss" />
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="font-display text-xl font-semibold text-ink">{pkr(required)}</p>
            <p className="text-xs text-ink/50">Total required</p>
          </div>
          <div>
            <p className="font-display text-xl font-semibold text-moss">{pkr(collected)}</p>
            <p className="text-xs text-ink/50">Collected</p>
          </div>
          <div>
            <p className="font-display text-xl font-semibold text-brick">{pkr(remaining)}</p>
            <p className="text-xs text-ink/50">Remaining</p>
          </div>
        </div>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-ink/60">
          <Users className="h-4 w-4" /> {contributors} households have contributed so far
        </p>
      </div>

      {fullyFunded ? (
        <div className="mt-6 rounded-lg border border-moss/30 bg-moss/10 p-5 text-center">
          <p className="font-medium text-ink">Funding goal reached 🎉</p>
          <p className="mt-1 text-sm text-ink/60">This project has moved to "In Progress". Thank you to every contributing household.</p>
          <Link to={`/issues/${issue.id}/tracking`} className="mt-3 inline-block rounded-md bg-ink px-4 py-2 text-sm font-semibold text-paper">
            View Issue Tracking
          </Link>
        </div>
      ) : (
        <form onSubmit={handleContribute} className="mt-6 rounded-lg border border-ink/10 bg-white/60 p-6">
          <p className="mb-3 text-sm font-semibold text-ink">Contribute to this fix</p>
          <div className="mb-3 flex flex-wrap gap-2">
            {QUICK_AMOUNTS.map((a) => (
              <button type="button" key={a} onClick={() => setAmount(a)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium ${amount === a ? 'border-route bg-route/10 text-route' : 'border-ink/15 text-ink/70 hover:bg-ink/5'}`}>
                {pkr(a)}
              </button>
            ))}
          </div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Contribution amount (PKR)</label>
          <input
            type="number"
            min={100}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-md border border-ink/15 bg-paper px-3 py-2.5 text-sm outline-none focus:border-teal"
          />
          <button type="submit" className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-route px-4 py-3 text-sm font-semibold text-white hover:bg-route/90">
            <HandCoins className="h-4 w-4" /> Contribute {pkr(amount || 0)}
          </button>
        </form>
      )}
    </div>
  );
}
