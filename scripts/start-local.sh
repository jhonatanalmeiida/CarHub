#!/bin/sh
set -eu

echo "Iniciando frontend e backend em modo local."
echo "Garanta que o PostgreSQL esteja disponivel em localhost:5432."
echo "Se preferir, rode antes: npm run db:start && npm run db:prepare"

trap 'kill 0' INT TERM EXIT

npm run dev:backend &
npm run dev:frontend &

wait
