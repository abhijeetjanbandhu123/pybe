# PyBe: AI-Native Scenario-Driven Python Learning Platform
**Complete Product & Architecture Documentation**

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Architecture](#architecture)
5. [Features](#features)
6. [Pages](#pages)
7. [Components](#components)
8. [API Documentation](#api-documentation)
9. [Database](#database)
10. [Installation](#installation)
11. [Design Decisions](#design-decisions)
12. [Future Improvements](#future-improvements)
13. [Known Issues](#known-issues)
14. [Developer Notes](#developer-notes)

---

## Project Overview

### Project Name
**PyBe** (Scenario-First Python)

### Description
PyBe is an interactive, scenario-driven learning platform designed to teach Python programming through real-world reasoning, abstraction mapping, and gamified environments. Instead of forcing beginners to memorize dry syntax, PyBe introduces programming concepts through vivid real-world scenarios and interactive gamified modules (such as the Minecraft Lists tutorial).

### Purpose
The purpose of PyBe is to bridge the gap between human intuition and code generation. By encouraging learners to articulate their logic in plain English before generating Python constructs, the platform builds mental models that endure beyond rote memorization.

### Objectives
- Transform abstract computer science concepts into tangible, visual experiences.
- Eliminate beginner intimidation by supporting natural language reasoning and common English commands alongside Python syntax.
- Provide instant, deterministic feedback on reasoning, prompt quality, and misconception detection without relying on costly external AI APIs.
- Deliver an engaging, zero-latency Single Page Application (SPA) experience.

### Target Audience
- **Beginner Programmers:** Students learning Python for the first time who struggle with abstract data structures.
- **Educators & Mentors:** Teachers seeking interactive, scenario-based learning modules to supplement traditional computer science curriculums.
- **Self-Taught Developers:** Learners looking for a hands-on, visual sandbox to experiment with Python list mechanics and time complexity.

### Key Features
- **Scenario Browser:** Explore curated real-world programming challenges filtered by difficulty and concept.
- **Reasoning & Abstraction Engine:** Submit natural language reasoning to receive instant abstraction mapping, Python construct generation, and prompt maturity scoring.
- **Interactive Minecraft Lists Module:** A full gamified suite featuring a guided "Survival Mode" story and a 17-operation "Creative Sandbox" with real-time FLIP animations and Big-O complexity analysis.
- **Analytics & Misconception Dashboard:** Track learner mastery signals, concept counts, and common misconceptions in real time.
- **Staged Product Roadmap:** Visual representation of PyBe's evolution from V0 prototype to V3 AI-native ecosystem.

---

## Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React | `^18.3.1` | UI component rendering and state management |
| **Build Tool & Dev Server**| Vite | `^6.0.7` | Blazing-fast client bundling and HMR |
| **Routing** | React Router DOM | `^7.18.1` | Client-side Single Page Application (SPA) routing |
| **Icons & Visuals** | Lucide React | `^0.468.0` | Modern, responsive SVG iconography |
| **Styling** | Plain Vanilla CSS | N/A | High-performance, custom-scoped design system |
| **Backend Framework** | Express + Node.js| `^4.21.2` (Express)| RESTful API routing and HTTP server handling |
| **Process Management**| Concurrently | `^9.1.2` | Running client and server simultaneously during dev |
| **Database Storage** | Local JSON Engine| N/A | Zero-setup, file-backed persistent storage (`db.json`) |
| **Deployment & Hosting**| Vercel | N/A | Production CDN, build automation, and SPA routing |

### Development Environment
- **OS Compatibility:** Windows, macOS, Linux
- **Node Requirement:** Node.js 18.x or higher
- **Package Manager:** `npm` (Workspaces / Monorepo setup via prefix scripts)

---

## Project Structure

PyBe is structured as a MERN-style monorepo containing a React client and an Express server within a single root repository.

```
pybe/
├── client/                     # Frontend React SPA (Vite)
│   ├── public/                 # Static assets (favicons, images)
│   │   └── minecraft-list/
│   │       └── hero_backpack.jpg # Gamified module header banner
│   ├── src/                    # Frontend source code
│   │   ├── pages/
│   │   │   └── MinecraftList/  # Interactive Minecraft Lists learning module
│   │   │       ├── components/
│   │   │       │   ├── CreativeSandbox.jsx # 17-operation interactive sandbox
│   │   │       │   ├── Stage.jsx           # FLIP animation engine & hotbar view
│   │   │       │   └── SurvivalMode.jsx    # Guided 9-step learning story
│   │   │       ├── MinecraftList.css       # Scoped styling for Minecraft aesthetic
│   │   │       ├── MinecraftList.jsx       # Main module container & navigation tabs
│   │   │       └── README.md               # Technical documentation for module
│   │   ├── main.jsx            # App root, dashboard UI, API wrapper, and router
│   │   └── styles.css          # Global design system, typography, and layout rules
│   ├── package.json            # Client dependencies and scripts
│   ├── vercel.json             # Client-specific Vercel SPA rewrites
│   └── vite.config.js          # Vite bundler configuration
├── server/                     # Backend Node.js / Express API Server
│   ├── src/
│   │   ├── data/
│   │   │   ├── db.json         # File-based database storing scenarios & sessions
│   │   │   ├── roadmap.js      # Staged product development milestones
│   │   │   ├── scenarios.js    # Seed scenario data for reset/initialization
│   │   │   ├── seed.js         # Seeding script to reset database state
│   │   │   └── store.js        # Asynchronous file I/O database access layer
│   │   ├── routes/
│   │   │   ├── analytics.js    # GET /api/analytics endpoint
│   │   │   ├── roadmap.js      # GET /api/roadmap endpoint
│   │   │   ├── scenarios.js    # GET/POST /api/scenarios endpoints
│   │   │   └── sessions.js     # GET/POST /api/sessions endpoints
│   │   ├── services/
│   │   │   └── learningEngine.js # Deterministic AI logic (reasoning, code gen, scoring)
│   │   └── index.js            # Express server entry point & CORS configuration
│   ├── package.json            # Server dependencies and scripts
│   └── .env.example            # Backend environment variable template
├── package.json                # Root package.json orchestrating dev and build scripts
├── vercel.json                 # Root Vercel deployment config for monorepo routing
├── WIKI.md                     # High-level developer wiki and quickstart
└── Product.md                  # Complete product and technical documentation (This file)
```

### Important Folders & Files Explained
- `client/src/pages/MinecraftList/`: Contains the complete React migration of the gamified list module. Decoupled into presentation (`Stage.jsx`), narrative logic (`SurvivalMode.jsx`), and experimental sandbox (`CreativeSandbox.jsx`).
- `server/src/services/learningEngine.js`: The heart of PyBe's local intelligence. Implements heuristic keyword matching, prompt maturity evaluation, and misconception detection without external API latency.
- `server/src/data/store.js`: Manages atomic reads and writes to `db.json`, acting as an embedded NoSQL document store.
- `vercel.json` (Root): Crucial for monorepo hosting on Vercel. Directs Vercel to install, build, and serve the `client` directory while rewriting SPA routes to `index.html`.

---

## Architecture

PyBe follows a decoupled Client-Server architecture. The frontend communicates with the backend via RESTful JSON HTTP requests. Data is processed by domain-specific services and persisted to an asynchronous file-based storage engine.

### Frontend, Backend, Database, and API Flow

```mermaid
graph TD
    subgraph Frontend [Client Layer - React SPA]
        UI[Dashboard / Minecraft Module]
        Router[React Router DOM]
        API_Client[api() HTTP Wrapper]
    end

    subgraph Backend [Server Layer - Express API]
        Server[Express Server port 5000]
        Routes[API Routes: /scenarios, /sessions, /analytics, /roadmap]
        Engine[Learning Engine Service]
        Store[Store Data Access Layer]
    end

    subgraph Storage [Persistence Layer]
        DB[(db.json Document Store)]
        RoadmapData[roadmap.js]
    end

    UI -->|Navigate| Router
    UI -->|User Actions & Reasoning| API_Client
    API_Client -->|POST /api/sessions| Server
    API_Client -->|GET /api/*| Server
    Server -->|Route Request| Routes
    Routes -->|Analyze Reasoning| Engine
    Engine -->|Abstraction & Code Gen| Routes
    Routes -->|Read / Write| Store
    Store -->|Atomic I/O| DB
    Routes -->|Read Milestones| RoadmapData
    Routes -->|JSON Response| API_Client
    API_Client -->|State Update| UI
```

### Request Lifecycle Example (Session Submission)
1. **User Action:** The learner types their reasoning into the dashboard form and clicks "Generate Python construct".
2. **API Dispatch:** The client's `api()` wrapper sends a `POST` request to `http://localhost:5000/api/sessions` containing the `scenarioId`, `reasoning`, and `promptText`.
3. **Route Handling:** `server/src/routes/sessions.js` validates the scenario existence via `store.getScenario()`.
4. **AI Evaluation:** The route invokes `learningEngine.js` methods:
   - `mapReasoning()` extracts key concepts and abstraction mappings.
   - `generateCode()` synthesizes Python syntax based on mapped signals.
   - `evaluatePrompt()` scores prompt clarity and generates actionable feedback.
   - `detectMisconceptions()` flags conceptual errors (e.g., confusing lists with tuples).
5. **Persistence:** The aggregated session object is committed to `db.json` via `store.addSession()`.
6. **Client Refresh:** The server returns a `201 Created` status with the session object. The client automatically re-fetches dashboard analytics to reflect progress.

---

## Features

### 1. Scenario Browser & Filtering
- **Description:** Allows learners to browse curated real-world programming scenarios (e.g., Foodpanda order validation, ATM cash dispensing) and filter them by search queries, difficulty levels, or core Python concepts.
- **How it works:** Filters update React state (`filters`), triggering an effect that queries `GET /api/scenarios?q=...&difficulty=...`.
- **Related Files:** `client/src/main.jsx`, `server/src/routes/scenarios.js`, `server/src/data/store.js`.
- **User Flow:** User selects a concept tag -> Dashboard re-renders scenario list -> User clicks a scenario card to view details.

### 2. Interactive AI Session Submission
- **Description:** Learners articulate problem-solving logic in plain English before seeing Python syntax.
- **How it works:** Captures learner reasoning and self-reflection, sends it to the local learning engine for deterministic heuristic analysis, and outputs structured Python code accompanied by mastery signals.
- **Related Files:** `client/src/main.jsx`, `server/src/routes/sessions.js`, `server/src/services/learningEngine.js`.
- **User Flow:** User selects scenario -> Types reasoning and prompt text -> Clicks Generate -> Receives instant code translation, prompt score, and misconception analysis.

### 3. Progress Analytics & Misconception Dashboard
- **Description:** A real-time telemetry panel displaying total scenarios completed, average prompt maturity scores, mastery signal distributions, and common misconception frequencies.
- **How it works:** Aggregates all historical sessions from `db.json` and computes frequency distributions across concept tags and error flags.
- **Related Files:** `client/src/main.jsx`, `server/src/routes/analytics.js`.
- **User Flow:** Automatically loads on dashboard initialization and updates seamlessly after every session submission.

### 4. Interactive Minecraft Lists Learning Module
- **Description:** A comprehensive, gamified suite teaching Python List data structures through Minecraft inventory management.
- **How it works:** Decoupled into two distinct learning modes:
  - **Survival Mode:** A 9-step interactive story teaching `[]`, `append()`, `len()`, `insert()`, `pop()`, and `sort()`. Features flexible input validation accepting **both common English** (e.g., `"add wood"`, `"remove sword"`) **and Python code**, with dynamic step instructions and error hints.
  - **Creative Sandbox:** An open experimentation playground supporting all 17 standard Python list operations with custom form inputs, real-time Big-O time complexity badges, and a simulated Python REPL history log.
  - **FLIP Animation Engine:** Uses React `useLayoutEffect` to calculate bounding client rectangles before DOM paint, creating smooth sliding and reordering animations without external libraries.
- **Related Files:** `client/src/pages/MinecraftList/*`, `client/src/main.jsx`.
- **User Flow:** User clicks "PLAY MINECRAFT LISTS" in sidebar -> Completes guided Survival Mode story -> Navigates to Creative Sandbox -> Experiments with complex list slicing and sorting.

---

## Pages

### 1. Main Dashboard (`/`)
- **Purpose:** Serves as the primary landing page and command center for the PyBe learning journey.
- **Components Used:** `App` (in `main.jsx`), Lucide React icons (`Brain`, `Play`, `Sparkles`, `Lightbulb`, `ChartNoAxesCombined`, `Code2`, `Compass`).
- **Routes:** `/`
- **Functionality:** 
  - Displays scenario sidebar with real-time search and concept tag filters.
  - Renders active scenario details and reasoning submission form.
  - Showcases generated Python code, prompt maturity scores, and AI feedback.
  - Presents live analytics overview and recent learning session logs.
  - Renders staged product roadmap milestones from V0 to V3.

### 2. Minecraft Lists Module (`/minecraft-list`)
- **Purpose:** Provides a gamified, visual environment for mastering Python List operations.
- **Components Used:** `MinecraftList`, `SurvivalMode`, `CreativeSandbox`, `Stage`.
- **Routes:** `/minecraft-list`
- **Functionality:**
  - **Welcome View:** Explains the analogy between Python lists and Minecraft inventory hotbars.
  - **Survival Mode View:** Guided narrative advancing through 9 structured stages of inventory manipulation.
  - **Creative Sandbox View:** Full interactive suite to execute 17 distinct list operations with custom parameters and Big-O complexity feedback.
  - **Tab Navigation:** Seamless in-memory switching between Welcome, Story, and Sandbox modes without page reloading.

---

## Components

### 1. `App` (`client/src/main.jsx`)
- **Purpose:** The root dashboard view orchestrating data fetching, filtering, and form state for scenario-driven learning.
- **Props:** None
- **State:** `scenarios`, `selected`, `sessions`, `analytics`, `roadmap`, `filters`, `form`, `activeResult`, `loading`, `submitting`.
- **Dependencies:** `react`, `react-router-dom`, `lucide-react`.
- **Related Files:** `client/src/styles.css`, `server/src/routes/*`.

### 2. `MinecraftList` (`client/src/pages/MinecraftList/MinecraftList.jsx`)
- **Purpose:** Main container for the Minecraft Lists module; manages view switching and global Minecraft styling wrapper.
- **Props:** None
- **State:** `activeTab` (`'welcome' | 'story' | 'sandbox'`).
- **Dependencies:** `react`, `lucide-react`, `SurvivalMode`, `CreativeSandbox`, `Stage`.
- **Related Files:** `MinecraftList.css`, `hero_backpack.jpg`.

### 3. `SurvivalMode` (`client/src/pages/MinecraftList/components/SurvivalMode.jsx`)
- **Purpose:** Renders the 9-step guided narrative teaching fundamental list operations.
- **Props:** 
  - `onSandboxSwitch` (Function): Callback to switch `activeTab` to `'sandbox'` upon story completion.
- **State:** `items`, `currentStepIndex`, `inputValue`, `feedback`, `highlight`, `codeLine`, `lenPill`.
- **Dependencies:** `react`, `Stage`.
- **Related Files:** `Stage.jsx`, `MinecraftList.css`.

### 4. `CreativeSandbox` (`client/src/pages/MinecraftList/components/CreativeSandbox.jsx`)
- **Purpose:** Renders the 17-operation experimentation playground with dynamic form inputs and REPL history logs.
- **Props:** None
- **State:** `items`, `speed`, `history`, `codeLine`, `opPill`, `highlight`, `errBanner`, `explainData`, `formValues`.
- **Dependencies:** `react`, `Stage`.
- **Related Files:** `Stage.jsx`, `MinecraftList.css`.

### 5. `Stage` (`client/src/pages/MinecraftList/components/Stage.jsx`)
- **Purpose:** Pure presentation component rendering the visual Minecraft hotbar grid and executing FLIP layout animations.
- **Props:**
  - `items` (Array): List of item objects `{id, value, icon}` to render in hotbar slots.
  - `highlight` (Object | null): Animation metadata `{type, ids, bounceIds}` triggering visual effects.
  - `codeLine` (String): Current Python syntax string displayed in top code banner.
  - `metaPills` (Array): Array of badge objects `{text, color}` displayed above hotbar.
  - `speed` (Number): Animation playback speed multiplier (default `1`).
- **State:** `bouncingIds` (tracked internally for bounce micro-animations).
- **Dependencies:** `react` (`useLayoutEffect`, `useRef`).
- **Related Files:** `MinecraftList.css`.

---

## API Documentation

All API endpoints are prefixed with `http://localhost:5000/api` (or the URL defined in `VITE_API_URL`). All requests and responses communicate in `application/json`.

### 1. List Scenarios
- **Method:** `GET`
- **Route:** `/scenarios`
- **Description:** Retrieves a list of available programming scenarios, optionally filtered by search string, concept, or difficulty.
- **Query Parameters:**
  - `q` (optional): Full-text search string matching title, summary, or description.
  - `concept` (optional): Filter by Python concept tag (e.g., `'List'`, `'Dictionary'`, `'Loop'`).
  - `difficulty` (optional): Filter by difficulty (`'Beginner' | 'Intermediate' | 'Advanced'`).
- **Request Body:** None
- **Response:** `200 OK`
  ```json
  [
    {
      "_id": "sc-1",
      "title": "Foodpanda Order Dispatch",
      "difficulty": "Beginner",
      "concepts": ["Conditionals", "State Validation"],
      "summary": "Prevent dispatching orders before payment confirmation.",
      "description": "Full problem description...",
      "starterPrompt": "How do we check if payment is valid?"
    }
  ]
  ```
- **Error Responses:** `500 Internal Server Error` (if filesystem read fails).

### 2. Create Scenario
- **Method:** `POST`
- **Route:** `/scenarios`
- **Description:** Adds a new learning scenario to the database.
- **Request Body:**
  ```json
  {
    "title": "ATM Cash Dispenser",
    "difficulty": "Beginner",
    "concepts": ["Math", "Conditionals"],
    "summary": "Calculate note dispensing accurately.",
    "description": "Ensure balance covers withdrawal..."
  }
  ```
- **Response:** `201 Created` (returns created scenario object with generated `_id`).
- **Error Responses:** `400 Bad Request` (if required fields are missing), `500 Internal Server Error`.

### 3. Get Single Scenario
- **Method:** `GET`
- **Route:** `/scenarios/:id`
- **Description:** Retrieves full details for a specific scenario by ID.
- **Request Body:** None
- **Response:** `200 OK` (returns scenario object).
- **Error Responses:** `404 Not Found` (`{ "message": "Scenario not found" }`), `500 Internal Server Error`.

### 4. List Sessions
- **Method:** `GET`
- **Route:** `/sessions`
- **Description:** Retrieves a list of the 30 most recent learning sessions submitted by users.
- **Request Body:** None
- **Response:** `200 OK` (returns array of session objects enriched with scenario summary data).
- **Error Responses:** `500 Internal Server Error`.

### 5. Submit Learning Session
- **Method:** `POST`
- **Route:** `/sessions`
- **Description:** Submits learner reasoning and prompt text for local deterministic AI evaluation, construct generation, and scoring.
- **Request Body:**
  ```json
  {
    "scenarioId": "sc-1",
    "learnerName": "Jane Doe",
    "reasoning": "First we check if order.paid is true. If yes, we append to dispatch queue.",
    "promptText": "Write a python function to validate payment before dispatching.",
    "reflection": "I realized order matters when checking conditions."
  }
  ```
- **Response:** `201 Created`
  ```json
  {
    "_id": "sess-1784823000000-abc1",
    "learnerName": "Jane Doe",
    "scenario": "sc-1",
    "reasoning": "First we check if order.paid is true...",
    "promptText": "Write a python function...",
    "abstractionMap": [
      { "signal": "check if", "pythonConcept": "Conditionals", "explanation": "Maps logic to if/else." }
    ],
    "generatedCode": "def handle_order(order):\n    if order.paid:\n        dispatch(order)",
    "codeExplanation": ["Conditionals: Maps logic to if/else."],
    "promptScore": 85,
    "promptFeedback": "Clear goal and constraint definition.",
    "reflection": "I realized order matters...",
    "misconceptions": [],
    "masterySignals": ["Conditionals", "High Prompt Maturity"],
    "createdAt": "2026-07-25T21:00:00.000Z"
  }
  ```
- **Error Responses:** `404 Not Found` (`{ "message": "Scenario not found" }`), `500 Internal Server Error`.

### 6. Get Analytics Overview
- **Method:** `GET`
- **Route:** `/analytics`
- **Description:** Aggregates telemetry across all historical sessions to report platform-wide learning metrics.
- **Request Body:** None
- **Response:** `200 OK`
  ```json
  {
    "scenarioCount": 12,
    "sessionCount": 45,
    "averagePromptScore": 78,
    "conceptCounts": { "Conditionals": 20, "List": 15, "Loop": 10 },
    "misconceptionCounts": { "Confusing List and Tuple immutability": 3 },
    "recentSessions": [ /* 5 most recent session objects */ ]
  }
  ```
- **Error Responses:** `500 Internal Server Error`.

### 7. Get Product Roadmap
- **Method:** `GET`
- **Route:** `/roadmap`
- **Description:** Returns the staged development roadmap milestones for PyBe.
- **Request Body:** None
- **Response:** `200 OK` (returns array of roadmap stage objects from `V0` to `V3`).
- **Error Responses:** `500 Internal Server Error`.

---

## Database

PyBe utilizes a lightweight, zero-configuration local JSON storage engine located at `server/src/data/db.json`. This database is accessed and manipulated asynchronously via `server/src/data/store.js`.

### Why Local JSON Storage?
To maintain prototype agility and enable 100% offline functionality without Docker containers, external DBMS setup, or cloud database connection strings, all records are stored in a structured JSON document. The storage engine uses atomic write operations and promise-based I/O (`fs.promises`) to ensure data integrity during development.

### Collections / Tables
The root `db.json` document contains two primary collection arrays:
1. `scenarios`: Array of scenario documents.
2. `sessions`: Array of user session documents.

*(Note: Roadmap data is static and served directly from `server/src/data/roadmap.js`).*

### Models & Important Fields

#### 1. Scenario Schema
| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | String (UUID / Slug) | Unique identifier for the scenario (e.g., `'sc-1'`). |
| `title` | String | Human-readable scenario title. |
| `difficulty`| String | Categorization: `'Beginner' | 'Intermediate' | 'Advanced'`. |
| `concepts` | Array of Strings | Python concept tags associated with the challenge. |
| `summary` | String | Concise one-sentence overview of the problem. |
| `description`| String | Full problem context, constraints, and requirements. |
| `starterPrompt`| String| Suggested initial question to guide learner reasoning. |

#### 2. Session Schema
| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | String (Timestamp+Random)| Unique session identifier (e.g., `'sess-1784823000-a1b2'`). |
| `learnerName`| String | Name of the learner submitting the session (default `'Guest learner'`). |
| `scenario` | String (Foreign Key)| References `_id` of the associated scenario in `scenarios` array. |
| `reasoning` | String | Plain English explanation of the problem-solving logic submitted by user.|
| `promptText` | String | The actual prompt drafted by the user for code generation. |
| `abstractionMap`| Array of Objects| Result of AI mapping: `[{signal, pythonConcept, explanation}]`. |
| `generatedCode`| String | Executable Python code synthesized from reasoning and prompt. |
| `codeExplanation`| Array of Strings| Step-by-step breakdown of generated code constructs. |
| `promptScore`| Number (0-100) | Evaluated quality and clarity score of `promptText`. |
| `promptFeedback`| String | Actionable advice on how to improve prompt clarity. |
| `reflection` | String | Learner self-reflection notes after viewing generated code. |
| `misconceptions`| Array of Strings| Detected conceptual flaws or syntax misunderstandings. |
| `masterySignals`| Array of Strings| Positive indicators of conceptual mastery demonstrated in session. |
| `createdAt` | String (ISO Date)| Timestamp of session creation. |

### Relationships
- **One-to-Many (`Scenario` -> `Session`):** A single scenario can have multiple user sessions associated with it. The `session.scenario` field acts as a foreign key pointing to `scenario._id`. During session listing (`GET /api/sessions`), the server performs an in-memory join to attach scenario title and difficulty metadata to each session record.

---

## Installation

### Prerequisites
- **Node.js:** Version 18.0.0 or higher
- **Git:** Version control system

### Installation Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/abhijeetjanbandhu123/pybe.git
   cd pybe
   ```
2. **Install all workspace dependencies:**
   The root `package.json` provides an automated script to install dependencies for both frontend and backend simultaneously:
   ```bash
   npm run installAll
   ```
   *(Alternatively, run `npm install --prefix server` followed by `npm install --prefix client`).*

### Environment Variables
1. Copy the backend example environment file:
   ```bash
   cp server/.env.example server/.env
   ```
2. Default environment variable values in `server/.env`:
   ```env
   PORT=5000
   CLIENT_URL=http://localhost:5173
   ```
3. *(Optional)* Frontend environment variable in `client/.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   *(If omitted, the client defaults to `http://localhost:5000/api` automatically).*

### Seeding Initial Data
To populate `db.json` with initial curated scenarios and sample learning sessions, run:
```bash
npm run seed
```
This script executes `server/src/data/seed.js`, overwriting `db.json` with clean state data from `scenarios.js`.

### Running Locally
To launch both the Express backend API and the Vite React development server concurrently:
```bash
npm run dev
```
- **Frontend SPA:** Access at `http://localhost:5173`
- **Backend API Server:** Access at `http://localhost:5000/api`

### Production Build
To create an optimized production build of the React client:
```bash
npm run build --prefix client
```
The compiled, minified static HTML/JS/CSS assets will be output to `client/dist/`. To preview the production build locally:
```bash
npm run preview --prefix client
```

#### Vercel Production Deployment
PyBe is pre-configured for seamless deployment on Vercel as a Monorepo:
1. When importing the Git repository in Vercel, set the **Root Directory** to `client` in the Vercel Dashboard project settings, **OR** rely on the provided root `vercel.json` which automatically sets:
   - **Build Command:** `cd client && npm install && npm run build`
   - **Output Directory:** `client/dist`
2. The included `vercel.json` rewrite rules guarantee that Single Page Application (SPA) client routing (`/minecraft-list`) functions flawlessly without throwing `404 NOT_FOUND` errors upon direct page loading or refreshing.

---

## Design Decisions

### 1. Scenario-First vs. Syntax-First
Traditional programming tutorials begin with abstract syntax rules (`for i in range(10):`), which often alienate beginners. PyBe adopts a **Scenario-First** philosophy inspired by real-world engineering failures (such as the Foodpanda payment verification exploitation case study). By presenting a concrete problem first, learners understand the *why* before executing the *how*.

### 2. Rhizomatic Learning over Linear Tutorials
PyBe rejects rigid, non-skippable tutorial tracks in favor of **Rhizomatic Learning**. Learners explore concepts non-linearly based on curiosity. A user can jump directly into the Minecraft Lists Creative Sandbox to test `sort()` complexity, or explore ATM cash dispensing algorithms on the main dashboard without being forced through prerequisite beginner modules.

### 3. Local Deterministic Learning Engine
Rather than relying on OpenAI or Anthropic LLM API endpoints—which introduce latency, cost, and API key management barriers for students—PyBe implements a deterministic, heuristic-based learning engine (`learningEngine.js`). By using intelligent keyword mapping and regex pattern matching, the platform delivers **instantaneous, zero-latency feedback**, prompt scoring, and construct synthesis while remaining 100% functional in offline environments.

### 4. FLIP Animation Engine in React (`Stage.jsx`)
To create premium, gamified visual feedback in the Minecraft Lists module without bloating the client bundle with heavy third-party animation libraries (like Framer Motion or GSAP), PyBe natively implements the **FLIP (First, Last, Invert, Play)** animation algorithm using React's `useLayoutEffect` hook. 
- **Why `useLayoutEffect`?** It allows the application to capture DOM node bounding rectangles immediately after state changes but *before* the browser paints the screen. By applying reverse CSS transforms (`Invert`) and transitioning to zero (`Play`), PyBe achieves buttery-smooth 60fps array reordering animations.

### 5. Common English Natural Language Support
In the Minecraft Lists Survival Mode, early testing revealed that forcing users to type strict Python syntax (`inventory.append('Wood')`) created unnecessary friction during conceptual learning. The input validation architecture was redesigned to accept **both common English** (`"add wood"`, `"append wood"`, `"create empty list"`, `"check length"`, `"remove sword"`) **and strict Python syntax**. This lowers the cognitive load for absolute beginners while bridging natural human intent to formal code syntax.

### 6. Monorepo Architecture with SPA Rewrites
Structuring PyBe as a MERN monorepo keeps frontend presentation and backend services tightly coupled in version control. To overcome common static hosting pitfalls where client-side routes (like `/minecraft-list`) fail on Vercel with 404 errors, custom `vercel.json` configuration files were introduced to enforce wildcard URL rewrites (`/(.*) -> /index.html`), ensuring robust Single Page Application navigation.

---

## Future Improvements

- **User Authentication & Profiles:** Implement JWT-based or OAuth authentication (GitHub/Google) to allow individual learners to save progress across devices.
- **Database Migration (PostgreSQL / MongoDB):** Migrate from the local file-backed `db.json` engine to a cloud-hosted relational or document database (such as MongoDB Atlas or Supabase PostgreSQL) to support high-concurrency multi-user traffic.
- **Optional Hybrid LLM Integration:** Provide an optional environment variable toggle (`ENABLE_CLOUD_LLM=true`) to connect OpenAI/Claude APIs for open-ended code debugging, while retaining the local deterministic engine as a fail-safe offline fallback.
- **Python AST / WebAssembly Execution:** Integrate Pyodide (WebAssembly Python runtime) into the Creative Sandbox, allowing learners to execute real Python scripts directly in their browser memory with live console output.
- **Community Scenario Editor:** Create a user-facing builder UI enabling teachers and community mentors to author, tag, and publish new custom learning scenarios with automated validation test cases.

---

## Known Issues

- **Local JSON Concurrency Limitations:** Because the database relies on asynchronous file I/O (`fs.promises.writeFile`) against `db.json`, high-concurrency simultaneous writes in a multi-user environment may lead to race conditions or file lock contention. This is acceptable for local prototyping and single-learner usage but requires a true DBMS for large classroom deployments.
- **In-Memory State Reset on Backend Restart:** Any in-memory caching or active server connections will reset if the Node.js process restarts. Persistent data remains safe in `db.json`, but ongoing incomplete session drafts not yet submitted via `POST /api/sessions` will be lost upon page refresh.
- **Sandbox REPL Simulation Bounds:** In the Minecraft Lists Creative Sandbox, the code execution history log is simulated visually based on list operations rather than running an actual underlying Python interpreter. Syntax errors outside the 17 predefined list operations are caught by form validation rather than Python compiler traceback.

---

## Developer Notes

### 1. Adding New Learning Scenarios
To add a new learning scenario permanently without using the UI form:
1. Open `server/src/data/scenarios.js`.
2. Add a new scenario object following the Scenario Schema (ensure `_id` is unique, e.g., `'sc-13'`).
3. Run `npm run seed` in your terminal to re-initialize `db.json` with the new scenario included.

### 2. Extending the Local Learning Engine
If you add new Python concepts (e.g., `'Object-Oriented'`, `'Recursion'`) and want the AI mentor to recognize them:
1. Open `server/src/services/learningEngine.js`.
2. Locate the `CONCEPT_PATTERNS` object and add regex keyword triggers:
   ```javascript
   'Recursion': /recurse|base case|call itself|infinite loop|stack/i,
   'Object-Oriented': /class|object|instance|method|inherit|encapsulate/i
   ```
3. Locate `MISCONCEPTION_RULES` to add custom error detection heuristics for your new concepts.

### 3. Adding Operations to Minecraft Lists Sandbox
To add a new list operation (e.g., `list.pop(index)`) to the Creative Sandbox:
1. Open `client/src/pages/MinecraftList/components/CreativeSandbox.jsx`.
2. Add the operation metadata to the `OPS` constant dictionary (define label, color category, and Big-O complexity badge).
3. Add a corresponding UI configuration object to the `OP_GROUPS` array specifying form input fields (`type`, `label`, `placeholder`).
4. In the `handleRunOp` function, add a `case` block handling the state mutation and calling `setHighlight()` to trigger FLIP animations on the target item IDs.

### 4. Vercel & Monorepo Routing Troubleshooting
If future Pull Requests or branch deployments experience `404 NOT_FOUND` errors when refreshing pages on Vercel:
- Verify that `vercel.json` exists in the **root** directory with exact rewrite rules: `"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]`.
- Ensure that the Vercel project settings do not override the build output directory to an incorrect path; it must point to `client/dist` when building from the repository root.

---

*Documentation maintained by PyBe Core Engineering Team. Always update this file atomically when committing structural, architectural, or API modifications.*
