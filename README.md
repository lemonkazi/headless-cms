# NextJS + WordPress REST API 

Wordpress, MySQL, PHP and PHPMyAdmin are all provided by Docker which makes it easy to spin up new instances of WP sites both for local development and for production on hosts like DigitalOcean.

## Getting Started
Clone this repository locally and `cd` to the `client` folder and type `npm install` or `yarn`.

### Docker
First, make sure you have Docker installed locally.  Once you do, `cd` to `/api` to duplicate and rename `docker-compose.yml.example` by running `cp docker-compose.yml.example docker-compose.yml`.  Now we need to edit `api/docker-compose.yml` to link your local filesystem with Docker's Wordpress files.  To do so, open up our newly duplicated `docker-compose.yml`  

Next, fire up Docker if it isn't already. Once this is done, ensure you're still in the `api` directory and and type `docker-compose up -d`.  You can now reach your WP instance via `http://localhost:8080`.

### Wordpress Configuration

After you're up and running, we need to navigate to `http://localhost:8080/wp-admin` and perform the following steps to Wordpress:

1. Change Permalinks to the Post Name option
1. Update your Site Address within `Settings -> General` to your SSR app (default: http://localhost:3000)

### Booting up the client side

Run `yarn dev` or `npm run dev` in the `client` folder and then navigate to http://localhost:3000.
