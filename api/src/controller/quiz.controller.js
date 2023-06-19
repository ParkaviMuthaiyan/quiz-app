import quizService from "../services/quiz.service.js";


async function createQuiz(req, res, next) {
    try {
        const question = req.body.question;
        const optionA = req.body.options.a;
        const optionB = req.body.options.b;
        const optionC = req.body.options.c;
        const optionD = req.body.options.d;
        const answer = req.body.answer;

        const id = await quizService.insert({ question, optionA, optionB, optionC, optionD, answer });
        const quiz = await quizService.findById(id);

        res.status(200).send({
            message: 'New Quiz Added',
            data: {
                id: quiz.id,
                question: quiz.question,
                options: {
                    a: quiz.option_a,
                    b: quiz.option_b,
                    c: quiz.option_c,
                    d: quiz.option_d,
                },
                answer: quiz.answer
            }
        });

    } catch (error) {
        next(error);
    }
}


async function getQuizzes(req, res, next) {
    try {
        const quizzes = await quizService.findRandom();
        const data = quizzes.map(quiz => {
            return {
                id: quiz.id,
                question: quiz.question,
                options: {
                    a: quiz.option_a,
                    b: quiz.option_b,
                    c: quiz.option_c,
                    d: quiz.option_d,
                },
                answer: quiz.answer
            }
        })

        res.status(200).send({ data });

    } catch (error) {
        next(error);
    }
}

export {
    createQuiz,
    getQuizzes
}
