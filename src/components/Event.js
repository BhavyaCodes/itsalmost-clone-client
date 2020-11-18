import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Event = () => {
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`/api/events/${id}`);
      console.log(res.data);
    };
    getData();
  }, [id]);

  return <div>Event</div>;
};

export default Event;
