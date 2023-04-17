# Inventory Tracker API

This is the back-end API for Inventory Tracker. It's purpose is to  keep track of items in inventory and also monitor when those items are entered into inventory, when they have been shipped to the warehouse and when the items are no longer available.

The project was developed based on SOLID principles and Domain Driven Design to deliver a highly structured, modularized and easy to maintain code.

## Tech Stack

**Server:** NodeJS, Express, Typescript, Typeorm, Postgres

The basic tech stack is NodeJS with Express using Typeorm on Postgres for database access.

A couple of other libraries are used, such as Node Mailer for sending e-mails, handlebars for e-mail templating, multer for file upload, helmet and rate-limiter-flexible for security purposes and celebrate for data validation.

Also, external services were integrated for e-mail sending ([Sendgrid](https://sendgrid.com/)) and image file storage ([Cloudinary](https://cloudinary.com/)).

## Initial requirements

For successfully running the project, it's necessary that the items below are also installed:

- [git](https://git-scm.com/downloads)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Run Locally

In order to run the project locally, you will need to perform the following steps to get the api installed on your machine:

Clone the project

```bash
  git clone https://github.com/Backend-Mentorship/inventory-tracker-api.git
```

Before starting the server configure [environment variables](#environment-variables) and execute [migrations](#migrations).

Go to the project directory

```bash
  cd inventory-tracker-api
```

Build Image

```bash
  docker-compose build
```

Run Container

```bash
    docker-compose up
```

Stop Container

```bash
    docker-compose down
```

## Environment Variables

To run this project, you will first need to add environment variables to your `.env` file (must be located in the project's root folder, you can copy/paste and then rename `.env.example` editing it's contents).

## Migrations

In order to create the database tables, run the command...

```bash
  make migration-generate
````

Apply the migrations with

```bash
  docker compose exec api npm run migration:up
```

Revert the migrations with...

```bash
  docker compose exec api npm run migration:down
```
