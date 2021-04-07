import { mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJSON from "enzyme-to-json";
import Header from '../../components/Header';
import { store } from '../..';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
  ...jest.requireActual('react-router-dom') as any,
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

const HeaderWrapper = () => (
  <Provider store={store}>
    <Header />
  </Provider>
);

describe("Header", () => {
  it("renders Header", () => {
    mount(<HeaderWrapper />);
  });
  it("Should match Header snapshot", () => {
    const comp = mount(<HeaderWrapper />);
    expect(toJSON(comp)).toMatchSnapshot();
  });
});

