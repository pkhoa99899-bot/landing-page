export const SITE = {
  phone: "067767674",
  phoneDisplay: "067 767 674",
  telegramUser: "somnangg3",
  telegramUrl: "https://t.me/somnangg3",
  feedbackVideos: [
    { id: "9n-n-91x8ns", orientation: "wide" },
    { id: "qvfd_nT2Lwc", orientation: "tall" },
  ],
  feedbackPhotos: Array.from({ length: 8 }, (_, i) => `/images/feedback/fb-${i + 1}.jpg`),
  loan: { min: "100$", max: "1000$", device: "iPhone 12" },
} as const;

/** Nhãn hiển thị lấy từ dictionary theo `key` (dict.nav[key]). */
export const NAV_LINKS = [
  { href: "#top", key: "home" },
  { href: "#doi-tuong", key: "who" },
  { href: "#dang-ky", key: "register" },
] as const;
