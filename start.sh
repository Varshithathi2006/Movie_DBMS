#!/bin/bash

echo "Starting Bingibo Application..."
echo

echo "Installing dependencies..."
npm install
cd server
npm install
cd ..

echo
echo "Starting both frontend and backend servers..."
echo "Frontend will be available at: http://localhost:5173"
echo "Backend will be available at: http://localhost:4000"
echo

npm run dev:full
