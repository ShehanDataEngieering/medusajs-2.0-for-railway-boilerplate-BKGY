/**
 * Minimal Tailwind config for backend + diagnostic runner.
 *
 * Usage:
 *  - Default: Tailwind / PostCSS will consume this config when building.
 *  - Diagnostic: run `node backend/tailwind.config.js` from the repo root
 *    (or `cd backend && node tailwind.config.js`) to print the resolved
 *    `content` array and validate that all patterns are non-empty strings.
 *
 * Purpose:
 *  - Provide a simple, safe `content` array so Tailwind doesn't receive an
 *    empty string or invalid pattern (which triggers:
 *    "Patterns must be a string (non empty) or an array of strings").
 *  - Offer a quick diagnostic script to help find misconfigurations.
 *
 * Runtime logs:
 *  - When this file is required by Tailwind/PostCSS during a build, the
 *    runtime diagnostic block will print a small message with the filename,
 *    current working directory, and the resolved content patterns. This
 *    helps detect which package's config is actually being loaded.
 */
const path = require("path");

// Minimal, explicit content globs for backend package.
// Keep these conservative to avoid including large unrelated areas.
const contentPatterns = [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./templates/**/*.{html,js,ts,jsx,tsx}",
    "./index.html",
];

// Runtime diagnostic: when required by the build (Tailwind/PostCSS/Vite),
// print a short message so we can detect which config file is loaded.
// This runs during require() and is safe (wrapped in try/catch).
try {
    // eslint-disable-next-line no-console
    console.log("[tailwind-config-runtime] loaded:", __filename);
    // eslint-disable-next-line no-console
    console.log("[tailwind-config-runtime] process.cwd():", process.cwd());
    // eslint-disable-next-line no-console
    console.log(
        "[tailwind-config-runtime] resolved contentPatterns:",
        contentPatterns,
    );
} catch (e) {
    // Do nothing: avoid throwing during build
}

// Export the Tailwind config used by the backend build.
module.exports = {
    darkMode: "class",
    content: contentPatterns,
    theme: {
        extend: {},
    },
    plugins: [],
};

/**
 * Diagnostic runner:
 * When executed directly (node backend/tailwind.config.js) this block prints
 * the resolved content array and performs simple validation. Exit code is:
 *  - 0 : content looks valid
 *  - 1 : found invalid entries
 */
if (require.main === module) {
    const cfg = module.exports;
    const cwd = process.cwd();

    console.log("Tailwind config diagnostic");
    console.log("-------------------------");
    console.log("Process CWD:", cwd);
    console.log(
        "Resolved content field type:",
        Array.isArray(cfg.content) ? "array" : typeof cfg.content,
    );
    console.log("Resolved content patterns:");

    if (!Array.isArray(cfg.content)) {
        console.error(
            "ERROR: `content` is not an array. Tailwind requires an array of globs or strings.",
        );
        process.exit(1);
    }

    let hasError = false;
    cfg.content.forEach((p, i) => {
        const ok = typeof p === "string" && p.trim() !== "";
        console.log(`  [${i}]`, ok ? "OK" : "INVALID", "-", String(p));
        if (!ok) hasError = true;
    });

    // Additional hint: print a short summary and suggestions
    if (hasError) {
        console.error("\nOne or more content patterns are invalid.");
        console.error(
            "Ensure all entries in `content` are non-empty strings, e.g. './src/**/*.{js,ts,jsx,tsx}'",
        );
        process.exit(1);
    }

    console.log("\nAll content patterns look valid.");
    console.log(
        "If you're still seeing the PostCSS/Tailwind error, verify there are no other",
    );
    console.log(
        "tailwind.config.js files in parent/other packages that may be exported with",
    );
    console.log(
        "an empty string or invalid `content` entries (e.g., environment-driven values).",
    );
    process.exit(0);
}
