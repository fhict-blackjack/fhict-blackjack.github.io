var ws = new WebSocket("ws://localhost:8095/communicator/");
const RETRY_INTERVAL = 10000;

ws.addEventListener("message", function(message) {
  console.log("joejoe");
  var received_msg = JSON.parse(message.data);

  if(!received_msg.hasOwnProperty("operation"))
    return;
  
  var content = {};
  if(received_msg.hasOwnProperty("content")){
    content = received_msg.content;
  }
  
  ws.dispatchEvent(new CustomEvent("game-message", {'detail': {
    operation: received_msg.operation,
    content: content
  }}));
});

ws.onopen = function() {
  console.log("Connection is opened");
};

ws.onclose = function() { 
  console.log("Connection is closed");

  retryConnectOnFailure(RETRY_INTERVAL);
};

var retryConnectOnFailure = function(retryInMilliseconds) {
  setTimeout(function() {
    if (ws.readyState === WebSocket.CLOSED) {
      ws = new WebSocket("ws://localhost:8095/communicator/");
      retryConnectOnFailure(RETRY_INTERVAL);
    }
  }, retryInMilliseconds);
}

export default ws;
