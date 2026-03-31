#!/bin/sh
set -eu

if ! docker info >/dev/null 2>&1; then
  echo "Docker daemon nao esta em execucao."
  echo "Abra o Docker Desktop e rode novamente 'npm run db:start'."
  echo "Depois execute 'npm run db:prepare' para criar o schema e popular os mocks."
  exit 1
fi

docker compose up -d db

echo "Banco PostgreSQL iniciado."
echo "Proximo passo: npm run db:prepare"

