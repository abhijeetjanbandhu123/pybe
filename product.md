# PyBe Product & Feature Documentation

**Date:** June 25, 2026  
**Status:** In Progress (Preparing for PR)  
**Module:** DataVille Integration & AI Mentor Dashboard

## 1. System Design & Real-World Failures

### Design Philosophy
PyBe is designed with robust system architecture principles to prevent real-world failures. Inspired by the Foodpanda case study (where orders were dispatched before payment confirmation, leading to exploitation), all workflows in PyBe are logically sequenced.
- **State Validation:** Operations (like submitting a session for AI Mentor evaluation) strictly validate that a scenario is selected and reasoning is provided *before* making network calls.
- **Fail-Safe UIs:** UI loading states are wrapped in strict `try/finally` blocks so that if the backend goes down, the application recovers gracefully rather than freezing.

### Documentation Standards
As per our engineering principles, code must be heavily documented to ensure maintainability and low MTTR (Mean Time To Recovery).
- **JSDoc Headers:** Every functional React component, API utility, and helper function includes a comprehensive JSDoc header detailing its purpose, parameters, and return types.

### Logging & Error Handling
- Critical API fetch calls (`refresh()`, `submitSession()`) are wrapped in `catch` blocks that log explicit error messages to the console (with timestamps) for debugging.
- The `api()` wrapper standardizes error handling by parsing non-200 HTTP responses and rejecting promises with clear error texts.

---

## 2. Platform Design & "Rhizomatic Learning"

### Non-Linear Exploration
PyBe rejects the traditional linear tutorial model in favor of **Rhizomatic Learning**. Learners are not forced down a single path. Instead, the newly integrated **DataVille** module allows users to freely explore data structures based on their own curiosity.

### User Assessment
Before introducing complex syntax, the platform encourages users to articulate their reasoning in plain English (via the AI Mentor dashboard).
- If a user demonstrates advanced knowledge, they are free to skip basic tutorials (like the DataVille stories) and move straight to advanced Object-Oriented Programming (OOP) concepts via the `Roadmap`.

### Gamification & Scenarios
PyBe employs selective gamification to make abstract concepts tangible. The DataVille integration replaces sterile textbook definitions with vivid, memorable scenarios:
- **Captain List:** An interactive train conductor teaching ordered sequences, mutable elements, and indexing.
- **Queen Tuple:** A royal vault guardian teaching immutability and fixed memory layouts.
- **Professor Dictionary:** A magical librarian demonstrating O(1) key-value lookups.
- **Officer Set:** A strict club bouncer explaining unique elements and unordered collections.

---

## 3. Deep Dive Learning Paths

PyBe does not stop at high-level syntax; it explains the *why* behind the language mechanics.

### Memory Management
Through characters like Queen Tuple (immutable) versus Captain List (mutable), learners will explore how memory allocation works under the hood. 
- **C-Level Analogies:** The platform draws parallels between Python's memory model and low-level constructs (e.g., Structs vs. Unions), explaining how memory is shared or fixed.

### Compiler Mechanics
Future learning paths will introduce how Python compilers read code using **Stack data structures**.
- This includes explaining prefix vs. infix notation (e.g., why functional languages like Haskell use `+ 3 4` because it is computationally easier to parse, compared to `3 + 4`).

---

## Next Steps for the Team
- Review the newly integrated DataVille React components and their JSDoc headers.
- Test the fallback UI behavior when the backend server is offline.
- Prepare any final brainstorming ideas for the next class Discourse group discussion.
