#!/bin/bash

cd "$(dirname "$0")" || exit 1

case "$1" in
  run)
    docker compose up -d
    ;;
  stop)
    docker compose down
    ;;
  *)
    echo "Usage: $0 {run|stop}"
    exit 1
    ;;
esac
