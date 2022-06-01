#!/bin/sh

# id: $1

if [ -z "$1" ]; then
    exit 1
fi

./dist/rclone --config ./dist/rclone.conf copy "TO:$1" "BACKUP:$1" --drive-server-side-across-configs
