const express = require("express");
var cors = require("cors");
const app = express();

require("dotenv").config();
app.use(express.json());
app.use(cors());
const dbConfig = require("./config/dbConfig");
const usersRoute = require("./routes/usersRoute");
const transactionsRoute = require("./routes/transactionRoute");

app.use("/api/users", usersRoute);
app.use("/api/transactions", transactionsRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app listening on Port ${PORT}`);
});
