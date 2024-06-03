import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef();

  //Shuffle answers, should come after check quiz complete
  //This code is execute if we have a question to display
  //if -> Not shuffled answer yet then shuffled
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers]; //not edit original array
    shuffledAnswers.current.sort(() => Math.random() - 0.5); //random answers
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        //check selected answer
        const isSelected = selectedAnswer === answer;
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
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
