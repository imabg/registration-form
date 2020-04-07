import React from "react";

const Home = (props) => {
  const handleLogout = () => {
    localStorage.removeItem("success");
    window.location.href="/"
  };

  return (
    <div className="jumbotron">
      <h1 className="display-4">Imagekit-project</h1>
      <p className="lead">
        Tech/Libaray used:
        <br />
        <>
          React, React-router and Bootstrap 4, react-google-recaptcha and Axios
        </>
      </p>
      <hr className="my-4" />
      <p>
        Project is created by{" "}
        <a href="https://abgoswami.me" target="_blank">
          Abhay Goswami 🔥
        </a>
      </p>
      <button className="btn btn-outline-primary" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
