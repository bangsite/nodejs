const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const port = 3000;
app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const users = [
  { id: 1, name: "Bang" },
  { id: 2, name: "THinh" },
];

app.get("/", (req, res) => {
  res.render("index", {
    name: "AASD",
  });
});

app.get("/users", (req, res) => {
  res.render("users/index", {
    users: users,
  });
});

app.get("/users/search", (req, res) => {
  let q = req.query.q;
  let matchedUsers = users.filter((user) => {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });

  res.render("users/index", {
    users: matchedUsers,
  });
});

app.get("/users/create", (req, res) => {
  res.render("users/create");
});

app.post("/users/create", (req, res) => {
  users.push(req.body);
  res.redirect('/users')
  
});

app.listen(port, () => {
  console.log("Server listerning on port 3000!");
});
