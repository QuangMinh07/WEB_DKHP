require("dotenv").config();
const cors = require("cors");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/authroutes");
const userRoute = require("./routes/userroutes");
const courseRoute = require("./routes/courseroutes");
const scheduleRoute = require("./routes/scheduleroutes");
const registerscheduleRoute = require("./routes/registerscheduleroutes");

const app = express();
const port = process.env.PORT || 8888;
app.use(cors());

app.use(express.json());

app.use(cookieParser());
dbConnect();

app.listen(port, () => {
  console.log("Server is running on port", port);
});

app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.use("/v1/course", courseRoute);
app.use("/v1/schedule", scheduleRoute);
app.use("/v1/registerschedule", registerscheduleRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
