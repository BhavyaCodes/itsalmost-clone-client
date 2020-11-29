import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DateTime } from "luxon";

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

  console.log(intervals)
  console.log("Time Until Event", timeUntilEvent)

  return data ? (
    <div>
      <h1>{data.eventName}</h1>
      <h2>{data.eventDate}</h2>
      <h2>{new Date(data.eventDate).toLocaleString()}</h2>
      <h2>{new Date(data.eventDate).toString()}</h2>
      <div>
        {!intervals.every(item=>item<=0) ? intervals.map((interval, index) => {
          if (index !== intervals.length - 1) {
            return <span>{interval} : </span>;
          } else {
            return <span> {interval}</span>;
          }
        }):
        <div>
          <h1>Hurray  The count down completed</h1>
        </div>
        }

        {timeUntilEvent.years > 0 && <div>{timeUntilEvent.years} years </div>}
        {timeUntilEvent.months > 0 && <div>{timeUntilEvent.months} months </div>}
        {timeUntilEvent.days > 0 && <div>{timeUntilEvent.days} days </div>}
        {timeUntilEvent.hours > 0 && <div>{timeUntilEvent.hours} hours</div>}
        {timeUntilEvent.minutes > 0 && <div>{timeUntilEvent.minutes} minutes</div>}
        {timeUntilEvent.seconds > 0 && <div>{timeUntilEvent.seconds} seconds</div>}
        {timeUntilEvent.milliseconds > 0 && <div>{timeUntilEvent.milliseconds} ms</div>}
        
 
      </div>
    </div>
  ) : (
    <div>spinner</div>


    

  );
};

export default Event;
