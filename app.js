import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import postsRouter from './router/posts.js'
import authRouter from './router/auth.js';
import { config } from './config.js';
import { sequelize } from './db/database.js';


const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));


app.use('/', postsRouter);
app.use('/', authRouter);

app.use((req, res, next) => {
    res.sendStatus(404)
});

app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500);
});

//sync is not defined 에러 import잘 못해서 발생했었음.
sequelize.sync().then(() =>{
    app.listen(config.host.port);
});




