'use strict';
const express = require('express');

const app = express();
const cors = require('cors');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const multer = require('multer');
const cookieParser = require('cookie-parser');

const PORT = 8000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());
app.use(cookieParser());


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

//Retrieve course list (all courses ever)
app.get('/GetEntireCourseList', async function(req, res) {
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
//Retrieve course list (currently active courses)
app.get('/GetActiveCourseList', async function(req, res) {
  try {
    let db = await getDBConnection();
    let courses = await db.all('SELECT * FROM active_courses JOIN course WHERE course.id = active_courses.course_id;');
    await db.close();
    res.json(courses);
  } catch (err) {
    res.type('text');
    res.status(SERVER_ERROR).send(SERVER_ERROR_MSG + DBNAME_MAIN);
  }
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
      let query = "SELECT teacher_id FROM teacher_users WHERE teacher_id = ? AND password = ?";
      let result = await connection.all(query, [userid, password]);
      //check the student_users table
      query = "SELECT student_id FROM student_users WHERE student_id = ? AND password = ?";
      result.push(await connection.all(query, [userid,password]));
      if (result.length == 0) {
        res.status(USER_ERROR).send(USER_ERROR_NO_USER_MSG);
      }
      else {
        let userFound = {"validCredentials" : "True"};
        res.status(USER_ERROR).json(userFound);
        await connection.close();
      }
    } catch (err) {
      res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.post('/login', async (req, res) => {
  const { username, password, type } = req.body

  if (!username || !password) {
    if (!username && !password) return res.status(400).send('missing arguments username and password')
    else if (!username) return res.status(400).send('missing argument username')
    else return res.status(400).send('missing argument password')
  }

  if (!(type == 'student_users' || type == 'teacher_users'))
  {
    return res.status(400).send('either missing type argument or type is not equal to teacher_users or student_users')
  }


  const db = await getDBConnection(), lookfor = type.substring(0, type.indexOf('_')+1)+'id'
  let query = `SELECT ${lookfor} FROM ${type} WHERE ${lookfor} = ? AND password = ?;`

  let result = await db.all(query, [username, password])

  if (result.length) {
    let id = await getSessionId(type)
    let q = `UPDATE ${type} SET session_id = ? WHERE ${lookfor} = ?;`
    await db.run(q, [id, username])
    res.cookie('sessionid', id, { expires: new Date(Date.now() + 60 * 1000) })
    res.send('Login Successful')
  } else {
    res.status(400).send('Invalid credentails.')
  }

  await db.close()
})

/**
* Establishes a database connection to a database and returns the database object.
* Any errors that occur during connection should be caught in the function
* that calls this one.
* @returns {Object} - The database object for the connection.
*/
async function getDBConnection() {
  const db = await sqlite.open({
    filename: '../database/main.db',
    driver: sqlite3.Database
  });
  return db;
}

/**
 * Generates an unused sessionid and returns it to the user.
 * @returns {string} - The random session id.
 */
async function getSessionId(type) {
  let query = `SELECT session_id FROM ${type} WHERE session_id = ?;`
  let id;
  let db = await getDBConnection();
  do {
    // This wizardry comes from https://gist.github.com/6174/6062387
    id = Math.random().toString(36)
      .substring(2, 15) + Math.random().toString(36)
        .substring(2, 15);
  } while (((await db.all(query, id)).length) > 0);
  await db.close();
  return id;
}