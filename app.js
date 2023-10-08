import express from "express";
import authRouter from "./routes/auth.route.js";
import profileRouter from "./routes/profile.route.js";
import passportSetup from "./config/passport.setup.js";
import connectDB from "./DB/connection.js";
import cookieSession from "cookie-session";
import passport from "passport";
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(
  cookieSession({ maxAge: 24 * 60 * 60 * 1000, keys: [process.env.SESSION] })
);
app.use(passport.initialize())
app.use(passport.session())
connectDB();
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.get("/", (req, res) => res.render("home",{user:req.user}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
