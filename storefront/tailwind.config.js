// Fully-sanitized + robust Tailwind config for Medusa
// - Safely loads @medusajs/ui-preset (if installed)
// - Extracts preset content safely (handles undefined / nested / empty cases)
// - Sanitizes ALL content patterns so Tailwind never receives invalid globs
// - Prevents PostCSS "Patterns must be a string" failures
// - Keeps all your animations + theme customizations

const path = require("path")

/* -------------------------------------------------------
 * Helpers
 * -----------------------------------------------------*/

// Safe require wrapper (avoids crashes if a module is missing)
function safeRequire(pkg) {
  try {
    return require(pkg)
  } catch {
    return null
  }
}

// Removes invalid, empty, undefined, or broken glob patterns
function cleanPatterns(arr) {
  return (arr || []).filter(
    (p) =>
      typeof p === "string" &&
      p.trim() !== "" &&
      !p.includes("undefined") &&
      !p.startsWith("undefined")
  )
}

/* -------------------------------------------------------
 * Load @medusajs/ui-preset safely
 * -----------------------------------------------------*/

const uiPreset = safeRequire("@medusajs/ui-preset")

let presetContent = []

if (uiPreset) {
  // Case 1: preset exports `content: []`
  if (Array.isArray(uiPreset.content)) {
    presetContent = cleanPatterns(uiPreset.content)
  }

  // Case 2: preset exports `content: "string"`
  else if (typeof uiPreset.content === "string") {
    presetContent = cleanPatterns([uiPreset.content])
  }

  // Case 3: Some presets nest it under `.preset.content`
  else if (Array.isArray(uiPreset.preset?.content)) {
    presetContent = cleanPatterns(uiPreset.preset.content)
  }

  // Fallback if preset is weird
  else {
    presetContent = []
  }
}

/* -------------------------------------------------------
 * Local storefront content globs
 * -----------------------------------------------------*/

const localContent = cleanPatterns([
  "./src/app/**/*.{js,ts,jsx,tsx}",
  "./src/pages/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
  "./src/modules/**/*.{js,ts,jsx,tsx}",
  "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
])

/* -------------------------------------------------------
 * Merge + final cleanup
 * -----------------------------------------------------*/

let mergedContent = cleanPatterns([...presetContent, ...localContent])

// Ensure at least ONE valid pattern always exists
if (mergedContent.length === 0) {
  mergedContent = ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"]
}

/* -------------------------------------------------------
 * Safe optional plugin loading
 * -----------------------------------------------------*/

let radixPlugin = null
try {
  const maybe = safeRequire("tailwindcss-radix")
  radixPlugin = typeof maybe === "function" ? maybe() : null
} catch {
  radixPlugin = null
}

/* -------------------------------------------------------
 * Final Tailwind config export
 * -----------------------------------------------------*/

module.exports = {
  darkMode: "class",

  // Include preset only if successfully loaded
  presets: uiPreset ? [uiPreset] : [],

  content: mergedContent,

  theme: {
    extend: {
      transitionProperty: {
        width: "width margin",
        height: "height",
        bg: "background-color",
        display: "display opacity",
        visibility: "visibility",
        padding: "padding-top padding-right padding-bottom padding-left",
      },
      colors: {
        grey: {
          0: "#FFFFFF",
          5: "#F9FAFB",
          10: "#F3F4F6",
          20: "#E5E7EB",
          30: "#D1D5DB",
          40: "#9CA3AF",
          50: "#6B7280",
          60: "#4B5563",
          70: "#374151",
          80: "#1F2937",
          90: "#111827",
        },
      },
      borderRadius: {
        none: "0px",
        soft: "2px",
        base: "4px",
        rounded: "8px",
        large: "16px",
        circle: "9999px",
      },
      maxWidth: {
        "8xl": "100rem",
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
      fontSize: {
        "3xl": "2rem",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Ubuntu",
          "sans-serif",
        ],
      },
      keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in-right": {
          "0%": { opacity: 0, transform: "translateX(10px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        "fade-in-top": {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "fade-out-top": {
          "0%": { height: "100%" },
          "99%": { height: "0" },
          "100%": { visibility: "hidden" },
        },
        "accordion-slide-up": {
          "0%": {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          "100%": { height: "0", opacity: "0" },
        },
        "accordion-slide-down": {
          "0%": {
            "min-height": "0",
            "max-height": "0",
            opacity: "0",
          },
          "100%": {
            "min-height": "var(--radix-accordion-content-height)",
            "max-height": "none",
            opacity: "1",
          },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        ring: "ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
        "fade-in-right":
          "fade-in-right 0.3s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-in-top": "fade-in-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-out-top":
          "fade-out-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "accordion-open":
          "accordion-slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        "accordion-close":
          "accordion-slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
      },
    },
  },

  plugins: cleanPatterns([radixPlugin]).length ? [radixPlugin] : [],
}
