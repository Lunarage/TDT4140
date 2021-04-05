import { mount } from "enzyme";
import MyPage from '../../myPage/MyPage';
import { store } from '../..';
import Enzyme from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJSON from "enzyme-to-json";
import { Provider } from "react-redux";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
  ...jest.requireActual('react-router-dom') as any,
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const MyPageWrapper = () => (
  <Provider store={store}>
    <MyPage />
  </Provider>
);

describe("MyPage", () => {
  it("renders MyPage", () => {
    mount(<MyPageWrapper />);
  });
  it("Should match MyPage snapshot", () => {
    const comp = mount(<MyPageWrapper />);
    expect(toJSON(comp)).toMatchSnapshot();
  });
});
