import React, { useState } from 'react';
import './App.css';

const CityInput = (props) => {

  return (
    <div className="city-input">
      <label>City: </label>
      <input type="text" onChange={(e) => props.setCity(e.target.value)}/>
      <button onClick={() => props.searchCity()}>Search</button>
    </div>
  )

}

const App = () => {
  
  const [ city, setCity ] = useState("");
  const [ result, setResult ] = useState([]);

  const searchCity = async () => {
    const response = await fetch(`http://ctp-zip-api.herokuapp.com/city/${city.toUpperCase()}`);
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      setResult(json);
    } else {
      console.log("Error");
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <h2>City Search</h2>
      </div>
      <CityInput searchCity={searchCity} setCity={setCity}/>
      {
        result.map((e) => {
          return <h1>{e}</h1>
        })
      }
    </div>
  );
}

export default App;