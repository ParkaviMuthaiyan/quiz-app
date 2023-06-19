import express from 'express';
import { appConfig } from './config/index.js';
import quizRouter from './routers/quiz.router.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/quizzes', quizRouter);

app.listen(appConfig.port, appConfig.host, () => {
    console.log(`App is running on http://${appConfig.host}:${appConfig.port}`)
});