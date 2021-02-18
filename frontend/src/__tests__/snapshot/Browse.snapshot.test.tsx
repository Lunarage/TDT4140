import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJSON from "enzyme-to-json";
import Browse from '../../browse/Browse';

Enzyme.configure({ adapter: new Adapter() });

describe("Browse", () => {
  it("renders Browse", () => {
    shallow(<Browse />);
  });
  it("Should match Browse snapshot", () => {
    const snap = shallow(<Browse />);
    expect(toJSON(snap)).toMatchSnapshot();
  });
});
