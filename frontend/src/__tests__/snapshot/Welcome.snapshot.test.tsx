import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJSON from "enzyme-to-json";
import Welcome from '../../welcome/Welcome';

Enzyme.configure({ adapter: new Adapter() });

describe("Welcome", () => {
  it("renders Welcome", () => {
    shallow(<Welcome />);
  });
  it("Should match Welcome snapshot", () => {
    const snap = shallow(<Welcome />);
    expect(toJSON(snap)).toMatchSnapshot();
  });
});
