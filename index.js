require("dotenv").config();

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require("express");
const cors = require("cors");
const connectDB = require("./database/connectDB.js");
const errorHandler = require("./middlewares/errorHandler.js");
const requestLogger = require("./middlewares/logger.js");   // renamed to requestLogger (lowercase)

const articleRoutes = require('./routes/article.routes');

const app = express();
const PORT = process.env.PORT || 3010;

connectDB();

app.use(express.json());

// ✅ Use cors() without quotes – or with proper config
app.use(cors());   // or app.use(cors({ origin: '*' }))

app.use(requestLogger);

// ✅ Mount at /api instead of /api/v1
app.use("/api", articleRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});