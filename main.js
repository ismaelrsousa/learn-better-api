const express = require('express');

const user = require("./crud/user");
const category = require("./crud/category");

const app = express();

app.use(express.json());

app.use("/users", user);

app.use("/category", category);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));