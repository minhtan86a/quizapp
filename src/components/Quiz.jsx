import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";

import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  //Get an element only
  //if question not answer yet, then activeQuestionIndex = userAnswers.length
  //else stick to the old question
  const activeQuestionIndex = userAnswers.length;

  //Check the quiz is complete or not
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  //useCallback hook
  //when activeQuestionIndex change then re-create
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    //keep all answers of users into array.
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

  //useCallback hook to handle Skip answer
  //ensure that functions don't get recreated unless dependencies changed
  //handleSelectAnswer is dependency because it depend on props and state
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  //Check quiz complete
  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        //key is used to destroy the old component and create a new one -> unmount and remount it
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
