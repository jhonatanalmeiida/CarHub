#!/bin/sh
set -eu

if ! docker info >/dev/null 2>&1; then
  echo "Docker daemon nao esta em execucao."
  echo "Abra o Docker Desktop e rode novamente 'npm start'."
  echo "Opcionalmente, use 'npm run start:local' para desenvolvimento local."
  exit 1
fi

docker compose up --build
