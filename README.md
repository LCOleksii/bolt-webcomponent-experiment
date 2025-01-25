# Web Component Experiment

A modular web component system built with Svelte and Rollup, supporting multiple variants and development workflows.

## Features

- Shadow DOM encapsulation
- Multiple variant support
- Hot module replacement
- Svelte components
- TamperMonkey integration for testing
- Configurable targeting system

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Development:
```bash
npm run dev
```

3. Build:
```bash
npm run build
```

4. Local testing:
```bash
npm run start
```

## Development Workflow

1. Enable development mode by setting `lc-dev=1` cookie
2. Install TamperMonkey script from `tampermonkey.config`
3. Run local development server
4. Visit target page with TamperMonkey script enabled

## Creating New Variant

1. Create new directory in `src/variants/{variant_name}`
2. Copy template files from existing variant
3. Update configuration in `config.js`
4. Add components in `controllers/`
5. Update `App.svelte` with new views

## Project Structure

```
├── src/
│   ├── utils/                    # Shared utility functions
│   │   ├── classwatcher.js      # DOM class change observer
│   │   ├── common.js            # Common helper functions
│   │   ├── cookies.js           # Cookie management
│   │   ├── customElement.js     # Web component setup
│   │   ├── dom.js               # DOM manipulation
│   │   ├── store.js             # State management
│   │   └── targeting.js         # Component targeting logic
│   └── variants/                # Component variants
│       └── variant_1/           # Example variant
│           ├── controllers/     # Svelte components
│           ├── App.svelte       # Main component
│           ├── config.js        # Variant configuration
│           ├── global.css       # Global styles
│           ├── main.js          # Entry point
│           └── webcomponent.js  # Web component registration
├── rollup.config.js             # Build configuration
├── rollup.script.js             # Build utilities
├── package.json                 # Dependencies
└── tampermonkey.config          # Development testing
```

## Configuration

Component configuration in `config.js`:
```javascript
export let config = {
    components: {
        "component-name": {
            where: "beforebegin",
            view: "viewname",
            target: () => document.querySelector(".target"),
            condition: () => true
        }
    }
}
```

## Contributing

1. Branch naming: `feature/name` or `fix/name`
2. Run tests before committing
3. Follow existing code style
4. Update documentation

## Scripts

- `npm run dev` - Development with HMR
- `npm run build` - Production build
- `npm run start` - Local server
- `npm run sdev` - HTTPS development server

## Requirements

- Node.js 14+
- NPM 6+