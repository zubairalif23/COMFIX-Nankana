import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-ink/10 bg-sand/60">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-ink text-paper">
                <Wrench className="h-3.5 w-3.5" />
              </span>
              COMFIX
            </div>
            <p className="mt-2 text-sm text-ink/60">Report it. Vote on it. Fund it. Fix it — together.</p>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-ink">Platform</p>
            <div className="flex flex-col gap-1.5 text-sm text-ink/60">
              <Link to="/issues" className="hover:text-ink">Community Issues</Link>
              <Link to="/report" className="hover:text-ink">Report an Issue</Link>
              <Link to="/vendors" className="hover:text-ink">Vendor Marketplace</Link>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-ink">About</p>
            <div className="flex flex-col gap-1.5 text-sm text-ink/60">
              <Link to="/how-it-works" className="hover:text-ink">How It Works</Link>
              <Link to="/about" className="hover:text-ink">About COMFIX</Link>
              <Link to="/help" className="hover:text-ink">Help &amp; Contact</Link>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-ink">Prototype note</p>
            <p className="text-sm text-ink/60">All data on this site is simulated for demonstration purposes. Prices shown in PKR.</p>
          </div>
        </div>
        <div className="mt-8 border-t border-ink/10 pt-4 text-xs text-ink/50">
          © {new Date().getFullYear()} COMFIX — a community problem-solving prototype.
        </div>
      </div>
    </footer>
  );
}
