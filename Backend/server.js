const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require('./config/db');
const datasetRoutes = require("./routes/datasetRoutes");
require("dotenv").config();

const session = require("express-session");
const passport = require("passport");
require("./config/passport");

const authRoutes = require("./routes/authRoutes");
const insightRoutes = require('./routes/insightRoutes');

const app = express();

app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/dataset", datasetRoutes);
app.use("/api/insight", insightRoutes);

const statsRoutes = require('./routes/statsRoutes');
app.use("/api/stats", statsRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
