# Calendar-patience

## Overview

An online version of a traditional card game, it utilises drag and drop functionality, database and http requests, and the [Deck of Cards API](https://deckofcardsapi.com/). The API creates the initial deck of cards, complete with images of the face and back of the cards. 

Deployed on Render.com and [playable on desktop] (https://calendar-patience.onrender.com/).

## Key features

- Database with queries managed with knex.js
- HTML5 Drag and Drop API functionality for mouse users
- React components
- Responsive UI built with CSS
- Secure sign-in with Auth0

## Tech used

I am currently creating and adding database functionality and user login, so that the player can save a game to come back to or check how many wins or losses they have overall.

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
