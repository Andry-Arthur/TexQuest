# TexQuest: Pre-Release TODO

This document outlines the key improvements and features to be completed before the next release. Each item will later be tracked as a separate issue. Contributors are encouraged to discuss, suggest, and claim tasks as appropriate.

---

## 1. Use Local LLAMA 4 Model
- **Goal:** Replace or supplement the current AI grading system with a locally hosted LLAMA 4 model.
- **Tasks:**
  - Research and select an appropriate LLAMA 4 implementation.
  - Integrate the model into the grader microservice.
  - Update documentation and environment setup instructions.
  - Ensure performance and accuracy are on par with or better than the current solution.

## 2. Add Admin Functionality
- **Goal:** Implement an admin panel for managing users, contests, and submissions.
- **Tasks:**
  - Design and build secure admin authentication.
  - Create interfaces for contest and user management.
  - Add admin-only endpoints in the backend.
  - Write tests and documentation for admin features.

## 3. Permit Question Submission (No Points for Inactive Contests)
- **Goal:** Allow users to submit questions even when contests are inactive, but do not award points.
- **Tasks:**
  - Update backend logic to accept submissions for inactive contests.
  - Ensure no points are awarded for these submissions.
  - Clearly indicate contest status and scoring rules in the frontend UI.

## 4. Frontend Overhauls
- **Goal:** Improve the user interface and user experience across the platform.
- **Tasks:**
  - Redesign key pages for clarity and usability.
  - Refactor code for maintainability and scalability.
  - Ensure mobile responsiveness and accessibility.
  - Gather feedback and iterate on design.

## 5. About & Support Page
- **Goal:** Add an About & Support page to inform users about TexQuest and provide help resources.
- **Tasks:**
  - Write content describing the project, its goals, and the team.
  - Add contact/support information.
  - Link to documentation and FAQs.
  - Integrate the page into the main navigation.

## 6. Add Domain
- **Goal:** Deploy the application to a custom domain.
- **Tasks:**
  - Register and configure the desired domain.
  - Update deployment scripts and environment variables.
  - Ensure HTTPS and security best practices.
  - Test deployment and update documentation.

---

**Contributing:**  
If you are interested in working on any of these tasks, please comment on the relevant issue (once created) or reach out to the project maintainer.

---

_Last updated: 2024-06-09_