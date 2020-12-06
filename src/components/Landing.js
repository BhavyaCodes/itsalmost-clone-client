import { useState, useEffect, useRef } from "react";
import ReactDom from 'react-dom';
import axios from "axios";
import DateTimePicker from 'react-datetime-picker';
import { useHistory } from 'react-router-dom';

const Landing = () => {
  const [eventName, setEventName] = useState("");
  const [value, onChange] = useState(new Date());
  let history = useHistory();

  const handleChange = (e) => {
    setEventName(e.currentTarget.textContent);
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

  const inputRef = useRef(null);

  useEffect(() => {
      inputRef.current.focus();
  }, [inputRef]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className={"form-group"} onClick={() => {
                inputRef.current.focus();
        }}>
          <div className="flex">
            <span>It's almost &nbsp;</span>
            {/*<input className={"form-control"} onChange={handleChange} type="text" value={eventName} />*/}
            <span className={"form-control"} ref={inputRef} contentEditable onInput={handleChange} autofocus>&nbsp;</span>
          </div>
        </div>
        <div className={"form-group"}>
          <DateTimePicker
            onChange={onChange}
            value={value}
          />
        </div>
        <div className="form-button">
          <button className={'btn btn-primary'} type="submit">Create Free Countdown </button>
        </div>
      </form>
    </div>
  );
};

export default Landing;
