import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJSON from "enzyme-to-json";
import Button from '../../components/Button';

Enzyme.configure({ adapter: new Adapter() });

describe("Button", () => {
  it("renders Button", () => {
    shallow(<Button text="test" />);
  });
  it("Should match Button snapshot", () => {
    const snap = shallow(<Button text="test" />);
    expect(toJSON(snap)).toMatchSnapshot();
  });
});
