import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DateTimePicker from 'react-datetime-picker';
import { useHistory } from 'react-router-dom';

import Faker from 'faker';

const Landing = () => {
  const [eventName, setEventName] = useState("");
  const [eventNameFake, setEventNameFake] = useState(`It's almost Worldline`);
  const [value, onChange] = useState(new Date());
  const [isInputClicked, setIsInputClicked] = useState(false);
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
    const fake = Faker.name.title();


    const i = setInterval(() => {
      setEventNameFake("It's almost " + fake);
    }, 3000)
    
    return () => {
      clearInterval(i);
    }
  }, [eventNameFake]);
  
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className={"form-group"} onClick={() => {
          setIsInputClicked(true)
          inputRef.current.focus();
        }}>
          <div className="flex">
            {
              !isInputClicked ? (
                <input ref={inputRef} className={"form-control"} type="text" value={eventNameFake} readOnly/>
              ) : (
                  <>
                    <span>It's almost &nbsp;</span>
                    <span className={"form-control"} suppressContentEditableWarning={true} ref={inputRef} contentEditable onInput={handleChange} autoFocus></span>
                  </>
                )
            }

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
