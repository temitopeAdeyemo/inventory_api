#!/bin/sh

/bin/wait-for-it.sh rabbitmq:5672 --timeout=30 -- npm run start:dev
