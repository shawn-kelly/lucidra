#!/bin/bash

echo "🔄 Updating package list..."
sudo apt update

echo "📦 Installing Python3 pip..."
sudo apt install -y python3-pip

echo "✅ Verifying pip installation..."
pip3 --version

echo "📁 Navigating to project folder..."
cd /home/kelco/lucidra-project/python-ai

echo "📦 Installing dependencies from requirements.txt..."
python3 -m pip install -r requirements.txt

echo "🎉 Setup complete! Lucidra's environment is ready."