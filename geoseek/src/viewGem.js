import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GemCard from "./gem";
import styled from "styled-components";

const Card = styled.div`
  margin: 20px;
  padding: 5px;
  border-radius: 10px;
  display: flex;
  width: 250px;
  justify-content: space-between;
  .button {
    margin: 0px 3px;
    width: 75px;
    height: 25px;
    border-radius: 5px;
    background-color: #ff69b4;
    border: none;
    color: white;
    text-align: center;
    font-size: 20px;
    transition: 0.3s;
    text-decoration: none;
    cursor: pointer;
    padding: 5px;
    // opacity: 0.6;
    // transition: opacity .55s ease-in-out;
    // -moz-transition: opacity .55s ease-in-out;
    // -webkit-transition: opacity .55s ease-in-out;

    :hover {
      opacity: 1;
      transition: opacity 0.55s ease-in-out;
      -moz-transition: opacity 0.55s ease-in-out;
      -webkit-transition: opacity 0.55s ease-in-out;
      background-color: #c66db2;
      //border: 2px solid black;
    }
  }
`;

const CardsContainer = styled.div`
  border-left: 3px solid black;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 400px;
  padding: 0px;
  max-height: 100%;
  min-height: 100vh;
  height: 100vh;
  overflow-y: auto;
  @media (max-width: 700px) {
    width: 100%;
    position: absolute;
    background-color: #30364a;
    border-left: none;
    z-index: 25;
    .mapbox-ctrl-logo {
      display: none;
    }
  }
`;

const Input = styled.input`
  width: 200px;
  padding-left: 10px;
  font-size: 0.9rem;
  border: none;
  height: 44px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 15px auto;
  background-color: #3e4958;
  outline: none;
  color: white;
`;
const CloseButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 400px;
  .X_Link {
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

export default function ViewGem({ setRegLogRendered, updatePosition }) {
  const [gems, setGems] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/gems`)
      .then(res => {
        setGems(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    setRegLogRendered(false);
  }, []);

  if (!search) {
    return (
      <CardsContainer>
        <CloseButtonDiv>
          <Link className="X_Link" to="/">
            X
          </Link>
        </CloseButtonDiv>
        <form>
          <Input
            name="searchForm"
            placeholder="Search Gems"
            value={search}
            onChange={e => {
              setSearch(e.target.value.toLowerCase());
              console.log(search);
              const filteredGems = gems.filter(gem => {
                const ls = gem.title.toLowerCase();
                return ls.search(search) !== -1;
              });
              setFiltered(filteredGems);
            }}
          />
        </form>
        {gems.map(gem => {
          return (
            <div>
              <Card>
                <div>
                  <GemCard
                    key={gem.id}
                    title={gem.title}
                    latitude={gem.latitude}
                    longitude={gem.longitude}
                    description={gem.description}
                  />
                  <div
                    onClick={() => updatePosition(gem.latitude, gem.longitude)}
                  >
                    <Link className="viewLink">Click To View Location</Link>
                    
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </CardsContainer>
    );
  } else {
    return (
      <CardsContainer>
        <CloseButtonDiv>
          <Link className="X_Link" to="/">
            X
          </Link>
        </CloseButtonDiv>
        <form>
          <Input
            name="searchForm"
            placeholder="Search Gems"
            value={search}
            onChange={e => {
              setSearch(e.target.value.toLowerCase());

              const filteredGems = gems.filter(gem => {
                const ls = gem.title.toLowerCase();
                return ls.search(search) !== -1;
              });
              setFiltered(filteredGems);
            }}
          />
        </form>
        {filtered.map(gem => {
          return (
            <div>
              <Card>
                <div>
                  <GemCard
                    key={gem.id}
                    title={gem.title}
                    latitude={gem.latitude}
                    longitude={gem.longitude}
                  />
                  <div
                    onClick={() => updatePosition(gem.latitude, gem.longitude)}
                  >
                    <Link className="viewLink">Click To View Location</Link>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </CardsContainer>
    );
  }
}
