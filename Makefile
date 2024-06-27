.DEFAULT_GOAL := help
.PHONY: docker-build docker-up build start log stop restart

DOCKER_COMPOSE_DEV=docker compose -f docker-compose-dev.yml --env-file frontend/.env --env-file frontend/.env.local
DOCKER_COMPOSE_PROD=docker compose -f docker-compose-prod.yml --env-file .env.production --env-file .env.production.local

# Dev commands

start:
	$(DOCKER_COMPOSE_DEV) up -d

stop:
	$(DOCKER_COMPOSE_DEV) kill
	$(DOCKER_COMPOSE_DEV) rm -fv

config:
	$(DOCKER_COMPOSE_DEV) config

attach-activitypods:
	$(DOCKER_COMPOSE_DEV) exec activitypods-backend pm2 attach 0

# Prod commands

build-prod:
	$(DOCKER_COMPOSE_PROD) build

start-prod:
	$(DOCKER_COMPOSE_PROD) up -d

stop-prod:
	$(DOCKER_COMPOSE_PROD) kill
	$(DOCKER_COMPOSE_PROD) rm -fv

config-prod:
	$(DOCKER_COMPOSE_PROD) config

attach-backend-prod:
	$(DOCKER_COMPOSE_PROD) exec backend pm2 attach 0

