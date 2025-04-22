import React from "react";

interface JsonLdProps {
  jsonLd: Record<string, any>;
}

export default function JsonLdInjector({ jsonLd }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
