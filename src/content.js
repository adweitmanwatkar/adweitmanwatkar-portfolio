/**
 * Central content source for the portfolio.
 * Verified facts only — no invented grades, URLs, credentials, or stats.
 * Update this file as new links / credentials / projects become verified.
 */

export const IDENTITY = {
  name: 'Adweit Manwatkar',
  firstName: 'Adweit',
  role: 'Information Technology Engineering Student',
  tagline: 'Developer · Problem Solver · Aspiring Builder',
  headline: "I DON'T JUST LEARN TECHNOLOGY.\nI BUILD WITH IT.",
  taglineCaps: 'I BUILD. I EXPERIMENT. I ENGINEER WHAT COMES NEXT.',
  intro: 'I build. I experiment. I engineer what comes next.',
  status: 'Currently building & learning',
  college: 'Yeshwantrao Chavan College of Engineering (YCCE), Nagpur',
}

export const LINKS = {
  email: 'mailto:adweitmanvatkar@gmail.com',
  emailLabel: 'adweitmanvatkar@gmail.com',
  github: 'https://github.com/adweitmanwatkar',
  githubLabel: 'github.com/adweitmanwatkar',
  linkedin: 'https://www.linkedin.com/in/adweitmanwatkar',
  linkedinLabel: 'in/adweitmanwatkar',
}

export const PORTRAIT = '/portrait.jpg' // original photograph (public/portrait.jpg) — never AI-generated or distorted

export const PORTRAIT_ALT =
  "Portrait of Adweit Manwatkar — Information Technology engineering student at YCCE, Nagpur."

export const ABOUT_PARAGRAPHS = [
  "I'm an Information Technology engineering student at YCCE, Nagpur. I like the part of engineering where an idea becomes something real — a repo, a working feature, a demo you can actually click through.",
  'Most of what I know came from building: taking a half-formed concept, sketching an architecture, picking the wrong framework once or twice, refactoring until it works, then writing honest notes about what I learned. That loop — idea, build, break, fix — is the part I never get tired of.',
  'Outside projects, I keep up with technical challenges and collaborate on hackathon-style problem statements. Climate-aware design, water systems, AI tooling — usually I pick problems where a small team with limited resources can still ship something meaningful.',
]

export const ABOUT_FACTS = [
  { k: 'BASE', v: 'Nagpur, MH, IN' },
  { k: 'STATUS', v: 'B.Tech IT — Second Year' },
  { k: 'FOCUS', v: 'Software · AI · Web' },
  { k: 'MODE', v: 'Open to hackathons & collabs' },
]

export const EDUCATION = [
  {
    id: 'class10',
    year: 'Class 10 (SSC)',
    school: 'Shangrila English School, Nagpur',
    score: '93%',
    note: 'Built the foundation — mathematics, science, and the habit of finishing what I start.',
    tags: ['Foundation'],
  },
  {
    id: 'class12',
    year: 'Class 12 (HSC)',
    school: 'Maharashtra State Board — Science stream',
    score: '72.5%',
    note: 'Physics, chemistry, mathematics. Learned that the real skill is understanding why a formula works, not memorizing it.',
    tags: ['Science', 'PCM'],
  },
  {
    id: 'jeemain',
    year: 'JEE Main 2025',
    school: 'NTA — both attempts',
    score: '88.94 / 86.74 percentile',
    note: 'Attempt 1 — 88.94 percentile. Attempt 2 — 86.74 percentile. Best percentile carried the engineering admission process.',
    tags: ['Attempt 1', 'Attempt 2'],
  },
  {
    id: 'btech',
    year: 'B.Tech — Information Technology',
    school: 'Yeshwantrao Chavan College of Engineering (YCCE), Nagpur',
    score: 'CGPA 8.60 — 2029 (expected)',
    note: 'First-year CGPA: 8.60. Second-year engineering journey underway. Core coursework in data structures, programming, and systems fundamentals alongside self-driven project work.',
    tags: ['Current', 'IT Engineering', 'CGPA 8.60'],
  },
]

export const SKILL_GROUPS = [
  {
    id: 'core',
    title: 'Core Programming',
    code: '01',
    skills: ['C', 'C++', 'Python'],
    note: 'Comfortable here — learned through coursework and repeated, deliberate practice problems.',
    builtWith: true,
  },
  {
    id: 'web',
    title: 'Web Fundamentals',
    code: '02',
    skills: ['HTML', 'CSS', 'JavaScript'],
    note: 'Comfortable — the base every project and this very portfolio is built on.',
    builtWith: true,
  },
  {
    id: 'growing',
    title: 'Growing — Currently Learning',
    code: '03',
    skills: ['Java', 'React.js', 'Tailwind CSS'],
    note: 'Basic proficiency, actively leveling up. Listed as learning, not as experience — that distinction matters.',
    builtWith: false,
  },
]

export const PROJECTS = [
  {
    id: 'sarasx',
    number: '01',
    name: 'SARASX',
    category: 'AI Assistant Platform',
    year: '2025',
    blurb: 'An AI assistant platform exploring model routing, LLM providers, streaming responses, and knowledge retrieval.',
    problem: 'Generic chat UIs hide the interesting engineering: which model handles which kind of question, how tokens arrive, how retrieved knowledge stays grounded. SarasX exists to make that machinery visible — model routing, provider abstraction, streaming output, and retrieval, each a deliberate layer.',
    architecture: [
      'Provider-agnostic LLM layer — different model families behind one interface, chosen per request type.',
      'Streaming-first responses — tokens render as they arrive instead of waiting for a full completion.',
      'Retrieval pipeline for grounded answers — knowledge chunks fetched and injected before generation.',
      'Fast, deliberately un-decorated frontend so the response pipeline is the star of the demo.',
    ],
    implemented: [
      'Multi-provider model routing',
      'Streaming token responses',
      'Knowledge retrieval for grounded replies',
      'Chat session interface',
    ],
    planned: ['Persistent conversation history across devices', 'Fine-grained per-user model preferences'],
    tech: ['Python', 'LLM APIs', 'FastAPI', 'Streaming', 'React'],
    status: 'Active development — core pipeline working, history & preferences in progress.',
    links: { repo: 'https://github.com/adweitmanwatkar/SarasX', demo: null },
    accent: '#d2a44d',
  },
  {
    id: 'vajra',
    number: '02',
    name: 'VAJRA',
    category: 'Climate-Aware Shelter Design · SIH 2026',
    year: 'PS 26051',
    blurb: 'A climate-aware shelter design concept for Smart India Hackathon 2026, problem statement PS 26051.',
    problem:
      'Emergency and temporary shelters are usually designed against an average climate. PS 26051 asked the opposite question: what does a shelter look like when the local climate — heat, humidity, monsoon rainfall — is treated as a first-class design input?',
    architecture: [
      'Python / FastAPI service computing climate-adjusted dimensions and material hints for a given site.',
      'Geometry pass: generate candidate shelter forms and score them against climate loading.',
      'Thermal-leaning analysis flag: surfaces most affected by heat gain vs. ventilation get marked early in the design loop.',
      'SIH-format demo flow: problem statement → data → geometry → recommendation report.',
    ],
    implemented: ['Climate-data ingestion', 'Parameterized geometry generation', 'Materials & thermal flags'],
    planned: ['Validated CFD / FEA simulation', 'Manufacturing-cost optimizer'],
    tech: ['Python', 'FastAPI', 'Geometry', 'Data Pivoting'],
    status: 'Concept + service layer built for SIH 2026. No simulation results claimed — analysis flags are directional, not validated.',
    links: { repo: 'https://github.com/adweitmanwatkar/VAJRA-SIH2026', demo: null },
    accent: '#7b9c98',
  },
  {
    id: 'aquapulse',
    number: '03',
    name: 'AQUAPULSE',
    category: 'Water Management',
    year: '2025',
    blurb: 'A water-management project concept focused on monitoring and leak detection.',
    problem: 'Water utilities lose enormous volumes to leaks that go undetected for weeks. The idea: instrument supply lines cheaply, watch the flow signature, and flag anomalies before they become visible damage.',
    architecture: [
      'Flow-meter data ingestion into a central store.',
      'Baseline modeling — what "normal" flow looks like per segment and per time of day.',
      'Anomaly flagging — deviations from baseline trigger review, not panic.',
      'Dashboard prototype for technicians to triage flags in priority order.',
    ],
    implemented: ['Flow data model & ingestion design', 'Baseline / anomaly flagging logic', 'Triaging dashboard prototype'],
    planned: ['Physical sensor deployment', 'ML-based leak localization'],
    tech: ['Python', 'Data Modeling', 'Dashboards'],
    status: 'Designed and prototyped at the software layer; physical deployment and ML localization are future work.',
    links: { repo: 'https://github.com/adweitmanwatkar/Aquapulse-EROR-404', demo: null },
    accent: '#8ea3b8',
  },
  {
    id: 'swarmshield',
    number: '04',
    name: 'SWARMSHIELD',
    category: 'Distributed SWARM Coordination Algorithm',
    year: 'Team Creepers · YCCE',
    blurb: 'Coordination of 12 autonomous drones for search-and-rescue — no central controller, no leader. Team Creepers · YCCE, with collaborator Apurv Ambadkar.',
    problem: 'A single drone searches one place at a time and a single failure ends the mission. SWARMSHIELD asks: can 12 drones coordinate a search-and-rescue area purely peer-to-peer — no central controller, no leader, no single point of failure?',
    architecture: [
      'Peer-to-peer radio mesh — every drone exchanges state with neighbors directly; no base station in the loop.',
      'Cost-based auction / consensus task allocation — drones bid on mission tasks; the cheapest-capable bidder wins, without a referee.',
      'Boids-inspired flocking — separation, alignment, cohesion keep the swarm spread for coverage but coherent for motion.',
      'Failure recovery — a lost leader-less peer drops out; its tasks return to the auction and the swarm re-covers the gap.',
      'Coverage recovery — cells last covered by a failed drone re-enter the patrol rotation automatically.',
      'Live mission metrics — coverage %, task latency, and mesh health rendered during the simulated run.',
    ],
    implemented: [
      'Peer-to-peer mesh communication',
      'Cost-based auction / consensus task allocation',
      'Boids-inspired flocking',
      'Failure + coverage recovery',
      'Live mission metrics',
    ],
    planned: ['Hardware-in-the-loop trials', 'Real firmware port'],
    tech: ['Python 3', 'Pygame', 'NumPy', 'Simulated Radio Mesh'],
    team: 'Team Creepers · YCCE',
    collaborators: ['Apurv Ambadkar'],
    status: 'Original simulation in Python 3 + Pygame + NumPy with a simulated radio mesh. A browser port is possible — but only claimed here if the actual code supports it.',
    links: { repo: null, demo: null },
    accent: '#c98a5e',
  },
]

export const ACHIEVEMENTS = [
  {
    name: 'Top 40 Teams — National Hackathon',
    org: 'IIIT Gwalior Hackathon 2025',
    detail: 'Selected among the top 40 teams. A qualification-tier achievement, not a win or prize.',
    link: null,
    year: '2025',
  },
]

export const ARCHIVE_NOTE = {
  name: 'AmazoneX',
  note: 'Archived experiments and earlier builds live on GitHub.',
  link: 'https://github.com/adweitmanwatkar',
}

export const CERTIFICATIONS = [
  // Verified credentials live here once supplied by Adweit.
  // Expected shape:
  // { name: '...', org: '...', link: 'https://...', year: '2025', id: '...' }
  // Currently empty — no verifiable certificate names or credential URLs available.
]
