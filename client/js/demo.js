(function (window) {  
  "use strict"; 
    
  function HangoutDemo() {  
    console.log("Starting..."); 
    gapi.hangout.onApiReady.add(this.onApiReady.bind(this));
  } 
    
  HangoutDemo.prototype.onApiReady = function (event) { 
    if (event.isApiReady === true) {  
      console.log("API Ready"); 
      console.log(event)
      console.log(gapi)
    } 
  };  
    
  var hangoutDemo = new HangoutDemo();  
}(window));

