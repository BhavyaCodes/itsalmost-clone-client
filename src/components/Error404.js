import { Link } from "react-router-dom";

const Error404 = () => {

    return (
      <div>
        <h1>404 Error</h1>
        <div>Oops! Something is not right.</div>
        <Link to="/">Create a new Countdown.</Link>
      </div>
    );
}


export default Error404