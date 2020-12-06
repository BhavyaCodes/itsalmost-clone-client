import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DateTime } from "luxon";
import './Event.scss';

const Event = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [timeUntilEvent, setTimeUntilEvent] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/api/events/${id}`);
        setData(res.data);

        const timeLeft = () => {
          const start = DateTime.local();
          const end = DateTime.fromISO(res.data.eventDate);
          return end.diff(start, [
            "years",
            "months",
            "days",
            "hours",
            "minutes",
            "seconds",
            "milliseconds",
          ]);
        };
        setInterval(() => {
          setTimeUntilEvent(timeLeft());
        }, 1);
      } catch (error) {
        setError(true);
      }
    };
    getData();
  }, [id]);

  const intervals = Object.values(Object.values(timeUntilEvent)[0]);


  return data ? (
    <div className="event">
      <div style={{ width: '80%' }}>
        <h1>It's almost {data.eventName}</h1>
        {/* 
                <h2>{data.eventDate}</h2>
        <h2>{new Date(data.eventDate).toLocaleString()}</h2>
        <h2>{new Date(data.eventDate).toString()}</h2>
        */}
        {intervals.every(item => item > 0) &&
          <h2>Before the lauch left: </h2>
        }
        <div className="event-time__wrapper">

          {timeUntilEvent.years > 0 && <div className="event-time">{timeUntilEvent.years} <span>years</span> </div>}
          {timeUntilEvent.months > 0 && <div className="event-time">{timeUntilEvent.months} <span>months</span> </div>}
          {timeUntilEvent.days > 0 && <div className="event-time">{timeUntilEvent.days} <span>days</span> </div>}
          {timeUntilEvent.hours > 0 && <div className="event-time">{timeUntilEvent.hours} <span>hours</span></div>}
          {timeUntilEvent.minutes > 0 && <div className="event-time">{timeUntilEvent.minutes} <span>minutes</span></div>}
          {timeUntilEvent.seconds > 0 && <div className="event-time">{timeUntilEvent.seconds} <span>seconds</span></div>}
          {/*{timeUntilEvent.milliseconds > 0 && <div  className="event-time">{timeUntilEvent.milliseconds} <span>ms</span></div>}*/}

        </div>
        {intervals.every(item => item <= 0) &&
          <div>
            <h2 style={{ textAlign: 'center' }}>Hurray  The count down completed</h2>
          </div>
        }
      </div>
    </div>
  ) : (
      <div>spinner</div>




    );
};

export default Event;
