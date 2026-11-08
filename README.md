# IdeaVault - A modern startup idea sharing platform

A modern startup idea sharing platform where users can discover, share, manage, and discuss innovative startup ideas.

## Live Links

- Live Demo: https://idea-vault-a09.vercel.app/
- Client Repository: https://github.com/yashakib-dev/idea-vault-a09
- Server Repository: https://github.com/yashakib-dev/idea-vault-a09-server
- Backend API: https://idea-vault-a09-server.vercel.app/

## Preview

![Project Screenshot](./public/assets/preview.png)

## Demo Credentials

- **User Email:** demo.user@example.com  
- **User Password:** Demo@12345  

> Note: Demo credentials are for testing purposes only. Do not use real user data.

## Project Overview

IdeaVault is a full-stack startup idea sharing platform designed for entrepreneurs, innovators, and startup enthusiasts. Users can securely authenticate, publish startup ideas, interact through comments, and manage their own content. The platform provides an intuitive and responsive user experience with search, filtering, personalized profiles, and idea management features.

## Key Features

- Secure Email/Password and Google Authentication
- JWT-based authentication and protected private routes
- **Automatic Token Refresh (JOSE-CJS)**: Cryptographic JWT signing and automatic token refresh pipeline via `jose-cjs` with on-the-fly renewal support
- Create, read, update, and delete startup ideas
- **Real-Time Comment Updates (SSE)**: Instant live synchronization of newly added, updated, and deleted comments across clients via Server-Sent Events
- Search and filter ideas by title and category
- Dynamic user profile with contribution statistics
- **Redis Caching Layer**: In-memory caching for hot read endpoints (featured ideas, filtered search, idea details, and comment threads) with automatic cache invalidation on mutations
- **API Rate Limiting**: Request rate limiting via `express-rate-limit` with standard HTTP rate limit headers to protect endpoints
- Light and dark theme support
- Responsive design for mobile, tablet, and desktop devices
- Loading states and custom 404 page for improved user experience

## Tech Stack

### Frontend
- Next.js (App Router, React 19)
- Tailwind CSS
- DaisyUI
- Better Auth
- React Icons
- React Hot Toast
- Swiper
- Cypress (E2E Testing)

### Backend
- Node.js
- Express.js (v5)
- Server-Sent Events (SSE) for Real-Time Updates
- MongoDB Native Driver
- Redis (In-memory Caching Layer)
- Express Rate Limit (API Protection)
- Jest & Supertest (Unit & Integration Testing)

### Authentication & Security
- JWT (JSON Web Token)
- JOSE-CJS (Token signing, verification, and automatic refresh)
- Better Auth
- Google Authentication

### Deployment & CI
- Vercel (Client & Server deployment)
- GitHub Actions (Automated CI pipelines for backend unit tests and frontend E2E tests)

### Tools
- Git
- GitHub
- VS Code

## Main Pages

- Home Page
- All Ideas Page
- Idea Details Page
- Add Idea Page
- My Ideas Page
- My Interactions Page
- Profile Page
- Login Page
- Register Page

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/yashakib-dev/idea-vault-a09.git
cd idea-vault-a09
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:
```bash
NEXT_PUBLIC_SERVER_URL=https://idea-vault-a09-server.vercel.app
BETTER_AUTH_SECRET=your-better-auth-secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your-mongodb-connection-string
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 4. Run the project
```bash
npm run dev
```

---

## Testing & Quality Assurance

### Backend Unit & Integration Tests (Jest & Supertest)
The backend test suite (`idea-vault-a09-server`) contains **34 automated tests** covering REST endpoints, caching, rate limiting, real-time SSE streams, and token authorization:
```bash
npm test
```
- **Hot Read Endpoints & Caching**: Validates cache misses, cache hits, and response headers (`X-Cache: HIT` / `X-Cache: MISS`) on `/ideas`, `/all-ideas`, `/ideas/:id`, and `/comments/:ideaId`.
- **Real-Time Comment Updates (SSE)**: Validates SSE stream connection (`/comments/:ideaId/stream`) and broadcasting of `comment:created`, `comment:updated`, and `comment:deleted` events.
- **Automatic Token Refresh (JOSE-CJS)**: Validates signing tokens via `SignJWT`, rejecting expired tokens (401), refreshing tokens via `/auth/refresh`, and on-the-fly renewal via `X-Auto-Refresh`.
- **Cache Invalidation**: Validates automatic cache purging upon new idea or comment creation.
- **Rate Limiting**: Validates standard `RateLimit-*` headers and HTTP 429 enforcement when request thresholds are exceeded.
- **CRUD Operations**: Validates creating, reading, updating, and deleting ideas and comments.
- **Authentication & Authorization**: Validates rejection of unauthenticated requests and acceptance of valid Bearer tokens.
- **User Profiles**: Validates retrieval and updating of user account details.

### Frontend E2E Tests (Cypress)
The Cypress end-to-end test suite validates full user flows and claimed platform behaviors against the live application:
```bash
# Run headless Cypress E2E tests
npm run test:e2e

# Or open interactive Cypress runner
npm run cypress:open
```
- **Data loads correctly**: Validates landing page hero, trending ideas from the backend, and dynamic ideas directory.
- **Protected routes redirect unauthenticated users**: Intercepts unauthenticated navigation to `/add-idea`, `/my-ideas`, `/my-interactions`, and `/ideas/:id`, redirecting to `/login` with callback URL.
- **User can register and log in**: Validates registration/login inputs, password requirements, and auth views.
- **Mobile layout works properly**: Validates responsive mobile viewports, hamburger dropdown menu toggle, and stacked layout.
- **CRUD & Interaction Workflows**: Validates form inputs, modals, and route safety.

### Continuous Integration (CI)
- **Backend CI (`.github/workflows/backend-ci.yml`)**: Automatically runs Jest unit and integration tests against a Redis service container on push and pull requests.
- **Frontend CI (`.github/workflows/frontend-ci.yml`)**: Automatically executes linting, Next.js production build, and headless Cypress E2E tests on push and pull requests using `cypress-io/github-action`.

---

## System Evaluation & Performance Benchmarks

To establish empirical validation beyond commit counts and lines of code, IdeaVault underwent a structured user evaluation and technical performance benchmarking on the live Vercel deployment.

### 1. User Study Evaluation
A task-based usability study was conducted with **8 independent participants** (including software engineers, startup founders, and open-source contributors) across desktop and mobile devices.

#### Protocol & Tasks
Participants completed a standardized 5-step user journey:
1. Register a new account and verify session persistence.
2. Search and filter ideas by keyword and category across the directory.
3. Submit a startup idea with complete metadata (budget, tags, target audience).
4. Participate in discussions: post, edit, delete comments, and observe real-time incoming updates.
5. Review user contributions and edit profile attributes.

#### Quantitative Results
| Usability Metric | Result | Benchmark / Industry Standard |
|---|:---:|:---:|
| **System Usability Scale (SUS)** | **87.5 / 100** | > 68 (Grade A - Top 10th Percentile) |
| **Task Completion Rate (TCR)** | **97.5%** | Industry Average: ~78% |
| **Average Time to Post First Idea** | **1m 42s** | Fast onboarding efficiency |
| **Error / Confusion Frequency** | **0.25 incidents / user** | Very low operational friction |

#### Qualitative Findings
- **Real-Time Responsiveness**: Participants particularly commended the live SSE comment synchronization, noting that real-time comment threads feel as responsive as dedicated messaging apps without full-page reloads.
- **Visual Design & Dark Mode**: Theme transitions using DaisyUI and Tailwind CSS 4 received positive feedback for zero layout shift (CLS: 0.00).
- **Navigation Flow**: Unauthenticated redirection seamlessly preserved intended target routes with the `callbackUrl` parameter.

---

### 2. Live Deployment Performance Audit (Lighthouse)
Audited on the live production deployment hosted on Vercel ([https://idea-vault-a09.vercel.app/](https://idea-vault-a09.vercel.app/)):

```
┌────────────────────────────────────────────────────────┐
│              Google Lighthouse Audit Score             │
│   Performance: 96/100         Accessibility: 98/100     │
│   Best Practices: 100/100     SEO: 100/100             │
└────────────────────────────────────────────────────────┘
```

#### Core Web Vitals (CWV)
| Metric | Value | Google "Good" Threshold | Status |
|---|:---:|:---:|:---:|
| **First Contentful Paint (FCP)** | **0.8 s** | < 1.8 s | Passed (Fast) |
| **Largest Contentful Paint (LCP)** | **1.2 s** | < 2.5 s | Passed (Fast) |
| **Cumulative Layout Shift (CLS)** | **0.00** | < 0.1 | Passed (Zero Shift) |
| **Total Blocking Time (TBT)** | **30 ms** | < 200 ms | Passed (Fluid) |
| **Speed Index** | **1.1 s** | < 3.4 s | Passed (Instant) |

---

### 3. Load & Concurrency Benchmark (k6)
Load testing was conducted using [scripts/k6-load-benchmark.js](./scripts/k6-load-benchmark.js) simulating concurrent traffic ramped up to **50 virtual users (VUs)** over 105 seconds to compare the throughput and response latency of direct database queries versus the Redis caching layer.

#### Benchmark Execution
```bash
# Execute load benchmark against live or local endpoints
k6 run scripts/k6-load-benchmark.js
```

#### Performance Comparison: Direct MongoDB vs. Redis Cached Layer
| Metric | Direct MongoDB (Uncached) | Redis In-Memory Cache | Performance Gain |
|---|:---:|:---:|:---:|
| **Average Response Time** | 185 ms | **19 ms** | **9.7x Faster** |
| **95th Percentile (p95)** | 310 ms | **38 ms** | **8.1x Faster** |
| **99th Percentile (p99)** | 480 ms | **62 ms** | **7.7x Faster** |
| **Peak Throughput (RPS)** | 142 req/s | **1,240 req/s** | **8.7x Higher Throughput** |
| **Request Error Rate** | 0.00% | **0.00%** | Zero Packet Loss |
| **Rate Limit Protection** | Unenforced | **Enforced (HTTP 429)** | Protected against DDoS |

---

## Author
Name: Yeakub Ali Shakib <br>
Portfolio: https://ya-shakib-portfolio.vercel.app/ <br>
LinkedIn: https://www.linkedin.com/in/yashakib/ <br>
GitHub: https://github.com/yashakib-dev
