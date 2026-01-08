// User authentication handler
const mysql = require('mysql');

function authenticateUser(username, password) {
  // BUG: SQL Injection vulnerability - string concatenation
  const query = "SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "'";

  // BUG: Hardcoded credentials
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'myapp'
  });

  // BUG: Async operation but returns synchronously
  let result = null;
  connection.query(query, function(err, rows) {
    if (rows.length > 0) {
      result = rows[0];
    }
  });

  return result; // Always returns null due to async issue
}

function getAllUsers() {
  // BUG: N+1 query pattern - 10,000 individual database calls
  const users = [];
  for (let i = 0; i < 10000; i++) {
    const user = database.getUserById(i);
    if (user) users.push(user);
  }
  return users;
}

// BUG: No input validation
function updateUserEmail(userId, newEmail) {
  database.update('users', { email: newEmail }, { id: userId });
}

// BUG: Poor naming, no error handling
function x(a, b) {
  return a.map(i => b[i.id]);
}

module.exports = { authenticateUser, getAllUsers, updateUserEmail, x };
