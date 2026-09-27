import React from 'react';
import { Construction, Droplets, Zap, Trash2, Lightbulb, ShieldAlert, Trees, Camera } from 'lucide-react';
import { CATEGORY_COLORS } from '../data/mockData';

const ICONS = {
  'Road & Infrastructure': Construction,
  'Water Supply': Droplets,
  'Electricity': Zap,
  'Sanitation': Trash2,
  'Street Lighting': Lightbulb,
  'Public Safety': ShieldAlert,
  'Parks & Green Spaces': Trees,
};

export default function IssuePhoto({ category, className = '', variant = 'before', image = '' }) {
  const Icon = ICONS[category] || Camera;
  const accent = CATEGORY_COLORS[category] || 'teal';
  const isAfter = variant === 'after';
  const slug = `${category}-${variant}`.replace(/[^a-zA-Z0-9]/g, '');

  if (image && !isAfter) {
    return (
      <div className={`relative overflow-hidden rounded-lg border border-ink/10 bg-ink/5 ${className}`}>
        <img
          src={image}
          alt={`${category} issue photo`}
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-2 right-2 z-10 rounded bg-black/60 px-2 py-1 text-[10px] font-semibold text-white">
          Reported photo
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-lg border border-ink/10 bg-${accent}/10 ${className}`}
    >
      <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 200 120" preserveAspectRatio="none">
        <defs>
          <pattern id={`grid-${slug}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="currentColor" strokeWidth="1" className={`text-${accent}`} />
          </pattern>
        </defs>
        <rect width="200" height="120" fill={`url(#grid-${slug})`} />
      </svg>
      <div className={`relative z-10 grid h-14 w-14 place-items-center rounded-full bg-${accent}/20 text-${accent}`}>
        <Icon className="h-7 w-7" />
      </div>
      <span className="absolute bottom-1.5 right-2 z-10 rounded bg-paper/80 px-1.5 py-0.5 text-[10px] font-medium text-ink/60">
        {isAfter ? 'After photo pending' : 'Photo'}
      </span>
    </div>
  );
}
