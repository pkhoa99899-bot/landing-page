import type { Dictionary } from "./km";

const en: Dictionary = {
  meta: {
    title: "iCloud Loan – Fast loans up to $1000, all you need is an iPhone",
    description:
      "Fast iCloud iPhone loans up to $1000 with same-day payout. Fast – easy – confidential. Supports iPhone 12 and newer.",
  },
  siteName: "iCloud Loan",
  loan: { minTerm: "1 month (30 days)", maxTerm: "60 months" },
  nav: { home: "Home", who: "Who can borrow", register: "Apply now" },
  header: { logo: "Loan", cta: "Contact", menu: "Menu" },
  hero: {
    title: ["Fastest loan", "up to {max}", "with just your iPhone"],
    subTitle: "Get your money the same day",
    subText: "Fast – Easy – Confidential",
    support: "For customers with an {device} or newer",
    amountLabel: "Loan amount:",
    amount: "min {min} – max {max}",
    termLabel: "Term:",
    term: "min {min} – max {max}",
    ctaRegister: "Apply for a loan now",
    ctaTelegram: "Chat on Telegram",
  },
  whyUs: {
    title: ["Why do customers", "choose us?"],
    reasons: [
      "Flexible loans (daily or monthly) with no proof of income and no collateral required",
      "No paperwork checks. Receive your money within 5 minutes",
      "High loan limits, flexible terms, 100% confidential",
      "Bad credit history welcome, no collateral required",
    ],
  },
  cashLoan: {
    imageAlt: "Loan consultant",
    title: "Cash loans",
    tagline: "Fast – Trusted – Confidential",
    features: [
      { title: "Who can borrow", lines: ["– Cambodian citizens", "– Own an {device} or newer"] },
      { title: "Fast", lines: ["Approved within 15 minutes"] },
      { title: "Simple", lines: ["Simple process, approved online"] },
      { title: "Trusted", lines: ["Over 15 years of experience with dozens of branches nationwide"] },
    ],
  },
  feedback: {
    title: "Customer feedback",
    desc: "Thousands of customers trust us and have received fast loans from us",
    videoTitle: "Customer feedback {n}",
    galleryTitle: "Our customers",
    gallerySub: "successfully received their loans",
    photoAlt: "Customer received a loan {n}",
    badge: "Loan received",
  },
  conditions: {
    title: "Loan conditions",
    items: [
      { title: "Who can borrow", lines: ["– Citizens aged 18 and over", "– Just own an {device} or newer"] },
      { title: "Loan packages", lines: ["– Loans from {min} to {max}", "– Borrow against an iCloud device ({device} or newer)"] },
      { title: "Flexible repayment", lines: ["– Daily or monthly", "– As agreed"] },
    ],
    note: "** Free 24/7 online consultation and paperwork support, guaranteed no hidden fees",
    methodTitle: "How it works",
    method: [
      "Once we receive your information, our experienced team and our branch network across Cambodia will advise you and serve you at your location.",
      "Our assessment team works professionally and courteously, keeps your information safe, accurately reviews your daily income and evaluates your creditworthiness.",
    ],
  },
  contact: {
    title: "Contact us",
    desc: "Get money fast – your information stays confidential! Call us or fill in the form. We will get back to you as soon as possible!",
    addressLabel: "Address",
    address: "Branch network across Cambodia",
    phoneLabel: "Consultation hotline",
    callAria: "Call",
  },
  form: {
    title: ["Leave your details", "for a free consultation"],
    desc: "Fill in the form below and our consultants will contact you with detailed advice",
    name: "Your name",
    device: "iPhone model",
    amount: "Loan amount",
    phone: "Phone number",
    phoneHint: "9–10 digits",
    phoneTitle: "Phone number must have 9 or 10 digits",
    submit: "Apply now",
    sending: "Sending...",
    success: "✅ We have received your information! We will contact you shortly.",
    rateLimited: "⚠️ Too many submissions. Please contact us directly by phone or Telegram.",
    error: "❌ Sending failed. Please try again or contact us directly via",
  },
};

export default en;
