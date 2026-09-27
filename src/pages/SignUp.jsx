import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SignUp() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [household, setHousehold] = useState('');
  const { loginAsDemo, showToast } = useApp();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    loginAsDemo();
    showToast('Account created — welcome to COMFIX.');
    navigate('/profile');
  }

  function createDemoAccount() {
    loginAsDemo();
    showToast('Demo account created.');
    navigate('/profile');
  }

  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-4 py-12">
      <div className="mb-6 flex items-center gap-2 font-display text-xl font-semibold text-ink">
        <span className="grid h-8 w-8 place-items-center rounded-md bg-ink text-paper"><Wrench className="h-4 w-4" /></span>
        COMFIX
      </div>
      <h1 className="font-display text-2xl font-semibold text-ink">Create your account</h1>
      <p className="mt-1 text-sm text-ink/60">Join your community and start reporting what needs fixing.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Full name</label>
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ayesha Raza"
            className="w-full rounded-md border border-ink/15 bg-paper px-3 py-2.5 text-sm outline-none focus:border-teal" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Email or phone</label>
          <input required value={contact} onChange={(e) => setContact(e.target.value)} placeholder="you@example.com"
            className="w-full rounded-md border border-ink/15 bg-paper px-3 py-2.5 text-sm outline-none focus:border-teal" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Password</label>
          <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••"
            className="w-full rounded-md border border-ink/15 bg-paper px-3 py-2.5 text-sm outline-none focus:border-teal" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Household / community</label>
          <input required value={household} onChange={(e) => setHousehold(e.target.value)} placeholder="House 14, Street 6, F-10/2"
            className="w-full rounded-md border border-ink/15 bg-paper px-3 py-2.5 text-sm outline-none focus:border-teal" />
        </div>
        <button type="submit" className="w-full rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-paper hover:bg-ink/90">
          Create Account
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-ink/40">
        <div className="h-px flex-1 bg-ink/10" /> or <div className="h-px flex-1 bg-ink/10" />
      </div>

      <button onClick={createDemoAccount} className="w-full rounded-md border border-route/40 bg-route/10 px-4 py-2.5 text-sm font-semibold text-route hover:bg-route/20">
        Create a Demo Account Instantly
      </button>

      <p className="mt-6 text-center text-sm text-ink/60">
        Already on COMFIX? <Link to="/login" className="font-medium text-teal hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
