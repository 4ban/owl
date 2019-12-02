# Todo application
Owl.co test assignment

## Install
### Back-end
The temporary database on [mLab](https://mlab.com/) created with the following parameters:

- Username: `owluser`
- Password: `owl123`
- Host: `ds349628.mlab.com:49628`
- Database name: `owl`

```js
// Install dependencies
cd backend
npm install

// Create .env file from the template
MONGODB_URL=mongodb://{mongodb_server}:27017/DBname
PORT=4000
```

### Front-end
```js
// Install dependencies
cd frontend
npm install

// Create .env file from the template
API=http://localhost:4000
```
## Launch
### Option 1 (recommended)
```js
// Go to backend folder and run the app
cd backend
npm start

// Go to the frontend folder and run the app
cd ../frontend
npm start
```

### Option 2
Using `concurrently` package
```js
// Install the dependencies in the root folder of the repo
npm install

// Run both backend and frontend
npm start
```

## Test
### Back-end
```js
cd backend
npm test
```

### Front-end
```js
cd fronetnd
npm test
```