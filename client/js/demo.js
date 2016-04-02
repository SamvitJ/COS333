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
      xhttp.open("POST", "http://shrouded-stream-84278.herokuapp.com/api/hangouts", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send("url=fdsa");
    } 
  };  
    
  var hangoutDemo = new HangoutDemo();  
}(window));

