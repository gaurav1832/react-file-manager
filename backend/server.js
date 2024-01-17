require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./src/routes/userRoutes");
const fileRoutes = require("./src/routes/fileRoutes");

const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/user", userRoutes);
app.use("/file", fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
