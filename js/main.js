document.addEventListener('DOMContentLoaded', function () {
  const zooming = new Zooming({
    bgColor: 'rgb(0, 0, 0)',
    bgOpacity: 0.8,
    customSize: '100%'
  })

  zooming.listen('.img-zoomable')
})


// POST API REQUEST
async function post_visitor() {
  try {
    let response = await fetch('https://rff8fll6zc.execute-api.us-east-1.amazonaws.com/Prod/transactions?transactionId=5&type=PURCHASE&amount=500', {
      method: 'POST',
      headers: {
        'Content-Type', 'application/json',
      }
    });
    let data = await response.json()
    //console.log(data);
    return data;
  } catch(err) {
    console.error(err);
  }
}

// GET API REQUEST
async function get_visitors() {
  // call post api request function
  await post_visitor();
  try {
    let response = await fetch('https://rff8fll6zc.execute-api.us-east-1.amazonaws.com/Prod/transactions?transactionId=5&type=PURCHASE&amount=500', {
      method: 'GET',
      headers: {
        'Content-Type', 'application/json'
      }
    });
    let data = await response.json()
    document.getElementById("transactions").innerHTML = data['body'] + " visitors";
    //console.log(data);
    return data;
  } catch(err) {
    console.error(err);
  }
}

get_visitors();

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
  "https://rff8fll6zc.execute-api.us-east-1.amazonaws.com/Prod/transactions?transactionId=5&type=PURCHASE&amount=500",
  true
);
xhttp.send();
