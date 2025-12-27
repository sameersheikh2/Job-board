const connectDB = require("./config/db");
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json(), cors());

app.use('/api/auth', authRoutes).

app.use('/api/profile', profileRoutes).
// Connect to the database
connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
  });
});
