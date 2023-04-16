const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => console.log("Connected Server..!"));
socket.addEventListener("close", () => console.log("Disconnected Server..!"));
socket.addEventListener("message", (message) => {
  console.log(`New message : ${message.data} from the Server`);
});

setTimeout(() => {
  socket.send("hi! Server..!");
}, 10000);
