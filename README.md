# Recipe Generator

A web application to input pantry items and have it generate a recipe using AI. 

By Monica Barboza, Ravin Fisher, Zuri Gallegos and Nikkita Torres

## Technologies Used

- React
- C#
- MySQL
- AI 
- nodemon
- Tailwind CSS
- Express
- Entity framework core

npm install react-router-dom

## Stretch Goals

- Users can save/favorite recipes

## Setup/Installation Requirements

1. To run locally on your computer, clone the main branch of this [repository](https://github.com/NikkitaTorres/Recipe-Generator).
2. In the root folder of this application (recipe-generator), run `npm install` to install necessary dependencies. Also run `npm i openai`, `npm i express cors`, and `npm i nodemon`.
3. Again, in the root folder of this application (recipe-generator), you will need to create a .env file with the following information:
```
OPENAI_API_KEY=YOUR_API_KEY
```
Replace YOUR_API_KEY with your key for https://chat.openai.com/.
4. In your terminal, navigate to the Pantry.Solution directory and run `dotnet restore`.
5. Create a new file in the Pantry.Solutions directory called appsettings.json.
6. In `appsettings.json`, enter the following, replacing `USERNAME` and `PASSWORD` to match the settings of your local MySQL server. Replace `DATABASE-NAME` with whatever you would like to name your database.
  
```
{
    "Logging": {
        "LogLevel": {
            "Default": "Information",
            "Microsoft.AspNetCore": "Warning"
        }
    },
    "AllowedHosts": "*",
    "ConnectionStrings": {
        "DefaultConnection": "Server=localhost;Port=3306;database=DATABASE-NAME;uid=USERNAME;pwd=PASSWORD;"
    },
    "JWT": {
        "ValidAudience": "example-audience",
        "ValidIssuer": "example-issuer",
        "Secret": "SecretPassword12"
    }
}
```
7. You will need 3 separate terminals to fully launch this project. In the first terminal, in the root folder (recipe-generator), run the command `npm run start:backend`. 
8. In your second terminal, run the command `npm run start:backend`.
9. In the last terminal, navigate to the Pantry.Solution directory and run `dotnet ef database update` to create a local database. Then enter the `dotnet run` command to launch the database.

### API Endpoints

Account Registration/Login Management:

`POST http://localhost:5000/api/Accounts/register` This will create a request to register and sign a user up for an account.
Here is an example of what the request body will look like:
{
  "email": "string", - User's email
  "userName": "string", - User's username, should match the email used above
  "password": "string" - User's password
}
`POST http://localhost:5000/api/Accounts/SignIn` This will create a request to the database to verify the user's account information exists within the database.
Here is an example of what the request body will look like:
{
  "email": "string",
  "password": "string"
}

Ingredient requests:
`GET http://localhost:5000/api/Ingredients/Ingredients` This will pull a list of ingredients listed within a users account so they can see them
displayed on the page.

`POST http://localhost:5000/api/Ingredients/AddIngredient` This will create a new ingredient to add to a user's existing list of ingredients.
Here is an example of what the request body will look like:
{
  "ingredientId": 0,
  "name": "string",
  "user": {
    "id": "string",
    "userName": "string",
    "normalizedUserName": "string",
    "email": "string",
    "normalizedEmail": "string",
    "emailConfirmed": true,
    "passwordHash": "string",
    "securityStamp": "string",
    "concurrencyStamp": "string",
    "phoneNumber": "string",
    "phoneNumberConfirmed": true,
    "twoFactorEnabled": true,
    "lockoutEnd": "2024-04-15T18:46:18.030Z",
    "lockoutEnabled": true,
    "accessFailedCount": 0
  }
}

`DELETE http://localhost:5000/api/Ingredients/{id}}` This will delete a specific ingredient within a user's list of ingredients.

## Known Bugs

At the moment, AI will generate a recipe that does not always include all ingredients that a user types in, or it will generate a recipe that includes ingredients a user did not enter.

## License

MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)