import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJSON from "enzyme-to-json";
import Header from '../../components/Header';

Enzyme.configure({ adapter: new Adapter() });

describe("Header", () => {
  it("renders Header", () => {
    shallow(<Header loggedIn={true} />);
  });
  it("Should match Header snapshot", () => {
    const snap = shallow(<Header loggedIn={true} />);
    expect(toJSON(snap)).toMatchSnapshot();
  });
});
