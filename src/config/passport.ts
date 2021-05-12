import passport from 'passport';
import { UserModel } from '../components/User/user.model';
import config from './config';
import googleStrategy from 'passport-google-oauth20';
import facebookStrategy from 'passport-facebook';

var FacebookStrategy = facebookStrategy.Strategy;
var GoogleStrategy = googleStrategy.Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: config.oauth.google.cliendID,
            clientSecret: config.oauth.google.clientSecret,
            callbackURL: config.oauth.google.callbackURL
        },
        function (accessToken: any, refreshToken: any, profile: any, done: any) {
            UserModel.findOne({ googleId: profile.id }).then((currentUser) => {
                if (currentUser) {
                    done(null, currentUser);
                } else {
                    new UserModel({
                        displayName: profile._json.name,
                        name: {
                            familyName: profile._json.family_name,
                            givenName: profile._json.given_name
                        },
                        email: profile._json.email,
                        picture: profile._json.picture,
                        googleId: profile.id,
                        photos: profile.photos
                    })
                        .save()
                        .then((newUser) => {
                            done(null, newUser);
                        });
                }
            });
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: config.oauth.facebook.cliendID,
            clientSecret: config.oauth.facebook.clientSecret,
            callbackURL: config.oauth.facebook.callbackURL,
            profileFields: ['id', 'displayName', 'photos', 'email', 'gender', 'name']
        },
        function (accessToken: any, refreshToken: any, profile: any, done: any) {
            UserModel.findOne({ facebookId: profile.id }).then((currentUser) => {
                if (currentUser) {
                    done(null, currentUser);
                } else {
                    new UserModel({
                        displayName: profile._json.name,
                        name: {
                            familyName: profile._json.last_name,
                            givenName: profile._json.first_name
                        },
                        email: profile._json.email,
                        picture: profile.photos[0].value,
                        facebookId: profile.id,
                        photos: profile.photos
                    })
                        .save()
                        .then((newUser) => {
                            done(null, newUser);
                        });
                }
            });
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id).then((user) => {
        done(null, user);
    });
});
