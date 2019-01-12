## Server
The server runs on Node (Express) and can be started by going to the `server` folder and running `npm run start`. It's deployed to Heroku. Production config vars are set on Heroku, not in `.env` files. For development, they are set in the .env file.

## Client
The client is a Vue-based app and uses Webpack. To start the frontend locally, run `npm run start`. To deploy to Zeit, run `npm run deploy-frontend`.

Docs:
* https://zeit.co/docs/v2/deployments/official-builders/static-build-now-static-build/
