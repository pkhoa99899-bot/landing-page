export const LOCALES = ["km", "en"] as const;
export type Locale = (typeof LOCALES)[number];

/** Ngôn ngữ mặc định phục vụ ở "/" (không có tiền tố) — giữ nguyên URL quảng cáo cũ. */
export const DEFAULT_LOCALE: Locale = "km";

export const hasLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);

/** Đường dẫn trang chủ của từng ngôn ngữ: km → "/", en → "/en". */
export const localeHome = (locale: Locale) => (locale === DEFAULT_LOCALE ? "/" : `/${locale}`);
