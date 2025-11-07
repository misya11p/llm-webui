#!/bin/bash

cd "$(dirname "$0")" || exit 1

case "$1" in
  run)
    docker compose up -d
    ;;
  stop)
    docker compose down
    ;;
  restart)
    docker compose down
    docker compose up -d
    ;;
  *)
    echo "Usage: $0 {run|stop|restart}"
    exit 1
    ;;
esac
