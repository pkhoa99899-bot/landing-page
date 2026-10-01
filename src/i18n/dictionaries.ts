import km, { type Dictionary } from "./dictionaries/km";
import en from "./dictionaries/en";
import { BI_SEPARATOR } from "./format";

const merge = <T,>(a: T, b: T): T => {
  if (typeof a === "string") return `${a}${BI_SEPARATOR}${b as string}` as T;
  if (Array.isArray(a)) return a.map((item, i) => merge(item, (b as unknown[])[i])) as T;
  return Object.fromEntries(
    Object.entries(a as Record<string, unknown>).map(([key, value]) => [key, merge(value, (b as Record<string, unknown>)[key])]),
  ) as T;
};

/** Dictionary song ngữ: mỗi chuỗi = "<Khmer>\n<English>". Hiển thị bằng helper trong ./format. */
export const dict: Dictionary = merge(km, en);

export { km, en };
export type { Dictionary };
