document.addEventListener('DOMContentLoaded', function () {
  const zooming = new Zooming({
    bgColor: 'rgb(0, 0, 0)',
    bgOpacity: 0.8,
    customSize: '100%'
  })

  zooming.listen('.img-zoomable')
})

//Get the visitors element on the page

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // Typical action to be performed when the document is ready:
    document.getElementById("transactions2").innerHTML = xhttp.responseText;
  }
};
xhttp.open(
  "GET",
  "https://rff8fll6zc.execute-api.us-east-1.amazonaws.com/Prod/transactions?transactionid=5&type=PURCHASE&amount=500",
  true
);
xhttp.send();

//Get Client IP address for store of primary key in dynamodb for visitor counter
//https://stackoverflow.com/questions/391979/how-to-get-clients-ip-address-using-javascript

$.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
  // Convert key-value pairs to JSON
  // https://stackoverflow.com/a/39284735/452587
  data = data.trim().split('\n').reduce(function(obj, pair) {
    pair = pair.split('=');
    return obj[pair[0]] = pair[1], obj;
  }, {});
  console.log(data);
  //select ip portion of returned data
  var ip= (data).ip;
  ip = ip.replace(/\./g,'-')
  var loc = (data).loc;
  //set ip div element to ip
  document.getElementById('ipdiv').innerHTML = ip + " " + loc;

  //get datetime
  const date = new Date()
  var datetime = date.toISOString();
  datetime = datetime.replace(/\./g,'-')
  datetime = datetime.replace(/:/g,'-')
  document.getElementById('datetime').innerHTML = datetime;
  //var datetime = Date().toLocaleString(    [], {month: '2-digit', year: '4-digit', hour: '2-digit', minute:'2-digit', second:'2-digit'}  );
  //document.getElementById("datetime").innerHTML = datetime;

  // Get the visitors element on the page
  // Use AJAX to send a http request to the server
  // To send a request to a server, we use the open() and send() methods of the XMLHttpRequest object:
  var xhttp2 = new XMLHttpRequest();
  xhttp2.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      document.getElementById("uniquevisits").innerHTML = xhttp.responseText;
    }
  };

  // open(method, url, async)
  xhttp2.open(
    "GET",
    "https://rff8fll6zc.execute-api.us-east-1.amazonaws.com/Prod/counter?ip=" + ip + "&datetime=" + datetime,
    //"https://bwc2pl2iz5.execute-api.us-east-1.amazonaws.com/Prod/counter",
    true
  );
  // Sends the request to the server
  xhttp2.send(); // GET
});
