const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash');

const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const authMiddleware = require('./middleware/authMiddleware');

const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');

const getStudyItemsController = require('./controllers/getStudyItems');
const postStudyItemController = require('./controllers/postStudyItem');



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(expressSession({
  secret: 'keyboard cat'
}));
global.loggedIn = null;
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});
app.use(flash());

mongoose.connect('mongodb://localhost/study-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const port = 3001;
app.listen(port, _ => {
  console.log(`App listening on port ${port}`);
});

app.get('/', (request, response) => response.json({ Version: '1.0' }));

app.get('/items', getStudyItemsController);

app.post('/items', postStudyItemController);

