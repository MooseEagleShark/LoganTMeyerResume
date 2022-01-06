// Get the visitors element on the page
// Use AJAX to send a http request to the server
// To send a request to a server, we use the open() and send() methods of the XMLHttpRequest object:
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // Typical action to be performed when the document is ready:
    document.getElementById("visits").innerHTML = xhttp.responseText;
  }
};
// open(method, url, async)
xhttp.open(
  "GET",
  "https://server_file_location",
  //"https://bwc2pl2iz5.execute-api.us-east-1.amazonaws.com/Prod/counter",
  true
);
// Sends the request to the server
xhttp.send(); // GET
// xhttp.send(string)  // POST

//However, always use POST requests when:

//A cached file is not an option (update a file or database on the server).
//Sending a large amount of data to the server (POST has no size limitations).
//Sending user input (which can contain unknown characters), POST is more robust and secure than GET.
