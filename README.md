# best-runner  
**best-runner** is an app for sportsmen, which records sports activities.  
You can add, remove and edit your activities. Also there are filters for workout types and sorting for dates and distance.  
Another page shows you a chart for every week in the current year. The chart displays your distance.  
My app here: https://bestrunnerreact.vercel.app/  
My server here: https://bestrunnerapp.vercel.app/ (but there is nothing interesting :) )

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
The first you need to copy this project. Open your console and use the command:

#### `git clone <repo_url>`

## Deployment 
As you can see, there are two folders: **backend** and **frontend**.  
They work independently.  

If you want to start **backend** project, you should go to the folder **backend** and:  
1. Add a type: `type: module` to packege.json. The app won't start local without it
2. Run the command: `npm install`
3. Run the command: `npm start`

If you want to start **frontend** project, you should go to the folder **frontend** and:  
1. Run the command: `npm install`
2. Run the command: `npm start`
3. If you want to work with the local server, you can replace `baseURL` with `http://localhost:5000/workout/` in this file: `instance.js`  
It is look like this:
```
const instance = axios.create({
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH"
    },
    baseURL: "https://bestrunnerapp.vercel.app/workout/",
})
```
