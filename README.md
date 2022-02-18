[![SemApps](https://badgen.net/badge/Powered%20by/SemApps/28CDFB)](https://semapps.org)

# Welcome to my place

This application is about events which are private by default: you only see those you have been invited to. Anyone is free to create an event and share it with its network. After an event, all participants can add the contact of all other participants. But at the beginning, you must know the contact link (or the ID of type `@bob@podprovider.com`) to start your personnal network.

## Getting started

### Launch the triple store

```bash
docker-compose up -d fuseki
```

### Launch the middleware

```bash
cd middleware
yarn install
yarn run dev
```

Once in Moleculer REPL, you can call this command to import the formats and POD providers list (you can of course modify it):

```bash
call importers.formats.freshImport
call importers.pod-providers.freshImport
```

### Launch the frontend

```bash
cd frontend
yarn install
yarn start
```

## Linking to SemApps packages

To modify packages on the [SemApps repository](https://github.com/assemblee-virtuelle/semapps) and see the changes before they are published, we recommend to use [`yarn link`](https://classic.yarnpkg.com/en/docs/cli/link/).

### Linking middleware packages

```bash
cd /SEMAPPS_REPO/src/middleware
yarn run link-all
cd /THIS_REPO/middleware
yarn run link-semapps-packages
```

### Linking frontend packages

```bash
cd /SEMAPPS_REPO/src/frontend
yarn run link-all
cd /THIS_REPO/frontend
yarn run link-semapps-packages
```

Additionally, frontend packages need to be rebuilt, or your changes will not be taken into account by Archipelago.
You can use `yarn run build` to build a package once, or `yarn run dev` to rebuild a package on every change.
