#!/bin/sh

# Use the EXPO_PORT environment variable if set, otherwise set to 443
if [ -z "$EXPO_PORT" ]; then
  EXPO_PORT=443
fi

# Copy initial index.js to App directory
cp /app/image/index.js /app/App/index.js

# Function to start the application
start_application() {
  echo "Starting the application on port $EXPO_PORT"
  npm start -- --port $EXPO_PORT
}

# Function to rebuild the application
rebuild_application() {
  echo "Rebuilding the application..."
  # Add any specific rebuild commands here, if necessary
  cp /app/image/index.js /app/App/index.js
  npm start -- --port $EXPO_PORT --clear
}

# Ensure the rebuild flag file exists
touch /app/rebuild_flag

# Start the application initially
start_application &

# Watch for changes in the flag file to trigger rebuild
inotifywait -m -e create,modify,delete /app/rebuild_flag |
while read -r directory events filename; do
  if [ "$filename" = "rebuild_flag" ]; then
    echo "Detected rebuild flag file change. Rebuilding app..."
    rebuild_application
  fi
done