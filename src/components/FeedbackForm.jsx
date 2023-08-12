import { useEffect } from "react";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";
import Card from "./shared/Card";
import { useState } from "react";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";

function FeedbackForm() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const {addFeedback, FeedbackEdit, updateFeedback} = useContext(FeedbackContext);

  useEffect(() => {
    if (FeedbackEdit.edit == true) {
      setBtnDisabled(false);
      setText(FeedbackEdit.item.text);
      setRating(FeedbackEdit.item.rating);
    }
  }, [FeedbackEdit]);

  const handleTextChange = ({target: {value} }) => {
    if (value === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if ((value !== "", value.trim().length <= 10)) {
      setMessage("Text must be at least 10 character");
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
    setText(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };
      if (FeedbackEdit.edit == true) {
        updateFeedback(FeedbackEdit.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }

      setText("");
      setBtnDisabled(true);
      setRating(10);
    }
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How do you rate your service with us?</h2>
        <RatingSelect
          selected={rating}
          select={(rating) => setRating(rating)}
        />
        <div className="input-group">
          <input
            type="text"
            onChange={handleTextChange}
            value={text}
            placeholder="write your review..."
          />
          <Button isDisabled={btnDisabled} type="submit">
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
