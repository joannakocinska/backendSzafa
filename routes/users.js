var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const jwt = require('jsonwebtoken');

const key = 'your_secret_key';

router.get('/login', function(req, res) {
  const user = req.query.user;
  const password = req.query.password;

  console.log('dziala logowanie');
  console.log(`login: ${user}, hasło: ${password}`);

  const usersFilePath = path.join(__dirname, '../databases/users.json');
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Błąd odczytu danych');
      return;
    }

    const users = JSON.parse(data).users;
    const foundUser = users.find(u => u.username === user && u.password === password);

    if (foundUser) {
      const token = jwt.sign({ username: user }, key, { expiresIn: '1h' });
      res.json({ success: true, token, message: 'Zautoryzowano poprawnie!!!' });
    } else {
      res.json({ success: false, message: 'Niepoprawny login lub hasło :((' });
    }
  });
});

module.exports = router;
