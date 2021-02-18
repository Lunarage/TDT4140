import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJSON from "enzyme-to-json";
import ActivityPreview from '../../components/ActivityPreview';

Enzyme.configure({ adapter: new Adapter() });

describe("ActivityPreview", () => {
  it("renders ActivityPreview", () => {
    shallow(<ActivityPreview onClickFunc={() => { }} />);
  });
  it("Should match ActivityPreview snapshot", () => {
    const snap = shallow(<ActivityPreview onClickFunc={() => { }} />);
    expect(toJSON(snap)).toMatchSnapshot();
  });
});
