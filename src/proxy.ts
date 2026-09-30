import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, hasLocale } from "@/i18n/config";

/**
 * "/"      → rewrite ngầm sang "/km" (giữ nguyên URL quảng cáo cũ)
 * "/km/…"  → redirect về "/…" để tránh trùng nội dung
 * "/en/…"  → đi thẳng
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const seg = pathname.split("/")[1] ?? "";

  if (seg === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url);
  }
  if (hasLocale(seg)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Bỏ qua API, file nội bộ của Next và mọi file tĩnh (có dấu chấm: .svg, .jpg…)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
