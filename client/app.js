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

$('button').on('click', function(event) {
  console.log("Download button clicked.");
  $.ajax({
    url: '/download',
    type: 'GET',
    success: function(response) {
      console.log("File received.");
    }
  })
})

console.log("app.js loaded!");