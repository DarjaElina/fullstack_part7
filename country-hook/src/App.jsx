import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!name) {
      return;
    }
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((res) => {
        setCountry(res.data);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError("not found...");
        setCountry(null);
      });
  }, [name]);

  return {
    country,
    error,
  };
};

const Country = ({ country, error }) => {
  if (!country && !error) {
    return null;
  }

  console.log(country);
  return (
    <>
      {error && <p>{error}</p>}
      {country && (
        <div>
          <h3>{country.name.common} </h3>
          <div>capital {country.capital} </div>
          <div>population {country.population}</div>
          <img
            src={country.flags.png}
            height="100"
            alt={`flag of ${country.name.common}`}
          />
        </div>
      )}
    </>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const { country, error } = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} error={error} />
    </div>
  );
};

export default App;
