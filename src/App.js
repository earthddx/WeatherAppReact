import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";

import theme from "./theme";

const useStyles = makeStyles((theme) => ({
  root: {},
  section: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "100px auto",
  },
  input: {
    maxWidth: 300,
    minWidth: 300,
    margin: "auto",
  },
  paper: {
    maxWidth: 300,
    minWidth: 300,
    margin: "auto",
    marginTop: 80,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  noData: {
    padding: theme.spacing(1),
    fontSize: 30,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxHeight: 300,
    minHeight: 300,
  },
  info: {
    margin: "0 auto",
    "& > h2": {
      fontSize: 28,
    },
  },
  temperature: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    cursor: "pointer",
  },
  contactInfo: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  socialLinks: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    margin: 15,
    marginTop: 40,
    textDecoration: "none",
    color: theme.palette.secondary.main,
    "&:visited": {
      color: theme.palette.secondary.main,
    },
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [isCelsius, setIsCelsius] = useState(true);
  const classes = useStyles();

  const URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = process.env.REACT_APP_API_KEY;

  const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
      params: {
        q: query, //city name, id and etc... refer to https://openweathermap.org/current
        units: "metric",
        APPID: API_KEY,
      },
    });
    return data;
  };

  const search = async (event) => {
    if (event.key === "Enter") {
      const data = await fetchWeather(query);
      console.log(data);
      setWeather(data);
      setQuery("");
      console.log(data);
    }
  };

  const toggleDegree = () => {
    if (isCelsius) {
      setIsCelsius(false);
    } else {
      setIsCelsius(true);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <TextField
          className={classes.input}
          id="filled-basic"
          label="search city..."
          variant="filled"
          autoComplete="off"
          autoFocus={true}
          color="secondary"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyPress={search}
        />
        {!weather.main ? (
          <div className={classes.paper}>
            <div className={classes.noData}>
              <p>Is it cold or is it hot?..</p>
              <span role="img" aria-label="emoji" style={{ margin: "auto" }}>
                🌡️
              </span>
            </div>
          </div>
        ) : (
          <Paper className={classes.paper}>
            <div className={classes.info}>
              <h2>
                <span style={{ color: theme.palette.secondary.main }}>
                  {weather.name}
                </span>
                <span
                  style={{ color: theme.palette.primary.main, marginLeft: 10 }}
                >
                  {weather.sys.country}
                </span>
              </h2>
              <div className={classes.temperature} onClick={toggleDegree}>
                <span style={{ margin: "auto", fontSize: "1.5rem" }}>
                  {isCelsius
                    ? Math.round(weather.main.temp)
                    : Math.round((weather.main.temp * 9) / 5 + 32)}
                  <sup>&deg; {isCelsius ? "C" : "F"}</sup>
                </span>
                <span style={{ margin: "auto" }}>
                  wind: {Math.round(weather.wind.speed) * 3.6}km/h
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  style={{ width: 100, height: 100, margin: "auto" }}
                />
                <p style={{ textAlign: "center" }}>
                  {weather.weather[0].description}
                </p>
              </div>
            </div>
          </Paper>
        )}

        <div className={classes.contactInfo}>
          <div className={classes.socialLinks}>
            {" "}
            <a
              href="https://github.com/earthddx"
              rel="noopener noreferrer"
              target="_blank"
              className={classes.link}
            >
              <GitHubIcon />
            </a>
            <a
              href="https://twitter.com/ArtemMurzo"
              rel="noopener noreferrer"
              target="_blank"
              className={classes.link}
            >
              <TwitterIcon />
            </a>
          </div>
          <div className={classes.footer}>
            <h4>pwa built with react and material-ui</h4>
            <p>
              <a
                href="https://openweathermap.org/api"
                rel="noopener noreferrer"
                target="_blank"
                className={classes.link}
                style={{ color: theme.palette.primary.main }}
              >
                OpenWeatherAPI
              </a>
            </p>
            <span role="img" aria-label="emoji">
              made with ❤️ 2020
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
