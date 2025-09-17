#!/bin/sh
set -e

host="$1"
shift
cmd="$@"

until pg_isready -h "$host" -p 5432 -U "postgres"; do
  echo "Waiting for database at $host..."
  sleep 2
done

exec $cmd
