import express from "express";
const protection = require("./middlewares/protection");
const app = express();
const PORT = process.env.PORT || 8000;
require("dotenv").config();
const db = require("./db");

app.use(protection);

// body parse and url
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// truecaller api routes
app.use(`/api/truecaller`, require("./routes/api/truecaller"));

app.get("/", (req, res) => res.send("True Caller Authentication Server"));

db.connect(process.env.DATABASE);

app.listen(PORT);
