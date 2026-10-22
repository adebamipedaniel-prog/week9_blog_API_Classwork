require("dotenv").config();

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require("express");
const cors = require("cors");
const connectDB = require("./database/connectDB.js");
const errorHandler = require("./middlewares/errorHandler.js");
const requestLogger = require("./middlewares/logger.js");   // renamed to requestLogger (lowercase)

const ArticleRoutes = require('./routes/article.route.js');
const UserRoutes = require('./routes/user.route.js');

const app = express();
const PORT = process.env.PORT || 3010;

connectDB();

app.use(express.json());

app.use(cors('*'));

app.use(requestLogger);

app.use("/api", ArticleRoutes);
app.use("/api/users", UserRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});