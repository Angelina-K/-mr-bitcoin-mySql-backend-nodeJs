const express = require('express');
const cors = require('express-cors');

const app = express();

app.use(
  cors({
    allowedOrigins: ['localhost:*', '127.0.0.1:*'],
  })
);

const addRoutes = require('./contactRoutes');
addRoutes(app);

app.listen(3000, () => console.log('Example app listening on port 3000!'));

// var mysql = require('mysql');

// var connection = mysql.createConnection({
//   host: 'localhost',
//   //   port: 3306,
//   user: 'root',
//   password: '',
//   database: 'contact_db',
//   insecureAuth: true,
// });

// connection.connect((err) => {
//   if (err) throw new Error('mySql failed connection');
//   console.log('connected to SQL server');
// });

// app.get('/add', (req, res) => {
//   const post = {
//     name: 'Parsons Norris',
//     email: 'parsonsnorris@renovize.com',
//     phone: '+1 (958) 502-3495',
//   };

//   const sqlCmd = `INSERT INTO contact (name, email, phone)
//       VALUES ('Parsons Norris',
//               "parsonsnorris@renovize.com",
//               "+1 (958) 502-3495")`;
//   connection.query(sqlCmd, function (error, results, fields) {
//     if (error) reject(error);
//     else resolve(results);
//   });
// });
