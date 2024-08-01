#!/bin/bash

# Function to wait for a background job and then print a message
wait_for_dev_server() {
    wait $!
    echo "Frontend development server started successfully at http://localhost:5173"
}

# Set up backend
echo "Navigating to backend directory..."
cd backend

echo "Installing backend dependencies..."
npm install --legacy-peer-deps

echo "Starting backend services with Docker Compose..."
docker-compose up -d

# Wait for Docker services to be ready
echo "Waiting for backend services to start..."

# Set up frontend
echo "Navigating to frontend directory..."
cd ../frontend

echo "Installing frontend dependencies..."
npm install --legacy-peer-deps

# Start the frontend development server in the background
echo "Starting frontend development server..."
npm run dev &

# Call the function to wait for the dev server to start and then print a message
wait_for_dev_server

echo "Script execution completed."
