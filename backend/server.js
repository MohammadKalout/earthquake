import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/userRouter.js";
import statRouter from "./routes/StatisticsRouter.js";
import passport from "passport";
import {applyPassportStrategy} from "./utils.js";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
applyPassportStrategy(passport);

// connect to MongoDB
mongoose.connect('mongodb+srv://mhmd:Hgti2hdGUzxXRhdv@earth-quake.u21mlne.mongodb.net/earth-quake?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// define routes
app.use('/api/users', userRouter);
app.use('/api/statistics', statRouter);
// start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
