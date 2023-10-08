import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";
import userModel from "../DB/model/user.model.js";
dotenv.config();
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});
passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      scope: ["profile"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const checkUser = await userModel.findOne({ googleId: profile.id });
      if (checkUser) {
        done(null, checkUser);
        console.log(`user is ${checkUser}`);
      } else {
        const user = await userModel.create({
          userName: profile.displayName,
          googleId: profile.id,
          thumbnail: profile._json.image.url,
        });
        console.log(user);
        done(null.user);
      }
    }
  )
);

export default passport;
