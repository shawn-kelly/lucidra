#!/bin/bash

BUILD_DIR="./build"

if [ -d "$BUILD_DIR" ] && [ "$(ls -A $BUILD_DIR)" ]; then
  echo "✅ Build directory exists and is not empty."
  python3 serve.py &
  echo "🚀 Server started in background."
else
  echo "❌ Build directory is missing or empty."
fi