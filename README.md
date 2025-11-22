# Inkle — Taxes Dashboard

> Frontend intern assignment — a small React app that lists tax entries, lets you edit name and country, and updates the backend via API.

Live demo: https://inkle-teal.vercel.app/

Repository: https://github.com/keerthijk193/Inkle

## Summary

This project implements a responsive table UI using `@tanstack/react-table`, a modal for editing entries, and API helpers for fetching/updating data. The UI follows the provided Figma closely while prioritizing accessibility and a simple, maintainable code structure.

Key points

- Table: implemented with `@tanstack/react-table`.
- Edit modal: uses `react-modal` for accessibility; allows changing `name` and `country` (country list fetched from API).
- API: `src/api/api.js` provides `getTaxes()`, `getCountries()`, and `updateTax(id, payload)` using `axios`.
- State: `src/hooks/useTaxes.js` centralizes fetching, editing, saving, and provides `refetch()` and a small success message UI.
- Styling: uses lightweight CSS with `Inter` font; responsive tweaks and a card layout provide an aesthetic look.

## Features implemented

- GET taxes and countries from the provided mock APIs.
- Edit a tax row using a modal and submit updates with `PUT /taxes/:id`.
- Empty state with a refresh button.
- Success confirmation message after saving.
- Right-aligned Rate column and truncation for long text for better responsiveness.

## APIs

- Taxes: `https://685013d7e7c42cfd17974a33.mockapi.io/taxes`
- Countries: `https://685013d7e7c42cfd17974a33.mockapi.io/countries`

## Run locally

1. Clone the repository (if not already):

```powershell
git clone https://github.com/keerthijk193/Inkle.git
cd Inkle
```

2. Install dependencies:

```powershell
npm install
```

3. Run the dev server:

```powershell
npm run dev
```

4. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Build & preview production

```powershell
npm run build
npm run preview
```

## Deploy (Vercel - recommended)

1. Push your `main` branch to GitHub (already done):

```powershell
git push -u origin main
```

2. Go to https://vercel.com and import the GitHub repository `keerthijk193/Inkle`.
3. Use the detected settings (Framework: Vite). Deploy — Vercel will provide a public URL.

Alternative (Netlify): Connect the repo on Netlify, use the default build command `npm run build` and publish directory `dist`.

## Approach & decisions

- I used a small hook `useTaxes` to encapsulate data fetching and update logic, keeping components focused on presentation.
- `@tanstack/react-table` was used per the assignment requirement for a robust table implementation.
- `react-modal` was chosen for accessible modal handling out of the box.
- Styling remains minimal CSS (with Inter font) so it is easy to adapt to pixel-perfect Figma styling if needed.

## Challenges & notes

- The mock API returns variable shapes for tax entries; the table's Rate column attempts common keys (`rate`, `tax`, `taxPercentage`, `value`) to remain resilient.
- CORS and network access are dependent on the mock API availability (the supplied mock API is public and was used during development).

## Next improvements (optional)

- Pixel-perfect matching with Figma (exact spacing, weights, and icons).
- Add toast notifications with a small library for consistent UX.
- Add pagination/virtualization for large datasets.
- Add tests for the hook and table behavior.

---

If you want, I can deploy the site to Vercel and paste the live URL in this README, or iterate further on UI polish based on the Figma design.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
