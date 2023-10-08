import { Router } from "express";
import passport from "passport";
const router = Router();
router.get("/login", (req, res, next) => {
  res.render("login",{user:req.user});
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect('/')
});
router.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res, next) => {
    res.redirect('/profile/');
  }
);
export default router;
