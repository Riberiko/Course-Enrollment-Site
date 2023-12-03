const express = require('express');
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const app = express();
const cors = require('cors');
const port = 8080; // Choose any available port

//ERRORS
const USER_ERROR = 400;
const USER_ERROR_ENDPOINT_MSG = "Invalid endpoint or parameters."
const USER_ERROR_NO_USER_MSG = "No userID or password for that entry."
const SERVER_ERROR = 500;
const SERVER_ERROR_MSG = "Unable to retrieve from the database:"
const DBNAME_MAIN = "main"

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  //base server check
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

//check if the username and password are valid
app.get('/checkUserCreds', async function(req, res) {

  let userid = req.body.username;
  let password = req.body.password;

  if (!(userid && password)) {
    res.status(USER_ERROR).send(USER_ERROR_ENDPOINT_MSG);
  }
  else {
    try {

      let connection = await getDBConnection();
      //check the teacher_user table
      let query = "SELECT id FROM teacher_users WHERE teacher_id = ? AND password = ?";
      let result = await connection.all(query, [userid, password]);
      //check the student_users table
      query = "SELECT id FROM student_users WHERE student_id = ? AND password = ?";
      result.push(await connection.all(query, [userid,password]));
      if (result.length == 0) {
        res.status(USER_ERROR).send(USER_ERROR_NO_USER_MSG);
      }
      else {
        let userFound = {"validCredentials" : "True"};
        res.status(USER_ERROR).json(userFound);

      }
    } catch (err) {

      res.status(500).send("someting didn't go correctly");
    }
    await connection.close();
  }
});

//Retrieve course list
app.get('/GetCourseList', async function(req, res) {
  try {
    let db = await getDBConnection();
    let courses = await db.all('SELECT * FROM course ORDER BY start_time;');
    await db.close();
    res.json(courses);
  } catch (err) {
    res.type('text');
    res.status(SERVER_ERROR).send(SERVER_ERROR_MSG + DBNAME_MAIN);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

async function getDBConnection(){
  const db = await sqlite.open({
    filename: "../database/main.db",
    driver: sqlite3.Database
  });
  return db;
}