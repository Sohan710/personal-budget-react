const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const cors = require('cors');

app.use(cors());
app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    fs.readFile('budget-data.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data from budget-data.json');
            return;
        }
        res.send(JSON.parse(data));
    });
});

app.listen(port, () => {
  console.log('Example app listening at http://localhost:' + port);
});
