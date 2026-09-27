# COMFIX — Community Problem-Solving Prototype

A frontend-only prototype of COMFIX: report a community infrastructure issue, get your neighbours to vote for it,
pick a vendor, approve their quotation, fund the repair together, and track it through to resolution.

This is a **competition/demo prototype**. There is no backend — everything (accounts, votes, vendors, quotations,
funding, and status changes) is simulated in memory using React state and realistic mock data. All money figures
are shown in **PKR (Pakistani Rupees)**.

## Running it locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To create a production build:

```bash
npm run build
npm run preview
```

## Tech stack

- React 18 + React Router 6
- Vite
- Tailwind CSS (via the Play CDN, configured in `index.html`)
- lucide-react icons

## Project structure

```
src/
  main.jsx              # app entry
  App.jsx                # route table
  context/AppContext.jsx # global mock state: issues, user, votes, contributions
  data/mockData.js       # mock issues, vendors, categories, FAQs, user
  utils/currency.js      # PKR formatting helper
  components/            # Navbar, Footer, IssueCard, StageRoute, MapPreview, etc.
  pages/                 # one file per page (see below)
```

## Pages implemented

Home, Community Issues, Issue Details, Report an Issue, Login, Sign Up, Vendor Marketplace,
Vendor Quotation, Community Funding, Contribution Confirmation, Issue Tracking, Resolved Issue,
User Profile, My Reports, My Contributions, My Activity, How COMFIX Works, About, Help & Contact.

## Demo flow

To walk through the full journey end-to-end:

1. **Home** → click **Report an Issue**
2. Fill the form and **Submit** (try an area containing "G-10" with category "Road & Infrastructure" to see the
   simulated duplicate-detection banner)
3. Go to **Community Issues**, open an issue in "Voting" status (e.g. *Overflowing garbage point near G-9 market*)
4. Click **Vote to Fix** repeatedly (or open it with multiple browser sessions) until the vote threshold is reached
5. Once **Community Approved**, go to the **Vendor Marketplace** (linked from the issue) and select a vendor
6. Review the **Public Vendor Quotation** and click **Approve Quotation**
7. On the **Community Funding** page, contribute an amount — repeat contributions until the goal is met
8. The issue moves to **In Progress** — open **Issue Tracking** and click **Mark Issue as Resolved**
9. View the final **Resolved Issue** page with before/after photos and final cost

Several issues are pre-seeded at different stages (Reported, Voting, Funding, In Progress, Resolved) so every page
can be viewed immediately without replaying the whole flow.

## Notes

- Photos are illustrated with stylised category icons/patterns instead of real images (no external image hosting
  is used, keeping the prototype fully self-contained).
- The location map is a schematic grid illustration rather than a live map tile service.
- "Continue as Demo User" on the Login/Sign Up pages instantly signs you in as a seeded demo resident so you can
  explore My Reports, My Contributions and Profile without filling in a real form.
