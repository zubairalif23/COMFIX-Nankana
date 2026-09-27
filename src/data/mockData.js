export const CATEGORIES = [
  'Road & Infrastructure',
  'Water Supply',
  'Electricity',
  'Sanitation',
  'Street Lighting',
  'Public Safety',
  'Parks & Green Spaces',
];

export const CATEGORY_COLORS = {
  'Road & Infrastructure': 'brick',
  'Water Supply': 'teal',
  'Electricity': 'route',
  'Sanitation': 'moss',
  'Street Lighting': 'route',
  'Public Safety': 'brick',
  'Parks & Green Spaces': 'moss',
};

export const STAGES = [
  'Reported',
  'Voting',
  'Community Approved',
  'Vendor Selected',
  'Funding',
  'In Progress',
  'Resolved',
];

export const CURRENT_USER = {
  id: 'u-100',
  name: 'Zubair Ali',
  email: 'zubair.ali@example.com',
  household: 'House 14, Street 11, Railway Road, Nankana Sahib',
  community: 'Nankana Sahib Residents Network',
  joined: '2025-02-11',
};

// Demo vendors are fictional businesses created for the COMFIX prototype.
// Vendor images are category-matched Pakistan-based reference images.
export const VENDORS = [
  {
    id: 'v-1',
    name: 'Nankana Civil Works',
    categories: ['Road & Infrastructure', 'Public Safety'],
    rating: 4.7,
    reviews: 64,
    completedJobs: 31,
    yearsActive: 6,
    tagline: 'Road patching, street repair, drainage work and small civil projects across Nankana Sahib.',
    image: 'https://www.app.com.pk/wp-content/uploads/2026/02/APP29-240226.jpg',
    pastWork: [
      { title: 'Street pothole resurfacing', area: 'Railway Road, Nankana Sahib', cost: 118000 },
      { title: 'Road safety barrier repair', area: 'Shahkot Road, Nankana Sahib', cost: 54000 },
    ],
  },
  {
    id: 'v-2',
    name: 'Nankana Aqua & Plumbing',
    categories: ['Water Supply', 'Sanitation'],
    rating: 4.8,
    reviews: 91,
    completedJobs: 52,
    yearsActive: 8,
    tagline: 'Water-line, tank, leakage and drainage repair services for homes and neighbourhoods.',
    image: 'https://www.onecallservice.pk/uploads/plumber11.png',
    pastWork: [
      { title: 'Main supply-line leak repair', area: 'Railway Road, Nankana Sahib', cost: 35000 },
      { title: 'Water tank and pipe replacement', area: 'Main Bazaar, Nankana Sahib', cost: 78000 },
    ],
  },
  {
    id: 'v-3',
    name: 'Nankana BrightLine Electric',
    categories: ['Electricity', 'Street Lighting'],
    rating: 4.6,
    reviews: 57,
    completedJobs: 38,
    yearsActive: 5,
    tagline: 'Street-light, wiring and electrical maintenance crews serving Nankana Sahib.',
    image: 'https://i.dawn.com/large/2013/10/52553be819813.jpg',
    pastWork: [
      { title: 'Street-light restoration', area: 'Gurudwara Road, Nankana Sahib', cost: 82000 },
      { title: 'Electrical connection repair', area: 'Shahkot Road, Nankana Sahib', cost: 29000 },
    ],
  },
  {
    id: 'v-4',
    name: 'Nankana GreenScape',
    categories: ['Parks & Green Spaces', 'Sanitation'],
    rating: 4.8,
    reviews: 43,
    completedJobs: 27,
    yearsActive: 5,
    tagline: 'Park maintenance, grass restoration, planting and public green-space upkeep.',
    image: 'https://ptv.com.pk/newsimages/Jun-14-2025-15.35.11_park.webp',
    pastWork: [
      { title: 'Community park lawn restoration', area: 'DC Park, Nankana Sahib', cost: 125000 },
    ],
  },
  {
    id: 'v-5',
    name: 'Nankana Clean Streets',
    categories: ['Sanitation', 'Public Safety'],
    rating: 4.5,
    reviews: 69,
    completedJobs: 49,
    yearsActive: 7,
    tagline: 'Waste-point cleanup, drain clearing and neighbourhood sanitation services.',
    image: 'https://dailytimes.com.pk/assets/uploads/2025/12/20/IMG-20251219-WA0014.jpg',
    pastWork: [
      { title: 'Blocked drain clearance', area: 'Main Bazaar, Nankana Sahib', cost: 47000 },
    ],
  },
  {
    id: 'v-6',
    name: 'Nankana SecureTech',
    categories: ['Public Safety', 'Street Lighting'],
    rating: 4.4,
    reviews: 38,
    completedJobs: 24,
    yearsActive: 4,
    tagline: 'CCTV points, security lighting and community safety installations.',
    image: 'https://i.tribune.com.pk/media/images/1206990-lhr_amllroad_cctv_camera_installation_online-1477178686/1206990-lhr_amllroad_cctv_camera_installation_online-1477178686.jpg',
    pastWork: [
      { title: 'Community CCTV installation', area: 'Railway Road, Nankana Sahib', cost: 115000 },
    ],
  },
];

export const ISSUE_IMAGES = {
  road: '/images/demo/road.jpg',
  water: '/images/demo/water.jpg',
  lighting: '/images/demo/lighting.jpg',
  sanitation: '/images/demo/sanitation.jpg',
  safety: '/images/demo/safety.jpg',
  park: '/images/demo/park.jpg',
  drain: '/images/demo/drain.jpg',
};

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export const INITIAL_ISSUES = [
  {
    id: 'is-1001',
    title: 'Large potholes on Railway Road',
    description:
      'Multiple deep potholes have developed along a busy section of Railway Road in Nankana Sahib. The damaged surface is difficult for motorcycles, rickshaws and cars to navigate and needs patching.',
    category: 'Road & Infrastructure',
    location: { area: 'Railway Road, Nankana Sahib', lat: 31.4488, lng: 73.7008 },
    estimatedCost: 118000,
    votes: 186,
    voteThreshold: 180,
    households: 61,
    status: 'In Progress',
    reporter: 'Ayesha Raza',
    createdAt: daysAgo(34),
    vendorId: 'v-1',
    image: ISSUE_IMAGES.road,
    quotation: {
      workDescription: 'Cut and remove damaged sections, relay base material, apply asphalt patching and restore road markings.',
      materials: 79000,
      labor: 39000,
      completionDays: 6,
      approved: true,
    },
    funding: { required: 118000, collected: 118000, contributors: 63 },
    progressUpdates: [
      { date: daysAgo(30), text: 'Issue verified by nearby residents and moved to community vote.' },
      { date: daysAgo(24), text: 'Vote threshold reached — community approved the repair.' },
      { date: daysAgo(20), text: 'Nankana Civil Works selected and quotation approved.' },
      { date: daysAgo(15), text: 'Funding goal reached, work scheduled.' },
      { date: daysAgo(4), text: 'Damaged sections removed and base preparation completed.' },
    ],
    expectedCompletion: daysAgo(-3),
  },
  {
    id: 'is-1002',
    title: 'Low water pressure near Railway Road',
    description:
      'Residents around Railway Road report weak water pressure during the morning hours. The community suspects a leaking or partially blocked supply line near the local water connection.',
    category: 'Water Supply',
    location: { area: 'Railway Road, Nankana Sahib', lat: 31.4501, lng: 73.6996 },
    estimatedCost: 35000,
    votes: 149,
    voteThreshold: 140,
    households: 49,
    status: 'Resolved',
    reporter: 'Bilal Ahmed',
    createdAt: daysAgo(70),
    vendorId: 'v-2',
    image: ISSUE_IMAGES.water,
    quotation: {
      workDescription: 'Locate the supply-line fault, repair the leaking section, pressure-test the line and flush the connected section.',
      materials: 22000,
      labor: 13000,
      completionDays: 3,
      approved: true,
    },
    funding: { required: 35000, collected: 35000, contributors: 42 },
    progressUpdates: [
      { date: daysAgo(65), text: 'Community vote passed with 149 supporting households.' },
      { date: daysAgo(58), text: 'Nankana Aqua & Plumbing selected and quotation approved.' },
      { date: daysAgo(50), text: 'Funding completed within 5 days.' },
      { date: daysAgo(45), text: 'Supply-line fault repaired and pressure test passed.' },
      { date: daysAgo(44), text: 'Issue marked resolved by the reporting household.' },
    ],
    resolvedDate: daysAgo(44),
  },
  {
    id: 'is-1003',
    title: 'Street lights out near Gurudwara Road',
    description:
      'Several consecutive street lights near Gurudwara Road are not working after dark, reducing visibility for pedestrians, shopkeepers and residents travelling through the area in the evening.',
    category: 'Street Lighting',
    location: { area: 'Gurudwara Road, Nankana Sahib', lat: 31.4523, lng: 73.6984 },
    estimatedCost: 82000,
    votes: 128,
    voteThreshold: 120,
    households: 43,
    status: 'Funding',
    reporter: 'Sana Tariq',
    createdAt: daysAgo(21),
    vendorId: 'v-3',
    image: ISSUE_IMAGES.lighting,
    quotation: {
      workDescription: 'Replace faulty LED street-light heads, repair damaged junction connections and test the complete lighting circuit.',
      materials: 52000,
      labor: 30000,
      completionDays: 4,
      approved: true,
    },
    funding: { required: 82000, collected: 53300, contributors: 29 },
    progressUpdates: [
      { date: daysAgo(19), text: 'Vote threshold reached — moved to vendor selection.' },
      { date: daysAgo(12), text: 'Nankana BrightLine Electric selected and quotation published.' },
      { date: daysAgo(10), text: 'Community approved the quotation.' },
      { date: daysAgo(2), text: 'Funding at 65% — 29 households contributing so far.' },
    ],
  },
  {
    id: 'is-1004',
    title: 'Overflowing waste point near Main Bazaar',
    description:
      'A neighbourhood waste collection point near Main Bazaar has been overflowing for several days. Residents report unpleasant odour, scattered waste and increased activity from stray animals.',
    category: 'Sanitation',
    location: { area: 'Main Bazaar, Nankana Sahib', lat: 31.4513, lng: 73.7009 },
    estimatedCost: 47000,
    votes: 87,
    voteThreshold: 100,
    households: 32,
    status: 'Voting',
    reporter: 'Fahad Malik',
    createdAt: daysAgo(6),
    image: ISSUE_IMAGES.sanitation,
    progressUpdates: [
      { date: daysAgo(6), text: 'Issue reported with photo evidence.' },
      { date: daysAgo(5), text: 'Duplicate check passed — no similar open issue found nearby.' },
    ],
  },
  {
    id: 'is-1005',
    title: 'Broken boundary wall creating a safety gap',
    description:
      'A damaged section of a public-space boundary wall has created an open entry point. Residents want the gap repaired and the nearby area better secured.',
    category: 'Public Safety',
    location: { area: 'Near DC Park, Nankana Sahib', lat: 31.4506, lng: 73.70025 },
    estimatedCost: 115000,
    votes: 46,
    voteThreshold: 110,
    households: 19,
    status: 'Voting',
    reporter: 'Zara Hussain',
    createdAt: daysAgo(3),
    image: ISSUE_IMAGES.safety,
    progressUpdates: [
      { date: daysAgo(3), text: 'Issue reported and verified by nearby community members.' },
    ],
  },
  {
    id: 'is-1006',
    title: 'Damaged grass area in DC Park',
    description:
      'A central grass section in DC Park has become patchy and dusty, reducing usable green space for families and children. The community has proposed soil preparation, reseeding and irrigation repairs.',
    category: 'Parks & Green Spaces',
    location: { area: 'DC Park, Nankana Sahib', lat: 31.4506, lng: 73.70025 },
    estimatedCost: 125000,
    votes: 163,
    voteThreshold: 150,
    households: 56,
    status: 'Community Approved',
    reporter: 'Ayesha Raza',
    createdAt: daysAgo(26),
    image: ISSUE_IMAGES.park,
    progressUpdates: [
      { date: daysAgo(22), text: 'Vote threshold reached with strong community support.' },
      { date: daysAgo(14), text: 'Moved to vendor marketplace for quotations.' },
    ],
  },
  {
    id: 'is-1007',
    title: 'Blocked drain causing street flooding after rain',
    description:
      'A blocked roadside drain on a residential street in Nankana Sahib causes water to collect after heavy rain. Residents have requested drain clearing and repairs to improve water flow.',
    category: 'Sanitation',
    location: { area: 'Railway Road neighbourhood, Nankana Sahib', lat: 31.4494, lng: 73.7021 },
    estimatedCost: 47000,
    votes: 121,
    voteThreshold: 100,
    households: 39,
    status: 'Vendor Selected',
    reporter: 'Omar Sheikh',
    createdAt: daysAgo(18),
    vendorId: 'v-5',
    image: ISSUE_IMAGES.drain,
    progressUpdates: [
      { date: daysAgo(14), text: 'Vote threshold reached.' },
      { date: daysAgo(7), text: 'Nankana Clean Streets selected by the community, quotation pending.' },
    ],
  },
  {
    id: 'is-1008',
    title: 'Faded pedestrian crossing near school route',
    description:
      'The pedestrian crossing markings near a busy school route have faded significantly. Residents want fresh road markings so children and pedestrians can cross more clearly during school hours.',
    category: 'Road & Infrastructure',
    location: { area: 'School Road, Nankana Sahib', lat: 31.4535, lng: 73.7031 },
    estimatedCost: 22000,
    votes: 18,
    voteThreshold: 80,
    households: 11,
    status: 'Reported',
    reporter: 'Hina Qureshi',
    createdAt: daysAgo(1),
    image: ISSUE_IMAGES.road,
    progressUpdates: [{ date: daysAgo(1), text: 'Issue reported, awaiting community votes.' }],
  },
];

export const COMMUNITY_STATS = {
  issuesReported: 86,
  issuesResolved: 54,
  totalContributed: 3245000,
  activeCommunities: 1,
};

export const FAQS = [
  {
    q: 'How do I report an issue?',
    a: 'Go to "Report an Issue", add a photo, pick a category, pin the location on the map and submit. COMFIX checks nearby reports so duplicates get merged automatically.',
  },
  {
    q: 'How does community voting work?',
    a: 'Every reported issue needs a minimum number of supporting households before it moves forward. You vote once per issue from the Issue Details page — votes are counted from verified household accounts.',
  },
  {
    q: 'How are vendors chosen?',
    a: 'Once an issue passes its vote threshold, verified vendors submit public quotations. The community reviews the breakdown and approves the one that offers the best value.',
  },
  {
    q: 'How do contributions work?',
    a: 'After a quotation is approved, households contribute any amount toward the total. Funding, spending and vendor payment are all visible on the Community Funding page.',
  },
  {
    q: 'Is my contribution refundable?',
    a: 'If a project is cancelled before work begins, contributions are returned to households automatically. Once work starts, funds are released to the approved vendor in stages.',
  },
];
