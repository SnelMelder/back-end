# SnelMelder

This repository contains the Node.js (TypeScript) backend for the SnelMelder app.

## How to setup the project Locally

Make sure you have node.js and MongoDB installed.

- [Node.js download link](https://nodejs.org/en/download/)
- [MongoDB download ink](https://www.mongodb.com/try/download/community)

First Clone the project.

```bash
  git clone https://github.com/SnelMelder/back-end.git
```

Then open the project in your preferred text editor.

Install dependencies.

```bash
  npm i
```

You will need to rename .env_template to .env and change the following environment variables in the newly created .env file

`PORT` - The port the API will be listening on (optional, default: 5000)

`MONGODB_CONNECTION_STRING` - The mongodb connection string (example: mongodb://localhost:27017/snelmelder)

Start the server

```bash
  npm run build
  npm run server
```

## Run via Docker
Build and run via the following commands:
build image and tag it:


```bash
  docker build -t snelmelderbackend
```

```bash
  docker run -p 5000:5000 -e MONGODB_CONNECTION_STRING=mongodb://host.docker.internal:27017/SnelMelder snelmelderbackend
```


## Seeding database

in the src\helpers\ folder there is a file called "seed.ts". this will seed 5 entities, or any other number you give to it as a parameter. Uncomment the "DeleteAllFromDatabase" method if you wish to delete all entities for a fresh database.

to seed run the following command in console: "npm run seed".