const express = require("express");

const app = express();

application.use(express.json());

app.get("/menu", (req, res) => {
  items: ["thali", "biryani"];
});

app.post("/order", (req, res) => {
  res.status(200).json({
    status: "received",
    order: req.body,
  });
});
