[![SemApps](https://badgen.net/badge/Powered%20by/SemApps/28CDFB)](https://semapps.org)

![](./frontend/public/logo192.png)

# Welcome to my place

This application is about events which are private by default: you only see those you have been invited to. Anyone is free to create an event and share it with its network. After an event, all participants can add the contact of all other participants. But at the beginning, you must know the contact link (or the ID of type `@bob@podprovider.com`) to start your personal network.

All data are stored directly in users Pods. See the [ActivityPods](https://github.com/activitypods/activitypods) project for more information.

## Launch locally

### Requirements

- Git
- Makefile
- [Docker](https://docs.docker.com/engine/install/) (make sure you have the `docker-compose-plugin` installed)
- [NodeJS](https://nodejs.org) 20.0 or above
- [Yarn](https://yarnpkg.com/)

### Setup environment variables

A single environment variable is required: the MapBox access token to autocomplete the location field on the Pod provider and app frontends.

Fortunately MapBox has a generous free tier with 100,000 requests per month, so you should not need to pay anything. But you still need to get the token. [See this page](https://docs.mapbox.com/help/getting-started/access-tokens/) for more information.

Once you have your access token, create a `.env.local` file in the `/frontend` directory and set it there.

```bash
REACT_APP_MAPBOX_ACCESS_TOKEN=
```

### Run the Pod provider

In order to locally run the boilerplate, you need a local Pod provider, because a remote Pod provider will not be able to interact with a local application backend.

Fortunately, we provide [Docker images](https://hub.docker.com/orgs/activitypods/repositories) to launch a local Pod provider in a single command:

```bash
make start
```

This will also launch Jena Fuseki (the triplestore used to store semantic data) and Redis, which are needed by the Pod provider and will also be used by the application.

### Launch the backend

Although Docker could also be used to launch the application backend, we recommend to launch it outside of Docker to avoid the usual problems we encounter in containerized environments.

On the other hand, we will use the same Fuseki and Redis server as used for the ActivityPods backend.

```bash
cd backend
yarn install
yarn run dev
```

This will bootstrap the server and, if there are no errors, finish with a message telling you that Moleculer's ServiceBroker has started.

You can see the application details at http://localhost:3001/app

You now have access to Moleculer CLI. Enter this command to insert all the available event formats:

```
call formats.freshImport
```

### Launch the frontend

Now you can launch the app frontend.

```bash
cd frontend
yarn install
yarn run dev
```

A browser window should automatically be launched. If not, you can access the app frontend at http://localhost:4000

## Linking to SemApps/ActivityPods packages (optional)

If you wish to modify packages on the [SemApps repository](https://github.com/assemblee-virtuelle/semapps) and the [ActivityPods repository](https://github.com/activitypods/activitypods) and see the changes before they are published, see the following instructions.

### Linking backend packages

To link backend packages, you can use [`yarn link`](https://classic.yarnpkg.com/en/docs/cli/link/).

```bash
cd /SEMAPPS_REPO/src/middleware
yarn run link-all
cd /ACTIVITYPODS_REPO/app-framework
yarn run link-all
cd /THIS_REPO/backend
yarn run link-packages
```

### Linking frontend packages

Linking frontend packages with `yarn link` doesn't work because it causes version mismatch errors for React and MUI (see [this PR](https://github.com/assemblee-virtuelle/semapps/pull/1180) for explainations). So you should use [Yalc](https://github.com/wclr/yalc) instead. Fortunately, we make it easy for you.

```bash
cd /SEMAPPS_REPO/src/frontend
yarn run yalc:publish
cd /ACTIVITYPODS_REPO/app-framework
yarn run link-all
cd /THIS_REPO/frontend
yarn run link-packages
```

Additionally, frontend packages need to be rebuilt on every changes, or they will not be taken into account by ActivityPods. You can use `yarn run build` to build a package once, or `yarn run watch` to rebuild a package on every change. On every build, the new package will be published to Yalc.

Thanks to Git hooks, the frontend packages will also be published to Yalc whenever git branches are changed.

## Deploy to production

The `docker-compose-prod.yml` includes everything you need to deploy this app to production:

- The backend of the app
- The frontend of the app
- [Traefik](https://traefik.io) to orchestrate domain names and SSL certificates
- [Apache Jena Fuseki](https://jena.apache.org/documentation/fuseki2/) to store semantic data
- [Redis](https://redis.io) used for cache and jobs queue
- [Arena](https://github.com/bee-queue/arena) to watch the jobs queue

### Requirements

A Linux server with 4Gb of RAM is required for Fuseki to work properly, otherwise there is a high risk that it runs out of memory and gets killed. For large Pod providers, we recommend 8Gb of RAM.

### Point your domains to your server IP

Go to your domain provider and point the domain you want to use to your server IP (with a A-type registration).

Note that, by default, the backend will be on the same domain name as the frontend, but on the /api path.

### Clone this repository

Connect to your server in SSH and clone this repository:

```bash
git clone https://github.com/assemblee-virtuelle/welcometomyplace.git
```

### Install Docker with the Compose plugin

We have prepared a script for this:

```bash
./install-docker.sh
```

If that doesn't work with your server config, you can follow [Docker installation instructions](https://docs.docker.com/engine/install/).

### Setup .env variables

Copy the `.env.production` file to a `.env.production.local` file (`cp .env.production .env.production.local`) and enter your server-specific informations. [Click here](https://docs.mapbox.com/help/getting-started/access-tokens/) to find how to generate a MapBox access token, which is necessary for the autocomplete feature.

```env
DOMAIN_NAME=welcometomyplace.org
BACKEND_PATH=/api
APP_NAME=Welcome to my place
APP_DESCRIPTION="Foster living together based on welcome, trust and mutual aid"
APP_LANG=en
LETSENCRYPT_EMAIL=
FUSEKI_PASSWORD=
MAPBOX_ACCESS_TOKEN=
POD_PROVIDER_BASE_URL=  # If you want to enforce a Pod provider for this app
```

If you want to customize more thoroughly the app, you can do the same with the `.env.production` files in the /backend and /frontend directories (copy them to a `.env.production.local` file). Note all env files ending with `.local` are not commited.

### Build and launch

You can now launch the Docker containers with this command:

```
make build-prod
make start-prod
```

If there is a problem, you can call `make attach-backend-prod`, which will give you access to ActivityPods' Moleculer CLI ([Moleculer](https://moleculer.services/) is the microservice framework that all ActivityPods services run on.) Errors will be displayed here.

### Explore your server

The frontend should now be available at the domain you chose. The backend is available on the `/api` path.

Fuseki provides also a frontend to see the datasets. It is available on port 3030 of your server. The login is "admin" and the password is the one you chose on the global environment variables.

You can also see the jobs queue by connecting to Arena on port 4567 of your server.
