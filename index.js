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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//function declarations
function convertJSONtoCSV(json) {
  //travel through JSON object, grabbing keys as column headers from object and any siblings/children
  let keyList = getKeys(json);

  console.log('---KEY GET TEST---');
  console.log(keyList);

  //after getting all column names, iterate through the JSON object and check each entry for its column value.
  //set to an empty string(,) if no value found
  let csvFormat = '';

  return csvFormat;
}

//recursive helper function to get all keys from passed in object
//keyList is in object format with value = true to handle duplicates
function getKeys(obj) {
  let keyList = {};
  for(var key in obj) {
    if(key !== 'children') {
      keyList[key] = true;
    }
  }
  for(let i = 0; i < obj.children.length; i++) {
    console.log("Recursing...");
    keyList = Object.assign(keyList, getKeys(obj.children[i]));
  }
  return keyList;
}

//app event handler declarations

//input will come in as req.body.inputData
app.post('/upload_json', (req,res) => {
  //console.log(req.body.inputData);
  let input = JSON.parse(req.body.inputData);
  console.log(input);

  //TBD: configure response information
  let output = convertJSONtoCSV(input);
  console.log("CSV Output:");
  console.log(output);
  res.send('TBD');
});


//start listener
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));