import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Header from "../components/Header";
import InputField from "../components/InputField";
import WelcomeLogo from "../welcome/WelcomeLogo";

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
    margin-top: 50px;
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
    const [method, setMethod] = useState<Method>(Method.login);
    return (
        <PageWrapper>
            <Header loggedIn={true} />
            <WelcomeLogoWrapper>
                <WelcomeLogo />
            </WelcomeLogoWrapper>
            <LoginWrapper>
                <LoginWidget>
                    <LoginHeader>{method}</LoginHeader>
                    <InputWrapper>
                        <InputField name="E-post" />
                        <InputField name="Passord" />
                        {method === Method.register && (
                            <InputField name="Confirm passord" />
                        )}
                    </InputWrapper>
                    <Button text="Submit" />
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