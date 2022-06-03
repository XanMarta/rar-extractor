#!/bin/sh

# id: $1

if [ -z "$1" ]; then
    exit 1
fi

mkdir -p ./dist/temp/$1
./dist/rclone --config ./dist/rclone.conf backend copyid FROM: $1 ./dist/temp/$1/ || \
    ./dist/rclone --config ./dist/rclone.conf copy --drive-root-folder-id $1 FROM: ./dist/temp/$1

find ./dist/temp/$1 -name "*.rar" | xargs -I {} ./script/extract.sh {}
rm ./dist/temp/$1/*.rar

./dist/rclone --config ./dist/rclone.conf move ./dist/temp/$1 "TO:$1"
rm -r ./dist/temp/$1
./dist/rclone --config ./dist/rclone.conf link "TO:$1"
