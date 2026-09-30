import { Fragment, type ReactNode } from "react";

const TOKEN_RE = /\{(\w+)\}/g;

/** Thay {key} trong chuỗi bằng giá trị chuỗi. */
export const format = (text: string, vars: Record<string, string>) =>
  text.replace(TOKEN_RE, (m, key: string) => vars[key] ?? m);

/** Thay {key} trong chuỗi bằng ReactNode (vd. <b>, <span className="num">). */
export const rich = (text: string, vars: Record<string, ReactNode>): ReactNode =>
  text.split(/(\{\w+\})/).map((part, i) => {
    const key = part.match(/^\{(\w+)\}$/)?.[1];
    return <Fragment key={i}>{key && key in vars ? vars[key] : part}</Fragment>;
  });
