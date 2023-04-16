const socket = new WebSocket(`ws://${window.location.host}`);

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

socket.addEventListener("open", () => console.log("Connected Server..!"));
socket.addEventListener("close", () => console.log("Disconnected Server..!"));
socket.addEventListener("message", (message) => {
  console.log(`New message : ${message.data} from the Server`);
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
});
