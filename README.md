## Pre-requisites

This project is mocked by json-server.
To use json-server you need to install it globally
`npm install -g json-server`

## Steps to run the project

- Install modules `npm install`
- Start mock server `json-server --watch api/db.json --port 8000 --routes api/routes.json`
- Run the project `npm start`
- Open browser and go to `http://localhost:3000/`

## Project structure

The project has 5 routes, Home, Games, Movies, Shows and Search.

- The Home route is the default route and it shows the latest games, movies and shows.
- The Games, Movies and Shows routes show the list of games, movies and shows respectively.
- The Search route shows the list of games, movies and shows based on the search term.
