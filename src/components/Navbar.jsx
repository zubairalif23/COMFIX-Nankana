import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Wrench, Menu, X, UserCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/issues', label: 'Community Issues' },
  { to: '/report', label: 'Report Issue' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/my-activity', label: 'My Activity' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useApp();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-ink text-paper">
            <Wrench className="h-4 w-4" />
          </span>
          COMFIX
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-route' : 'text-ink/70 hover:text-ink'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 rounded-full border border-ink/15 px-3 py-1.5 text-sm font-medium text-ink hover:bg-ink/5"
          >
            <UserCircle2 className="h-4 w-4" />
            {user ? user.name.split(' ')[0] : 'Sign in'}
          </button>
        </div>

        <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-ink/10 bg-paper px-4 py-3 md:hidden">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `rounded-md px-2 py-2 text-sm font-medium ${isActive ? 'bg-route/10 text-route' : 'text-ink/80'}`}
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/profile" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-sm font-medium text-ink/80">
            {user ? user.name : 'Sign in'}
          </NavLink>
        </nav>
      )}
    </header>
  );
}
