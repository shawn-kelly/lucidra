#!/usr/bin/env python3
import http.server
import socketserver
import os
import webbrowser
from threading import Timer

# Change to build directory
os.chdir('build')

PORT = 3000

Handler = http.server.SimpleHTTPRequestHandler

def open_browser():
    webbrowser.open(f'http://localhost:{PORT}')

print(f"🚀 Lucidra is starting...")
print(f"📍 Server running at: http://localhost:{PORT}")
print(f"🌐 Visit http://localhost:{PORT} in your browser")
print(f"🔥 Press Ctrl+C to stop")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 Server stopped. Thanks for using Lucidra!")