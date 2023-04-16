import express from "express";

const app = express();

// view 설정
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

// static 설정
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

console.log("hello");

app.listen(3000);
