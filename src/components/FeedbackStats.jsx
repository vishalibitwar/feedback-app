import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";
function FeedbackStats() {
  const {feedback} = useContext(FeedbackContext);
 let average = feedback.reduce((acc, curr)=> acc+curr.rating , 0)
  average = (average / feedback.length).toFixed(1);
  return (
    <div className="feedback-stats">
      {" "}
      <h4>{feedback.length} reviews</h4>{" "}
      <h4>Average rating {isNaN(average) ? 0 : average}</h4>{" "}
    </div>
  );
}
export default FeedbackStats;
