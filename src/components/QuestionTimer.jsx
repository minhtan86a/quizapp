import { useEffect, useState } from "react";

//onTimeout should be executed once the timer expired
export default function QuestionTimer({ timeout, onTimeout }) {
  //update timer for progress bar to re-render when state change
  const [remainingTime, setRemainingTime] = useState(timeout);

  //set timer and reset timer for a question
  //we have 2 dependencies in this case.
  //Make sure this effect function gets re-executed when one of those dependencies changes
  useEffect(() => {
    setTimeout(onTimeout, timeout);
  }, [timeout, onTimeout]);

  //update remaining time every 100 milliseconds
  //infinite loop because we update the state, then re-execute this component
  //to fix it -> useEffect -> move setInterval inside the useEffect
  //the component will not execute all the time, only when dependencies change
  //in this case, we dont have any dependencies that put in the empty array
  useEffect(() => {
    setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);
  }, []);

  return <progress id="question-time" max={timeout} value={remainingTime} />;
}
