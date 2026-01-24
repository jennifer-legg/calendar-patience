# Calendar-patience

## Overview

An online version of a traditional card game, this is a personal project of mine which utilises drag and drop functionality, database and http requests, and the [Deck of Cards API](https://deckofcardsapi.com/). The API creates the initial deck of cards, complete with images of the face and back of the cards.

This repository is deployed on Render.com and [playable on desktop](https://calendar-patience.onrender.com/). I am currently developing event handlers for touch events to allow play on touch screen devices.

## Key features

- Optional secure sign-in with Auth0.
- Save game and win/loss statistics features available if the user is logged in.
- Database with queries managed with knex.js.
- HTML5 Drag and Drop API functionality for mouse users.
- Responsive UI built with CSS.

## Tech used

### Frontend

- React
- React Router
- Vite
- TanStack React Query

### Backend

- Express
- Knex
- SQLite3 / PostgreSQL
- JSON Web Tokens (Auth0)

## Setup

### Installation

```
git clone [project-ssh-address]
cd [project-name]
npm install # to install dependencies
npm run knex migrate:latest # to create the database
npm run dev # to start the dev server
```

You can find the server running on [http://localhost:3000](http://localhost:3000) and the client running on [http://localhost:5173](http://localhost:5173).
