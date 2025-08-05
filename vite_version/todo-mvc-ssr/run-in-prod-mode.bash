#!/usr/bin/env bash
set -e

pnpm run build:client
pnpm run build:server

node dist/server/server.js

