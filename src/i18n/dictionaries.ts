import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/km";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  km: () => import("./dictionaries/km").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
export type { Dictionary };
