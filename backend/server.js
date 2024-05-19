const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./models");
require("./routes/scheduler.routes")(app);


db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Scheduler back-end service." });
});

const PORT = process.env.PORT || 5432;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
