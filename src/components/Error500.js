import { Link } from "react-router-dom";

const Error500 = () => {

    return (
      <div>
        <h1>500 Error</h1>
        <div>Oops! Something is not right.</div>
        <Link to="/">Create a new Countdown.</Link>
      </div>
    );
}

export default Error500