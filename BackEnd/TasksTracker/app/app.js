const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const getTaskController = require('./controllers/task/getTask');
const getTasksController = require('./controllers/task/getTasks');
const postTaskController = require('./controllers/task/postTask');
const putTaskController = require('./controllers/task/putTask');
const deleteTaskController = require('./controllers/task/deleteTask');



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
  useCreateIndex: true,
  useFindAndModify: false
});

const port = 3001;
app.listen(port, _ => {
  console.log(`App listening on port ${port}`);
});

app.get('/', (request, response) => response.json({ Version: '1.0' }));

app.get('/task/:id', getTaskController);

app.get('/tasks', getTasksController);

app.post('/task', postTaskController);

app.put('/task/:id', putTaskController);

app.delete('/task/:id', deleteTaskController);

