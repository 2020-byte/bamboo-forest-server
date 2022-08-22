import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import postsRouter from './router/posts.js'

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));


app.use('/', postsRouter);

app.use((req, res, next) => {
    res.sendStatus(404)
});

app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500);
});
app.listen(3000);


