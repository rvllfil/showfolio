import type { StrapiBlock, StrapiMedia } from "./types";

// Get API URL - works in both server and client components
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

/**
 * Helper to get full image URL from Strapi
 */
export function getStrapiImageUrl(media?: StrapiMedia | string): string {
  if (!media) return "";

  // If it's already a string URL
  if (typeof media === "string") {
    // If it starts with http, return as is
    if (media.startsWith("http")) return media;
    // Otherwise, prepend API URL
    return `${API_URL}${media}`;
  }

  // If it's a StrapiMedia object
  if (media.url) {
    // If URL starts with http, return as is
    if (media.url.startsWith("http")) return media.url;
    // Otherwise, prepend API URL
    return `${API_URL}${media.url}`;
  }

  return "";
}

/**
 * Helper to render Strapi blocks as plain text
 */
export function renderBlocksAsText(blocks?: StrapiBlock[]): string {
  if (!blocks || blocks.length === 0) return "";

  return blocks
    .map((block) => {
      if (block.type === "paragraph" && block.children) {
        return block.children.map((child) => child.text || "").join("");
      }
      if (block.type === "heading" && block.children) {
        return block.children.map((child) => child.text || "").join("");
      }
      return "";
    })
    .filter(Boolean)
    .join("\n\n");
}

/**
 * Helper to render Strapi blocks as HTML/JSX
 */
export function renderBlocks(blocks?: StrapiBlock[]): React.ReactNode[] {
  if (!blocks || blocks.length === 0) return [];

  return blocks
    .map((block, index) => {
      if (block.type === "paragraph" && block.children) {
        const text = block.children.map((child) => child.text || "").join("");
        return (
          <p key={index} className="mb-4">
            {text}
          </p>
        );
      }

      if (block.type === "heading" && block.children) {
        const text = block.children.map((child) => child.text || "").join("");
        const level = (block.level as number) || 2;

        if (level === 1)
          return (
            <h1 key={index} className="text-3xl font-bold mb-4">
              {text}
            </h1>
          );
        if (level === 2)
          return (
            <h2 key={index} className="text-2xl font-semibold mb-3">
              {text}
            </h2>
          );
        if (level === 3)
          return (
            <h3 key={index} className="text-xl font-semibold mb-2">
              {text}
            </h3>
          );
        return (
          <h4 key={index} className="text-lg font-semibold mb-2">
            {text}
          </h4>
        );
      }

      if (block.type === "list" && block.children) {
        const ListTag = block.format === "ordered" ? "ol" : "ul";
        return (
          <ListTag key={index} className="mb-4 ml-6 list-disc">
            {block.children.map((item, i) => {
              if (item.type === "list-item" && item.children) {
                const text = Array.isArray(item.children)
                  ? item.children
                      .map((child: StrapiBlock) => child.text || "")
                      .join("")
                  : "";
                return (
                  <li key={i} className="mb-1">
                    {text}
                  </li>
                );
              }
              return null;
            })}
          </ListTag>
        );
      }

      return null;
    })
    .filter(Boolean);
}
