import ColorPicker from "./ColorPicker";
import "./WorldMap.css";
import React, { useState, useEffect } from "react";
import { VectorMap } from "react-jvectormap";
const { getName } = require("country-list");

function WorldMap() {
  const [data, setData] = useState({});
  const [countryCode, setCountryCode] = useState("");
  const [countriesCodes, setCountriesCodes] = useState([]);
  const [countriesNames, setCountriesNames] = useState([]);
  const [title, setTitle] = useState("");
  const [titleSet, setTitleSet] = useState(false);
  const [color, setColor] = useState("#48aeef");
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    const currentColor = color;
    setData(
      Object.defineProperty(data, countryCode, {
        value: color,
        writable: true,
        configurable: true,
        enumerable: true,
      })
    );
    setTimeout(() => setColor("#d4c4fb"), 1);
    setTimeout(() => setColor(currentColor), 1);
  }, [countryCode]);

  function handleColorChange(color) {
    setColor(color.hex);
  }

  function reset() {
    setData({});
    setCountriesCodes([]);
    setCountriesNames([]);
    setTitle("");
    setTitleSet(false);
    setColor("#48aeef");
  }

  function handleChange(e) {
    setTitle(e.target.value);
  }

  function handleFormSubmit() {
    setTitleSet(true);
  }

  const { getCode, getName, getData } = require("country-list");
  //console.log(getName("IS")); // Iceland
  //console.log(getCode("Iceland")); // IS
  //console.log(getData()); //gets an array of all countries names & codes: [{code: "AU", name: "Australia"}, ...]

  const handleClick = (e, countryCode, color) => {
    if (countriesCodes.indexOf(countryCode) === -1) {
      setCountriesCodes([...countriesCodes, countryCode]);
      setCountryCode(countryCode);
    }
  };

  function showNothing(e, el, code) {
    e.preventDefault();
  }

  //console.log("THIS IS WHAT YOU WANT DENIS", countryCode, color);

  return (
    <div className="worldMap__container">
      <div className="wordlMap__heading">
        <h2 className="wordlMap__headingText">PAINT THE WORLD</h2>
      </div>
      <VectorMap
        updateSize={true}
        panOnDrag={true}
        map={"world_mill"}
        backgroundColor="transparent" //change it to ocean blue: #0077be
        zoomOnScroll={true}
        containerStyle={{
          width: "100%",
          height: "600px",
        }}
        onRegionClick={handleClick} //gets the country code
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: "gray",
            "fill-opacity": 0.9,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 0,
          },
          hover: {
            "fill-opacity": 0.8,
            cursor: "pointer",
            fill: color,
          },
          selected: {
            fill: color, //color for the clicked country
            label: false,
          },
          selectedHover: {},
        }}
        regionsSelectable={true}
        series={{
          regions: [
            {
              values: data, //this is your data
              attribute: "fill",
            },
          ],
        }}
      />
      <div className="belowMap__container">
        <div className="colorPicker">
          <ColorPicker color={color} handleColorChange={handleColorChange} />
        </div>

        <div className="countries__list">
          {titleSet ? (
            <h3 className="belowMap__header">{title}</h3>
          ) : (
            <div className="belowMap__header">
              <h4>Set your map's title:</h4>
              <form onSubmit={handleFormSubmit} className="belowMap__form">
                <input type="text" onChange={handleChange} />
              </form>
            </div>
          )}
          <h4 className="belowMap__header">{` You have visited ${countriesCodes.length} countries`}</h4>
          <p>{countriesCodes.map((a) => getName(a) + ", ")}</p>
        </div>
        <button onClick={reset} type="submit" className="worldmap__resetBtn">
          RESET
        </button>
      </div>
    </div>
  );
}
export default WorldMap;
