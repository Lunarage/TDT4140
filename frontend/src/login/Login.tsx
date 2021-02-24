import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import Button from "../components/Button";
import Header from "../components/Header";
import InputField from "../components/InputField";
import { baseUrl } from '../consts';
import HttpClient from '../utilities/HttpClient';
import WelcomeLogo from "../welcome/WelcomeLogo";
import { State } from '../store/types';
import { useHistory } from 'react-router-dom';
import { ActionTypes } from '../store/actionTypes';
import { getUser, postUser } from '../store/actionCreators';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(/static/EverestTiny.png);
  background-repeat: no-repeat;
  height: 100vh;
  background-size: auto 100%;
`;

const WelcomeLogoWrapper = styled.div`
  margin-left: 280px;
  margin-top: 35px;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  position: absolute;
  right: 10%;
  top: 170px;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const LoginWidget = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  width: 100%;
  margin: 20px;
  border: hidden;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.45) 1px 5px 15px;
`;

const InputWrapper = styled.div`
  width: 300px;
  margin-top: 30px;
`;

const LoginHeader = styled.div`
  font-size: 20px;
  margin: 10px;
  font-weight: bold;
`;

export enum Method {
  login = "Logg inn",
  register = "Registrer",
}

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [method, setMethod] = useState<Method>(Method.login);
  const [email, setEmail] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confPassword, setConfPassword] = useState<string>();

  const [missingInfo, setMissingInfo] = useState<boolean>(false);
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
  const [sucessfullRegister, setSucessfullRegister] = useState<boolean>(false);

  const {
    user,
    errorMessage: userError,
  } = useSelector((state: State) => state.getUserReducer);

  const {
    user: postedUser,
  } = useSelector((state: State) => state.postUserReducer);

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user]);

  useEffect(() => {
    if (postedUser) {
      setSucessfullRegister(true)
    }
  }, [postedUser]);

  const handleSubmit = () => {
    if (method === Method.login && username && password) {
      console.log(username, password)
      dispatch(getUser(username, password))
      setMissingInfo(false)
      setPasswordMatch(true)
    } else if (method === Method.register && firstName && lastName && username && password && email) {
      setMissingInfo(false)
      if (password !== confPassword) {
        setPasswordMatch(false)
      } else {
        dispatch(postUser(firstName, lastName, username, password, email))
      }
    }
    else {
      setPasswordMatch(true)
      setMissingInfo(true)
    }
  }

  const resetMessages = () => {
    setSucessfullRegister(false);
    setMissingInfo(false);
    setPasswordMatch(true);

  }

  return (
    <PageWrapper>
      <Header />
      <WelcomeLogoWrapper>
        <WelcomeLogo />
      </WelcomeLogoWrapper>
      <LoginWrapper>
        <LoginWidget>
          <LoginHeader>{method}</LoginHeader>
          <InputWrapper>
            {method === Method.register && (<> <InputField name="First name" onChangeFunc={(val) => setFirstName(val)} />
              <InputField name="Last name" onChangeFunc={(val) => setLastName(val)} />
              <InputField name="E-post" onChangeFunc={(val) => setEmail(val)} /> </>)}
            <InputField name="Brukernavn" onChangeFunc={(val) => setUsername(val)} />
            <InputField name="Passord" onChangeFunc={(val) => setPassword(val)} />
            {method === Method.register && (
              <InputField name="Confirm passord" onChangeFunc={(val) => setConfPassword(val)} />
            )}
          </InputWrapper>
          {userError === 0 && <div>Feil brukernavn eller passord</div>}
          {missingInfo && <div>Fyll inn alle feltene</div>}
          {!passwordMatch && <div>Passordene er ikke like</div>}
          {sucessfullRegister && <div>Du er registrert. Vennligst logg inn</div>}
          <Button text="Submit" onClickFunc={() => handleSubmit()} />
        </LoginWidget>
        <ButtonsWrapper>
          <Button
            text={Method.register}
            onClickFunc={() => { setMethod(Method.register); resetMessages() }}
          />
          <Button
            text={Method.login}
            onClickFunc={() => { setMethod(Method.login); resetMessages() }}
          />
        </ButtonsWrapper>
      </LoginWrapper>
    </PageWrapper>
  );
};

export default Login;
