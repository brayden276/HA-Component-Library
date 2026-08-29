# Home Assistant Component Library

TypeScript and Lit custom cards for Home Assistant Lovelace dashboards. This is the modernised component library that preserves the existing card types, configuration contracts, and visual behaviour of the original UI components.

The repository includes a local playground for inspecting cards without a running Home Assistant instance, using representative mock data.

## Inspect components locally

Requires Node.js 20+.

```bash
npm ci
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in a browser. The local playground renders the cards with mock Home Assistant data.

## Production bundle

`npm run build` creates the Home Assistant-ready bundle at `dist/ha-component-library.js`.
