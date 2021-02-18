import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJSON from "enzyme-to-json";
import Login from '../../login/Login';

Enzyme.configure({ adapter: new Adapter() });

describe("Login", () => {
  it("renders Login", () => {
    shallow(<Login />);
  });
  it("Should match Login snapshot", () => {
    const snap = shallow(<Login />);
    expect(toJSON(snap)).toMatchSnapshot();
  });
});
