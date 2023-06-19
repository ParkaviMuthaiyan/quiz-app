import quizService from "../services/quiz.service.js";

async function validateCreateQuiz(req, res, next) {
    try {
        const question = req.body.question;
        const optionA = req.body.options.a;
        const optionB = req.body.options.b;
        const optionC = req.body.options.c;
        const optionD = req.body.options.c;
        const answer = req.body.answer;

        if (!question) {
            res.status(400).send({
                message: " Question required"
            });
        } else if (typeof question !== 'string') {
            res.status(400).send({
                message: "Invalid question"
            });
        } else if (question.trim().length > 500) {
            res.status(400).send({
                message: "Question is too long"
            });
        }

        const quiz = await quizService.findByUnique(question.trim());

        if (quiz) {
            res.status(400).send({
                message: "Quiz already exist!"
            });
        }

        if (!optionA) {
            res.status(400).send({
                message: " Option A  required"
            });
        } else if (typeof optionA !== 'string') {
            res.status(400).send({
                message: "Invalid option A"
            });
        } else if (optionA.trim().length > 100) {
            res.status(400).send({
                message: "Option A is too long"
            });
        }

        if (!optionB) {
            res.status(400).send({
                message: " Option B  required"
            });
        } else if (typeof optionB !== 'string') {
            res.status(400).send({
                message: "Invalid option B"
            });
        } else if (optionB.trim().length > 100) {
            res.status(400).send({
                message: "Option B is too long"
            });
        }

        if (!optionC) {
            res.status(400).send({
                message: " Option C  required"
            });
        } else if (typeof optionC !== 'string') {
            res.status(400).send({
                message: "Invalid option C"
            });
        } else if (optionC.trim().length > 100) {
            res.status(400).send({
                message: "Option C is too long"
            });
        }

        if (!optionD) {
            res.status(400).send({
                message: " Option D  required"
            });
        } else if (typeof optionD !== 'string') {
            res.status(400).send({
                message: "Invalid option D"
            });
        } else if (optionD.trim().length > 100) {
            res.status(400).send({
                message: "Option D is too long"
            });
        }

        if (!answer) {
            res.status(400).send({
                message: " Answer required"
            });
        } else if (typeof answer !== 'string') {
            res.status(400).send({
                message: "Invalid answer"
            });
        } else if (!['a', 'b', 'c', 'd'].includes(answer.trim())) {
            res.status(400).send({
                message: "Invalid Answer"
            });
        }
        next();

    } catch (error) {
        next(error);
    }
}

export {
    validateCreateQuiz,
}