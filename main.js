const express = require('express');

const user = require("./crud/user");

const app = express();

app.use(express.json());

app.use("/users", user);



const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));