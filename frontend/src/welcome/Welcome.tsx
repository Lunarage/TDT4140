import React from 'react'
import Button from '../components/Button';


interface WelcomeProps {
  loggedIn: boolean
}

const Welcome = ({ loggedIn }: WelcomeProps) => (
  <div>
    <div>hello world {loggedIn} </div>
    {loggedIn && <div> logget inn </div>}
    <Button text="button" />
  </div>
);

export default Welcome
