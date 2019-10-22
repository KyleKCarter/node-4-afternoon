require('dotenv').config();
const express = require("express");
const session = require("express-session");
const checkForSession = require("./middlewares/checkForSession");
const {read} = require("./controllers/swagController");
const {login, register, signout, getUser} = require('./controllers/authController');
const {add, deleteProduct, checkout} = require('./controllers/cartController');
const {search} = require('./controllers/searchController');

const app = express();

const { SERVER_PORT, SESSION_SECRET } = process.env;

//Middleware
app.use(express.json());
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
);
app.use(checkForSession);
app.use(express.static("../build"))

//Endpoints
////Auth
app.post('/api/login', login);
app.post('/api/register', register);
app.post('/api/signout', signout);
app.get('/api/user', getUser);
////Swag
app.get('/api/swag', read);
////Cart
app.post('/api/cart/checkout', checkout);
app.post('/api/cart/:id', add);
app.delete('/api/cart/:id', deleteProduct);
////Seach
app.get('/api/search', search);

app.listen(SERVER_PORT, () => console.log(`Running on PORT ${SERVER_PORT}.`));