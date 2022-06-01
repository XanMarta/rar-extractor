#!/bin/sh

mkdir -p ./dist/temp
curl -L "https://github.com/XanMarta/scrap/raw/master/rclone" --output ./dist/rclone
chmod +x ./dist/rclone
