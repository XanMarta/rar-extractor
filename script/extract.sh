#!/bin/sh

filename=$1
newdir=${filename%.*}
mkdir -p "$newdir"
unrar -o- x "$1" "$newdir/" > /dev/null
