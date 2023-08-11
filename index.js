require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const PORT = process.env.PORT || 6000;
const users_routes = require("./routes/users");
const budget_router = require("./routes/budgets");
const spending_router = require("./routes/spendings");
const income_router = require("./routes/incomes");
const Goal_router = require("./routes/goals");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.send("I am a sevrver");
});

//middlewares

app.use("/api/users/", users_routes);
app.use("/api/budget/", budget_router);
app.use("/api/spendings/", spending_router);
app.use("/api/incomes/", income_router);
app.use("/api/goals/", Goal_router);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`localhost:${PORT} I am Connected`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
