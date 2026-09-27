import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  MessageSquareWarning,
  Vote,
  HandCoins,
  HardHat,
  MapPin,
  Users,
  Camera,
  Search,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import IssueCard from '../components/IssueCard';
import { useApp } from '../context/AppContext';
import { COMMUNITY_STATS, CATEGORIES } from '../data/mockData';
import { pkr } from '../utils/currency';

const STEPS = [
  { icon: MessageSquareWarning, title: 'Report', text: 'Take a photo, choose the problem and pin the location.' },
  { icon: Vote, title: 'Vote', text: 'Neighbours support the issue until enough households back it.' },
  { icon: HandCoins, title: 'Fund', text: 'A verified vendor gives a quote and residents contribute.' },
  { icon: HardHat, title: 'Fix', text: 'The work starts and progress stays visible to the community.' },
];

const CATEGORY_ICONS = {
  'Road & Infrastructure': '🛣️',
  'Water Supply': '💧',
  Electricity: '⚡',
  Sanitation: '🧹',
  'Street Lighting': '💡',
  'Public Safety': '🛡️',
  'Parks & Green Spaces': '🌳',
};

export default function Home() {
  const { issues } = useApp();
  const featured = issues.slice(0, 3);
  const heroIssue = featured[0];
  const secondaryIssues = featured.slice(1, 3);

  return (
    <div>
      {/* HERO */}
      <section className="overflow-hidden border-b border-ink/10 bg-gradient-to-br from-sand via-paper to-[#e5efeb]">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_.98fr] lg:gap-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-white/70 px-4 py-2 text-sm font-semibold text-teal shadow-sm">
                <MapPin className="h-4 w-4" /> Nankana Sahib Community Network
              </div>

              <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
                See a problem?
                <span className="block text-teal">Fix it together.</span>
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-8 text-ink/70">
                COMFIX helps residents turn everyday neighbourhood problems into community-backed repairs — from reporting and voting to funding and completion.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/report"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-ink px-7 text-base font-semibold text-paper shadow-md transition hover:-translate-y-0.5 hover:bg-teal"
                >
                  <Camera className="h-5 w-5" />
                  Report an Issue
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/issues"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border-2 border-ink/15 bg-white/70 px-7 text-base font-semibold text-ink transition hover:border-teal hover:text-teal"
                >
                  <Search className="h-5 w-5" />
                  Find Local Issues
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-ink/65">
                <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-moss" /> Community driven</span>
                <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-moss" /> Public progress</span>
                <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-moss" /> Local vendors</span>
              </div>
            </div>

            {/* VISUAL ISSUE BOARD */}
            <div className="relative min-h-[430px]">
              {heroIssue && (
                <Link to={`/issues/${heroIssue.id}`} className="group absolute left-0 top-0 z-10 w-[78%] overflow-hidden rounded-3xl border-4 border-white bg-white shadow-2xl sm:w-[72%]">
                  <div className="relative h-[300px] sm:h-[330px]">
                    <img src={heroIssue.image} alt={heroIssue.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-20 text-white">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/75">Community issue</p>
                      <h2 className="mt-1 text-xl font-semibold">{heroIssue.title}</h2>
                      <p className="mt-1 flex items-center gap-1 text-sm text-white/80"><MapPin className="h-4 w-4" />{heroIssue.location.area}</p>
                    </div>
                  </div>
                </Link>
              )}

              {secondaryIssues.map((issue, index) => (
                <Link
                  key={issue.id}
                  to={`/issues/${issue.id}`}
                  className={`group absolute right-0 z-20 w-[48%] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl ${index === 0 ? 'top-12' : 'bottom-0'}`}
                >
                  <img src={issue.image} alt={issue.title} className="h-36 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-40" />
                  <div className="p-3">
                    <p className="line-clamp-2 text-sm font-semibold text-ink">{issue.title}</p>
                    <p className="mt-1 text-xs text-ink/50">{issue.status}</p>
                  </div>
                </Link>
              ))}

              <div className="absolute bottom-5 left-5 z-30 rounded-2xl bg-ink px-5 py-4 text-paper shadow-xl sm:left-10">
                <p className="text-2xl font-bold">{COMMUNITY_STATS.issuesReported}</p>
                <p className="text-xs text-paper/65">issues reported</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="relative z-30 mx-auto -mt-1 max-w-7xl px-4 md:px-6">
        <div className="grid overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-lg sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={MessageSquareWarning} value={COMMUNITY_STATS.issuesReported} label="Issues reported" />
          <Stat icon={CheckCircle2} value={COMMUNITY_STATS.issuesResolved} label="Issues resolved" />
          <Stat icon={HandCoins} value={pkr(COMMUNITY_STATS.totalContributed)} label="Community contributions" />
          <Stat icon={Users} value={COMMUNITY_STATS.activeCommunities} label="Active community" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="max-w-2xl">
          <p className="font-mono text-sm font-medium uppercase tracking-wide text-teal">Simple four-step process</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">From complaint to completed repair.</h2>
          <p className="mt-3 text-ink/60">Every issue follows the same easy-to-understand path, so residents can see what happens next.</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative rounded-2xl border border-ink/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-teal/10 text-teal">
                  <step.icon className="h-6 w-6" />
                </div>
                <span className="font-mono text-3xl font-semibold text-ink/10">0{i + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/60">{step.text}</p>
              {i < STEPS.length - 1 && <ChevronRight className="absolute -right-3 top-1/2 hidden h-6 w-6 rounded-full bg-paper text-ink/30 lg:block" />}
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="border-y border-ink/10 bg-white/60">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-sm font-medium uppercase tracking-wide text-teal">What can you report?</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Problems around your neighbourhood.</h2>
            </div>
            <Link to="/report" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-teal px-5 text-sm font-semibold text-white hover:bg-ink">
              Report a problem <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
            {CATEGORIES.map((category) => (
              <Link key={category} to="/report" className="group rounded-2xl border border-ink/10 bg-paper p-4 text-center transition hover:-translate-y-1 hover:border-teal/30 hover:bg-white hover:shadow-md">
                <span className="text-3xl" aria-hidden="true">{CATEGORY_ICONS[category]}</span>
                <span className="mt-3 block text-sm font-semibold leading-5 text-ink">{category}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVE ISSUES */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-sm font-medium uppercase tracking-wide text-teal">Live community board</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">Issues people are working on.</h2>
            <p className="mt-2 text-ink/60">See where your support can help a Nankana Sahib neighbourhood move forward.</p>
          </div>
          <Link to="/issues" className="inline-flex items-center gap-2 text-sm font-semibold text-teal hover:underline">View all issues <ArrowRight className="h-4 w-4" /></Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {issues.slice(0, 6).map((issue) => <IssueCard key={issue.id} issue={issue} />)}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="font-mono text-sm uppercase tracking-wide text-route">Your street. Your voice. Your fix.</p>
              <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">Have you spotted something that needs fixing?</h2>
              <p className="mt-3 max-w-xl text-paper/65">Report it with a photo and location. Let your neighbours decide whether it should move forward.</p>
            </div>
            <Link to="/report" className="inline-flex min-h-14 shrink-0 items-center gap-2 rounded-xl bg-route px-7 text-base font-semibold text-white shadow-lg transition hover:bg-white hover:text-ink">
              <Camera className="h-5 w-5" /> Report an Issue <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center gap-4 border-b border-ink/10 p-5 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal/10 text-teal">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-display text-2xl font-semibold text-ink">{typeof value === 'number' ? value.toLocaleString() : value}</p>
        <p className="text-xs text-ink/50">{label}</p>
      </div>
    </div>
  );
}
