import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="font-display text-5xl font-semibold text-ink/20">404</p>
      <h1 className="mt-2 font-display text-2xl font-semibold text-ink">Page not found</h1>
      <p className="mt-2 text-ink/60">This road doesn't lead anywhere on COMFIX.</p>
      <Link to="/" className="mt-6 inline-block rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-ink/90">Back to Home</Link>
    </div>
  );
}
