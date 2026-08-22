export const SITE = {
  name: "ខ្ចីប្រាក់ iCloud",
  phone: "067767674",
  phoneDisplay: "067 767 674",
  telegramUser: "somnangg3",
  telegramUrl: "https://t.me/somnangg3",
  feedbackVideos: [
    { id: "9n-n-91x8ns", orientation: "wide" },
    { id: "qvfd_nT2Lwc", orientation: "tall" },
  ],
  feedbackPhotos: Array.from({ length: 8 }, (_, i) => `/images/feedback/fb-${i + 1}.jpg`),
  loan: { min: "100$", max: "1000$", minTerm: "1 ខែ (30 ថ្ងៃ)", maxTerm: "60 ខែ", device: "iPhone 12" },
} as const;

export const NAV_LINKS = [
  { href: "#top", label: "ទំព័រដើម" },
  { href: "#doi-tuong", label: "អ្នកអាចខ្ចី" },
  { href: "#dang-ky", label: "ចុះឈ្មោះខ្ចី" },
] as const;
