import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import Button from "../components/Button";
import Header from "../components/Header";
import InputField from "../components/InputField";
import WelcomeLogo from "../welcome/WelcomeLogo";
import { useHistory } from 'react-router-dom';
import { getSignUps, getStarred, getUser, postUser } from '../store/actionCreators';

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

const ErrorMessage = () => (
  <div>Noe gikk feil - prøv igjen </div>
)

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // login or register
  const [method, setMethod] = useState<Method>(Method.login);

  // states for fields
  const [email, setEmail] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confPassword, setConfPassword] = useState<string>();

  // invalid input states
  const [missingInfo, setMissingInfo] = useState<boolean>(false);
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
  const [sucessfullRegister, setSucessfullRegister] = useState<boolean>(false);

  // error when login/register
  const [loginError, setLoginError] = useState<boolean>(false);
  const [regError, setRegError] = useState<boolean>(false);

  // responses from post user and get user. (register and login)
  const [postUserResponse, setPostUserResponse] = useState<any>()
  const [getUserResponse, setGetUserResponse] = useState<any>()

  useEffect(() => {
    if (getUserResponse) {
      if (getUserResponse.error) {
        // login error
        setLoginError(true)
      }
      else {
        // login success
        resetMessages()
        localStorage.setItem("token", getUserResponse.token)
        localStorage.setItem("id", getUserResponse.id.toString())
        dispatch(getStarred(getUserResponse.id.toString(), getUserResponse.token))
        dispatch(getSignUps(getUserResponse.id.toString(), getUserResponse.token))
        history.push("/");
      }
    }
  }, [getUserResponse]);

  useEffect(() => {
    if (postUserResponse) {
      if (postUserResponse.error) {
        // register error
        setRegError(true)
      }
      else if (postUserResponse) {
        // register success
        resetMessages()
        setSucessfullRegister(true)
      }
    }
  }, [postUserResponse]);

  const handleSubmit = () => {
    // login
    if (method === Method.login && username && password) {
      // get user
      let promise = getUser(username, password).then(r => { return r })
      promise.then(r => { setGetUserResponse(r) })
      setMissingInfo(false)
      setPasswordMatch(true)
    } else if (method === Method.register && firstName && lastName && username && password && email) { // register
      setMissingInfo(false)
      // password match check
      if (password !== confPassword) {
        setPasswordMatch(false)
      } else {
        // post user
        let promise = postUser(firstName, lastName, username, password, email).then(r => { return r })
        promise.then(r => { setPostUserResponse(r) })
      }
    }
    else {
      setPasswordMatch(true)
      setMissingInfo(true)
    }
  }

  // removes error messages
  const resetMessages = () => {
    setSucessfullRegister(false);
    setMissingInfo(false);
    setPasswordMatch(true);
    setLoginError(false);
    setRegError(false);
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
          {loginError && (getUserResponse?.error?.statusCode === 400 ? <div>Feil brukernavn eller passord</div> : ErrorMessage)} {/* statuscode 400 means password or username is wrong. All other possible scenario are tested in frontend. */}
          {regError && ErrorMessage}
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
