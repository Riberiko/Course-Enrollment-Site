'use strict';
const express = require('express');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const app = express();

const PORT = 8000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());
app.use(cookieParser());



app.get('/', (req, res) => {
  res.send('Hello from the backend!');
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