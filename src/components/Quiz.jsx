import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

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

  return (
    <div id="quiz">
      <Question
        //key is used to destroy the old component and create a new one -> unmount and remount it
        key={activeQuestionIndex}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        answerState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
