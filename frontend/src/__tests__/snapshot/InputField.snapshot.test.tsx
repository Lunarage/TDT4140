import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJSON from "enzyme-to-json";
import InputField from '../../login/InputField';

Enzyme.configure({ adapter: new Adapter() });

describe("InputField", () => {
  it("renders InputField", () => {
    shallow(<InputField name="test" onChangeFunc={() => { }} />);
  });
  it("Should match InputField snapshot", () => {
    const snap = shallow(<InputField name="test" onChangeFunc={() => { }} />);
    expect(toJSON(snap)).toMatchSnapshot();
  });
});
