#!/bin/sh

clear

ORGANIZATION=$(node -p -e "require('./package.json').organization")
SERVICE_NAME=$(node -p -e "require('./package.json').name")

build() {
    docker build --label "$ORGANIZATION/$SERVICE_NAME" -t $ORGANIZATION/$SERVICE_NAME .
}

run() {
    docker run --name $SERVICE_NAME -p 3001:9001 -d $ORGANIZATION/$SERVICE_NAME
}

delete() {
    clear

    echo
    echo '====================================================================================='
    echo
    
    export CONTAINER_ID=$(docker ps -a --no-trunc --format "{{.ID}}" --filter name=^/$SERVICE_NAME$)

    if [ $CONTAINER_ID ]
    then
        docker container rm $CONTAINER_ID -f
    fi

    echo

    docker ps --all

    echo
    echo
    echo '====================================================================================='
    echo

    export IMAGE_ID=$(docker images --format "{{.ID}}" --filter "label=$ORGANIZATION/$SERVICE_NAME")

    if [ $IMAGE_ID ]
    then
        docker image rm $IMAGE_ID
    fi

    echo

    docker images

    echo
    echo '====================================================================================='
    echo
}

open_bash() {
    docker exec -it $SERVICE_NAME bash
}

Main_Menu() {
    clear
    echo "Select an option:"
    echo "------------------------------------"
    echo "[1] Update ( Delete, Build and Run )"
    echo "[2] Build and Run"
    echo "[3] Build"
    echo "[4] Run"
    echo "------------------------------------"
    echo "[5] Delete"
    echo "------------------------------------"
    echo "[6] Open Container Shell"
    echo "------------------------------------"
    echo "[0] Exit"
    printf "\n"
    echo -n "Choose a number: "
    read input    
    if [ "$input" = "1" ]
    then
        delete
        build
        run
    elif [ "$input" = "2" ]
    then
        build
        run
    elif [ "$input" = "3" ]
    then
        build
    elif [ "$input" = "4" ]
    then
        run
    elif [ "$input" = "5" ]
    then
        delete
    elif [ "$input" = "6" ]
    then
        open_bash
    elif [ "$input" = "0" ]
    then
        exit;
    else
        Main_Menu
    fi
}

Main_Menu