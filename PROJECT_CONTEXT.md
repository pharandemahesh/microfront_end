# Technical Map: Micro-Frontend Project

## Core Tech Stack
- **Frameworks:** React (v18), React Router DOM (v6)
- **State Management:** React Context / Local State (No external state management library explicitly defined)
- **Build Tools:** Webpack 5 (with Module Federation), Babel (`@babel/preset-react`, `@babel/preset-env`), NPM Workspaces (monorepo structure)

## Folder Architecture (NPM Workspaces)
This project is structured as a monorepo utilizing NPM workspaces. It consists of a container app (`host`) and several remote micro-frontend applications (`home`, `data`, `settings`).

### `host/`
The container/shell application. It runs on `localhost:3000` and is responsible for overall layout, routing, and asynchronously loading the remote applications. 
- `/src/index.js` & `/src/bootstrap.js`: Entry points for asynchronous loading required by Webpack Module Federation.
- `/src/App.js`: Main application layout integrating the remote components.

### `home/`
Remote micro-frontend for the Home section. It runs on `localhost:3001`.
- Exposes `./HomePage` (from `./src/Home.js`) via `remoteEntry.js`.

### `data/`
Remote micro-frontend for the Data section. It runs on `localhost:3002`.
- Handles data-related UI and logic. Exposes specific components for the host to consume.

### `settings/`
Remote micro-frontend for the Settings section. It runs on `localhost:3003`.
- Handles user or application settings. Exposes specific components for the host to consume.

### Within each workspace's `/src` directory:
- `index.js`: Standard Webpack entry point.
- `bootstrap.js`: Asynchronous bootstrap block, necessary for resolving shared dependencies before the main React application renders (crucial for Module Federation).
- `[ComponentName].js` (e.g., `App.js`, `Home.js`, `Data.js`, `Settings.js`): The primary React component.

## Coding Standards
- **Naming Conventions:** PascalCase for React components and their corresponding files (e.g., `Home.js`, `App.js`). camelCase for functions and variables.
- **Preferred Patterns:** 
  - **Module Federation:** Using Webpack 5's `ModuleFederationPlugin` to share dependencies like `react` and `react-dom` as singletons to reduce bundle size and prevent conflicts.
  - **Async Boundaries:** Using dynamic imports (`import('./bootstrap')`) in `index.js` to create asynchronous boundaries for module federation.
- **CSS Strategy:** Currently defaults to standard Vanilla CSS or inline styling, as no external CSS preprocessors (like Sass, LESS, or Tailwind) are configured in the Webpack setup.

## Key Dependencies & Entry Points
- **Entry Points:** The root entry point for running the development environment is the `package.json` in the root directory. Running `npm run start` triggers `concurrently` to boot up all 4 Webpack dev servers (`host`, `home`, `data`, `settings`).
- **Webpack Configs:** Each workspace has a `webpack.config.js` defining its role (host vs. remote) in the federation. (e.g., `host/webpack.config.js` defines remotes like `home@http://localhost:3001/remoteEntry.js`).
- Shared common webpack configuration is maintained in `webpack.common.js` at the root and merged in remote configs.
- **Key Dependencies:** `react`, `react-dom`, `react-router-dom`, `webpack`, `webpack-cli`, `concurrently`.
