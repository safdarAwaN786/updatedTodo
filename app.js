const express = require('express')
const cors = require('cors');
const app = express();
require('./DB/connectdb')
const usersRouter = require('./Routers/UserRouter');
const tasksRouter = require('./Routers/TaskRouter');
const path = require('path')

// * Connecting To Port
const port = 1126;
app.use(cors());

// {
  // origin: "http://localhost:3000"
// }

// * Automatically parse incoming JSON to an object so we access it in our request handlers
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(usersRouter);
app.use(tasksRouter)


app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (_, res) {
    res.setHeader("Content-Type", "text/html");
    res.sendFile(
        path.join(__dirname, "./frontend/build/index.html"),
        function (err) {
            res.status(500).send(err);
        }, 
    );
});

// * listening To Port
app.listen(port, () => {
  console.log(`This is the ${port} active port! Wait for DB Connection...`);
});