/*JSON->CSV spec:
The server must flatten the JSON hierarchy, mapping each item/object in the JSON to a single line of CSV report (see included sample output),
where the keys of the JSON objects will be the columns of the CSV report.
You may assume the JSON data has a regular structure and hierarchy (see included sample file).
In other words, all sibling records at a particular level of the hierarchy will have the same set of properties,
but child objects might not contain the same properties. In all cases, every property you encounter must be present in the final CSV output.
You may also assume that child records in the JSON will always be in a property called `children`.
*/

//package/library decs
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//function declarations
function convertJSONtoCSV(JSON) {
  console.log("TBD");
}

//app event handler declarations

//TBD: mount handler for JSON-CSV file conversion
app.post('/upload_json', (req,res) => {
  console.log(req.body);
  res.send('TBD');
});


//start listener
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));