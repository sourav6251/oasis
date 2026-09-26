import sanitizeHtml from 'sanitize-html';

// Conservative allow-list for rich-text blog content (SEC-03).
// Strips scripts, iframes, event handlers (on*), javascript: URLs, styles, etc.
const ALLOWED_TAGS = [
  'p', 'br', 'hr', 'span', 'div',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'strong', 'b', 'em', 'i', 'u', 's', 'strike', 'sub', 'sup',
  'blockquote', 'pre', 'code',
  'ul', 'ol', 'li',
  'a', 'img', 'figure', 'figcaption',
  'table', 'thead', 'tbody', 'tr', 'td', 'th',
];

const ALLOWED_ATTRIBUTES = {
  a: ['href', 'title', 'target', 'rel'],
  img: ['src', 'alt', 'title', 'width', 'height'],
  td: ['colspan', 'rowspan'],
  th: ['colspan', 'rowspan'],
  '*': [],
};

/**
 * Sanitize untrusted HTML before it is persisted or reflected back to clients.
 * @param {string} dirty
 * @returns {string} safe HTML
 */
export const sanitizeRichText = (dirty) => {
  if (typeof dirty !== 'string') return '';
  return sanitizeHtml(dirty, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ['http', 'https', 'mailto'],
    disallowedTagsMode: 'recursiveEscape',
    transformTags: {
      // Neutralise link-based attacks
      a: (tagName, attribs) => ({
        tagName: 'a',
        attribs: {
          ...attribs,
          rel: 'noopener noreferrer nofollow',
        },
      }),
    },
  });
};

/** Strip all HTML — for plain-text fields (names, messages, subjects). */
export const stripHtml = (value) => {
  if (typeof value !== 'string') return value;
  return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} });
};
