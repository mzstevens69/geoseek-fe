import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from "axios";
import styled from "styled-components";

const CloseButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;

  .X_Link {
    background: #3e4958;
    border-style: none;
    color: #ff69b4;
    text-decoration: none;
    font-size: 30px;
    padding: 5px;
    margin: 5px 8px 0px 0px;

    :hover {
      opacity: 1;
      transition: opacity 0.55s ease-in-out;
      -moz-transition: opacity 0.55s ease-in-out;
      -webkit-transition: opacity 0.55s ease-in-out;
      color: #c66db2;
    }
  }
`;

//map component setting default view

function Map({ latitude, longitude, refresh }) {
  const [viewport, setViewport] = useState({
    latitude: 36.955992,
    longitude: -121.971428,
    width: "100vw",
    height: "90vh",
    zoom: 12
  });

  const [gems, setGems] = useState([]);
  const [selectedGem, setSelectedGem] = useState(null);

  useEffect(() => {
    const zoom = 12;
    setViewport({ ...viewport, latitude, longitude, zoom });
  }, [latitude, longitude]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/gems`)
      .then(res => {
        setGems(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [refresh]);

// Marking a gem complete api request 

  function markComplete(gemId) {
    const userToken = localStorage.getItem("userID");
    let body = {
      gem_id: gemId,
      completed_by: userToken
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/completed`, body)
      .then(res => {})

      .catch(err => {
        alert(`${err} you have already marked this gem complete.`);
      });
  }

  return (
    <ReactMapGL
      className="Map"
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/geoseek/ck7b5gau8002g1ip7b81etzj4"
      onViewportChange={viewport => {
        setViewport(viewport);
      }}
    >
      {gems.map(gem => (
        <Marker key={gem.id} latitude={gem.latitude} longitude={gem.longitude}>
          <button
            className="marker-btn"
            onClick={e => {
              e.preventDefault();
              setSelectedGem(gem);
              console.log(gem);
            }}
          >
            {selectedGem === gem ? (
              <img src="/pinkGem.png" alt="Selected Gem Icon" />
            ) : (
              <img src="/blueGem.png" alt="Gem Icon" />
            )}
          </button>
        </Marker>
      ))}
      {selectedGem && (
        <Popup
          key={selectedGem.id}
          latitude={selectedGem.latitude}
          longitude={selectedGem.longitude}
        >
          
          <div>
            <CloseButtonDiv>
              <button className="X_Link" onClick={() => setSelectedGem(null)}>
                X
              </button>
            </CloseButtonDiv>
            <h2>{`Title: ${selectedGem.title}`}</h2>
            <p>{`Difficulty: ${selectedGem.difficulty}`}</p>
            <p>{`Description: ${selectedGem.description}`}</p>
            <button
              onClick={e => {
                e.preventDefault();
                markComplete(selectedGem.id);
                setSelectedGem(null);
              }}
            >
              Mark Completed
            </button>
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
}

export default Map;
