//package/library decs
const express = require('express');
const app = express();
const port = 3000;
const server = require('./server/server.js');

app.use(express.static('client'));

//app event handler declarations

//TBD: mount handler for JSON-CSV file conversion
app.post('/', (req,res) => res.send('placeholder!'));



//test function
server.test();
//start listener
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));