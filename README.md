# Kafel Landing Page

The **Kafel Landing Page** is the public website for the Kafel donation wallet and ecosystem.
It explains the vision, showcases key features, and provides entry points for donors, partners,
and organizations.

---

## Features

- 🧭 Marketing landing page with sections (Hero, How it works, Features, FAQs, Contact)
- 🌍 Multi-language support (Arabic, English, etc.)
- 📱 Fully responsive layout (mobile-first)
- 🔗 Links to mobile apps, dashboard, and documentation
- 🖼️ Integration with Kafel branding (logos, colors, campaign visuals)

---

## Tech Stack

- **Front-end:** React (or static HTML/CSS/JS)
- **Build:** Vite / CRA / Next.js (depending on repo setup)
- **Styling:** CSS / SCSS / Tailwind / MUI (as used in project)

---

## Getting Started

### 1. Prerequisites

- Node.js (LTS)
- npm or yarn

### 2. Installation

```bash
git clone https://github.com/kafel-app-io-org/landing-page.git
cd landing-page
npm install
# or: yarn install
```

### 3. Environment Variables (optional)

If your landing page uses environment variables (e.g., for API forms, analytics):

```bash
cp .env.example .env
```

Example:

```env
VITE_CONTACT_API_URL=https://api.kafel.app/contact
VITE_ANALYTICS_ID=XXXXXXX
```

---

## Scripts

Typical scripts (check `package.json`):

```bash
# Development
npm run dev

# Production build
npm run build

# Preview built app
npm run preview
```

---

## Deployment

The landing page can be deployed as static assets to:

- Netlify, Vercel, Cloudflare Pages
- Nginx/Apache
- Shared hosting

Build and upload the `dist/` (or `build/`) directory:

```bash
npm run build
```

---

## Contributing

- Update content & translations via components / JSON files.
- Keep branding consistent with mobile app and dashboard.
- Open Pull Requests for content or design changes.

---

## License

Part of the **Kafel** platform. License terms defined by the organization.
