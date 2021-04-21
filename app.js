// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

const projectName = "black-elephant-band";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with Ironlauncher`;

// 👇 Start handling routes here
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
app.use("/blog", blogRoutes)


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
