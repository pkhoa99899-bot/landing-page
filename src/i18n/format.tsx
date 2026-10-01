import { Fragment, type ReactNode } from "react";

/** Ký tự ngăn giữa phần Khmer và phần Anh trong một chuỗi song ngữ. */
export const BI_SEPARATOR = "\n";

const TOKEN_RE = /\{(\w+)\}/g;

/** Thay {key} trong chuỗi bằng giá trị chuỗi. */
export const format = (text: string, vars: Record<string, string>): string =>
  text.replace(TOKEN_RE, (m, key: string) => vars[key] ?? m);

/** Thay {key} trong chuỗi bằng ReactNode (vd. <b>, <span className="num">). */
export const rich = (text: string, vars: Record<string, ReactNode>): ReactNode =>
  text.split(/(\{\w+\})/).map((part, i) => {
    const key = part.match(/^\{(\w+)\}$/)?.[1];
    return <Fragment key={i}>{key && key in vars ? vars[key] : part}</Fragment>;
  });

/** Tách chuỗi song ngữ thành [Khmer, English]. */
export const splitBi = (text: string): [string, string] => {
  const [km, en = ""] = text.split(BI_SEPARATOR);
  return [km, en];
};

/** Song ngữ trên một dòng "Khmer / English" — dùng cho thuộc tính (alt, aria-label, title…) và nhãn ngắn. */
export const inlineBi = (text: string, separator = " / "): string => splitBi(text).join(separator);

/** Xếp chồng: Khmer ở trên, English ở dòng dưới (class .bi-en trong globals.css). */
export const biPair = (km: ReactNode, en: ReactNode): ReactNode => (
  <>
    <span lang="km">{km}</span>
    <span className="bi-en">{en}</span>
  </>
);

const identity = (part: string): ReactNode => part;

/** Hiển thị chuỗi song ngữ xếp chồng; `render` xử lý riêng từng nửa (vd. gắn rich()). */
export const bi = (text: string, render: (part: string) => ReactNode = identity): ReactNode => {
  const [km, en] = splitBi(text);
  return biPair(render(km), render(en));
};

/** Tiêu đề nhiều dòng: các dòng Khmer xuống hàng bằng <br>, phần English gộp một dòng bên dưới. */
export const biLines = (lines: readonly string[], render: (part: string) => ReactNode = identity): ReactNode => {
  const parts = lines.map(splitBi);
  return biPair(
    parts.map(([km], i) => <Fragment key={i}>{render(km)}{i < parts.length - 1 && <br />}</Fragment>),
    parts.map(([, en], i) => <Fragment key={i}>{render(en)}{i < parts.length - 1 && " "}</Fragment>),
  );
};
