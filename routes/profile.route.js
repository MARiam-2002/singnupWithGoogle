import { Router } from "express";
const router = Router();
const userCheck = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/auth/login");
  }
  next();
};

router.get("/", userCheck, (req, res, next) => {
  res.render("profile", { user: req.user });
});
export default router;
