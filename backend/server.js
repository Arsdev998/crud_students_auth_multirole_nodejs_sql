import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import TaskRoute from './routes/TaskRoute.js';
import UsersRoute from './routes/UsersRoute.js';
import AuthRoute from './routes/AuthRoute.js'

import SequelizeStore from 'connect-session-sequelize'
import db from "./config/Db.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db:db
})

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store:store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(TaskRoute);
app.use(UsersRoute);
app.use(AuthRoute)

// store.sync()

app.listen(process.env.APP_PORT, () => {
  console.log("server up and running");
});



