
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

Create a file in the root of the project folder called '.env'

You will need to add the following environment variables to your .env file

`PORT=5000` optional

`MONGODB_CONNECTION_STRING=mongodb://localhost:27017/SnelMelder`

Start the server

```bash
  nodemon
```

## Troubleshooting
In case any problems occur regarding the nodemon command. you might need to install nodemon globally.

```bash
  npm i nodemon -g 
```
if that still doesn't fix the error. you might need to install ts-node globally aswell.

```bash
  npm i ts-node -g
```



## Support

For support or anything missing in this document, please ask / tell Bart.

