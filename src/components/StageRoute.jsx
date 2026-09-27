import React from 'react';
import { Check } from 'lucide-react';
import { STAGES } from '../data/mockData';

export default function StageRoute({ currentStatus, orientation = 'horizontal' }) {
  const currentIndex = STAGES.indexOf(currentStatus);

  if (orientation === 'vertical') {
    return (
      <ol className="flex flex-col">
        {STAGES.map((stage, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <li key={stage} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 text-xs font-semibold ${
                    done ? 'border-moss bg-moss text-white' : active ? 'border-route bg-route text-white' : 'border-ink/20 bg-paper text-ink/40'
                  }`}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                {i < STAGES.length - 1 && <div className={`w-0.5 flex-1 ${done ? 'bg-moss' : 'bg-ink/15'}`} style={{ minHeight: '1.75rem' }} />}
              </div>
              <div className={`pb-7 ${active ? 'font-semibold text-ink' : done ? 'text-ink/70' : 'text-ink/40'}`}>{stage}</div>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol className="flex w-full items-center">
      {STAGES.map((stage, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <li key={stage} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 text-xs font-semibold ${
                  done ? 'border-moss bg-moss text-white' : active ? 'border-route bg-route text-white' : 'border-ink/20 bg-paper text-ink/40'
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className={`hidden text-center text-[11px] leading-tight sm:block ${active ? 'font-semibold text-ink' : done ? 'text-ink/60' : 'text-ink/35'}`} style={{ width: '5.5rem' }}>
                {stage}
              </span>
            </div>
            {i < STAGES.length - 1 && <div className={`mx-1 h-0.5 flex-1 ${done ? 'bg-moss' : 'bg-ink/15'}`} />}
          </li>
        );
      })}
    </ol>
  );
}
