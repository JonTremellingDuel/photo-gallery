import express from "../common";
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import User from '../models/User';
import { generateJWT, verifyJWT } from "../controllers/authController";

// Google OAuth2 configuration
passport.use(new GoogleStrategy({
    clientID: '966794637203-iiilmdkt4l7590heoucn41kpuv96hsle.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:5050/auth/google/callback'
}, (accessToken: string, refreshToken: string, profile: any, done: any) => {
    // Save or retrieve user data from MongoDB
    // Call done() when finished
    console.log(accessToken);
    console.log(refreshToken);

    return done(null, profile);
}));

// Serialize user into the session
passport.serializeUser((user: any, done: any) => {
    done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user: any, done: any) => {
    done(null, user);
});

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req: any, res: any) => {
        const {code} = req.query;
        const {id, name: {familyName, givenName}, displayName, emails} = req.user;
        const userData = {
            googleId: id,
            fname: givenName,
            sname: familyName,
            displayName: displayName,
            email: emails.find((it: {verified: boolean;}) => it.verified)?.value,
        };
    
        // Save user data to your database
        User.findOneAndUpdate({ googleId: userData.googleId }, userData, { upsert: true, new: true })
            .then(user => {
                const token = generateJWT(user);
    
                // Redirect the user or send a response back to the client with the token
                res.redirect(`https://localhost:3001?accessToken=${token}`);
            })
            .catch(err => {
                console.error('Error saving user data:', err);
                res.redirect('https://localhost:3001/login'); // Redirect to the login page or handle the error accordingly
            });
    });

module.exports = router;