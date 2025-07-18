# OAuth 2 in Action Code (TypeScript Port)

> [!WARNING]
> _This repository is **not** the official code repository, nor is it from the original authors; it is a rewrite using TypeScript and a more modern stack._
>
> The official code from the book _OAuth 2 in Action_ by Antonio Sanso and Justin Richer is at [oauthinaction/oauth-in-action-code](https://github.com/oauthinaction/oauth-in-action-code).

## Getting Started

This project uses [Bun](https://bun.com/) instead of [Node.js](https://nodejs.org/), install the lastest version from [Bun's website](https://bun.com/).

```bash
$ git clone git@github.com:shuyangsun/oauth-2-in-action-code-ts.git
$ cd oauth-2-in-action-code-ts

# Install dependencies.
$ bun install

# Go to the exercise directory of your choice.
$ cd exercises/ch-3-ex-1

# Start client, auth server and protected resource server in separate terminals.
$ bun dev:client
$ bun dev:auth-server
$ bun dev:protected-resource

# Start completed client, auth or resource server by adding "-completed".
$ bun dev:client-completed
```

## Why?

TODO

## What Changed?

### Files & Folders

The folder structure and file names closely mimic the [original repository](https://github.com/oauthinaction/oauth-in-action-code), with a few minor changes:

- Source code files are in `.tsx` extension instead of `.js` extension.
- `.json` extensions are added to NoSQL database files (e.g., `database.nosql.json`).
- GUI code originally in the `files` directory are moved to `packages/shared`.

Below is a brief version of the `tree` output of the `exercises` directory.

```text
exercises
├── ch-3-ex-1
│   ├── completed
│   │   └── client.tsx
│   ├── client.tsx
│   ├── authorizationServer.tsx
│   ├── protectedResource.tsx
│   └── ...
└── ch-3-ex-2
    ├── database.nosql.json
    ├── client.tsx
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
