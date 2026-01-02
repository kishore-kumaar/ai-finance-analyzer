const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
connectDB();


const app = express();

// middleware
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const expenseRoutes = require("./routes/expenseRoutes");
app.use("/api/expenses", expenseRoutes);
const insightRoutes = require("./routes/insightRoutes");
app.use("/api/insights", insightRoutes);
const monthSummaryRoutes = require("./routes/monthSummaryRoutes");
app.use("/api/summary", monthSummaryRoutes);


// test route
app.get("/", (req, res) => {
  res.send("AI Finance Analyzer Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
