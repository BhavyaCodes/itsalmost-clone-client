import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DateTime } from "luxon";

const Event = () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [diff, setDiff] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  })
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/api/events/${id}`);
        setData(res.data);

        const  timeLeft = () => {
          const start = DateTime.local();
          const end = DateTime.fromISO(res.data.eventDate);
          return end.diff(start, ['years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'])
        }
        setInterval(() => {
          setDiff(timeLeft());
        }, 1);
      } catch (error) {
        setError(true);
      }
    };
    getData();
  }, [id]);

  const intervals = Object.values(Object.values(diff)[0]);

  return data ? (
    <div>
      <h1>{data.eventName}</h1>
      <span>{intervals[0]} : {intervals[1]} : {intervals[2]} : {intervals[3]} : {intervals[4]} : {intervals[5]} : {intervals[6]}</span>
    </div>
  ) : (
    <div>spinner</div>
  );
};

export default Event;
