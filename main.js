const express = require('express');

const user = require("./crud/user");
const category = require("./crud/category");
const message = require("./crud/message");
const mentory = require("./crud/mentory");

const app = express();

app.use(express.json());

app.use("/users", user);

app.use("/category", category);

app.use("/message", message);

app.use("/mentory", mentory);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));