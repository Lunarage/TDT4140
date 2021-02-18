import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJSON from "enzyme-to-json";
import MyPage from '../../myPage/MyPage';

Enzyme.configure({ adapter: new Adapter() });

describe("MyPage", () => {
  it("renders MyPage", () => {
    shallow(<MyPage />);
  });
  it("Should match MyPage snapshot", () => {
    const snap = shallow(<MyPage />);
    expect(toJSON(snap)).toMatchSnapshot();
  });
});
