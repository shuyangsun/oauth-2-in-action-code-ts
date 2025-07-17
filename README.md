# OAuth 2 in Action Code (TypeScript Port)

> [!WARNING]
> The official code from the book _OAuth 2 in Action_ by Antonio Sanso and Justin Richer is at [oauthinaction/oauth-in-action-code](https://github.com/oauthinaction/oauth-in-action-code).
>
> _This repository is **not** from the original authors_; it is a rewrite using TypeScript and a more modern stack.

## Instructions

Core aspects of the [original repository](https://github.com/oauthinaction/oauth-in-action-code) are preserved as much as possible, with a few minor changes to help readers feel at home.

### Getting Started

Install Bun from [bun.com](https://bun.com/).

```bash
# Go to the exercise directory of your choice.
$ cd exercises/ch-3-ex-1

# Install dependencies
$ bun install

# Start client, auth server and protected resource server in separate terminals.
$ bun dev:client
$ bun dev:auth-server
$ bun dev:protected-resource
```

### Folder Structure & File Names

The folder structure and file names closely mimic the [original repository](https://github.com/oauthinaction/oauth-in-action-code), with a few minor changes:

- Core source code files are placed under the `src` directory within each chapter's exercise folder.
- All client and server logic implemented in `.ts` files (instead of `.js`).
- GUI code under the `files` directory are now in `.tsx` files instead of `.html` files.

Below is a brief version of the `tree` output.

```text
exercises
├── ch-3-ex-1
│   ├── src  <----------- added src/ folder
│   │   ├── client.tsx
│   │   ├── authorization-server.tsx
│   │   ├── protected-resource.tsx
│   │   └── files
│   │       ├── client
│   │       ├── authorization-server
│   │       ├── protected-resource
│   │       └── ...
│   └── ...
└── ch-3-ex-2
    └── ...
```

## Tech Stack

### TypeScript - replaces vanilla JavaScript

TODO: explain

### Hono - replaces Express.js

TODO: explain

### Bun - replaces Node & NPM

TODO: explain

### Vite - better development experience

TODO: explain

### React - replaces vanilla HTML

TODO: explain

### Tailwind CSS - replaces vanilla CSS

TODO: explain
