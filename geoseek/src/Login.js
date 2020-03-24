import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";

const FormContainer = styled.div`
  display: flex;
  width: 99.5vw;
  height: 88vh;
  background-color: #30364a;
  overflow-y: auto;

  .Link {
    text-decoration: none;
    outline: none;
  }
`;

const Button = styled.button`
  width: 330px;
  height: 50px;
  border-radius: 15px;
  outline: none;
  display: block;
  background-color: #ff69b4;
  border: none;
  color: white;
  text-align: center;
  font-size: 20px;
  margin: 100px auto 0px auto;
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
const RegisterDiv = styled.div`
    width: 100vw;
    height: 85vh;
    @media(max-width: 700px){
      display:none;
    }
`
const Form = styled.form`
border-left: 3px solid black;
height:85vh;
    width: 100vw;
    
    h1 {
        margin: 30px 0px 80px 40px;
        color: white;
    }
    p {
        color: white;
        margin: 50px 0px 0px 0px;
        text-align: center;
    }
    .Form_Link {
        color: #FF69B4;
    }
    @media(max-width: 700px){
      border-left: none;
    }
`
const CloseButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;

  .X_Link {
    color: #FF69B4;
    text-decoration: none;
    font-size: 30px;
    padding: 5px;
    margin: 5px 8px 0px 0px; 

    :hover {
      opacity: 1;
      transition: opacity 0.55s ease-in-out;
      -moz-transition: opacity 0.55s ease-in-out;
      -webkit-transition: opacity 0.55s ease-in-out;
      color: #C66DB2;
    }
  }
`

function Login (props) {

  const { register, handleSubmit, errors } = useForm();
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const onLoginSubmit = () => {
    axiosWithAuth()
      .post("/api/users/login", form)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userID", res.data.user_id);
        props.history.push("/");
      })
     
      .catch(err => {

        alert(`${err} you have entered username or password incorrectly.`);

      });
  };

  useEffect(() => {
    props.setRegLogRendered(true);
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  return (
    <FormContainer>
      <RegisterDiv>
        <div className='RegLog_Hero_Image_Container'>
          <div className='Login_Hero_Image' />
          <div className='Hero_Text'>
            <h1 className='Hero_H1'>Welcome Back!</h1>
            <p className='Hero_P'>Sign in to find the hidden gems all around you.</p>
          </div>
        </div>
      </RegisterDiv>

      <Form onSubmit={handleSubmit(onLoginSubmit)}>
        <CloseButtonDiv><Link className='X_Link' to='/'>X</Link></CloseButtonDiv>
        <h1>Sign in</h1>
        <Label>USERNAME</Label>
        <Input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          ref={register({ required: true, minLength: 4, maxLength: 20 })}
        />
        {errors.username && (
          <p className="error"> the username or password cannot be found </p>
        )}
        <Label>Password:</Label>
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          ref={register({ required: true, minLength: 4, maxLength: 20 })}
        />

        {errors.password && (
          <p className="error"> the username or password cannot be found </p>
        )}
        <Button type="submit">Log in</Button>
        <p>
          Don't have an account?{" "}
          <Link className="Form_Link" to="/Register">
            Sign Up
          </Link>
        </p>
      </Form>
    </FormContainer>
  );
}

export default Login;
