#!/usr/bin/env bash
set -e

docker=podman

image=$("$docker" image build . | tee >(cat 1>&2) | tail -n 1)

echo "starting $image"
"$docker" container run --rm -it --init -p5173:5173 "$image"
