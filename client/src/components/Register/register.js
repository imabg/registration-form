import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import Captcha from "../../Context";

const Register = (props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [RePassword, setRePassword] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [recaptchaToken, setrecaptchaToken] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (email.trim() && password.trim()) {
      setIsBtnDisabled(false);
    } else setIsBtnDisabled(true);
  }, [email, password]);

  const captcha = useContext(Captcha);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password === RePassword) {
        const newRegister = await axios.post(`http://localhost:8000/register`, {
          fullName,
          email,
          password,
          ipAddress: captcha.ip,
          recaptchaToken,
        });
        localStorage.setItem("success", newRegister.data.success);
        if (newRegister.data.success) {
          return props.history.push("/private");
        }
      } else {
        setPasswordError(true);
        setTimeout(() => {
          setRePassword("");
          setPassword("");
        }, 1000);
      }
    } catch (error) {}
  };
  const verifyCallback = (e) => {
    setrecaptchaToken(e);
  };

  return (
    <div className="container">
      <h1>Register</h1>
      {passwordError ? (
        <div className="alert alert-danger" role="alert">
          Password won't match 🚑
        </div>
      ) : (
        ""
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPasswordError(false);
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm-Password</label>
          <input
            type="password"
            className="form-control"
            value={RePassword}
            onChange={(e) => {
              setPasswordError(false);
              setRePassword(e.target.value);
            }}
            required
          />
        </div>
        {captcha.isCaptcha ? (
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_SITE_KEY}
            onChange={verifyCallback}
          />
        ) : (
          ""
        )}
        <br />
        <button
          type="submit"
          className={
            isBtnDisabled
              ? "btn btn-primary disabled"
              : "btn btn-outline-primary"
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
