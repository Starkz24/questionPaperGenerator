#!/bin/bash

# MongoDB Setup
echo "Starting MongoDB..."
mongod &

# Backend Setup
echo "Installing backend dependencies..."
cd backend
npm install

echo "Running the seed script..."
npm run seed

echo "Starting backend server..."
npm run server &

# Frontend Setup
echo "Installing frontend dependencies..."
cd ../frontend
npm install

echo "Starting frontend server..."
npm start &

echo "Application is now accessible at http://localhost:3000"
