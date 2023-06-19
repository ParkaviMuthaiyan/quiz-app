import React from 'react';
import api from '../../utils/api';
import Button from '../../components/Button';
import OptionButton from '../../components/OptionButton';
import style from './home.module.css';

function Home() {

    const [quizzes, setQuizzes] = React.useState([]);
    const [selectedAnswer, setSelectedAnswer] = React.useState([]);
    const [currentQuizIndex, setCurrentQuizIndex] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const [showResult, setShowResult] = React.useState(false);


    const currentQuiz = quizzes[currentQuizIndex];

    function getQuizzes() {
        setLoading(true)
        api.get('/quizzes').then(res => {
            setQuizzes(res.data.data);
            console.log(res.data.data);
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            setLoading(false)
        });
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


    return <div className={style.container}>
        <div className={`${style.box} ${style.greenBox}`}></div>
        <div className={`${style.box} ${style.yellowBox}`}></div>
        <div className={`${style.box} ${style.whiteBox}`}>

            {loading
                ? <div>Loading...</div>
                : !showResult
                    ? <React.Fragment>
                        <h6 className={style.question}>{currentQuizIndex + 1} . {currentQuiz.question}</h6>
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
                                    <td>{quiz.question}</td>
                                    <td>{quiz.options[quiz.answer]}</td>
                                    <td>{quiz.options[selectedAnswer[i]]}</td>
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