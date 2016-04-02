(function (window) {  
  "use strict"; 
    
  function HangoutDemo() {  
    console.log("Starting..."); 
    gapi.hangout.onApiReady.add(this.onApiReady.bind(this));
  } 
    
  HangoutDemo.prototype.onApiReady = function (event) { 
    if (event.isApiReady === true) {  
      console.log("API Ready"); 
      console.log(gapi.hangout.getHangoutUrl())
      // xhttp.open("POST", "http://shrouded-stream-84278.herokuapp.com/api/hangouts", true);
      // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      // xhttp.send("url=fdsa");

      var http = new XMLHttpRequest();
      var url = "http://shrouded-stream-84278.herokuapp.com/api/hangouts";
      var params = "url=fdsa";
      http.open("POST", url, true);

      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      http.setRequestHeader("Content-length", params.length);
      http.setRequestHeader("Connection", "close");

      // http.onreadystatechange = function() {//Call a function when the state changes.
      //     if(http.readyState == 4 && http.status == 200) {
      //         alert(http.responseText);
      //     }
      // }
      http.send(params);
    } 
  };  
    
  var hangoutDemo = new HangoutDemo();  
}(window));

