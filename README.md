Post HQ
===

A simple, Reddit like application, where users create public posts that are voted on by the community. 
Posts with the most votes appear closer to the top of a feed and Posts with fewer votes appear closer to the bottom.
The goal of this project is to get familiar with Node.JS and the Express framework. See the 
[technical design](./docs/techincal-design.md) docs for more details. 

## Getting Started

#### Configure Environment Variables

Run the following command from the projects root directory.

```bash
$ echo "DEV_UID=$(id -u)" > .env
```
This ensures that any files created in mounted directories have the correct permissions.

#### Run the development containers

Run the containers in the background.

```bash
$ docker-compose up -d
```

Once the containers have been started and the npm dependencies installed you should be able to access the application 
on localhost here [http://localhost:3000]().

#### Running tests

```bash
$ docker-compose exec app npm test
```

## Usage

TODO

## Deployment

TODO