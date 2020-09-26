import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
    <div className="city">
      <h1>{props.result.City.toLowerCase()}, {props.result.State}</h1>
      <ul>
        <li>State: {props.result.State}</li>
        <li>Location: ({props.result.Lat}, {props.result.Long})</li>
        <li>Population (estimated): {props.result.EstimatedPopulation}</li>
        <li>Total Wages: {props.result.TotalWages}</li>
      </ul>
    </div>
  );
}

function ZipSearchField(props) {

  return (
    <div className="user-input">
      <label>Zip Code</label>
      <input type="text" onChange={(e) => {props.setZip(e.target.value)}}></input>
      <button onClick={() => props.callApi()}>Search</button>
    </div>
  );
}


class App extends Component {

  state = {
    results: [],
    zip: ""
  }

  callApi = async () => {
    const response = await fetch(`http://ctp-zip-api.herokuapp.com/zip/` + this.state.zip);
    if (response.ok) {
      const json = await response.json();
      this.setState({
        results : json,
      });
    } else {
      console.log("Error");
    }
    // fetch(`http://ctp-zip-api.herokuapp.com/zip/${this.state.zip}`)
    //   .then((response) => {
    //     return response.json();
    // }).then((json) => {
    //   console.log(json);
    //   this.setState({
    //     results : json,
    //   });
    // }).catch((error) => {
    //   console.log("Error");
    // })
  }

  setZip = (zip) => {
    this.setState({
      zip : zip,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField setZip={this.setZip} callApi={this.callApi}/>
        <div>
          {
            this.state.results.map(e => <City result={e}/>)
          }
        </div>
      </div>
    );
  }
}

export default App;
