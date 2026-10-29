# 🕷️ Into Your Birthday-Verse — Spider-Man Inspired Birthday Website

An interactive, cinematic birthday surprise website inspired by the visual atmosphere and comic-book dynamism of *Spider-Man: Into the Spider-Verse*. Built with **React 19**, **Vite**, **Motion for React**, **React Router**, and backed by **Google Forms**, **Google Sheets**, and **Google Apps Script**.

---

## 🌟 Key Features

1. **Two Distinct Universe States**:
   - **State A (Before Birthday Countdown)**: Full cinematic intro & live countdown. Message routes and real birthday content are strictly locked. Signature interactive **"YOU WANT TO SEE THE MESSAGE, TAP ME"** button playfully dodges clicks and taps inside a designated arena with comic sound effects.
   - **State B (After Countdown Reaches Zero)**: The countdown reaches zero and stays at `0 Days · 0 Hours · 0 Minutes · 0 Seconds`. The headline shifts to *"THE WAIT IS OVER. YOUR UNIVERSE IS HERE."*, triggering a celebratory confetti explosion. The moving button ceases jumping, unlocks into a glowing action button, and enables access to the response gallery and individual message pages.
2. **Signature Playful Moving Button**:
   - Bounded, safe random movement that never leaves the viewport or covers critical countdown numbers.
   - Touch-friendly on mobile devices without layout jank.
   - Flashes comic speech bubbles: *"TOO SLOW!"*, *"NOT YET!"*, *"THE UNIVERSE ISN'T READY!"*, *"NICE TRY, WEB-SLINGER!"*.
   - Freezes automatically at zero and transforms into *"UNLOCK THE MESSAGES"*.
3. **One Response = One Complete Webpage**:
   - Every Google Form response has its own dedicated URL: `#/messages/response-001`.
   - If a response contains multiple photos (1, 2, 5, or more), **all photos appear together on that single page** in a responsive comic grid. Never splits photos across multiple pages.
   - Previous and next buttons (`← PREVIOUS MESSAGE` / `NEXT MESSAGE →`) navigate between entire responses.
4. **Live Polling & Deduplication**:
   - Background polling (default 30 seconds) automatically pulls newly submitted Google Form responses without rebuilding the frontend.
   - Visibility-aware: pauses polling when the browser tab is hidden and instantly refreshes upon refocus.
   - Displays a *"NEW MEMORIES UNLOCKED!"* notification banner.
5. **Cinematic Soundtrack & Audio Controls**:
   - Integrates the iconic Spider-Verse anthem: ***Sunflower* by Post Malone & Swae Lee** ([`public/audio/sunflower.mp3`](file:///d:/downloads/spider_verse/public/audio/sunflower.mp3)).
   - Automatically kicks in when the visitor clicks **"ENTER THE UNIVERSE"** (complying with modern browser autoplay policies).
   - Sticky comic equalizer button in the Navbar with animated visualizer bars, allowing one-click play, pause, and mute.
6. **Spider-Verse Comic Aesthetics**:
   - Ben-Day halftone dot textures, speed lines, chromatic aberration RGB split text, dynamic comic speech bubbles, and custom sound effects.
   - Fully supports `prefers-reduced-motion` and mobile viewports.

---

## 🛠️ Technology Stack

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vite.dev/), JavaScript ES Modules
- **Animations**: [Motion for React](https://motion.dev/) (`motion`), [canvas-confetti](https://github.com/catdad/canvas-confetti)
- **Routing**: [React Router 7](https://reactrouter.com/) (`HashRouter` for zero-configuration GitHub Pages hosting)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend / Database**: Google Forms, Google Sheets, Google Drive, Google Apps Script
- **Deployment**: GitHub Pages, GitHub Actions

---

## 📂 Project Directory Structure

```text
spider_verse/
│
├── index.html                           # App shell with Google Fonts (Bangers & Space Grotesk)
├── package.json                         # Dependencies & project scripts
├── vite.config.js                       # Vite configuration with relative base path support
├── README.md                            # Comprehensive documentation
├── .gitignore                           # Git ignore rules
│
├── public/
│   └── favicon.svg                      # Custom Spider-Verse emblem SVG favicon
│
├── .github/
│   └── workflows/
│       └── deploy.yml                   # Automated GitHub Actions workflow for GitHub Pages
│
├── src/
│   ├── main.jsx                         # React root entry point
│   ├── App.jsx                          # Root layout, theme overlays & router wrapper
│   │
│   ├── config/
│   │   ├── siteConfig.js                # Central birthday date, person's name, time zone, demo flag
│   │   └── apiConfig.js                 # Google Apps Script Web App URL & API settings
│   │
│   ├── routes/
│   │   ├── AppRouter.jsx                # Route definitions
│   │   └── routePaths.js                # Canonical path constants
│   │
│   ├── components/
│   │   ├── CountdownUnit.jsx            # Animated comic flip unit (Days, Hours, Minutes, Seconds)
│   │   ├── MovingRevealButton.jsx       # The playful escaping button & unlock controller
│   │   ├── ComicButton.jsx              # Reusable comic button with halftones & sound-effect pop
│   │   ├── ComicPanel.jsx               # Reusable panel container with borders & drop shadows
│   │   ├── MessageCard.jsx              # Gallery card for one response (with thumbnail & photo counter)
│   │   ├── PhotoGallery.jsx             # Responsive multi-image comic layout & high-res lightbox
│   │   ├── LoadingScreen.jsx            # Dimensional warp glitch loader
│   │   ├── ErrorState.jsx               # Comic anomaly card with retry button
│   │   └── Navbar.jsx                   # Sticky comic header, sound FX synthesizer & live status pill
│   │
│   ├── pages/
│   │   ├── HomePage.jsx                 # Full experience (Hero, Countdown, Feed, Finale)
│   │   ├── IntroPage.jsx                # Fullscreen cinematic opening animation
│   │   ├── CountdownPage.jsx            # Dedicated countdown view
│   │   ├── MemoriesPage.jsx             # Dedicated gallery view with access control
│   │   ├── BirthdayMessagePage.jsx      # Dedicated single response page (recipient, message, all photos, prev/next)
│   │   └── NotFoundPage.jsx             # Dimension Rift 404 comic error
│   │
│   ├── sections/
│   │   ├── HeroSection.jsx              # Kinetic typography & universe entrance
│   │   ├── CountdownSection.jsx         # Countdown units, header transitions & button arena
│   │   ├── MessageGallerySection.jsx    # Response cards grid, search filter & live polling
│   │   └── FinaleSection.jsx            # Sign-off panel with sound effect bubbles & tribute
│   │
│   ├── animations/
│   │   ├── animationVariants.js         # Motion presets (stagger, comicPop, panelSlide)
│   │   ├── ComicBackground.jsx          # Ambient glowing orbs, halftone dots & CRT scanlines
│   │   ├── WebOverlay.jsx               # Decorative corner web strands
│   │   └── ParticleField.jsx            # Canvas particle simulation of multiverse sparks
│   │
│   ├── hooks/
│   │   ├── useCountdown.js              # Second-by-second countdown with visibility sleep correction
│   │   ├── useBirthdayReveal.js         # Single authoritative reveal state
│   │   ├── useBirthdayMessages.js       # Central data manager, caching & notification triggers
│   │   └── useVisibilityPolling.js      # Visibility-aware background polling
│   │
│   ├── services/
│   │   ├── birthdayApi.js               # Client for Google Apps Script Web App (CORS & JSONP)
│   │   ├── messageService.js            # Normalization, stable ID generation & prev/next lookups
│   │   ├── imageService.js              # Drive URL extraction & fallback image generator
│   │   └── demoDataService.js           # Curated Spider-Verse sample responses
│   │
│   ├── utils/
│   │   ├── dateUtils.js                 # Time calculation, date formatting & validation
│   │   ├── imageUtils.js                # Drive file ID extraction & multi-link splitter
│   │   ├── validation.js                # Header normalization & schema validation
│   │   └── routeUtils.js                # Route URL generators
│   │
│   └── styles/
│       ├── variables.css                # Color palette, comic borders & font variables
│       ├── typography.css               # Kinetic headings, RGB chromatic aberration & badges
│       ├── comic-effects.css            # Halftones, speed lines, speech bubbles & cut corners
│       ├── animations.css               # Glitch keyframes, floating orbs & pulse glows
│       ├── responsive.css               # Container layouts & mobile adjustments
│       ├── accessibility.css            # Focus indicators & prefers-reduced-motion overrides
│       └── global.css                   # Global stylesheet importing all modular CSS files
│
└── backend/
    └── google-apps-script/
        ├── Code.gs                      # Google Apps Script handling the 3 fields, CORS/JSONP & reveal lock
        ├── appsscript.json              # Apps Script manifest
        └── README.md                    # Backend setup & Google Sheet connection guide
```

---

## ⚡ Quick Start & Local Development

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Installation
Open your terminal in the workspace directory and run:
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in `dist/`.

---

## ⚙️ Configuration Guide

### 1. Setting the Birthday Person's Name and Target Date
Open [`src/config/siteConfig.js`](file:///d:/downloads/spider_verse/src/config/siteConfig.js):
```javascript
export const siteConfig = {
  birthdayName: "YOUR FRIEND'S NAME",
  birthdayDate: "2026-11-15T00:00:00+05:30", // ISO 8601 with timezone offset
  timeZone: "Asia/Kolkata",
  pollIntervalMs: 30000,
  showDemoData: true, // Set to false in production
  siteTitle: "Into Your Birthday-Verse"
};
```

### 2. Testing the Countdown & Unlock Transitions
- **To test the countdown running & moving button dodging**: Set `birthdayDate` to a future date/time (e.g. `"2026-11-15T00:00:00+05:30"`).
- **To test the unlocked celebration state**: Set `birthdayDate` to a past date/time (e.g. `"2020-01-01T00:00:00+05:30"`).
- **To test countdown zero-transition live**: Set `birthdayDate` to 10 seconds ahead of your current time!

### 3. Connecting Google Form & Google Apps Script
1. Create a Google Form with the fields:
   - `message to`
   - `message by`
   - `message`
   - `upload pictures`
2. Link the form to a Google Sheet (**Responses** > **Link to Sheets**).
3. In the Sheet, click **Extensions** > **Apps Script**, paste the contents of [`backend/google-apps-script/Code.gs`](file:///d:/downloads/spider_verse/backend/google-apps-script/Code.gs), and configure the same `BIRTHDAY_TIMESTAMP`.
4. Deploy as a Web App:
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
5. Copy the Web App URL and paste it into [`src/config/apiConfig.js`](file:///d:/downloads/spider_verse/src/config/apiConfig.js):
```javascript
export const apiConfig = {
  appsScriptUrl: "https://script.google.com/macros/s/AKfycb.../exec",
  apiMode: "auto",
};
```
6. In [`src/config/siteConfig.js`](file:///d:/downloads/spider_verse/src/config/siteConfig.js), set `showDemoData: false` to display only real Google Form submissions.

---

## 🚀 GitHub Pages Deployment

### Method A: Automated Deployment via GitHub Actions (Recommended)
1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete spider-verse birthday surprise website"
   git remote add origin https://github.com/USERNAME/REPOSITORY-NAME.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. The included workflow [`.github/workflows/deploy.yml`](file:///d:/downloads/spider_verse/.github/workflows/deploy.yml) will automatically build and publish the site.
4. Your website will be live at:
   `https://USERNAME.github.io/REPOSITORY-NAME/`

---

## 🔒 Privacy & Security Considerations

- **Strict Server-Side Access Control**: Google Apps Script evaluates the birthday date on Google's servers. Messages and photos cannot be uncovered by inspecting network responses or client storage before the countdown completes.
- **No Hardcoded Credentials**: No Google service account keys or private OAuth tokens are stored in the client repository.
- **Drive Permissions**: Only the specific folder containing Google Form file uploads needs view permissions. Never share your entire Google Drive.
