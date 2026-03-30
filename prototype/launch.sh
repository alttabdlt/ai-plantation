#!/bin/bash
# ☕ CaféPulse Dashboard — Launch with Cloudflare Tunnel
# Usage: bash launch.sh

set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
PORT=3000

echo ""
echo "  ☕ CaféPulse — AI Plantation OS"
echo "  ================================"
echo ""

# Check Node.js
if ! command -v node &>/dev/null; then
  echo "  ❌ Node.js not found. Install from https://nodejs.org"
  exit 1
fi
echo "  ✅ Node.js found: $(node --version)"

# Check/install cloudflared
if ! command -v cloudflared &>/dev/null; then
  echo "  📦 Installing cloudflared..."
  if [[ "$OSTYPE" == "darwin"* ]]; then
    if command -v brew &>/dev/null; then
      brew install cloudflared
    else
      echo "  Install Homebrew first: https://brew.sh"
      echo "  Then run: brew install cloudflared"
      exit 1
    fi
  elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    curl -sL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /tmp/cloudflared
    chmod +x /tmp/cloudflared
    sudo mv /tmp/cloudflared /usr/local/bin/cloudflared
  else
    echo "  ❌ Please install cloudflared manually: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/"
    exit 1
  fi
fi
echo "  ✅ cloudflared found: $(cloudflared --version 2>&1 | head -1)"

# Start server in background
echo ""
echo "  🚀 Starting dashboard server on port $PORT..."
node "$DIR/serve.js" &
SERVER_PID=$!
sleep 1

# Start Cloudflare tunnel
echo "  🌐 Opening Cloudflare Tunnel..."
echo ""
cloudflared tunnel --url http://localhost:$PORT 2>&1 | while read line; do
  if echo "$line" | grep -q "trycloudflare.com"; then
    echo ""
    echo "  ╔══════════════════════════════════════════════════════════════╗"
    echo "  ║  ☕ CaféPulse is LIVE!                                      ║"
    echo "  ║  $line  ║"
    echo "  ╚══════════════════════════════════════════════════════════════╝"
    echo ""
  fi
  echo "  [tunnel] $line"
done

# Cleanup on exit
trap "kill $SERVER_PID 2>/dev/null; echo '  👋 Server stopped.'" EXIT
