//This is for manipulating DOM elements on the index page

console.log("app.js loaded!");

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
      console.log(response);
      document.getElementById('output').innerText = response;
    }
});

})