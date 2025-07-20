const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const cors = require("cors");


dotenv.config();

const app = express();

app.use((req, res, next) => {
  if (process.env.MAINTENANCE_MODE === "true") {
    return res.status(503).sendFile(path.join(__dirname, "public", "maintenance.html"));
  }
  next();
});


if (process.env.MODE === "prod") {
  const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || "15") * 60 * 1000, 
    max: parseInt(process.env.RATE_LIMIT_MAXCALL || "100"), 
    message: "Too many requests from this IP, please try again later.",
  });
  app.use(limiter);
}


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.disable("etag");

const apiRouter = require("./Routes/api/Main");
app.use("/api", apiRouter);


app.use((req, res, next) => {
  return res.status(404).json({
    status: "error",
    message: "Not found",
  });
});


app.use((err, req, res, next) => {
  try {
    console.error(
      err,
      `\nRequest: ${req.method} ${req.url}\nHeaders: ${JSON.stringify(req.headers)}\nBody: ${JSON.stringify(req.body)}`
    );
  } catch (error) {
    console.error("Error in error handler:", error, err);
  }

  return res.status(err.status || 500).json({
    status: "error",
    message: "Internal server error",
  });
});

module.exports = app;
