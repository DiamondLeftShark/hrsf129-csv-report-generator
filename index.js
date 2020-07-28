//package/library decs
const express = require('express');
const app = express();
const port = 3000;
const convert = require('./client/app.js');

app.use(express.static('client'));

//app event handler declarations

//TBD: mount handler for JSON-CSV file conversion
app.post('/uplod_json', (req,res) => res.send('placeholder!'));



//test function
convert.test();
//start listener
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));