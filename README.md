The backend for what.pm, running on Express and deployed to Heroku. It's a pretty straightforward API that uses Mongoose to talk to the MongoDB database, which is hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

## Install locally

### Clone

First, clone the repo:

```
git clone git@github.com:nienkedekker/whatpm-server.git
```

### Install

Then, install the dependencies by running `npm install`. You can use yarn, but make sure to delete the `package-lock.lock` file then.

### dotenv

Open the repo in your favorite code editor and create a new file in the root called `.env`. Copy what's in `.env.dist` and edit the values. For Mongo, you can either create an instance using mLab or use a local database - as long as the URL starts with `mongodb://` you're good :)

### Run

Run the project with `npm run start:dev` and go to `localhost:3000`. This is the URL you can use when [running the frontend](https://github.com/nienkedekker/whatpm-client#connect-to-the-server).
