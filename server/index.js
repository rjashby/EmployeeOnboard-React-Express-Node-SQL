const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'Qwer2468!!',
  database: 'employeeSystem'
});

app.post('/create', (req, res) => {
  const name = req.body.name
  const age = req.body.age
  const location = req.body.location
  const position = req.body.position
  const salary = req.body.salary

  db.query('INSERT INTO employees (name, age, location, position, salary) VALUES (?, ?, ?, ?, ?)', [name, age, location, position, salary], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Values Properly Inserted');
      }
    }
  );
});

app.get('/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
});

app.put('/update', (req, res) => {
  const id = req.body.id;
  const salary = req.body.salary;
  db.query('UPDATE employees SET salary = ? WHERE id = ?', 
    [id, salary], 
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
  })
});

// app.delete()

app.listen(3001, () => {
  console.log('Your server is running on port 3001');
});