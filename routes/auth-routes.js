const express = require("express");
const passport = require("../utils/passport-config");

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
    prompt: "login",
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/perfil");
  }
);

router.get("/perfil", (req, res) => {
  res.send(req.isAuthenticated() ? req.user : "No autenticado");
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy();

    res.redirect("/eliminado");
  });
});
module.exports = router;
