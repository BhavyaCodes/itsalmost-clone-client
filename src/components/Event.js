import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Event = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/api/events/${id}`);
        setData(res.data);
      } catch (error) {
        setError(true);
      }
    };
    getData();
  }, [id]);

  return data ? (
    <div>
      <h1>{data.eventName}</h1>
      <h2>{data.eventDate}</h2>
      <h2>{new Date(data.eventDate).toLocaleString()}</h2>
      <h2>{new Date(data.eventDate).toString()}</h2>
    </div>
  ) : (
    <div>spinner</div>
  );
};

export default Event;
