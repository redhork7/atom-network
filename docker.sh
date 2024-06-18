#!/bin/sh
COMMAND=$1
APP_NAME=$(cat ./package.json | grep name | head -1 | awk -F: '{ print $2 }' | sed 's/[ ",]//g')
BUILD_VERSION=$(cat ./package.json | grep -m 1 version | sed 's/[^0-9a-z._-]//g' | sed 's/version//g')
PORT=$(cat Dockerfile | grep EXPOSE | head -1 | cut -d ' ' -f 2)

IMAGE=$APP_NAME':'$BUILD_VERSION
CONTAINER=$APP_NAME'-'$BUILD_VERSION'-container'

if [ "$COMMAND" = "build" ]; then
    docker build -t $IMAGE .
fi

if [ "$COMMAND" = "run" ]; then
    docker rm -f $CONTAINER
    docker run --name $CONTAINER -p $PORT:$PORT -d $IMAGE
fi

if [ "$COMMAND" = "exec" ]; then
    docker rm -f $CONTAINER
    docker exec -it $(docker run --name $CONTAINER -p $PORT:$PORT -d $IMAGE) /bin/sh
fi

if [ "$COMMAND" = "rm" ]; then
    docker rm -f $CONTAINER
fi

if [ "$COMMAND" = "rmi" ]; then
    docker rm -f $CONTAINER
    docker rmi -f $IMAGE
fi

if [ "$COMMAND" = "rebuild" ]; then
    docker rm -f $CONTAINER
    docker rmi -f $IMAGE
    docker build -t $IMAGE .
fi
