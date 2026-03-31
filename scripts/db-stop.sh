#!/bin/sh
set -eu

if ! docker info >/dev/null 2>&1; then
  echo "Docker daemon nao esta em execucao."
  echo "Nada para parar no momento."
  exit 0
fi

docker compose stop db

