# Go Business - Referral Dashboard

## Live Demo

**Netlify Deployment:**
https://deploy-preview-1--referraldashboard2.netlify.app

A secure, responsive, and intuitive referral management system built for Go Business to help users track referrals, earnings, and partner activity through a structured dashboard.

This application is built in strict compliance with the project assessment guidelines and the provided React and Web Development syllabus.

## Project Description

The Referral Dashboard is a web application featuring a login gateway with JWT token session management, a secure dashboard displaying key overview metrics, a service summary table, custom share panels for referral link/code distribution, and a searchable, sortable list of referrals. Users can click any referral row to access a dynamic detail view or view a custom 404 page for invalid routes.

## Features

* **User Authentication**: Secure credentials verification using a REST API. Store JWT inside browser cookies.
* **Protected Routing**: Restricts the dashboard homepage and details view to logged-in users, while allowing public access to the login and 404 pages.
* **Overview Metrics**: Summary card grid detailing balances, discount percentages, total earnings, etc., directly pulled from the API.
* **Service Summary**: Visual breakdown of referred accounts and earnings associated with services.
* **Share referral panel**: Functional panel featuring quick copy-to-clipboard actions for links and codes.
* **All Referrals Table**:

  * Dynamic name/service queries.
  * Sort order customization (newest first / oldest first by date).
  * Client-side pagination (10 entries per page).
  * Showing X–Y of Z entries footer summary.
* **Referral Details**: Dynamic route utilizing URL parameters to fetch and show granular partner records.
* **Responsive Web Design**: Clean, fluid layout built using Bootstrap 5 utility classes and standard CSS Flexbox/Grid for mobile, tablet, and desktop viewports.

## Tech Stack

* **Core**: React 18 (Functional Components, Hooks, Context, createRoot)
* **Routing**: React Router DOM 6
* **Persistence**: js-cookie
* **Styling**: Bootstrap 5, Vanilla CSS3 (Custom Variables, Transitions)
* **API requests**: Native Fetch API
* **Tooling**: Vite, ESLint

## Folder Structure

```text
src/
├── components/         # Reusable layouts and route guards
│   ├── ProtectedRoute.jsx
│   ├── PublicRoute.jsx
│   ├── Navbar.jsx
│   └── Footer.jsx
├── pages/              # Routed view templates
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── ReferralDetail.jsx
│   └── NotFound.jsx
├── services/           # API integration handlers
│   └── api.js
├── styles/             # Application custom CSS
│   └── app.css
├── utils/              # Helper utilities
│   └── formatters.js
├── App.jsx             # Route definitions and Router config
└── main.jsx            # Application mount point
```

## Installation & Setup

1. Clone or extract the project files.
2. Navigate to the root directory and install dependencies:

```bash
npm install
```

## Run Instructions

Start the local Vite development server:

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## Build Instructions

Compile the application into optimized static assets under the `dist` folder:

```bash
npm run build
```

## Test Credentials

To log in and explore the dashboard, use the following credentials:

* **Email**: `admin@example.com`
* **Password**: `admin123`

## Deployment Instructions

### Netlify Deployment

**Live URL:**
https://deploy-preview-1--referraldashboard2.netlify.app

### Deploy to Vercel

1. Install the Vercel CLI globally or use the dashboard integration.
2. Run the deployment command in the project root:

```bash
vercel
```

3. Follow the CLI prompt instructions, accepting default settings.

## Assessment Requirements Covered

* [x] **React 18 & v6 Router Compatibility**: package.json updated to compatible React 18, React DOM 18, and React Router DOM 6 versions.
* [x] **BrowserRouter Setup**: App.jsx wraps `<Routes>` in `<BrowserRouter>`. main.jsx only mounts `<App />`.
* [x] **Auth Cookie Storage**: The JWT token returned from the sign-in API is stored as a cookie named `jwt_token`.
* [x] **Route Guards**: ProtectedRoute redirects unauthenticated users to `/login`. PublicRoute redirects logged-in users away from `/login`. Wildcard routes are public.
* [x] **API Filtering & Sorting**: Query parameters (`search` and `sort`) are wired to API requests during text searches and order adjustments.
* [x] **Client-side Pagination**: Divides the referrals array into pages of 10 rows. Integrates disabled state triggers on boundary pages and standard X–Y of Z format using the en-dash (`–`).
* [x] **Date Conversion**: Parses ISO dates (`YYYY-MM-DD`) and displays them as `YYYY/MM/DD`.
* [x] **USD Currency Formatting**: Configured the `Intl.NumberFormat` formatter to format profit values in USD (`$1,234` style) without decimals.
* [x] **Semantic Structure**: Uses standard semantic HTML5 elements like `<header>`, `<footer>`, `<main>`, `<nav>`, `<section>`, and `<dl>` for accessibility support.

#
