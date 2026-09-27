import React from 'react';
import { Target, Eye, Users2, Wrench } from 'lucide-react';

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink">About COMFIX</h1>
      <p className="mt-4 text-ink/75">
        Small community infrastructure problems — a pothole, a broken street light, a blocked drain — rarely get fixed quickly.
        No single household wants to pay for it alone, and reporting it to the relevant authority often means a long wait with no
        visibility into what happens next. COMFIX exists to close that gap.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="rounded-lg border border-ink/10 bg-white/60 p-5">
          <Target className="h-5 w-5 text-route" />
          <p className="mt-2 font-display text-lg font-medium text-ink">The problem</p>
          <p className="mt-1 text-sm text-ink/65">Local infrastructure issues sit unresolved because responsibility, cost and coordination are unclear to everyone involved.</p>
        </div>
        <div className="rounded-lg border border-ink/10 bg-white/60 p-5">
          <Users2 className="h-5 w-5 text-teal" />
          <p className="mt-2 font-display text-lg font-medium text-ink">Community-driven</p>
          <p className="mt-1 text-sm text-ink/65">Every step — reporting, backing, vendor choice and funding — is decided collectively by the households it affects.</p>
        </div>
        <div className="rounded-lg border border-ink/10 bg-white/60 p-5">
          <Eye className="h-5 w-5 text-brick" />
          <p className="mt-2 font-display text-lg font-medium text-ink">Transparency</p>
          <p className="mt-1 text-sm text-ink/65">Quotations, funding progress and work updates are public to every household backing a project, from first vote to final photo.</p>
        </div>
        <div className="rounded-lg border border-ink/10 bg-white/60 p-5">
          <Wrench className="h-5 w-5 text-moss" />
          <p className="mt-2 font-display text-lg font-medium text-ink">Vendors &amp; fixers</p>
          <p className="mt-1 text-sm text-ink/65">Local vendors compete on public quotations, building a visible track record of completed community work over time.</p>
        </div>
      </div>

      <p className="mt-8 rounded-md bg-sand/60 p-4 text-sm text-ink/60">
        This is a frontend prototype built to demonstrate the COMFIX concept end-to-end. All accounts, votes, vendors and
        payments shown are simulated, and figures are presented in Pakistani Rupees (PKR) for a realistic feel.
      </p>
    </div>
  );
}
