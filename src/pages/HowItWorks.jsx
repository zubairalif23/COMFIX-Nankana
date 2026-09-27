import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquareWarning, Vote, Store, FileSignature, HandCoins, HardHat, PartyPopper } from 'lucide-react';

const STAGES = [
  { icon: MessageSquareWarning, title: 'Report', text: 'A resident photographs the problem, pins its location and submits it. COMFIX checks for duplicate reports nearby.' },
  { icon: Vote, title: 'Community Voting', text: 'Neighbours review the report and vote to back it. Once enough households support it, it clears the threshold.' },
  { icon: Store, title: 'Vendor Selection', text: 'Verified local vendors relevant to the issue category appear in the marketplace for the community to choose from.' },
  { icon: FileSignature, title: 'Quotation', text: 'The selected vendor submits a public cost breakdown — materials, labour and timeline — for the community to review.' },
  { icon: HandCoins, title: 'Community Funding', text: 'Once the quotation is approved, households contribute any amount in PKR until the budget is fully funded.' },
  { icon: HardHat, title: 'Repair', text: 'The vendor begins work. Progress updates and an expected completion date are posted as the job moves forward.' },
  { icon: PartyPopper, title: 'Resolution', text: 'Before-and-after photos, final cost and vendor details are published once the fix is confirmed complete.' },
];

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink">How COMFIX Works</h1>
      <p className="mt-2 max-w-xl text-ink/60">From a single photo of a pothole to a fully-funded, finished repair — seven stages, entirely driven by the community.</p>

      <div className="mt-10 space-y-0">
        {STAGES.map((s, i) => (
          <div key={s.title} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-route bg-route/10 text-route">
                <s.icon className="h-5 w-5" />
              </div>
              {i < STAGES.length - 1 && <div className="w-0.5 flex-1 bg-ink/15" style={{ minHeight: '2rem' }} />}
            </div>
            <div className="pb-8">
              <p className="font-display text-lg font-medium text-ink">{i + 1}. {s.title}</p>
              <p className="mt-1 max-w-lg text-sm text-ink/65">{s.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-teal/30 bg-teal/10 p-6 text-center">
        <p className="font-display text-lg font-medium text-ink">Ready to see something get fixed?</p>
        <div className="mt-4 flex justify-center gap-3">
          <Link to="/report" className="rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-ink/90">Report an Issue</Link>
          <Link to="/issues" className="rounded-md border border-ink/20 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-ink/5">Explore Issues</Link>
        </div>
      </div>
    </div>
  );
}
