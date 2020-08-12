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



const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, './public')));
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

  

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const port = 3001;
app.listen(port, _ => {
  console.log(`App listening on port ${port}`);
});

app.get('/', homeController)

app.get('/post/:id', getPostController);

app.get('/posts/new', authMiddleware, newPostController);

app.post('/posts/store', authMiddleware, storePostController);

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);

app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

app.get('/auth/logout', logoutController);

app.use((req, res) => res.render('notfound'));

