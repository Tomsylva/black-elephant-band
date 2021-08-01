const router = require("express").Router();
const bcrypt = require("bcryptjs");
// const mongoose = require("mongoose");
// const saltRounds = 10;
const User = require("../models/User.model");
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const isLoggedIn = require("../middlewares/isLoggedIn");

// router.get("/signup", shouldNotBeLoggedIn, (req, res) => {
//   res.render("auth/signup");
// });

// router.post("/signup", shouldNotBeLoggedIn, (req, res) => {
//   const { username, password } = req.body;

//   if (!username) {
//     return res
//       .status(400)
//       .render("auth/signup", { errorMessage: "Please provide your username." });
//   }

//   if (password.length < 8) {
//     return res.status(400).render("auth/signup", {
//       errorMessage: "Your password needs to be at least 8 characters long.",
//     });
//   }

//   //   ! This use case is using a regular expression to control for special characters and min length
//   /*
//   const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

//   if (!regex.test(password)) {
//     return res.status(400).render("signup", {
//       errorMessage:
//         "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
//     });
//   }
//   */

//   // Search the database for a user with the username submitted in the form
//   User.findOne({ username }).then((found) => {
//     // If the user is found, send the message username is taken
//     if (found) {
//       return res
//         .status(400)
//         .render("auth/signup", { errorMessage: "Username already taken." });
//     }

//     // if user is not found, create a new user - start with hashing the password
//     return bcrypt
//       .genSalt(saltRounds)
//       .then((salt) => bcrypt.hash(password, salt))
//       .then((hashedPassword) => {
//         // Create a user and save it in the database
//         return User.create({
//           username,
//           password: hashedPassword,
//         });
//       })
//       .then((user) => {
//         // Bind the user to the session object
//         req.session.user = user;
//         res.redirect("/");
//       })
//       .catch((error) => {
//         if (error instanceof mongoose.Error.ValidationError) {
//           return res
//             .status(400)
//             .render("auth/signup", { errorMessage: error.message });
//         }
//         if (error.code === 11000) {
//           return res.status(400).render("auth/signup", {
//             errorMessage:
//               "Username need to be unique. The username you chose is already in use.",
//           });
//         }
//         return res
//           .status(500)
//           .render("auth/signup", { errorMessage: error.message });
//       });
//   });
// });

router.get("/login", shouldNotBeLoggedIn, (req, res) => {
  res.render("auth/login");
});

router.post("/login", shouldNotBeLoggedIn, (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return res
      .status(400)
      .render("auth/login", { errorMessage: "Please provide your username." });
  }

  if (password.length < 8) {
    return res.status(400).render("auth/login", {
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .render("auth/login", { errorMessage: "Wrong credentials." });
      }

      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res
            .status(400)
            .render("auth/login", { errorMessage: "Wrong credentials." });
        }
        req.session.user = user;
        // req.session.user = user._id;
        return res.redirect("/");
      });
    })

    .catch((err) => {
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .render("auth/logout", { errorMessage: err.message });
    }
    res.redirect("/");
  });
});

module.exports = router;
