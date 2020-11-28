# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Docker
If you want to use docker to launch front:
1. update  `/src/config/index.js` with the API endpoints 
``` json
{
  "REACT_APP_BASE_URL":"http://localhost:3001/",
  "REACT_APP_API_URL":"http://localhost:3001/api/v1"
}
```
2. create docker image `docker build --tag [tagName] .`
3. Run docker image `docker run [tagName]`


## Without Docker

### e2e test
To launch end to end testing type `npm run cypress` to launch cypress tool and test the website

### Build
To prepare the project for production run `npm run build`. This command create build folder where it allocate the production bundle
### Start project

If you want to launch the project just follow those steps, **be sure that you're on the path `/phone-front`**:

1. `npm install`
2. update  `/src/config/index.js` with the API endpoints 
``` json
{
  "REACT_APP_BASE_URL":"http://localhost:3001/",
  "REACT_APP_API_URL":"http://localhost:3001/api/v1"
}
```
3. `npm start`
