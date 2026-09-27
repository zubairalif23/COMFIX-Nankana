import React from 'react';

const STYLES = {
  Reported: 'bg-sand text-ink border-ink/20',
  Voting: 'bg-route/15 text-route border-route/40',
  'Community Approved': 'bg-teal/15 text-teal border-teal/40',
  'Vendor Selected': 'bg-teal/15 text-teal border-teal/40',
  Funding: 'bg-route/15 text-route border-route/40',
  'In Progress': 'bg-brick/15 text-brick border-brick/40',
  Resolved: 'bg-moss/15 text-moss border-moss/40',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${STYLES[status] || STYLES.Reported}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
