#!/bin/bash

# Step 1: Start ganache with persistence and fixed mnemonic
echo "Starting Ganache with persistence and fixed mnemonic..."
cd solidity || exit
npx ganache --db ./ganache-data --mnemonic "run brown pause spatial balcony caught devote kite bread snow magnet notice" > ganache.log 2>&1 &

GANACHE_PID=$!
echo "Ganache started with PID $GANACHE_PID"

# Wait a bit for Ganache to initialize
sleep 5

# Step 2: Start API server
echo "Starting userwins_api server..."
cd ../userwins_api || exit
npm run dev &

API_PID=$!
echo "API server started with PID $API_PID"

# Give the API server time to start
sleep 5
# Read the port from your env or default

set -o allexport
source .env
set +o allexport

PORT=${HOST_PORT:-7779}

echo
echo "To increase score for user Alice:"
echo "curl -X POST http://localhost:${PORT}/win -H \"Content-Type: application/json\" -d '{\"username\": \"Alice\"}'"
echo
echo "To retrieve score for user Alice:"
echo "curl http://localhost:${PORT}/wins/Alice"
echo

echo "Press Ctrl+C to stop Ganache and API server."

# Trap SIGINT to kill background processes when you exit script
trap "echo 'Stopping Ganache and API server...'; kill $GANACHE_PID $API_PID; exit" INT

# Wait for background processes
wait $GANACHE_PID $API_PID
