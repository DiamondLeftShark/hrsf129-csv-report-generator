/*JSON->CSV spec:
The server must flatten the JSON hierarchy, mapping each item/object in the JSON to a single line of CSV report (see included sample output),
where the keys of the JSON objects will be the columns of the CSV report.
You may assume the JSON data has a regular structure and hierarchy (see included sample file).
In other words, all sibling records at a particular level of the hierarchy will have the same set of properties,
but child objects might not contain the same properties. In all cases, every property you encounter must be present in the final CSV output.
You may also assume that child records in the JSON will always be in a property called `children`.
*/

//----package/library decs----
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;

//variable for form HTML data
/* const formPage = `<body>
<h3>Enter the information to convert below:</h3>
<form method="post" action="/upload_json" encType="multipart/form-data">
  <input type="file" name="inputData" id="json-file">
  <input type="submit" value="Submit">
</form>

<!--Placeholder tag for CSV file result: will be blank by default-->
<div id="output"></div>
</body>`; */

app.use(express.static('client'));
app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//----function declarations----

//recursive helper function to get all keys from passed in object
//keyList is in object format with value = true to prevent duplicate columns
function getKeys(obj) {
  let keyList = {};
  for(var key in obj) {
    if(key !== 'children') {
      keyList[key] = true;
    }
  }

  if(obj.children !== undefined) {
    for(let i = 0; i < obj.children.length; i++) {
      keyList = Object.assign(keyList, getKeys(obj.children[i]));
    }
  }
  return keyList;
}

//recursive helper function to convert JSON object to string.
function readJSON (json, keyList, firstCall = true) {
  let result = '';
  //if this is the first call, generate the function headers based off of the keyList
  if(firstCall === true) {
    for(var key in keyList) {
      result = result.concat(`${key},`);
    }
    result = result.slice(0,-1).concat('\n');
  }
  //go through key list, writing values to the result.
  for(var key in keyList) {
    if(json[key] === undefined) {
      result = result.concat(',');
    } else {
      result = result.concat(`${json[key]},`);
    }
  }
  result = result.slice(0,-1).concat('\n');

  //recursively call for each child, and append to result string
  if(json.children !== undefined) {
    for(let i = 0; i < json.children.length; i++) {
      result = result.concat(readJSON(json.children[i], keyList, false));
    }
  }

  return result;
}

function convertJSONtoCSV(json) {
  //travel through JSON object, grabbing keys as column headers from object and any siblings/children
  let keyList = getKeys(json);

  //after getting all column names, iterate through the JSON object and check each entry for its column value.
  let csvFormat = readJSON(json, keyList);

  return csvFormat;
}

//----app event handler declarations----

//file contents will come in on req.files.inputData.data
app.post('/upload_json', (req,res) => {
  console.log(req.files.inputData.data.toString('utf8'));
  //let input = JSON.parse(req.body.inputData.toString('utf8')); //old handling for text field input
  let input = JSON.parse(req.files.inputData.data.toString('utf8'));

  //convert input to CSV and send back to user
  let output = convertJSONtoCSV(input);
  console.log("---CSV Output---");
  console.log(output);
  fs.writeFile('converted_file.csv', output, function(err) {
    if(err) {
      console.log(err);
    }
  });
  res.send(output);
});


//start listener
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));