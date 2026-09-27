import React, { useState } from 'react';
import { ChevronDown, Mail, Phone, MessageCircle } from 'lucide-react';
import { FAQS } from '../data/mockData';

export default function Help() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink">Help &amp; Contact</h1>
      <p className="mt-2 text-ink/60">Answers to common questions about reporting, voting and contributing.</p>

      <div className="mt-8 space-y-3">
        {FAQS.map((f, i) => (
          <div key={f.q} className="rounded-lg border border-ink/10 bg-white/60">
            <button
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <span className="font-medium text-ink">{f.q}</span>
              <ChevronDown className={`h-4 w-4 shrink-0 text-ink/50 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === i && <p className="px-5 pb-4 text-sm text-ink/65">{f.a}</p>}
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-lg border border-ink/10 bg-sand/50 p-6">
        <p className="font-display text-lg font-medium text-ink">Still need help?</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-2 text-sm text-ink/70"><Mail className="h-4 w-4 text-teal" /> support@comfix.pk</div>
          <div className="flex items-center gap-2 text-sm text-ink/70"><Phone className="h-4 w-4 text-teal" /> +92 51 111 266 349</div>
          <div className="flex items-center gap-2 text-sm text-ink/70"><MessageCircle className="h-4 w-4 text-teal" /> Live chat, 9am–6pm PKT</div>
        </div>
      </div>
    </div>
  );
}
