import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { connect } from "react-redux";
import { postGem } from "../actions";
import { Link } from "react-router-dom";

const FormContainer = styled.div`
  max-width: 400px;
  min-width: 400px;
  max-height: 87.5vh;
  background-color: #30364a;
  border-left: 3px solid black;
  overflow-y: auto;
`;

const Form = styled.form`
  max-width: 99%;
  margin: 0px;
  padding-top: 30px;
`;

const Input = styled.input`
  width: 300px;
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

const Button = styled.button`
  width: 350px;
  height: 50px;
  border-radius: 15px;
  outline: none;

  background-color: #ff69b4;
  border: none;
  color: white;
  text-align: center;
  font-size: 20px;
  margin: 40px 0px 40px 25px;
  transition: 0.3s;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.55s ease-in-out;
  -moz-transition: opacity 0.55s ease-in-out;
  -webkit-transition: opacity 0.55s ease-in-out;
  :hover {
    opacity: 1;
    transition: opacity 0.55s ease-in-out;
    -moz-transition: opacity 0.55s ease-in-out;
    -webkit-transition: opacity 0.55s ease-in-out;
    background-color: #c66db2;
  }
`;

const Label = styled.label`
  margin-left: 10%;
  color: white;
`;

const CloseButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;

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

/////////////////////////////////////////////////////

function CreateGem(props) {
  const userID = localStorage.getItem("userID");
  const [newGem, setNewGem] = useState({
    title: "",
    created_by_user: userID,
    longitude: "",
    latitude: "",
    difficulty: "",
    description: ""
  });

  const [address, setAddress] = useState("");
  const handleAddressChanges = e => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  const handleChanges = e => {
    setNewGem({
      ...newGem,
      [e.target.name]: e.target.value
    });
  };
  // Enables geocode on submit
  const handleGeocodeSubmit = e => {
    e.preventDefault();
    if (address === "") {
      alert("enter an address") && setAddress("");
    } else {
      function geocode(address) {
        axios
          .get(
            `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&singleLine=${address.address}&outFields=Match_addr,Addr_type`
          )
          .then(res => {
            setNewGem({
              ...newGem,
              longitude: res.data.candidates[0].location.x,
              latitude: res.data.candidates[0].location.y,
              created_by_user: localStorage.getItem("userID")
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
      geocode(address);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.postGem(newGem);
    setTimeout(() => {
      props.setRefresh(!props.refresh);
      props.updatePosition(Number(newGem.latitude), Number(newGem.longitude));
      props.history.push("/");

    }, 1000);
  };

  useEffect(() => {
    props.setRegLogRendered(false);
  }, []);

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <CloseButtonDiv>
          <Link className="X_Link" to="/">
            X
          </Link>
        </CloseButtonDiv>
        <Label>TITLE</Label>
        <Input
          className="input"
          name="title"
          placeholder="Title"
          value={newGem.name}
          onChange={handleChanges}
        />

        {/* <GeocodingRedux/> */}
        <Label>ADDRESS</Label>
        <Input
          name="address"
          placeholder="Enter an address"
          onChange={handleAddressChanges}
          onBlur={handleGeocodeSubmit}
        />

        <Label>LATITUDE</Label>
        <Input
          value={newGem.latitude}
          name="latitude"
          onChange={handleChanges}
          placeholder="Enter a Latitude coordinate"
        />
        <Label>LONGITUDE</Label>
        <Input
          value={newGem.longitude}
          name="longitude"
          onChange={handleChanges}
          placeholder="Enter a Longitude coordinate"
        />

        <Label>DIFFICULTY</Label>
        <Input
          className="input"
          name="difficulty"
          placeholder="Choose 1-5 for difficulty "
          value={newGem.difficulty}
          onChange={handleChanges}
        />
        <Label>DESCRIPTION</Label>
        <Input
          className="input"
          name="description"
          placeholder="Describe or give clues to find your gem."
          value={newGem.description}
          onChange={handleChanges}
        />

        <Button type="submit">Create Gem!</Button>
      </Form>
    </FormContainer>
  );
}

const mapStateToProps = state => {
  return {
    longitude: state.longitude,
    latitude: state.latitude,
    title: state.title,
    difficulty: state.difficulty,
    description: state.description
  };
};

export default connect(mapStateToProps, { postGem })(CreateGem);
