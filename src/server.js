import express from "express";
import http from "http";
import Websocket from "ws";

const app = express();

// view 설정
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

// static 설정
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

// app.listen(3000);

// http 서버 생성. http 서버에 웹소켓 서버를 띄우기 위해 명시적으로 생성시킴
// 원래는 명시적으로 호출할 필요가 없음.
const server = http.createServer(app);
// 웹 소켓 서버 생성
const wss = new Websocket.Server({ server });

const sockets = [];

// 웹소켓 연결
wss.on("connection", (socket) => {
  // 새로운 소켓이 생성되어 연결되므로 브라우저들끼리 소통 불가
  // 각 생성되는 소켓들을 배열에 저장
  sockets.push(socket);
  console.log("Connected Browser..!");
  socket.on("close", () => console.log("Disconnected Browser..!"));
  socket.on("message", (message) => {
    // 연결된 모든 소켓들한테 메세지 전송
    sockets.forEach((s) => s.send(message.toString()));
  });
  socket.send("hello! browser!!");
});

// http 서버와 wss 서버 둘 다 사용 가능
server.listen(3000);
