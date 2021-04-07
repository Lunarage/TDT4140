import { mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJSON from "enzyme-to-json";
import Welcome from '../../welcome/Welcome';
import { store } from '../..';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
  ...jest.requireActual('react-router-dom') as any,
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const WelcomeWrapper = () => (
  <Provider store={store}>
    <Welcome />
  </Provider>
);

describe("Welcome", () => {
  it("renders Welcome", () => {
    mount(<WelcomeWrapper />);
  });
  it("Should match Welcome snapshot", () => {
    const comp = mount(<WelcomeWrapper />);
    expect(toJSON(comp)).toMatchSnapshot();
  });
});

