import { useState } from "react";
import axios from "axios";
import DateTimePicker from 'react-datetime-picker';
import { useHistory } from 'react-router-dom';

const Landing = () => {
  const [eventName, setEventName] = useState("");
  const [value, onChange] = useState(new Date());
  let history = useHistory();

  const handleChange = (e) => {
    setEventName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      eventName: eventName,
      eventDate: value
    };

    axios
      .post("/api/events", data)
      .then((res) => {
        history.push(`/${res.data._id}`)
      })
      .catch((err) => console.log(err.data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} type="text" value={eventName} /><br></br>
      <DateTimePicker
      onChange={onChange}
      value={value}
      /><br></br>
      <button type="submit">Create Free Countdown </button>
    </form>
  );
};

export default Landing;
