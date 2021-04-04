import { mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJSON from "enzyme-to-json";
import Login from '../../login/Login';
import { store } from '../..';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
  ...jest.requireActual('react-router-dom') as any,
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const LoginWrapper = () => (
  <Provider store={store}>
    <Login />
  </Provider>
);

describe("Login", () => {
  it("renders Login", () => {
    mount(<LoginWrapper />);
  });
  it("Should match Login snapshot", () => {
    const comp = mount(<LoginWrapper />);
    expect(toJSON(comp)).toMatchSnapshot();
  });
});

