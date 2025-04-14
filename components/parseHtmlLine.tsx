import React, { JSX } from "react";

export function parseLine(
  line: string,
  key: React.Key,
  el?: string
): JSX.Element {
  const tagRegex = /^([a-z0-9]+):(.+)$/i;
  const match = line.match(tagRegex);
  if (match) {
    const tag = match[1].toLowerCase();
    const content = match[2].trim();
    const allowedTags = [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "span",
      "strong",
      "em",
      "ul",
      "li",
      "blockquote",
    ];
    if (allowedTags.includes(tag)) {
      const Tag = tag as keyof JSX.IntrinsicElements;
      return <Tag key={key}>{content}</Tag>;
    }
  }
  const Wrapper = (el || "p") as keyof JSX.IntrinsicElements;
  return <Wrapper key={key} dangerouslySetInnerHTML={{ __html: line }} />;
}
