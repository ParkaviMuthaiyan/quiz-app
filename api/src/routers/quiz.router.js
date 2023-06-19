import express from 'express';
import { createQuiz, getQuizzes } from '../controller/quiz.controller.js';
import { validateCreateQuiz } from '../validators/quiz.validator.js';


const router = express.Router();


router.post('/', validateCreateQuiz, createQuiz);
router.get('/', getQuizzes);

export default router;
