import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import Button from "../components/Button";
import Header from "../components/Header";
import InputField from "../components/InputField";
import { baseUrl } from '../consts';
import HttpClient from '../utilities/HttpClient';
import WelcomeLogo from "../welcome/WelcomeLogo";
import { getUser } from '../store/actionCreators';

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

  const [method, setMethod] = useState<Method>(Method.login);
  const [email, setEmail] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confPassword, setConfPassword] = useState<string>();

  const handleToken = (token: string) => {

  }

  const handleSubmit = () => {
    let client = new HttpClient(baseUrl)
    if (method === Method.login && username && password) {
      dispatch(getUser(username, password))
      console.log(':)')
      console.log(username)
    }
    else {
      console.log(":(")
    }
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
          <Button text="Submit" onClickFunc={() => handleSubmit()} />
        </LoginWidget>
        <ButtonsWrapper>
          <Button
            text={Method.register}
            onClickFunc={() => setMethod(Method.register)}
          />
          <Button
            text={Method.login}
            onClickFunc={() => setMethod(Method.login)}
          />
        </ButtonsWrapper>
      </LoginWrapper>
    </PageWrapper>
  );
};

export default Login;
