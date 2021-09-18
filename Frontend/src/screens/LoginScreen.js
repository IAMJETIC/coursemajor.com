import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../redux/actions/userActions';
import { Link } from "react-router-dom";
import axios from "axios";
import "./LoginScreen.css";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { search } = useLocation()
    const { redirect } = queryString.parse(search)

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      redirect ? history.push(redirect)
      : history.push("/");
    }
  }, [history]);

  const dispatch = useDispatch();
  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  //const { lol } = useSelector(state => state.userSignin);
  //console.log(lol);
  console.log(localStorage.getItem("authToken"));
  console.log(localStorage.getItem("userInfo"));

  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:{" "}
            <Link to="/forgotpassword" className="login-screen__forgotpassword">
              Forgot Password?
            </Link>
          </label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <span className="login-screen__subtext">
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default LoginScreen;
