import jwt from 'jsonwebtoken';
import pkg from 'passport-jwt';
import User from './models/userModel.js';
const { Strategy:JwtStrategy, ExtractJwt } = pkg;
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
export const generateToken = user => {
    // first parameter is the user object
    // second parameter is json web token secret a key that encrypt data and generate the token
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
       
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
        expiresIn: '25d',
    }
    );
}

export const refreshToken = user => {
    return jwt.sign(
   { 
       _id: user._id,
       name: user.name,
       email: user.email,
     
   },
   process.env.REFRESH_TOKEN_SECRET || 'secret',
   { 
       expiresIn: '30d'
   }
)}



export const applyPassportStrategy = passport => {
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_SECRET || 'somethingsecret';
  
    // Configure the JWT authentication strategy
    passport.use(new JwtStrategy(opts, function(jwtPayload, done) {
      // Find the user in the database using the user ID from the JWT token
      User.findById(jwtPayload._id).exec()
        .then(user => {
          // If a user is found, return null (no error) and the user object
          if (user) {
            return done(null, user);
          } else {
            // If no user is found, return null (no error) and false (no user)
            return done(null, false);
          }
        })
        .catch(err => {
          // If there's an error, return it and no user
          return done(err, false);
        });
    }));
  };
  





