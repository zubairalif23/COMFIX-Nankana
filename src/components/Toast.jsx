import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper shadow-lg">
        <CheckCircle2 className="h-4 w-4 text-moss" />
        {toast}
      </div>
    </div>
  );
}
