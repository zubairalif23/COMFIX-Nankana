import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import IssueCard from '../components/IssueCard';
import { useApp } from '../context/AppContext';
import { CATEGORIES, STAGES } from '../data/mockData';

export default function CommunityIssues() {
  const { issues } = useApp();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [sort, setSort] = useState('newest');

  const filtered = useMemo(() => {
    let list = issues.filter((it) => {
      const matchesQuery =
        !query ||
        it.title.toLowerCase().includes(query.toLowerCase()) ||
        it.location.area.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'All' || it.category === category;
      const matchesStatus = status === 'All' || it.status === status;
      return matchesQuery && matchesCategory && matchesStatus;
    });
    if (sort === 'newest') list = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sort === 'votes') list = [...list].sort((a, b) => b.votes - a.votes);
    if (sort === 'cost-high') list = [...list].sort((a, b) => b.estimatedCost - a.estimatedCost);
    if (sort === 'cost-low') list = [...list].sort((a, b) => a.estimatedCost - b.estimatedCost);
    return list;
  }, [issues, query, category, status, sort]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink">Community Issues</h1>
      <p className="mt-2 text-ink/60">Every problem reported across the network, from first vote to final repair.</p>

      <div className="mt-6 flex flex-col gap-3 rounded-lg border border-ink/10 bg-white/60 p-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or area…"
            className="w-full rounded-md border border-ink/15 bg-paper py-2 pl-9 pr-3 text-sm outline-none focus:border-teal"
          />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm outline-none focus:border-teal">
          <option>All</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm outline-none focus:border-teal">
          <option>All</option>
          {STAGES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm outline-none focus:border-teal">
          <option value="newest">Newest</option>
          <option value="votes">Most votes</option>
          <option value="cost-high">Cost: high to low</option>
          <option value="cost-low">Cost: low to high</option>
        </select>
      </div>

      <p className="mt-4 text-sm text-ink/50">{filtered.length} issue{filtered.length !== 1 ? 's' : ''} found</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((it) => <IssueCard key={it.id} issue={it} />)}
      </div>
      {filtered.length === 0 && (
        <div className="mt-16 text-center text-ink/50">No issues match your filters. Try widening your search.</div>
      )}
    </div>
  );
}
