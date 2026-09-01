const cors = require("cors");
require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const { ExpenseRouter } = require("./routes/expenseRoutes");
const { UserRouter } = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 8000;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use("/uploads", express.static(path.join("uploads")));

// Routes
app.use("/api/expenses", ExpenseRouter);
app.use("/api/users", UserRouter);

// Error handling middleware
app.use(errorHandler);

// Default route
app.get("/", (req, res) => {
  res.send("hello world");
});

// Start server
app.listen(port, () => {
  console.log(`🌐 Server running on http://localhost:${port}`);
});
