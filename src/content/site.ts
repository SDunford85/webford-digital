/**
 * Site-wide content for Webford Digital Services.
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
  name: "Webford Digital Services",
  owner: "Steve Dunford",
  email: "hello@[yourdomain].co.uk",
  emailHref: "mailto:hello@[yourdomain].co.uk",
  phone: "[your number]",
  phoneHref: "tel:",
  address: "[Business address]",
  area: "North Yorkshire, working UK-wide",
  replyTime: "[1 working day]",
};

export const nav = [
  { href: "/#why", label: "Why Webford" },
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Our work" },
  { href: "/#packages", label: "Packages" },
  { href: "/#about", label: "About" },
  { href: "/#faqs", label: "FAQs" },
];

export const sellingPoints = ["10+ years in IT and software", "Hand-built, never a template", "You own your website", "Fair, fixed quotes"];

export const comparison: { label: string; template: string; webford: string }[] = [
  { label: "Design", template: "Pick a theme, fill the gaps", webford: "Designed from scratch for your brand" },
  { label: "Features", template: "Limited by your plan tier", webford: "Built to do what your business needs" },
  { label: "Making updates", template: "A generic editor for every site", webford: "Your own admin area, changes go live instantly" },
  { label: "Integrations", template: "Only approved apps and plug-ins", webford: "Payments, booking systems and APIs connected properly" },
  { label: "Support", template: "Help centre and ticket queues", webford: "Talk directly to the person who built it" },
  { label: "Guidance", template: "General how-to articles", webford: "A user guide written for your site" },
];

export type IconName = "code" | "sliders" | "gallery" | "chat" | "cart" | "link" | "embed" | "book";

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
    price: "£[PRICE]",
    items: [
      "Bespoke design, up to [5] pages",
      "Mobile-friendly and fast",
      "Enquiry form to your inbox",
      "Photo gallery",
      "Embedded maps, videos and social links",
      "Basic SEO set-up",
      "User guide",
      "[30] days post-launch support",
    ],
  },
  {
    id: "silver",
    name: "Silver",
    intro: "For growing businesses that want to manage their own site and take bookings.",
    price: "£[PRICE]",
    items: [
      "Everything in Bronze, up to [10] pages",
      "Admin site for instant updates",
      "Online bookings or appointments",
      "Virtual agent for your FAQs",
      "Links and embeds for your external apps",
      "Visitor analytics",
      "Personal handover session",
      "[60] days post-launch support",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    intro: "A full online shop or business system, built and connected end to end.",
    price: "£[PRICE]",
    badge: "Most complete",
    items: [
      "Everything in Silver, pages to suit",
      "Full e-commerce with card payments",
      "Product, stock and order management",
      "Sales and booking reports",
      "API integrations with your systems",
      "Customer accounts",
      "Detailed user guide and training",
      "[90] days post-launch support",
    ],
  },
];

export const carePlan = {
  price: "£[PRICE]/month",
  body: "Everything in Hosting, plus software updates, backups, uptime checks and up to 30 minutes of changes a month.",
};

export const hostingPlan = {
  price: "£5/month",
  body: "Fast, secure hosting with a security certificate and your domain renewal included. Changes are charged only when you need them.",
};

export const spreadCost = {
  title: "Spread the cost",
  body: "Pay a deposit to get started, then the rest in up to 6 interest-free monthly payments. Your website is yours once the last payment is made.",
};

/** "Why Webford": the reasons to choose a bespoke site. `stat` shows big in place of the number. */
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
  { q: "Will I own my website and domain?", a: "Yes. Once paid in full, the site and domain are yours. [Confirm wording in your terms.]" },
  { q: "Do you offer hosting and support?", a: "Yes, through an optional monthly care plan covering hosting, updates and small changes." },
];

export const enquiryNeeds = ["New website", "Redesign of my current site", "Online shop", "Bookings or appointments", "Not sure yet"];
export const packageChoices = ["Not sure yet", "Bronze", "Silver", "Gold"];
