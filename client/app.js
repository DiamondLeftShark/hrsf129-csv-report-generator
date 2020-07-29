//This is for manipulating DOM elements on the index page

//hide download button to start
//document.getElementById("download").style.display = 'none';

$('form').on('submit', function(event) {
  event.preventDefault();
  console.log("Sending file...");
  let formData = new FormData($(this)[0]);
  $.ajax({
    url: '/upload_JSON',
    type: 'POST',
    data: formData,
    async: false,
    cache: false,
    contentType: false,
    enctype: 'multipart/form-data',
    processData: false,
    success: function (response) {
      console.log("File successfully submitted!");
      //console.log(response);
      document.getElementById('output').innerText = response;
      document.getElementById("download").style.display = 'block';
    }
});
})

//RB: I found this on the internet
//creates a dummy element and clicks it to generate the file for the user
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

$('button').on('click', function(event) {
  console.log("Download button clicked.");

  download('converted-file.csv', document.getElementById('output').innerText);
})

console.log("app.js loaded!");