#!/bin/bash

if [[ $VERCEL_GIT_COMMIT_REF == "dev" ]]; then
	npm run build:next
else
	npm run build
fi
