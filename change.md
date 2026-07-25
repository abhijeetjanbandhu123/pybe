# PyBe Development Changelog & History

This document serves as the official chronological development log and changelog for the PyBe (Scenario-First Python) platform. Every time code is added, modified, deleted, or refactored, this file is updated immediately.

---

## Version 2.0.0
**Date:** 2026-07-25

### Summary
Major feature release integrating the interactive **Minecraft Lists Learning Module** into the PyBe SPA. This release features a gamified 9-step guided Survival Mode story, a 17-operation Creative Sandbox with real-time FLIP DOM animations, flexible input validation supporting both common English and Python syntax, Vercel monorepo deployment configurations, and complete product documentation.

### Added
- `client/src/pages/MinecraftList/`: Complete React module for gamified Python List learning.
- `client/src/pages/MinecraftList/MinecraftList.jsx`: Main module container managing tab navigation (`welcome`, `story`, `sandbox`) without page reloading.
- `client/src/pages/MinecraftList/MinecraftList.css`: Scoped CSS styling delivering an authentic retro Minecraft aesthetic with custom borders and typography.
- `client/src/pages/MinecraftList/components/SurvivalMode.jsx`: Guided narrative advancing through 9 interactive inventory challenges (`[]`, `append()`, `len()`, `insert()`, `pop()`, `sort()`).
- `client/src/pages/MinecraftList/components/CreativeSandbox.jsx`: Open experimentation playground supporting 17 distinct Python list operations with custom form inputs, REPL simulation history, and Big-O time complexity badges (`O(1)`, `O(n)`, `O(n log n)`).
- `client/src/pages/MinecraftList/components/Stage.jsx`: Presentation component rendering the inventory hotbar and executing smooth FLIP (First, Last, Invert, Play) layout animations using React's `useLayoutEffect`.
- `client/public/minecraft-list/hero_backpack.jpg`: Header banner asset for the module.
- `client/src/pages/MinecraftList/README.md`: Module-specific technical documentation and component API guide.
- `client/vite.config.js`: Custom Vite configuration supporting asset resolution and monorepo client builds.
- `vercel.json` (Root): Root Vercel monorepo configuration directing automated builds to the `client` directory (`cd client && npm install && npm run build`) and setting the output path to `client/dist`.
- `client/vercel.json`: Client-level Vercel rewrite rules to handle SPA routing.
- `Product.md`: Complete, authoritative project and technical documentation covering architecture, REST API endpoints, database schemas, installation, and design decisions.

### Changed
- `client/src/main.jsx`
  - Added React Router DOM `BrowserRouter`, `Routes`, and `Route` components to enable SPA navigation between the main dashboard (`/`) and the Minecraft Lists module (`/minecraft-list`).
  - Added a prominent, retro-styled "PLAY MINECRAFT LISTS" button to the dashboard sidebar.
- `client/src/pages/MinecraftList/components/SurvivalMode.jsx`
  - Upgraded input validation regex patterns (`expected`) to accept **both common English natural language commands** (e.g., `"add wood"`, `"append wood"`, `"create empty list"`, `"check length"`, `"remove sword"`) and strict Python syntax, lowering beginner cognitive load.
  - Replaced hardcoded instruction labels with dynamic step-by-step instructions (`currentStep.instruction`).
  - Replaced technical code snippets in input placeholders and error messages with clean, welcoming English hints (e.g., `Try: "add wood"`, `Try: "remove sword"`).

### Fixed
- Resolved Vercel production deployment `404 NOT_FOUND` errors on SPA routes (such as `/minecraft-list`) by implementing URL rewrites (`/(.*) -> /index.html`) in `vercel.json`.
- Fixed rigid input validation in Survival Mode that previously rejected valid natural language attempts from beginner students.

### Removed
- Removed legacy static HTML/JS prototype files from the old `client/` structure during the clean React SPA migration.

### Refactored
- Decoupled the Minecraft Lists module into three modular components (`MinecraftList`, `SurvivalMode`, `CreativeSandbox`) separated from presentation logic (`Stage`), improving code reusability and maintainability.
- Optimized DOM layout transitions in `Stage.jsx` by calculating bounding client rectangles prior to browser painting, eliminating the need for heavy third-party animation libraries.

### Dependencies
- No new external packages added; leveraged existing `react-router-dom` and `lucide-react` dependencies to maintain a lightweight client bundle.

### Notes
- Treat `Product.md` and `change.md` as mandatory artifacts to be updated on every future pull request or feature implementation.

---

## Version 1.2.0
**Date:** 2026-06-20

### Summary
Introduced comprehensive developer documentation with the creation of the project Wiki and updated the main repository README to reference onboarding guides and architectural overviews.

### Added
- `WIKI.md`: Comprehensive developer wiki detailing architectural principles, scenario authoring instructions, API usage examples, and troubleshooting guides.

### Changed
- `README.md`
  - Added direct links to `WIKI.md` and onboarding instructions to assist future open-source contributors and new developers.

### Fixed
- None.

### Removed
- None.

### Refactored
- None.

### Dependencies
- No dependency changes.

### Notes
- Established the documentation rule requiring developer guides to be updated alongside new feature implementations.

---

## Version 1.1.1
**Date:** 2026-06-19

### Summary
Updated and refined the local JSON database schema and existing seed records to improve data consistency across learner session evaluation and scenario filtering.

### Added
- None.

### Changed
- `server/src/data/db.json`
  - Modified seed records to ensure all scenario documents include standardized concept tags and difficulty ratings required by the frontend sidebar filters.
  - Updated historical session sample records to align with `learningEngine.js` abstraction mapping outputs.

### Fixed
- Fixed minor metadata discrepancies in scenario concept tags that caused filtering inconsistencies in the dashboard UI.

### Removed
- None.

### Refactored
- None.

### Dependencies
- No dependency changes.

### Notes
- Verified that all queries against `/api/scenarios?concept=...` return accurate results.

---

## Version 1.1.0
**Date:** 2026-06-19

### Summary
Expanded the scenario repository by adding focused, real-world learning challenges designed to teach core Python concepts such as conditionals, loops, and data validation.

### Added
- Curated real-world programming scenarios in `server/src/data/scenarios.js`:
  - Foodpanda Order Dispatch (teaching conditionals and state validation).
  - ATM Cash Dispenser (teaching mathematical division and conditional flow).

### Changed
- `server/src/data/scenarios.js`
  - Added structured scenario objects with difficulty levels (`Beginner`, `Intermediate`), starter prompts, and comprehensive problem descriptions to guide student reasoning.

### Fixed
- None.

### Removed
- None.

### Refactored
- None.

### Dependencies
- No dependency changes.

### Notes
- Re-seeded `db.json` using `npm run seed` to populate the new scenario catalog for all local development environments.

---

## Version 1.0.0
**Date:** 2026-06-19

### Summary
Initial release of the PyBe (Scenario-First Python) MERN learning platform. Established the core full-stack architecture featuring a React Single Page Application frontend, Express/Node.js REST API backend, deterministic local AI learning engine, and file-based JSON document storage.

### Added
- `client/`: Complete Vite + React frontend dashboard SPA.
- `client/src/main.jsx`: Main dashboard UI component (`App`) handling scenario browsing, interactive session submission, progress analytics, and product roadmap visualization.
- `client/src/styles.css`: Custom vanilla CSS design system and responsive layout styling.
- `server/`: Complete Express + Node.js REST API server.
- `server/src/index.js`: Express server initialization, middleware, and CORS configuration.
- `server/src/routes/scenarios.js`: API routes (`GET /api/scenarios`, `POST /api/scenarios`, `GET /api/scenarios/:id`) for listing and creating learning scenarios.
- `server/src/routes/sessions.js`: API routes (`GET /api/sessions`, `POST /api/sessions`) for submitting learner reasoning and retrieving recent session history.
- `server/src/routes/analytics.js`: API route (`GET /api/analytics`) aggregating platform telemetry, prompt scores, and misconception counts.
- `server/src/routes/roadmap.js`: API route (`GET /api/roadmap`) serving staged development milestones.
- `server/src/services/learningEngine.js`: Local deterministic AI engine performing keyword abstraction mapping, Python construct synthesis, prompt scoring, and misconception detection without external API latency.
- `server/src/data/store.js`: Asynchronous file I/O data access layer for atomic database operations.
- `server/src/data/db.json`: File-based document database storing scenarios and user learning sessions.
- `server/src/data/seed.js`: Database seeding script for resetting initial state.

### Changed
- None (Initial project creation).

### Fixed
- None (Initial release).

### Removed
- None.

### Refactored
- None.

### Dependencies
- **Added:** `react` (`^18.3.1`), `react-dom` (`^18.3.1`), `react-router-dom` (`^7.18.1`), `lucide-react` (`^0.468.0`), `vite` (`^6.0.7`), `express` (`^4.21.2`), `cors` (`^2.8.5`), `concurrently` (`^9.1.2`).

### Notes
- Designed with a local JSON storage engine (`db.json`) to allow zero-configuration prototyping and 100% offline functionality without external database server dependencies.
