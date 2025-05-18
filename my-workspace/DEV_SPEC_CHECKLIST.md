# Development Specification & Review Checklist

## 1. Requirements & Design
- [ ] Is the feature/change clearly defined and documented (e.g., user story, ticket, or requirements doc)?
- [ ] Are acceptance criteria or expected behaviors documented?
- [ ] Is the solution designed to be modular, maintainable, and consistent with existing architecture?
- [ ] Are edge cases and error conditions considered and handled?

## 2. Code Quality
- [ ] Does the code follow the project’s coding standards (`CODING_STANDARDS.md`)?
- [ ] Are naming conventions, file structure, and formatting consistent?
- [ ] Are all new or changed files documented where appropriate?
- [ ] Are there no unnecessary commented-out or dead code blocks?
- [ ] Are all dependencies and imports necessary and up to date?

## 3. Functionality
- [ ] Does the code implement all required functionality?
- [ ] Are all acceptance criteria met?
- [ ] Are all user-facing changes reflected in the UI (if applicable)?
- [ ] Are error and loading states handled gracefully?

## 4. Unit Testing
- [ ] Are there unit tests for all new or changed logic (components, services, reducers, effects, etc.)?
- [ ] Do tests cover both positive and negative scenarios, including edge cases?
- [ ] Are tests clear, maintainable, and follow testing best practices?
- [ ] Do all tests pass locally?

## 5. Integration & Regression
- [ ] Does the change integrate cleanly with the rest of the codebase?
- [ ] Are there any potential side effects or regressions? If so, are they tested for?
- [ ] Are existing tests still passing?

## 6. Documentation & Communication
- [ ] Is the change documented in code comments, README, or other relevant docs?
- [ ] Are any configuration or environment changes documented?
- [ ] Are QA testers and stakeholders informed of what to test and any special instructions?

## 7. Accessibility & Security (if applicable)
- [ ] Are accessibility best practices followed for UI changes?
- [ ] Are there any security implications, and are they addressed?

---

**How to use:**  
Before sending code to QA, review this checklist and ensure each item is addressed.  
When requesting a code review from Copilot, mention you want it reviewed against `DEV_SPEC_CHECKLIST.md`.

---

_You can expand or tailor this checklist as your team’s needs evolve!_
