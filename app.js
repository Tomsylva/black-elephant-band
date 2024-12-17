require("dotenv/config");
require("./db");
const express = require("express");
const app = express();
require("./config")(app);
const projectName = "black-elephant-band";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with Ironlauncher`;

const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const musicRoutes = require("./routes/music");
app.use("/music", musicRoutes);

const aboutRoutes = require("./routes/about");
app.use("/about", aboutRoutes);

const tourRoutes = require("./routes/tour");
app.use("/tour", tourRoutes);

const merchRoutes = require("./routes/merch");
app.use("/merch", merchRoutes);

const contactRoutes = require("./routes/contact");
app.use("/contact", contactRoutes);

const friendsRoutes = require("./routes/friends");
app.use("/friends", friendsRoutes);

const videosRoutes = require("./routes/videos");
app.use("/videos", videosRoutes);

const blogRoutes = require("./routes/blog");
app.use("/blog", blogRoutes);

require("./error-handling")(app);

module.exports = app;
