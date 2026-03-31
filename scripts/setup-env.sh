#!/bin/sh
set -eu

if [ ! -f "./backend/.env" ]; then
  cp "./backend/.env.example" "./backend/.env"
fi

if [ ! -f "./frontend/.env" ]; then
  cp "./frontend/.env.example" "./frontend/.env"
fi

echo "Environment files are ready."
