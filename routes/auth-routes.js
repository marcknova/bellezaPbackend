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
    res.redirect("http://localhost:5173/bellezaProject/google-profile");
    // res.redirect("/api/auth-routes/perfil");
  }
);

router.get("/perfil", (req, res) => {
  console.log("Is Authenticated:", req.isAuthenticated());

  if (req.isAuthenticated()) {
    res.header("Access-Control-Allow-Credentials", true);
    res.send(req.user);
  } else {
    res.send("No autenticado");
  }
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy();

    res.redirect("/eliminado");
  });
});
module.exports = router;
