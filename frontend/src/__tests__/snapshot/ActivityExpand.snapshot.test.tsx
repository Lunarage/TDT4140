import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJSON from "enzyme-to-json";
import ActivityExpand from '../../components/ActivityExpand';

Enzyme.configure({ adapter: new Adapter() });

describe("ActivityExpand", () => {
  it("renders ActivityExpand", () => {
    shallow(<ActivityExpand onExitFunc={() => { }} />);
  });
  it("Should match ActivityExpand snapshot", () => {
    const snap = shallow(<ActivityExpand onExitFunc={() => { }} />);
    expect(toJSON(snap)).toMatchSnapshot();
  });
});
