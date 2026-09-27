import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginAsDemo, showToast } = useApp();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    loginAsDemo();
    showToast('Signed in successfully.');
    navigate('/profile');
  }

  function continueAsDemo() {
    loginAsDemo();
    showToast('Continuing as Demo User.');
    navigate('/profile');
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="mb-6 flex items-center gap-2 font-display text-xl font-semibold text-ink">
        <span className="grid h-8 w-8 place-items-center rounded-md bg-ink text-paper"><Wrench className="h-4 w-4" /></span>
        COMFIX
      </div>
      <h1 className="font-display text-2xl font-semibold text-ink">Welcome back</h1>
      <p className="mt-1 text-sm text-ink/60">Sign in to vote, contribute and track your reports.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Email or phone</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="you@example.com"
            className="w-full rounded-md border border-ink/15 bg-paper px-3 py-2.5 text-sm outline-none focus:border-teal" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••"
            className="w-full rounded-md border border-ink/15 bg-paper px-3 py-2.5 text-sm outline-none focus:border-teal" />
        </div>
        <div className="flex justify-end">
          <button type="button" className="text-xs text-teal hover:underline">Forgot password?</button>
        </div>
        <button type="submit" className="w-full rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-paper hover:bg-ink/90">
          Sign In
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-ink/40">
        <div className="h-px flex-1 bg-ink/10" /> or <div className="h-px flex-1 bg-ink/10" />
      </div>

      <button onClick={continueAsDemo} className="w-full rounded-md border border-route/40 bg-route/10 px-4 py-2.5 text-sm font-semibold text-route hover:bg-route/20">
        Continue as Demo User
      </button>

      <p className="mt-6 text-center text-sm text-ink/60">
        New to COMFIX? <Link to="/signup" className="font-medium text-teal hover:underline">Create an account</Link>
      </p>
    </div>
  );
}
