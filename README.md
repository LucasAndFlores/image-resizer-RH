# Image resizer rh

Welcome! This is a project that resizes images, using a GET route, with specific parameters (ImageName, width and height) and sends them to you.

## Instalation

PS: For this project, you will need npm, docker and docker compose pre-installed.
If you would like to start the project locally, clone the project with git clone command and run this commands in your terminal, in the folder of project: <br>
`yarn` or `npm install` <br>
`docker-compose up`

#### Notice:

This is the Main branch, so it's ready for deployment and don't contain tests (performance or unit/integration). If you would like to execute them, made checkout to `dev` branch and read the readme for instructions

## Specification and usage

The route specification is: `localhost:5050/resize/:imageName/:width/:height`.
Don' t use image types in the image name field (such as .png, .jpg, .svg).
I added a few images to test and their names are:

- bonsai1
- bonsai2
- brno1
- brno2
- brno3
- docker1
- javascript1
- javascript2
- nature1
- nature2
- nature3
- prague1
- prague2
- saoPaulo1
- saoPaulo2
- testeUpload

about width and height, feel free to send any value (don't use letters or negative numbers)

example: http://localhost:5050/resize/nature1/500/500

If you want add more images, download then and paste in the imgs directory. You will need to run `docker-compose up --build --force-recreate` to copy them to the directory of the container.
