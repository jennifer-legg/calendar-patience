# Calendar-patience

## Setup

### The project so far

This project is a single page online card game. It uses react components and drag and drop functionality, along with the [Deck of Cards API](https://deckofcardsapi.com/) (to create the initial deck and to display the images of the face and back of the cards).

### Next steps

I am currently creating and adding database functionality and user login, so that the player can save a game to come back to or check how many wins or losses they have overall.

### Installation

```
npm install # to install dependencies
npm run knex migrate:latest # to create the database
npm run knex seed:run # to create the seeds for the database
npm run dev # to start the dev server
```

You can find the server running on [http://localhost:3000](http://localhost:3000) and the client running on [http://localhost:5173](http://localhost:5173).
