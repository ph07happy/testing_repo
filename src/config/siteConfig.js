/**
 * Central Site Configuration
 * 
 * Edit this file to customize:
 * - The birthday recipient's name
 * - Target birthday date & ISO timestamp with timezone offset
 * - Live update polling interval
 * - Demo data toggle (set to false for production to display only real Google Form responses)
 * - Background music preferences
 */
export const siteConfig = {
  // Birthday person's display name
  birthdayName: "happy",

  // Target birthday date & time (ISO 8601 with offset, e.g. +05:30)
  // Set to a future date to test countdown & moving button (e.g. "2026-11-15T00:00:00+05:30")
  // Set to a past date to test immediate unlocked birthday state (e.g. "2020-01-01T00:00:00+05:30")
  birthdayDate: "2026-11-02T00:00:00+05:30",

  // Canonical Time Zone string
  timeZone: "Asia/Kolkata",

  // Live polling interval in milliseconds for Google Form responses (default 30 seconds)
  pollIntervalMs: 30000,

  // Demo Data Flag:
  // true  -> Provides curated Spider-Verse demo responses (useful for local previews & design testing)
  // false -> Production mode: Only displays approved responses fetched from your Google Apps Script endpoint
  showDemoData: true,

  // Browser tab title and brand heading
  siteTitle: "Into the happy's Birthday-Verse",

  // Subtitle / theme quote
  themeQuote: "ANOTHER YEAR. ANOTHER UNIVERSE. INFINITE POSSIBILITIES.",

  // Background Soundtrack (Sunflower by Post Malone & Swae Lee from Spider-Man: Into the Spider-Verse)
  backgroundMusic: {
    enabled: true,
    title: "Sunflower",
    artist: "Post Malone & Swae Lee",
    src: "audio/sunflower.mp3",
    defaultVolume: 0.45,
    autoPlayOnInteraction: true,
  },
};
