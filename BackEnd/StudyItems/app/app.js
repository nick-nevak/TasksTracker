const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')


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

const getStudyItemController = require('./controllers/studyItem/getStudyItem');
const getStudyItemsController = require('./controllers/studyItem/getStudyItems');
const postStudyItemController = require('./controllers/studyItem/postStudyItem');
const putStudyItemController = require('./controllers/studyItem/putStudyItem');
const deleteStudyItemController = require('./controllers/studyItem/deleteStudyItem');



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsConfig = {
  origin: 'http://localhost:2223',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsConfig));

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

app.get('/item/:id', getStudyItemController);

app.get('/items', getStudyItemsController);

app.post('/item', postStudyItemController);

app.put('/item/:id', putStudyItemController);

app.delete('/item/:id', deleteStudyItemController);

