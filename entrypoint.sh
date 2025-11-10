#!/bin/bash

cd "$(dirname "$0")" || exit 1

case "$1" in
  start)
    docker compose up -d
    ;;
  stop)
    docker compose down
    ;;
  restart)
    docker compose down
    docker compose up -d
    ;;
  update)
    docker compose down
    docker compose pull
    docker compose up -d
    ;;
  *)
    echo "Usage: $0 {start|stop|restart|update}"
    exit 1
    ;;
esac
