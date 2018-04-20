# React Movie DB

A simple react-redux app consuming data from a rails-api app

### Prerequisites

- bundler, npm, and yarn

### Installing


To try it out clone the repo and from the root folder do:

```
$ bundle install
$ rake db:create db:migrate db:seed
$ rails s -p 3001
```

This will install the rails dependencies, create the DB, migrate it, and seed it with initial data.

To spawn the react-redux app:

```
$ cd client/
$ yarn start
```

It should load up in your browser pointing to http://localhost:3000 where you can start using the app

Please note that I have kept the .env.production, and the .env.development files in the respository on purpose in order to ease the reuse of the app, also there's nothing secret in there anyways!

## Running the tests

From root folder do:

```
$ rspec spec
```

Not all requests tests are passing due to issue with devise-token-atuh gem, [here](https://github.com/rails/rails/issues/25183)

## Deployment

Heroku is used to deploy the application, here is the live [demo](https://menisy-rmdb.herokuapp.com)

## Built With

* rails
* react
* redux
* bootstrap


### TODOS

- [x] Setup Rails API and React Client
- [x] Create DB schema for models
- [x] Add authentication functionality
- [x] Create API endpoints
- [x] Add search and filter functionality Backend
- [x] Add API tests
- [x] Create client components
- [x] Make it pretty using Bootstrap
- [x] Add search and filter functionality Client side
- [x] Deploy to Heroku
- [ ] Add client tests
