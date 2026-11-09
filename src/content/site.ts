/**
 * Site-wide content for Hexford Digital.
 * Anything in [SQUARE BRACKETS] still needs filling in before launch.
 * (Phase 2 moves packages, portfolio and FAQs into the admin site.)
 */

/**
 * ⚠️ LAUNCH SWITCH — keep `false` while the site is only a preview.
 * `false` tells Google and other search engines not to list the site (robots.txt + noindex tag).
 * Set to `true` on launch day, once the [brackets] are filled in and the domain points here.
 */
export const allowIndexing = false;

export const business = {
  name: "Hexford Digital",
  owner: "Steve Dunford",
  email: "hello@[yourdomain].co.uk",
  emailHref: "mailto:hello@[yourdomain].co.uk",
  phone: "[your number]",
  phoneHref: "tel:",
  address: "[Business address]",
  area: "Anywhere in the UK, by video call, phone and email",
  replyTime: "[1 working day]",
};

export const nav = [
  { href: "/why", label: "Why Hexford" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Our work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#faqs", label: "FAQs" },
];

/** The three strongest reasons, for the homepage. The full list (`benefits`) is on /why. */
export const topBenefits = [
  { stat: "Yours", title: "You own it", body: "Pay for the build once and the website and domain are yours. No lock-in, ever." },
  { stat: "£0", title: "No platform fees", body: "No monthly subscription that climbs with every feature. First year’s hosting free, then £5 a month." },
  { stat: "1:1", title: "A real person", body: "Talk directly to the senior consultant who built your site. No help-centre queue." },
];

export const sellingPoints = ["10+ years in IT and software", "Hand-built, never a template", "You own your website", "First year’s hosting free"];

export const comparison: { label: string; template: string; ours: string }[] = [
  { label: "Design", template: "Pick a theme, fill the gaps", ours: "Designed from scratch for your brand" },
  { label: "Features", template: "Limited by your plan tier", ours: "Built to do what your business needs" },
  { label: "Making updates", template: "A generic editor for every site", ours: "Your own admin area, changes go live instantly" },
  { label: "Integrations", template: "Only approved apps and plug-ins", ours: "Payments, booking systems and APIs connected properly" },
  { label: "Support", template: "Help centre and ticket queues", ours: "Talk directly to the person who built it" },
  { label: "Guidance", template: "General how-to articles", ours: "A user guide written for your site" },
];

export type IconName = "code" | "sliders" | "gallery" | "chat" | "cart" | "link" | "embed" | "book" | "globe" | "shield" | "mail" | "move";

export const features: { icon: IconName; title: string; body: string }[] = [
  { icon: "code", title: "Custom-built websites", body: "Hand-coded, fast and mobile-friendly, designed around your brand and customers." },
  { icon: "sliders", title: "Your own admin site", body: "Update text, products, prices and images yourself. Changes go live straight away." },
  { icon: "gallery", title: "Galleries", body: "Show off your products, work or events in galleries you can add to at any time." },
  { icon: "chat", title: "Virtual agents", body: "A friendly assistant that answers your customers’ common questions, day or night." },
  { icon: "cart", title: "Full e-commerce", body: "Online shops with secure card payments, stock control and order management." },
  { icon: "link", title: "Integrations and APIs", body: "Connect payments, booking calendars and the apps you already use." },
  { icon: "embed", title: "External apps and embeds", body: "Link out to your other tools, or embed maps, videos, booking widgets and more." },
  { icon: "book", title: "User guides", body: "A clear guide to everything in your build, so you’re confident from day one." },
];

export type Project = {
  name: string;
  summary: string;
  tags: string[];
  url: string; // live site address, or "#" until it's live
  image: string | null; // e.g. "/images/work/bake-chic.webp" — null shows a placeholder
  beforeImage?: string | null; // screenshot of the client's old site: shows a before-and-after slider on /work
};

export const portfolio: Project[] = [
  {
    name: "Bake Chic",
    summary: "A vibrant, fun online shop for a bake shed selling brownies, blondies, cookies, flapjacks, cakes and bake boxes.",
    tags: ["Online shop", "Product pages", "Order rota countdown", "Reviews", "Card payments"],
    url: "#",
    image: "/images/work/bake-chic.webp",
  },
  {
    name: "Hire Services",
    summary: "A rental website where customers sign in, add items to a basket and hire them for the dates they choose.",
    tags: ["Date-range booking", "Customer accounts", "Basket", "Card payments"],
    url: "#",
    image: "/images/work/hire-services.webp",
  },
  {
    name: "WHEA GB",
    summary: "A new website for the World Heavy Events Association GB, putting natural, drug-tested strongman and strongwoman front and centre.",
    tags: ["National sporting body", "Events", "Brand-led design", "[Add feature]"],
    url: "#",
    image: "/images/work/whea-gb.webp",
  },
  {
    name: "Strength Circus",
    summary: "A strongman-at-heart community gym in Malton, with a merch shop, class and PT booking, and a virtual agent for FAQs.",
    tags: ["Merch shop", "GymFlow booking integration", "Virtual agent", "Card payments"],
    url: "#",
    image: "/images/work/strength-circus.webp",
  },
];

export const steps = [
  { title: "Free chat", body: "We talk through your business, customers and goals." },
  { title: "Design and fixed quote", body: "You see a design and a clear price before any build starts." },
  { title: "Build and review", body: "Regular previews so you can shape it as it comes together." },
  { title: "Launch and handover", body: "Your site goes live, with a walkthrough and your user guide." },
  { title: "Ongoing support", body: "Hosting, care and changes whenever you need them." },
];

export type Package = {
  id: "bronze" | "silver" | "gold";
  name: string;
  intro: string;
  price: string;
  items: string[];
  badge?: string;
};

export const packages: Package[] = [
  {
    id: "bronze",
    name: "Bronze",
    intro: "A professional presence for sole traders and new businesses.",
    price: "£399",
    items: [
      "Bespoke design, up to 5 pages",
      "First year’s hosting free",
      "Mobile-friendly and fast",
      "Enquiry form to your inbox",
      "Photo gallery",
      "Embedded maps, videos and social links",
      "Basic SEO set-up",
      "Your domain name, registered to you (first year included)",
      "Email forwarding, e.g. hello@yourbusiness.co.uk",
      "User guide",
      "[30] days post-launch support",
    ],
  },
  {
    id: "silver",
    name: "Silver",
    intro: "For growing businesses that want to manage their own site and take bookings.",
    price: "£795",
    items: [
      "Everything in Bronze, up to 10 pages",
      "First year’s hosting free",
      "Admin site for instant updates",
      "Online bookings or appointments",
      "Virtual agent for your FAQs",
      "Links and embeds for your external apps",
      "Visitor analytics",
      "Move your existing site and domain to us",
      "Personal handover session",
      "[60] days post-launch support",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    intro: "A full online shop or business system, built and connected end to end.",
    price: "£1,495",
    badge: "Most complete",
    items: [
      "Everything in Silver, pages to suit",
      "First year’s hosting free",
      "Full e-commerce with card payments",
      "Product, stock and order management",
      "Sales and booking reports",
      "API integrations with your systems",
      "Customer accounts",
      "Business email set-up",
      "Detailed user guide and training",
      "[90] days post-launch support",
    ],
  },
];

export const carePlan = {
  price: "£25/month",
  body: "Everything in Hosting, plus software updates, backups, uptime checks and up to 30 minutes of changes a month.",
};

/** Every build includes this many months of Hosting only, free. */
export const hostingFreeMonths = 12;

export const hostingPlan = {
  price: "£5/month",
  body: "First year free with every website, then £5 a month. Fast, secure hosting with a security certificate, your domain renewal and email forwarding included. Changes are charged only when you need them.",
};

/** "Everything in one place": domains, hosting, email and moving from another provider. */
export const oneStop: { icon: IconName; title: string; body: string }[] = [
  { icon: "globe", title: "Your domain name", body: "Chosen together and registered in your business’s name, with the first year included. Already have one? I’ll look after it or move it across." },
  { icon: "shield", title: "Hosting and security", body: "Fast, secure hosting with a security certificate, so the padlock shows in every browser. First year free, then £5 a month." },
  { icon: "mail", title: "Business email", body: "Email forwarding included, so hello@yourbusiness.co.uk lands in the inbox you already use. Full mailboxes set up on request." },
  { icon: "move", title: "Moving made easy", body: "Switching from Wix, GoDaddy or another provider? I move your site and domain carefully, so your email keeps working throughout." },
];

/**
 * Instant quote calculator: starting figures in pounds. These are only used until you set your own
 * in Admin → Packages & prices → Quote calculator (or a package price there is a plain number like £995).
 */
export const quoteDefaults = {
  bronze: 399, // starting price, up to 5 pages
  silver: 795, // up to 10 pages, admin, bookings, virtual assistant
  gold: 1495, // online shop or full business system
  extraPage: 45, // each page above the package's allowance
  admin: 195, // add an admin area to Bronze
  bookings: 195, // add online bookings to Bronze
  assistant: 145, // add a virtual assistant to Bronze
  move: 75, // move an existing site and domain (included in Silver and Gold)
  email: 45, // business email set-up (included in Gold)
  copy: 25, // help writing the words, per page
  care: 25, // care plan, per month (hosting comes from the Hosting only price)
};
export type QuoteConfig = typeof quoteDefaults & { hosting: number };

/**
 * "What it really costs over 3 years" (Pricing and Why pages). Competitor figures are published prices
 * from UK web design companies, checked November 2026 (they're shown without naming the companies).
 * VAT is added to them because their prices exclude it; Hexford, as a sole trader below the VAT threshold,
 * doesn't charge VAT. ⚠️ If you register for VAT, update the note in CostComparison.
 */
export const costYears = 3;
export const costComparison: {
  title: string;
  ours: "bronze" | "gold";
  rivals: { label: string; detail: string; upfront: number; monthly: number }[];
}[] = [
  {
    title: "An online shop",
    ours: "gold",
    rivals: [
      { label: "Budget agency shop with a monthly plan", detail: "£1,399 build + £26.99 a month, plus VAT", upfront: 1399 * 1.2, monthly: 26.99 * 1.2 },
      { label: "Pay-monthly website subscription", detail: "£99.99 a month, plus VAT", upfront: 0, monthly: 99.99 * 1.2 },
    ],
  },
  {
    title: "A professional business website",
    ours: "bronze",
    rivals: [
      { label: "Typical brochure website from a web designer", detail: "£1,000–£1,500 build, then £20–£40 a month hosting (from £1,720)", upfront: 1000, monthly: 20 },
      { label: "Pay-monthly website subscription", detail: "£49.99 a month, plus VAT", upfront: 0, monthly: 49.99 * 1.2 },
    ],
  },
];

export const spreadCost = {
  title: "Spread the cost",
  body: "Pay a deposit to get started, then the rest in up to 6 interest-free monthly payments. Your website is yours once the last payment is made.",
};

/** "Why Hexford": the reasons to choose a bespoke site. `stat` shows big in place of the number. */
export const benefits: { title: string; body: string; stat?: string; statLabel?: string; wide?: boolean }[] = [
  { title: "Done for you", body: "No evenings wrestling a template. Tell me what you need, and I design and build it.", stat: "0", statLabel: "evenings lost to a template", wide: true },
  { title: "Built around your business", body: "Order rotas, date-range hire, bookings: features that fit how you work, not what a theme allows." },
  { title: "No platform subscription", body: "No monthly bill that climbs with every app. Features are built in, not rented.", stat: "£0", statLabel: "platform fees" },
  { title: "Lower card fees", body: "Card payments through Stripe, so more of every sale stays with you.", stat: "1.5% + 20p", statLabel: "per UK card sale" },
  { title: "You own it", body: "Once it’s paid for, your website and domain are yours. Move it whenever you like, with no lock-in.", wide: true },
  { title: "A real person", body: "Call or email the person who built your site. No help-centre queue." },
  { title: "An admin made for you", body: "Update products, prices and photos yourself, in an admin area designed around your day.", wide: true },
  { title: "10+ years in business software", body: "I’ve spent more than a decade helping organisations implement and run software. I build for how you actually work.", stat: "10+", statLabel: "years’ experience", wide: true },
];

export const faqs = [
  { q: "How much does a website cost?", a: "Packages start from £[PRICE]. After a free chat you’ll get a fixed quote, so there are no surprises." },
  { q: "How long does a build take?", a: "Typically [X–Y] weeks, depending on the package and how quickly content is ready." },
  { q: "Can I update the website myself?", a: "Yes. Silver and Gold include an admin site, and every build comes with a user guide." },
  { q: "Will I own my website and domain?", a: "Yes. Your domain is always registered in your business’s name, and once the build is paid for, the website is yours too. If you ever leave, I’ll transfer the domain and hand over your site’s code and content." },
  { q: "Do I need to sort out my own domain and hosting?", a: "No, I handle it all. I’ll help you choose a domain, register it in your name (the first year is included), and host your site with the first year free, then £5 a month with renewals included." },
  { q: "I already have a website and domain. Can you take it over?", a: "Yes. You can keep your domain where it is and I’ll point it to your new site, or move it across so everything is in one place and one bill. I check your email settings first, so nothing stops working during the switch." },
  { q: "Can I have a business email address?", a: "Yes. Every site includes email forwarding, so messages to hello@yourbusiness.co.uk arrive in the inbox you already use. If you need full mailboxes, I can set up Google Workspace or a lower-cost alternative for you." },
  { q: "Do you only work with local businesses?", a: "No. I work with businesses anywhere in the UK. Everything runs smoothly by video call, phone and email, and you get the same one-to-one service wherever you are." },
  { q: "Do you offer hosting and support?", a: "Yes. Every website comes with its first year of hosting free, then Hosting only is £5 a month. Or choose the care plan for updates, backups and small changes each month. Both are optional and cancel with a month’s notice." },
];

export const enquiryNeeds = ["New website", "Redesign of my current site", "Online shop", "Bookings or appointments", "Not sure yet"];
export const packageChoices = ["Not sure yet", "Bronze", "Silver", "Gold"];
