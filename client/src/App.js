import React, { useState } from "react";
import DataService from "./services/service";
import "./App.css";

function App() {
  const [link, setLink] = useState("");
  const logIn = () => {
    window.open("http://localhost:8080/login");
  };

  const getSong = () => {
    DataService.getSong()
      .then((response) => {
        console.log(response.data);
        setLink(response.data.external_urls.spotify);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row mt-5">
        <div className="col-1">
          <button className="btn btn-dark" onClick={() => logIn()}>
            Log In
          </button>
        </div>
        <div className="col-2">
          <button className="btn btn-dark" onClick={() => getSong()}>
            Get Love Story
          </button>
        </div>
        <div className="col">
          {link ? (
            <a href={link} target="_blank">
              {link}
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
