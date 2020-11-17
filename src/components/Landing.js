import { useState } from 'react';
import axios from 'axios';

const Landing = () => {

  const [eventName, setEventName] = useState('');
  const eventDate = '2020-01-01';

  const handleChange = e => {
    setEventName(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();

    const formData = {
      eventName: eventName,
      eventDate: eventDate
    }

      axios
      .post('http://localhost:5000/events', formData)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.data))
    }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} type="text" value={eventName} />
      <button type="submit"> Create Free Countdown </button>
    </form>
  )
};

export default Landing;
