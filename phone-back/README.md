# Phones backend

## Docker
If you want to use docker to launch back:
1. Create `.env` file with the API endpoints 
``` bash
PORT=80
DB_USER=mlab user
DB_PWD=mlab user password
DB_PORT=mlab port
DB_HOST=mlab host
DB_NAME=mlab database
```
2. Create docker image `docker build --tag [tagName] .`
3. Run docker image docker run bulletinboard:1.0

## Without Docker
### Launch project
If you want to launch the project just follow those steps, **be sure that you're on the path `/phone-back`**:

1. `npm install`
2. Create `.env` file with the API endpoints 
``` bash
PORT=80
DB_USER=mlab user
DB_PWD=mlab user password
DB_PORT=mlab port
DB_HOST=mlab host
DB_NAME=mlab database
```
3. `npm run start` or `npm run dev` to launch project with auto-reload. Most suitable for developing

### Test
To launch unit test type `npm run test`