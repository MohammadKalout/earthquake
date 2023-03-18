import express from "express";
import axios from "axios";
import Statistics from '../models/statisticsModel.js';
import moment from "moment";
import expressAsyncHandler from 'express-async-handler';
import passport from 'passport';
const statRouter = express.Router();


const covidRouter = express.Router();

statRouter.get('/get',
    passport.authenticate('jwt', { session: false }),
    expressAsyncHandler(async (req, res) => {
        try {

            const { data } = await axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=2020-01-10&limit=50');
            res.send(data)
        } catch (error) {
            res.status('401').send(error)
        }
    }))



export default statRouter;
