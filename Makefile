SHELL := /bin/bash

.DEFAULT_GOAL := help

build:
	docker compose build --parallel

build-no-cache:
	docker compose build --parallel --no-cache

up:
	docker compose up -d

down:
	docker compose down

logs-frontend:
	docker compose logs website-frontend
