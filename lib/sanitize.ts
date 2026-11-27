import sanitizeHtml from "sanitize-html"

// Post content is HTML from the Tiptap editor, rendered with
// dangerouslySetInnerHTML. Anyone can call the server action directly,
// so allow only the tags the editor produces and strip everything else
// (scripts, event handlers, javascript: URLs).
const options: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "br", "h1", "h2", "h3", "strong", "b", "em", "i", "s", "u",
    "ul", "ol", "li", "blockquote", "code", "pre", "hr", "a",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel", "class"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer nofollow" }),
  },
}

export function sanitizePostHtml(html: string | null | undefined): string {
  if (!html) return ""
  return sanitizeHtml(html, options)
}

// Cover images must be plain http(s) URLs.
export function sanitizeImageUrl(url: string | null | undefined): string | null {
  if (!url) return null
  try {
    const parsed = new URL(url)
    return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.toString() : null
  } catch {
    return null
  }
}
