# Widgets

Custom widgets for the InSided Community platform, built using the Widget SDK and Widget Registry system.

## Project Structure

```
Widgets/
├── widget_registry.json                    # Widget Registry JSON (the source of truth)
├── schema/
│   └── widget-registry.schema.json  # Validation schema (from community-backend)
├── src/
│   ├── types/
│   │   └── widget-sdk.d.ts          # TypeScript definitions for the Widget SDK
│   └── widgets/
│       └── welcome-banner/
│           ├── index.ts             # Widget entry point (init function)
│           └── styles.ts            # Scoped styles
├── dist/                            # Built ESM output (git-ignored)
├── scripts/
│   └── validate-registry.js         # Schema validation script
├── package.json
└── tsconfig.json
```

## Getting Started

```bash
npm install
```

## Commands

| Command          | Description                                      |
|------------------|--------------------------------------------------|
| `npm run build`  | Bundle widget source to ESM in `dist/`           |
| `npm run dev`    | Watch mode — rebuilds on file changes            |
| `npm run validate` | Validate `widget_registry.json` against the JSON schema |
| `npm run serve`  | Serve `dist/` locally on port 8080 with CORS     |

## How to Register in Community

### 1. Host the registry and widget bundle

Publish `widget_registry.json` and `dist/index.js` to a publicly accessible URL. For example:

```
https://your-cdn.example.com/widgets/widget_registry.json
https://your-cdn.example.com/widgets/dist/index.js
```

Update the `content.endpoint` in `widget_registry.json` to point to your actual API endpoint.

### 2. Register as a Customer Widget

1. Go to your Community **Control Panel**
2. Navigate to the **Widget Registry** section (requires community manager role + feature flag)
3. Add a new registry with:
   - **Registry alias**: `my-custom-widgets` (kebab-case)
   - **Registry URL**: `https://your-cdn.example.com/widgets/widget_registry.json`
4. The registry starts in **draft** status — activate it to make widgets appear in the Widget Library

### 3. Register as a Platform Widget (CC-managed)

1. Share the hosted registry URL with the CC team
2. CC developers add it as a `PlatformRegistryDefinition` in community-backend
3. Platform registries are always active — no manual activation needed
4. Updates are pushed via webhook (`POST /widget-registry-webhook`)

### 4. Add widget to a page

Once registered and active, the widget appears in the **Widget Library** in the page editor.
Drag it into any allowed container (`Full width` for this widget) and configure it using the widget-configuration panel.

## Adding a New Widget

1. Create a new folder under `src/widgets/your-widget-name/`
2. Implement the `init(sdk)` entry point following the Widget SDK contract
3. Add the widget definition to `widget_registry.json` under the `widgets` array
4. Add an esbuild entry in `package.json` scripts for the new widget
5. Run `npm run validate` to ensure the registry is valid
6. Build and deploy

## Widget SDK Contract

Every widget must follow this lifecycle:

```
whenReady() → render into getContainer() → respond to propsChanged → clean up on destroy
```

See `src/types/widget-sdk.d.ts` for the full SDK type definitions.

## Versioning

- **Patch/Minor** (e.g. `1.0.0` → `1.1.0`): Auto-merged into existing widget instances
- **Major** (e.g. `1.0.0` → `2.0.0`): Treated as a new widget — existing instances must be manually updated via Customization Mode
