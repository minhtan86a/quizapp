import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  //Get an element only
  //if question not answer yet, then activeQuestionIndex = userAnswers.length
  //else stick to the old question
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  //Check the quiz is complete or not
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  //useCallback hook
  //when activeQuestionIndex change then re-create
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      //user selected answer
      setAnswerState("answered");

      //keep all answers of users into array.
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });

      //after 1s to check the answer is right or wrong
      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        //set new timer which will only start after this timer expired
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  //useCallback hook to handle Skip answer
  //ensure that functions don't get recreated unless dependencies changed
  //handleSelectAnswer is dependency because it depend on props and state
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  //Check quiz complete
  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  //Shuffle answers, should come after check quiz complete
  //This code is execute if we have a question to display
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]; //not edit original array
  shuffledAnswers.sort(() => Math.random() - 0.5); //random answers

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          //key is used to destroy the old component and create a new one -> unmount and remount it
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            //check selected answer
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let cssClass = "";

            if (answerState === "answered" && isSelected) {
              cssClass = "selected";
            }

            if (
              (answerState === "correct" || answerState === "wrong") &&
              isSelected
            ) {
              cssClass = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
