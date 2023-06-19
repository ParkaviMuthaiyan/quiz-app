import React from 'react';
import Button from '../../components/Button';
import OptionButton from '../../components/OptionButton';
import data from '../../datasets/quizzes.json';
import style from './home.module.css';

function Home() {

    const [quizzes, setQuizzes] = React.useState([]);
    const [selectedAnswer, setSelectedAnswer] = React.useState([]);
    const [currentQuizIndex, setCurrentQuizIndex] = React.useState(0);
    const [showResult, setShowResult] = React.useState(false);


    const currentQuiz = quizzes[currentQuizIndex];

    function getQuizzes() {
        const randomIndices = [];
        let index = 0;

        while (randomIndices.length < 10) {
            const rand = Math.floor(Math.random() * data.length);

            if (!randomIndices.includes(rand)) {
                randomIndices[index++] = rand;
            }
        }

        setQuizzes(randomIndices.map(i => data[i]))
    }

    function prevClickHandler() {
        setCurrentQuizIndex(currentQuizIndex - 1);
    }

    function nextClickHandler() {
        setCurrentQuizIndex(currentQuizIndex + 1);
    }

    function answerSelectHandler(answer) {
        const updateAnswers = [...selectedAnswer];
        updateAnswers[currentQuizIndex] = answer;

        setSelectedAnswer(updateAnswers);
    }

    function submit() {
        setShowResult(selectedAnswer.length === 10);
    }

    function tryAgain() {
        setShowResult(false)
        setSelectedAnswer([])
        setCurrentQuizIndex(0)
    }

    React.useEffect(() => {
        getQuizzes();
    }, []);

    console.log(quizzes);

    return <div className={style.container}>
        <div className={`${style.box} ${style.greenBox}`}></div>
        <div className={`${style.box} ${style.yellowBox}`}></div>
        <div className={`${style.box} ${style.whiteBox}`}>

            {!showResult && currentQuiz
                ? <React.Fragment>
                    <h6 className={style.question} dangerouslySetInnerHTML={{ __html: `${currentQuizIndex + 1}. ${currentQuiz.question}` }} />
                    <OptionButton text={currentQuiz.options.a}
                        onClick={() => answerSelectHandler('a')}
                        selected={selectedAnswer[currentQuizIndex] === 'a'}
                    />

                    <OptionButton text={currentQuiz.options.b}
                        onClick={() => answerSelectHandler('b')}
                        selected={selectedAnswer[currentQuizIndex] === 'b'}
                    />

                    <OptionButton text={currentQuiz.options.c}
                        onClick={() => answerSelectHandler('c')}
                        selected={selectedAnswer[currentQuizIndex] === 'c'}
                    />

                    <OptionButton text={currentQuiz.options.d}
                        onClick={() => answerSelectHandler('d')}
                        selected={selectedAnswer[currentQuizIndex] === 'd'}
                    />

                    <div className='d-flex align-item-center justify-content-between mt-3'>
                        {currentQuizIndex !== 0 ? <Button text='Prev' onClick={prevClickHandler} /> : <div style={{ width: '100px' }} />}

                        {selectedAnswer.length === 10 && <Button text='Submit' onClick={submit} />}

                        {currentQuizIndex !== 9 ? <Button text='Next' onClick={nextClickHandler} /> : <div style={{ width: '100px' }} />}
                    </div>
                    <Button text='Try Others' onClick={getQuizzes} />
                </React.Fragment>
                : <div className={style.result}>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Answer</th>
                                <th>Selected</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>{quizzes.map((quiz, i) => {
                            return <tr key={quiz.id}>
                                <td dangerouslySetInnerHTML={{ __html: quiz.question }} />
                                <td dangerouslySetInnerHTML={{ __html: quiz.options[quiz.answer] }} />
                                <td dangerouslySetInnerHTML={{ __html: quiz.options[selectedAnswer[i]] }} />
                                <td>{quiz.answer === selectedAnswer[i] ? 1 : 0}</td>
                            </tr>
                        })}</tbody>
                        <tfoot>
                            <tr>
                                <th colSpan={3}>Total</th>
                                <th>{quizzes.filter((q, i) => q.answer ===
                                    selectedAnswer[i]).length}</th>
                            </tr>
                        </tfoot>
                    </table>
                    <Button text='Try Again' onClick={tryAgain} />
                </div>
            }
        </div>
    </div>
}


export default Home;