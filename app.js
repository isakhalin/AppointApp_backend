import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import morgan from 'morgan';
import cors from 'cors';
import {createPath} from './helpers/index.js';
import {accessList} from './constants/index.js';
import {router as calendarApiRoutes} from './routes/api-calendar-routes.js';

const app = express();
app.listen(process.env.PORT, (error) => {
  error ? console.log(error) : console.log(`Server listening on port ${process.env.PORT}`);
});

mongoose
  .connect(process.env.DB_URL)
  .then((data) => console.log("Connecting to MongoDB successful"))
  .catch((error) => console.log(error));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.static('build'));
app.use(cors({credentials: true, origin: accessList}));
app.use(calendarApiRoutes);
app.use((req, res) => res.sendFile(createPath()));