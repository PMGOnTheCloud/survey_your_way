#!/bin/bash

composer install

cp .env.example .env

php artisan cache:clear

composer dump-autoload

php artisan key:generate

npm i
